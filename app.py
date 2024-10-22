import io
import numpy as np
import tensorflow as tf
from tensorflow.keras.applications import VGG19
from flask import Flask, request, send_file
from PIL import Image

app = Flask(__name__)

# Load and preprocess images from uploaded files
def load_and_preprocess_image(file):
    img = Image.open(file).resize((224,224)).convert('RGB')
    img = np.array(img) / 255.0  # Normalize to [0, 1]
    img = np.expand_dims(img, axis=0)  # Add batch dimension
    return img

# Load VGG19 model
model = VGG19(include_top=False, weights='imagenet')

# Content and Style Layers
content_layers = ['block4_conv2', 'block5_conv3']
style_layers = ['block1_conv1','block2_conv2', 'block3_conv3', 'block4_conv3','block5_conv3']

content_weight = 1e0
style_weight = 1e6

def get_model(output_layers):
    outputs = [model.get_layer(layer).output for layer in output_layers]
    return tf.keras.Model(inputs=model.input, outputs=outputs)

content_model = get_model(content_layers)
style_model = get_model(style_layers)

def get_features(model, image):
    features = model(image)
    return features

# Loss Functions
def content_loss(content, generated):
    return tf.reduce_mean(tf.square(content - generated))

def gram_matrix(tensor):
    channels = int(tensor.shape[-1])
    a = tf.reshape(tensor, [-1, channels])
    return tf.matmul(tf.transpose(a), a)

def style_loss(style, generated):
    style_gram = gram_matrix(style)
    generated_gram = gram_matrix(generated)
    return tf.reduce_mean(tf.square(style_gram - generated_gram))

def total_variation_loss(image):
    return tf.image.total_variation(image)

def style_transfer(content_image, style_image, target_iteration):
    
    optimizer = tf.keras.optimizers.Adam(learning_rate=0.008)
    
    generated_image = tf.Variable(content_image)

    content_features = get_features(content_model, content_image)
    style_features = get_features(style_model, style_image)

    
    @tf.function
    @tf.autograph.experimental.do_not_convert
    def train_step(optimizer):
        with tf.GradientTape() as tape:
            # Get generated features
            generated_content_features = get_features(content_model, generated_image)
            generated_style_features = get_features(style_model, generated_image)

            # Compute content and style loss
            c_loss = content_loss(content_features[0], generated_content_features[0])
            s_loss = sum(style_loss(style_features[j], generated_style_features[j]) for j in range(len(style_layers)))

            # Ensure losses are float32 to avoid type mismatch
            c_loss = tf.cast(c_loss, tf.float32)
            s_loss = tf.cast(s_loss, tf.float32)
            tv_loss = tf.cast(total_variation_loss(generated_image), tf.float32)

            # Calculate total loss
            total_loss = content_weight * c_loss + style_weight * s_loss + 1e-6 * tv_loss

        # Compute gradients with respect to generated_image
        grads = tape.gradient(total_loss, [generated_image])

        # Clip gradients for stability
        grads = [tf.clip_by_value(grad, -1.0, 1.0) for grad in grads]

        # Apply the gradients to the generated image
        optimizer.apply_gradients(zip(grads, [generated_image]))


    for i in range(1000):
        train_step(optimizer)
        if i == target_iteration:
            output_image = generated_image.numpy().squeeze()
            output_image = np.clip(output_image * 255, 0, 255).astype('uint8')
            img = Image.fromarray(output_image)
            return img

# Flask API route to handle style transfer
@app.route('/style', methods=['POST'])
def run_style_transfer():
    # Get the uploaded files (content and style images)
    content_file = request.files['content']
    style_file = request.files['style']

    # Get the target iterations (for two images)
    iterations = request.form.getlist('iterations')

    # Process the images
    content_image = load_and_preprocess_image(content_file)
    style_image = load_and_preprocess_image(style_file)

    # Collect images at different iterations
    results = []
    for iteration in map(int, iterations):
        output_image = style_transfer(content_image, style_image, iteration)
        
        # Convert image to bytes and store it in memory
        img_io = io.BytesIO()
        output_image.save(img_io, 'PNG')
        img_io.seek(0)
        results.append(img_io)

    # For now, return the first image in results (iteration 250) as an example
    return send_file(results[0], mimetype='image/png')

if __name__ == '__main__':
    app.run(debug=True)

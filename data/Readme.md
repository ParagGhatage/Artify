# Data Directory 📂

This directory contains the **content** and **style** images used for neural style transfer in the **Artify** project. The purpose of this folder is to store the raw input images that will be processed and transformed by the neural style transfer algorithm.

## 📄 Overview

Neural Style Transfer works by blending two types of images:
1. **Content Image**: This is the base image whose structure and overall appearance you want to retain.
2. **Style Image**: This is the image whose visual texture, color palette, and artistic patterns will be applied to the content image.

The images in this directory are used by the **`processing.ipynb`** notebook for performing the style transfer. Both images are preprocessed (resized, normalized) before being passed into the VGG19 model.

## 🖼️ Image Files

### Content Image

- **`normal2.jpg`**: This image represents the content that will remain intact during the neural style transfer process. The major features and shapes of this image will be preserved while blending in the artistic style.

### Style Image

- **`style20.png`**: This image represents the style or the artistic patterns that will be applied to the content image. Neural style transfer will extract the textures, brush strokes, and color palette from this image and apply them to the content image.

## 📦 Image Preprocessing

Before being used in the style transfer algorithm, the images are preprocessed as follows:

1. **Resize**: Both images are resized to `(224, 224)` to match the input size expected by the VGG19 model.
2. **Normalization**: The pixel values of the images are scaled between 0 and 1 to ensure that the model receives properly normalized input.
3. **Batch Dimension**: A batch dimension is added to the image tensor, making it compatible with the VGG19 model's input format.

This preprocessing step is done in the `processing.ipynb` notebook using the `PIL` and `NumPy` libraries.

### Example:

```python
from PIL import Image
import numpy as np

def load_and_preprocess_image(image_path):
    img = Image.open(image_path).resize((224,224)).convert('RGB')
    img = np.array(img) / 255.0  # Normalize to [0, 1]
    img = np.expand_dims(img, axis=0)  # Add batch dimension
    return img

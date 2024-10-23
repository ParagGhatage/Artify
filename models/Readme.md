# Models Directory 🧠

This directory contains the pre-trained model weights and architecture details used for the **Artify** neural style transfer project. The key model architecture employed is **VGG19**, a convolutional neural network widely used in deep learning tasks, including image classification and feature extraction.

## 📄 Overview

### Model Architecture: VGG19

**VGG19** is a Convolutional Neural Network (CNN) that has 19 layers deep, including 16 convolutional layers and 3 fully connected layers (though the fully connected layers are not used in this style transfer task). The network was originally designed for image classification but has proven to be highly effective in feature extraction for tasks like **Neural Style Transfer** due to its deep structure and the granularity of features it captures.


_VGG19 architecture: Note that only the convolutional layers are used for style transfer._

### Why VGG19 for Neural Style Transfer?

I chose VGG19 for the following reasons:

1. **Rich Feature Extraction**: VGG19’s multiple convolutional layers capture both low-level and high-level features from images. Lower layers capture fine textures, while deeper layers capture abstract patterns, making it ideal for separating content and style.

2. **Pre-trained on ImageNet**: VGG19 is pre-trained on the ImageNet dataset, which contains millions of labeled images. This pre-training allows it to generalize well to new image tasks such as style transfer without requiring extensive re-training.

3. **Layer-Specific Control**: In neural style transfer, content and style are extracted from specific layers of the model. VGG19 offers excellent flexibility in selecting layers, enabling us to blend content from deeper layers and style from shallower layers.

4. **Proven Effectiveness**: VGG-based models have been widely used in neural style transfer research. The original paper on style transfer by Gatys et al. also utilized a VGG network, which further supports its effectiveness.

### Model Layers for Style Transfer

In this project, the following layers of VGG19 are used to extract **content** and **style** features:

- **Content Layers**:
  - `block4_conv2`
  - `block5_conv3`
  
  These layers capture mid-level and high-level content details, preserving the structure of the original content image.

- **Style Layers**:
  - `block1_conv1`
  - `block2_conv1`
  - `block2_conv2`
  - `block3_conv3`
  - `block4_conv3`
  - `block5_conv3`
  
  These layers capture different levels of textures and patterns from the style image, from fine brush strokes to complex patterns.

## 📦 Pre-Trained Weights

The VGG19 model used in this project is pre-trained on the **ImageNet** dataset. The model weights can be downloaded automatically using TensorFlow/Keras when the model is loaded with the following code:

```python
from tensorflow.keras.applications import VGG19

model = VGG19(include_top=False, weights='imagenet')

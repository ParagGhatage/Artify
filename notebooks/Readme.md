# Artify - Neural Style Transfer 🖌️

This directory contains a Jupyter Notebook (`processing.ipynb`) for implementing neural style transfer using TensorFlow and VGG19. The goal is to merge the **content** of one image with the **style** of another, resulting in a stunning piece of artwork that retains the subject of the content image but adopts the visual texture of the style image.

## 📄 Overview

This project uses:
- **TensorFlow** and **Keras** to build a model based on the VGG19 architecture.
- **PIL** and **Matplotlib** for image processing and visualization.
- **Neural Style Transfer** techniques to combine the content of one image and the style of another.

The implementation includes:
- **Content and Style Feature Extraction**: Extracting features using layers of the VGG19 model.
- **Loss Functions**: Custom content and style loss calculations, as well as total variation loss to smooth the output.
- **Optimization**: Gradient descent with the Adam optimizer for fine-tuning the generated image.

## 🚀 Getting Started

### Prerequisites

To run the notebook, you'll need the following libraries:
- `tensorflow`
- `keras`
- `PIL`
- `matplotlib`
- `numpy`

You can install the necessary packages using pip:

```bash
pip install tensorflow pillow matplotlib numpy
.
├── notebook/
│   ├── processing.ipynb   # Main notebook for style transfer
├── data/
│   ├── normal2.jpg        # Content image
│   ├── style20.png        # Style image
├── models/
│   ├── vgg19_weights.h5   # Pre-trained VGG19 weights (to be downloaded if not present)

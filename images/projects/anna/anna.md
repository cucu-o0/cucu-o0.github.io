# ANNa

> *"It's not some kind of miracle, cancer doesn't grow from yesterday to today. It's a pretty long process.*
> *There are signs in the tissue, but the human eye has limited ability to detect what may be very small patterns."*    

**Regina Barzilay** — First winner of the Squirrel AI Award for AI for the Benefit of Humanity

## Overview

![LeuKemiaCells](/images/projects/anna/leukemia_cells.jpg)

**Leukemia** is a malignant tumor of white blood cells (leukocytes). In [Acute lymphoblastic](https://en.wikipedia.org/wiki/Acute_lymphoblastic_leukemia) form, it represents 25% of all pediatric cancers.

The task of identifying immature leukemic blasts from normal cells under the microscope is challenging due to **morphological similarity** and labels were annotated by an expert oncologist.

Tackling one of the major types of childhood cancer by creating a **model** that **classifies** between **diseased** and **healthy cells**. To do this, we use  **Neural Networks**, a computer system modeled on the **human brain** and **nervous system**.

You can check the full code [here](https://github.com/cucu-o0/final_project_IH_leukemia)

## Data

Data are obtained from a  [Kaggle dataset](https://www.kaggle.com/andrewmvd/leukemia-classification) with more than 15,000 cells'images, some of them of young patients affected by leukemia and others with no leukemia.

Cells have been segmented from microscopic images and are representative of images in the real-world because they contain some staining noise and illumination errors, although these errors have largely been fixed in the course of acquisition.

In total there are **15,135 images** from **118 patients** with two **labelled classes**:

- **all**: Leukemia Blast
- **hem**: Healthy Cells

## Meet ANNa

To achieve our goal, we create **ANNa**, an **Artificial Neural Network anti-Leukemia**.

**ANNa** is the combination of a **Convolutional Network** for **Biomedical Image Segmentation** (**U-Net**) and a **Neural Network** for **Binary Classification**.

We choose Convolutional Neural Networks because they are a category of Neural Networks that have proven very effective in areas such as image recognition and classification.

### ANNa's Brain

Let's discover **ANNa's Brain**!

In **Medical testing**, **Binary classification** is used to determine if a patient has certain disease (in our case, **Leukemia**) or not.

For this reason, we create a **Brain** made up of two parts:

- 1. **U-Net**: **Convolutional Network** for **Biomedical Image Segmentation**

      **Medical Image Segmentation** is the process of **automatic or semi-automatic detection of boundaries within a 2D or 3D image**.

      - Input: Image shape
      - Output: U-Net output

- 2. **Binary Classification**: **Neural Networks**

        - Input: U-Net output
        - Output: Classification output

### Conclusions

In this project, we learned how to use the **Keras** deep learning library to train a Convolutional Neural Network for **Leukemia classification**.

A total of 10661 images belonging to two classes are included in the training dataset:

- Positive (+): 7272 images
- Negative (-): 3389 images

We can see there is a class imbalance in the data with almost 2x more positive samples than negative samples.

**ANNa** is able to recognize the diseased cells but has some difficulty recognizing the healthy ones.

The class imbalance, along with the challenging nature of the dataset, lead to us obtaining:
  - ~**60%** **accuracy**
  - ~**82% sensitivity (N)**
  - ~**18% specificity (N)**
  - ~**82% fall-out** (probability of false allert)

**ANNa** is confirming Kaggle’s results and since this is her first training we can say that is behaving quite successfully!

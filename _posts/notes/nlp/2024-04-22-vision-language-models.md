---
layout: post
title:  Vision Language Models
categories: [NLP]
tags: [notes]
excerpt: Images can be represented as a collection of visual "words" or patches, allowing the attention mechanism to be applied to it. This opened the doors for native multimodality capabilities be developed in the form of VLMs
---

### Key Ideas
- Images can be represented as a collection of visual "words" or patches, allowing the attention mechanism to be applied to it
- Architectures for Vision and Text models are converging, allowing for native multimodality 

### Notes
#### Vision Basics
**Representation**
- Grayscale images are matrices, Color images are tensors
- Image pixel values exist in a fixed range, called a Color Space

**Convolution Networks**
- Given a *convolution mask* `k`, we can create a representation of an image
    - `g(x, y) = Sum_{v} Sum_{u} k(u, v)f(x - u, y - v)` where `f` is the input representation, `g` is the new representation
    - Can do things such as: "Sharpen", "Find Edges", "Blur", etc.
- Stack enough depth, and the network will learn more complex features (image -> edges -> groups of edges -> collections of interesting features)

**Transformer Networks**
- Apply self attention on pixel values
    - Problems around extracting 2D relation information from the image and local vs global attention
- Use patches instead of pixels (dModel = 768!)

#### Multimodality
**Contrastive Language–Image Pre-training (CLIP)**
- Step 1: Train a model to maximise the similarity scores between image encoding and corresponding text encoding
- Step 2: Given an input in a mode, create encodings for all potential counterparts in the other mode
- Step 3: Find similarity scores between encoding of input with counterparts and select the highest one

**Fuyu**
- Step 1: Create image patches, encode it into linear vectors to become "words"
    - Special mention: Image "newline" character!
- Step 2: Append the image patch vector sequence with text words vectors and feed into the Transformer architecture
- Step 3: Only perform prediction on the output embeddings corresponding to the text

**Aside: V* Vision Search**
Some features might be too insignificant in the larger context to be accurately pinpointed by traditional methods. The V* method might be helpful
- Step 1: Use LLM to identify patches which may contain subject
- Step 2: Use high likelihood patches as inputs for actual query

### Resources
- Dr. Mohit Iyyer's UMass CS685 S24 [Lecture 19](https://www.youtube.com/watch?v=ijqUUZI3osM)
- [An image is worth 16x16 words](https://arxiv.org/abs/2010.11929)
- OpenAI's [CLIP](https://openai.com/research/clip)
- AdeptAI's [Fuyu](https://www.adept.ai/blog/fuyu-8b)

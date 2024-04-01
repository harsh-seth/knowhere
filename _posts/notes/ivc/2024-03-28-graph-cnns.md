---
layout: post
title:  Visual Computing - Graph CNNs
categories: [Intelligent Visual Computing]
tags: [notes]
excerpt: <todo>
---

### In a nutshell

### Key Ideas

### Notes
#### (Dynamic) Graph CNNs
Naive approach
- select node, connect to neighbouring nodes
    - distance can be euclidean, but better to use geodesic
    - is a hyperparameter
- Get a weighted average of neighbouring points
    - with same weight vector, unlike in images

EdgeConv (DGCNN: Layer 1)
- Each edge has a different weight
- `e_A,v^ = ReLU(MLP(x_A, x_v - x_A))`
    - `x_v - x_A`: Local information about the points around it
    - `x_A`: Global information
- Do a max pooling to get `h_A = max e_A,v`

DGCNN: Layer 2
- Repeat L1, but use `h_A` from L1 instead of `x_A`
    - This acts like a feature representation (like edge, color, shape, texture, etc.)


#### Automatic Rigging
- Joints, places where movement happens
- Skin, places which move together along with the underlying 'bone'
    - Artists specify how much "influence" a bone has on a specific point on the skin

RigNet
- A GCNN which determines skeleton (joints + bones) and then the skin
- 1. Network tried to collapse a mesh into itself to create a skeleton (with GMEdgeNet)
- 2. Network then clustered the 'bones' towards each other to create joints
    - Mean-shift clustering

#### Misc
- Point Transformers can be thought of as GCNNs!
    - Query/Key + Attention scores is effectively the feature representation
    - make the k in k-nearest neighbours = all of the points


#### Needs Exploration

### Resources

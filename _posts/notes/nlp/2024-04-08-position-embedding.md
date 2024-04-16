---
layout: post
title:  Position Embeddings and Efficient Attention
categories: [NLP]
tags: [notes]
excerpt: Natural Language stores a great portion of its information in the ordering of it's constituents. Positional Encodings are key to including this information in effectively using the self-attention mechanism
---

### Key Ideas
- Position Encodings give the model a notion of order


### Notes
#### Embedding Format
**Type 1: Absolute Positions**
`q_1 = w_q . (c_1 + p_1)`

**Fixed Format**
- Allows for arbitrary length input sequences, esp. at test time
- Practically, the model does not effectively learn this

**Learned**
- Lets the model figure out the best format to encode this information
- Cannot be used for longer length sequences at test time than that set at train time

**Type 2: Relative Positions**
- Represent every pair of tokens, and measure the relative positions difference between them
- Could be better suited as input sequences might have variations, and text might be prepended/truncated - changing the absolute positions while keeping the relative position difference the same
- Cannot be directly added to input embedding (exception: RoPE). Instead, directly modifies the attention matrix

**ALiBi**
- Decay the `q.k` dot products in the attention calculation by the difference in positions
    - Mask = `[[0, -inf, -inf, -inf], [-1, 0, -inf, -inf], [-2, -1, 0, -inf], [-3, -2, -1, 0]] * m` where `m` is a 'magnitude'/'slope' which is a hyperparameter, and only varies between attention heads
- Enables extrapolation beyond training sequence length
- Position information does not affect `v`

**Rotary Position Embeddings (RoPE)**
- Rotate `q` by angle x. Rotate `k` by angle y. `q.k` will only have have information about the relative position difference encoded, not the absolute position diff
- i.e. `f_q(c_4, 4) = q_4`, `f_k(c_1, 1) = k_1`, `q_4.k_1 = g(c_4, c_1, 4-1)`. Find `f_q, f_k, g`
- `f_q(c_t, t) = R_{theta, t} = [[cos(t*theta) -sin(t*theta)], [sin(t*theta) cos(t*theta)]]` where `theta` is a hyperparameter

#### Optimized Attention Computation Strategies
Attention calculation is a quadratic complexity operation. This can be improved upon by special consideration.

**Flash Attention**
- Rather than storing results of one intermediate operations back into memory and reading them again for the next, create a new operation which does all these steps in one go, saving on wasteful memory I/O operations

**Ring Attention**
- Break the attention computation down into chunks, assign a chunks of the subsequence to its own dedicated GPU
- Forward results to the next GPU, which are all arranged in a grid
- Eventually, after `n` forwards (where `n` is the number of GPUs), every GPU's memory will have the full attention score for its own subsequence

### Resources
- Dr. Mohit Iyyer's UMass CS685 S24 [Lecture 16](https://www.youtube.com/watch?v=cG3PQX64rKE)

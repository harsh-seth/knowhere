---
layout: post
title:  Multi Token Generation
categories: []
tags: [wip, notes]
excerpt: A 'bad' but more likely decision early on will prevent desired and more likely sequences from being generated. Some strategies to address this are discussed
---

### Key Ideas
- At runtime, text generation is sequence of discrete decisions, and a 'bad' but more likely decision early on will prevent desired and more likely sequences from being generated


### Notes
#### Single token generation (Naive)
Steps:
1. Get a prefix
2. Pass to language model
3. Softmax over last token produces distribution over the vocabulary
4. Do some decision on this distribution to select next token
    - e.g. sample, highest probability, etc.

#### Greedy Decoding
- Repeat the naive approach postfix-size # of times or at `<EOS>` token

Cons
- Space of outputs increases exponentially with prefix AND postfix size
- Cannot arrive at phrases which may have a higher probability together, but of which the first few individual tokens might be uncommon/unlikely

#### Beam Search
- Explore several hypotheses by keeping the top `k` sequences after each decoding step
    - `k` ideally  5-10
    - Prune all other lower probability branches
- Stop when all `k` paths have reached `<EOS>` token
- Often, length normalisation on probability calculation is done to prevent unfair advantage for shorter terminated sequences.
- For sequences with minimum length requirements, can set prob of `<EOS>` to 0 if it appears prematurely

- This method will still not guarantee the most probable sequence. A discarded option might have lead to a more probable sequence.
- `k=1` is the same as greedy decoding
- Low `k`s yield incorrect outputs
- High `k`s yield short/generic outputs, plus is expensive to run

### Sampling based Decoding
- Ancestral sampling: Randomly sample next word at every `t` steps
- Top-`n`-sampling: Randomly sample from truncated probability distribution of `n` words
- Nucleus sampling / Top-`p`-sampling: Randomly sample from truncated probability distribution of top-`k` words such that sum of probabilities is below `p`
    - `p = 100` is ancestral sampling
    - `p = 0` is greedy decoding
- Generation ends when `EOS` is sampled or max number of tokens are generated

#### Misc
- Temperature (`t`) is used to flatten or sharpen the peaks in a distribution. Flatter distributions will give tailing entries more likelihood.


### Resources
- Dr. Mohit Iyyer's UMass CS685 S24 [Lecture 13](https://www.youtube.com/watch?v=WoJrlvu7ODI)


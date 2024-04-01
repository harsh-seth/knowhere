---
layout: post
title:  LLM Alignment & RLHF
categories: [NLP]
tags: [notes]
excerpt: <todo>
---

### In a nutshell

### Key Ideas
#### Alignment
- This isn't just limited to morality, but also utility and format of generated text

### Notes
#### LLM Alignment
- Finetuning: A way is to create a large dataset of illegal instructions + valid instructions and desired outputs
  - Not most effective, is not comprehensive enough to prevent 'jailbreak attacks'

#### RLHF
- start with a large pretrained LLM
- Steps
  1. Instruction Tuning (SFT)
  2. 
- Limitations of SFT
  - Trainer always gives postive feedback, never negative feedback for mistakes
  - Multiple correct outputs (esp. creative tasks), but dataset only has one provided response
  - Model does not have enough data to know what it doesn't know. / Had to encourage abstaining when model does not know something
  - 

#### Misc
- Meta's LlaMA-2 (Language) is unaligned! The Chat model has guardrails in place.

### Resources
- [Mohit Iyyer's UMass CS685 S24 Lecture 11](https://www.youtube.com/watch?v=Iw2gHYRF_TA)

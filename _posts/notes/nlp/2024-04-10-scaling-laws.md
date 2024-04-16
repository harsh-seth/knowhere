---
layout: post
title:  Scaling Laws for Large Language Models
categories: [NLP]
tags: [notes]
excerpt: There seems to be an upper cap on LLM performance if compute budget is kept fixed, i.e. capacity of a model. Various studies have found quantified relationships between data size, model size and compute budget which can be used to inform how much resource to use when training an LLM
---

### Key Ideas
- There seems to be an upper cap on LLM performance if compute budget is kept fixed, i.e. capacity of a model
- Increasing either data or model parameters alone is not enough to improve performance
- Various studies have found quantified relationships between data size, model size and compute budget which can be used to inform how much resource to use when training an LLM.

### Notes
#### Training Tradeoffs
Factors informing training are
- Dataset Size (`D` # of training tokens)
- Model Size (`N` # of model parameters)
- Compute Budget (`C = Flops(N, D)`)

To solve: `argmin_{N, D} L(N, D) s.t. FLOPS(N, D) = C` where `L(N, D) = A/(N^alpha) + B/(D^beta) + E`
 
#### Kaplan Scaling Laws
Findings from Kaplan et al., 2020
- Performance depends strongly on scale and weakly on model shape
- Increasing both dataset and model size is key to improved performance. Increasing one while keeping the other fixed leads to diminished returns (assuming uncapped compute)
- Larger models are more sample efficient
- Prioritize increasing model size over data size

Issue
- Same learning rate schedule was used for all training runs, regardless of batch size

#### Chinchilla Scaling Laws
Findings from Hoffman et al., 2022
- Fixed the learning rate schedules
- Diff from Kaplan: Increase the data and model with the same factor
- Based off a fixed compute budget, they found two linear relationships - one for model size and one for dataset size

### Resources
- Dr. Mohit Iyyer's UMass CS685 S24 [Lecture 17](https://www.youtube.com/watch?v=lSBG_JuhbPE)

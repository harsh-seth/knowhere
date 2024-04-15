---
layout: post
title:  Constitutional AI
categories: [NLP]
tags: []
excerpt: A mechanism to use a model's responses and learned behaviours to correct generate socially acceptable responses for problematic queries
---

### Key Ideas
- Sufficiently large models can be used critique and revise unaligned responses to problematic queries, which can then be used to finetune the original model

### Notes
#### Critiques and Revisions
- Steps 
    1. Ask a "problematic" query
    2. Ask the model critique its own/another model's responses
    - e.g. "Critique Request: Identify specific ways the assistant's last response is harmful, ... \n Critique: "
    3. Ask the model to revise the response based on the the critique it provided
        - e.g. "Revision Request:  Please rewrite the assistant response to remove any and all harmful, ... content \n Revision:"
    4. Finetune the unaligned model with the original problematic query and the revised response

#### Misc
- There are specific datasets ([example](https://paperswithcode.com/dataset/redteaming-resistance-benchmark)) which contain "problematic" prompts that AI researchers and LLM developers can use to apply the same process as above

### Resources
- [Constitutional AI](https://arxiv.org/abs/2212.08073)

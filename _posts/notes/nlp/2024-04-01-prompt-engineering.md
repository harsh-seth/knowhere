---
layout: post
title:  Prompt Engineering and Evaluation
categories: [NLP]
tags: [notes]
excerpt: Users of LLMs have found that providing examples and encouraging the LLM to explain its reasoning has lead to more relevant (and often often more accurate) outputs
---

### Key Ideas


### Notes
#### Prompting Techniques
**Zero Shot Prompting**
- Provide no examples along with actual prompt

**Few Shot Prompting**
- Give an example prompt and response
- Give actual prompt after this
- Optional instructions linking demonstration and actual question
- Will not work for non-instruction tuned models

*Cons*
- Might introduce some bias to the model's output
- Number of input tokens are fixed
- Some tasks/prompts may not have associated demonstrations

*How to select the best examples?*
- Cosine similarities to find similar queries

**Retrieval Augmented Prompting**
- Add to the prompt
    - "Be detailed as possible"
    - "Refer to the evidence document"
    - "Quote the evidence document at least twice"
    - "Make use of illustrative examples and/or analogies in your answer"

**Self Feedback**
- Conversation style LLMs. How do they store prior response information at runtime?
    - Models can 'read' past prompts and responses and prepend it to the provided current prompt.
    - The interface separates these with special tokens "system", "agent", "assistant"

**Chain of Thought Prompting**
- "Question: ___. Answer: Let's think step by step"
- Do not give final answer directly. Give the intermediate steps too

#### Misc
- Negative examples (Fundamental negatives): Can find some success, but often difficult for the model to enforce them

#### Needs Exploration
- [Generative Agents: Interactive Simulacra of Human Behavior](https://arxiv.org/abs/2304.03442)

### Resources
- [Blog post on Prompt Engineering](https://lilianweng.github.io/posts/2023-03-15-prompt-engineering/)


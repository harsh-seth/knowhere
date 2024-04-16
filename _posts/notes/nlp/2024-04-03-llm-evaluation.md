---
layout: post
title:  Evaluating LLM-generated text
categories: [NLP]
tags: [notes]
excerpt: As LLM capabilities improve, the sophistication of generative text evaluation methods also needs to increase. We look at some of the most common methods used thus far, both human annotated and automated
---

### Key Ideas
- Human judgement can be learnt by LLMs to serve as replacements for text quality evaluation tasks
- However this runs into problems of generalization and LLM specific bias

### Notes
#### Fixed Scope Task Evaluation - Human Evaluation
Generally indicated by scores based on subjective measures on a 5 point scale
- Adequacy: Is the meaning correct?
- Fluent: Is it easy to read?

Cons
- Subjective!
- Difficult to calibrate
- Expensive and time consuming

#### Fixed Scope Task Evaluation - Automatic Metrics
**Precision, Recall and F-Scores**
- Use the precision (`common words in y_cap and y_pred/y_pred length`), the recall (`common words in y_cap and y_pred/y_cap length`) and F-Score (`precision * recall/((precision + recall)/2)`)

Pros
- Quick, easy and cheap

Cons
- Does not handle synonyms
- Does not handle order
- We may not at always have a reference
- Does not take into account meaning of the constructed sentence

**Bilingual Evaluation Understudy (BLEU)**
- Based off n-gram overlap between y_pred and y_cap
- Computes precision for n-grams of size 1 to 4.
- Has a brevity penalty
- `BLEU = min(1, output-length/ref-length) (PROD_{i, 1:4} precision_i)^1/4
- Allows use of multiple references, and we can match against all refs, so recall will not be very useful
    - Closest reference length is used

Cons
- All words/n-grams are treated equally
- Human translations also score lower than machines
- The score does give any indication, cannot be used comparatively with other test strings

**ROUGE**
- Based off n-gram overlap between y_cap and y_pred
- Computes recall for n-grams of size 1 to 4
- Used for text summarization systems

Cons
- All words/n-grams are treated equally
- Human translations also score lower than machines
- The score does not matter
- Can game the score by just replicating the string n-times

#### Fixed Scope Task Evaluation - Learned Metrics
- Finetune a model directly on scores from human evaluations to perform evaluation

**BLEURT**
- Finetune a pretrained BERT model on synthetic tasks with perturbed data and automatic metrics. Then finetune again with human evaluation metrics.

**COMET**
- SOTA LLM-as-a-judge for similarity scores

#### Open Ended Task Evaluations - Human Evaluations
Challenges when using humans
- Subjective
- Needs experts to evaluate
- Annotators might not do a good job

**Long Eval**
1. Split long form text into atomic claims
2. Get each claim verified for support from the long form text
    - (optional) Send only subset of claims to each individual annotator to reduce workload
3. Calc %age of facts being supported by the text


#### Open Ended Task Evaluations - LLM Evaluations
**GPTEval**
- Create a prefix/context for LLM with instructions on how to evaluate and to give a score
- Aggregate scores w/ probabilities to calculate evaluation

**Win Rate**
- Ask LLM to select one of two outputs and use that as a score
- One of the two outputs should ideally come from the same base model to ensure fair comparison between two models
- Caveat: The selected annotator model might prefer a specific class of model (responses created by OpenAI models may be preferred by OpenAI models)

**Decompose, Eval and Aggregate**
1. Use an LLM to break down a text into claims
2. Verify each claim with an LLM + an evidence source
3. Calculate the retrieval score

### Resources
- Dr. Mohit Iyyer's UMass CS685 S24 [Lecture #15](https://www.youtube.com/watch?v=Um9gf-U0o1Q)
- [Chatbot Arena](chat.lmsys.org)

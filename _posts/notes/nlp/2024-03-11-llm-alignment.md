---
layout: post
title:  LLM Alignment & RLHF
categories: [NLP]
tags: [notes]
excerpt: RLHF is a powerful class of methods which can tweak an LLM's outputs to be more in line with desired preferences by generalizing from a subjective subset of human annotated samples.
---

### In a nutshell
- 3 Step process

1. Instruction Tuning
  - Start with Base Pretrained LM
  - Generate (instruction, input, output) dataset
  - Use instruction tuning to finetune the base LM to get a SFT LM

2. Reward Modeling
  - Start with SFT LM
  - Generate (x, y_1, y_2) and have humans label y_1, y_2 as "better" or "worse"
  - Use the Bradley-Terry loss function to finetune a copy of SFT LM to get a Reward Model

3. RL w/ Policy Grading
  - Start with SFT LM and the Reward Model
  - Use PPO to finetune a copy of SFT LM by maximising expected rewards (rewards determined by the Reward Model) to get a RLHF aligned model
  - Caveat: We don't want the aligned model to deviate too much from the base model (and forget useful things like instructions) so we use a KL Divergence to keep overall changes under check


### Key Ideas
#### Alignment
- This isn't just limited to morality, but also utility and format of generated text

#### Reward Modeling
- No oracle exists to determine what kind of output is more favoured, so a model needs to be used to generalize specific human feedback

#### Policy Grading
- RL can be used to nudge a model to always generate outputs which are highly rated (highly rewarded).

#### Loss function selection in Fine Tuning
- The loss function can be (maybe even should be) different between learning, fine tuning and alignment to allow for specific knowledge or behaviours to be learnt
- The factors deriving value (or determining loss from ideal behaviour) are key factors which should be accounted for in loss fn selection

### Notes
#### LLM Alignment
- Finetuning: A way is to create a large dataset of illegal instructions + valid instructions and desired outputs
  - Not most effective, is not comprehensive enough to prevent 'jailbreak attacks'

#### RLHF
- Why RLHF / Limitations of SFT
  - Trainer always gives postive feedback, never negative feedback for mistakes
  - Multiple correct outputs (esp. creative tasks), but dataset only has one provided response
  - Model does not have enough data to know what it doesn't know. / Hard to encourage abstaining when model does not know something
  - Models do not directly involve human preferences, so SFT may not impart preference information to the LLM
  - With RLHF we can get a flywheel of human queries and human preferences for future fine-tuning

Why not RLHF:
- Expensive to collect human annotations
- Model loses out on creativity

- Detailed Steps
  1. Instruction Tuning (SFT): Start with a large pretrained instruction tuned LLM
  2. Have a human rank a set of sampled results for a query from the LLM
    i. Needs knowledgable rankers and domain experts
  3. Develop a reward model (Bradley - Terry pairwise preference model) with inputs: `{prompt x, output y_i}` and outputs: `{scalar score}`
    i. Learn `r(x, y)`: reward for output `y` given `x`
    ii. Compare pairs of items and calculate  `P(y_W > y_L | x)`
      - `y_W`: preferred by humans (the winner)
      - `y_L`: not preferred by humans (the loser)
      - `P(y_w > y_L | X) = exp(r(x, y_W)) / (exp(r(x, y_W)) + exp(r(x, y_L)))` (Looks like softmax!)
  4. Calculate a Loss function for this reward model! This then nudges the model to prefer `y_W` over `y_L`
    - `Loss = -log(P(y_W > y_L))`
    - Which simplifies to `Loss = -log sigmoid(r(x, y_W) - r(x, y_L))` where `sigmoid(x) = 1/(1+ e^{-x})`
    - i.e. Reward (`R`) of `y_W` needs to be higher than `y_L`
  5. Take the copy of the fine tuned LLM, remove the last linear layers (i.e. we're interested in the token representations from the final layer), then apply a new linear layer of `(num_samples, x) => (num_samples, 1)` on some/all of these encodings to get a score for each `x, y_W` pair. This becomes the `R_pred`, which we can then attempt to make equal to `R_annotated` (from the rewards given by human feedback) via the loss function defined above. This will tweak the model's weights.
  6. Create a pipeline where, `x -> LLM(x) -> [y_1, y_2, y_3, ...] -> Reward Model -> [r_1, r_2, r_3, ...]`!

**Strategies**
- "best-of-n" sampling (rejection sampling)
  - a pipeline where, `x -> LLM(x) -> [y_1, y_2, y_3, ...] -> Reward Model -> [r_1, r_2, r_3, ...] -> argmax_y([r_1, r_2, r_3]) -> y_{max_r}`
  - pros: Simple!
  - cons: Slow/Expensive :(

- Finetune original LM on `y_{max_r}`
  - i.e. maximise `p(y_W | x)`
  - pros: Simple!
  - cons: Not learning from the negative/lower reward options

- Use RL to increase `p(y_W | x)` and decrease `p(y_L | x)` by small amounts
  - pros: Learning from all types of responses
  - cons: ?

- Steps (contd.)
 7. Create a copy of the SFT model to be a policy model - `Pi`. The base SFT model can be referred to as `Pi_ref` and it will be a reference model.
 8. Create a loss function which aims to find the policy that for any given `x` gives the `y` which maximizes expected reward. It should be done without deviating too much from the reference model
  - `loss = max_pi E_{x, y}[r(x,y) - beta * D_KL(pi(y|x) || pi_ref(y|x))]`
  - `D_KL(pi(y|x) || pi_ref(y|x))` (KL Divergence) = log( pi(w_i|w_{1, ..., i-1}, x)/pi_ref(w_i|w_{1, ..., i-1}, x))`
  - In practice, only a subsequence is taken (of length 0, i.e. `p(w_i|x)`)
9. Optimize with the PPO/REINFORCE/any policy grading algorithm


#### Misc
- Meta's LlaMA-2 (Language) is unaligned! The Chat model has guardrails in place.

### Resources
- [Mohit Iyyer's UMass CS685 S24 Lecture 11](https://www.youtube.com/watch?v=Iw2gHYRF_TA)

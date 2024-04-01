---
layout: post
title:  AI - Bathroom cleaning
categories: [Artificial Intelligence]
tags: [notes]
excerpt: <todo>
---

### In a nutshell

### Key Ideas

### Notes
#### Bathroom needs to be cleaned
No one wants to do it.
If someone does it, both get a utility of 1
If no one does it, no one gets a utility
Whoever does it incurs a cost

| |**Y**|**N**|
|**Y**|1-c1, 1-c2|1-c1, 1|
|**N**|1, 1-c2|0,0|

A better example: Someone needs to call the electric company

##### Cost structure
- For player 1
  - 1-c1 is known
  - c1 < 1/2
  - c1 is common knowledge
- For player 2
  - c2 is low with probability < 1/2
  - c2 is high with probability 1-p
    - cost is more than '1' (where 1 is the reward for the task)
  - Exact value of c2 is only known to player 2

##### Intuition
|P1|P2|u1|u2|
-------------
|X|X|+ve|eventually -ve|
|X| |+ve|1|
| |X|1|eventually -ve|
| | |0|0|


##### More rigorous treatment
`u2(s1, N|h) = 1-l >= 0`
`u2(s1, Y|h) = 1-h < 0`

lemma 1: If `c2=h` -> `s2(h)=N`

`u1(s2, Y) = 1-c1 > 1/2`
`u1(s2, N) = p*u1(s2(l), N) + (1-p)*u1(s2(h), N) = p*u1(s2(l), N) <= p*1 = p < 1/2`

lemma 2: In BNE, player 1 plays Y

When P2's type is l, they will still choose N.

#### Topic 1

#### Misc
- It's best to be more vocal about your procrastination / make it seem like you are less likely to do something than you actually would

#### Needs Exploration

### Resources

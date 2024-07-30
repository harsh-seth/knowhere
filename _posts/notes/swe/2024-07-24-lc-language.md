---
layout: post
title:  Preparing for Coding Interviews (A journey) - Programming Language Selection
categories: [blog, leetcoding]
tags: []
excerpt: Documenting the factors that goes into the selection of a programming language to write solutions in
---

{% include about_this_series-lc.html %}

## Selecting a programming language

| Factor | Rationale | Candidates |
|--------|-----------|------------|
| Proficiency in the language | Assessment time should not be spent second-guessing (or worse, debugging) syntax and language features. | Javascript, Python, Java, C++ |
| Relevance of the language | Selected language should ideally be relevant to the desired roles and the work they entail | Javascript, Python, Java, Go, Rust |
| Time constraints of the programming assessment | Languages which allow for more intuitive expression of logic (such as dynamically typed languages and languages with syntactical sugar) save mental bandwidth for actually working on the problem | Javascript, Python |
| Support for useful features | Assessment time shouldn't be spent writing code to reinvent the standard data structures wheel or to figure out abstracted away memory management | C++, Java, Python, Javascript (w/ external modules), Go (w/ external modules)|

Decision:
- When building off known data structures to arrive at solutions, use Python
- When required to implement data structures from scratch, use Javascript
- Only when required to directly manipulate memory, use C++ (or more ideally, Rust)


## Stray Thoughts
- A scripting language really allows for clarity in thought and lets the logic to shine though
    - See my [solution](https://github.com/harsh-seth/code-katas/blob/main/leetcode/1768-merge-strings-alternatively/solution.py) (and the [community solution](https://github.com/harsh-seth/code-katas/blob/main/leetcode/1768-merge-strings-alternatively/community_solution.py)) for LC 1768 for an example
- Switching between Python and Javascript can often cause "crossed wires"
    - Accessing `arr[-1]` yields `undefined` in JS and the last element in Python
    - Accessing `str[len(str)]` yields `undefined` in JS and an error in Python
- C++ and Java really bring with it a lot of syntax which detracts from the logic of the solution!
- However, in the memory manipulation cases, C++ does not have any competition (in the selected 3), allowing for crystal clear expression!

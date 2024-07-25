---
layout: post
title:  Preparing for Coding Interviews (A journey)
categories: [blog]
tags: []
excerpt: Documenting the trials and tribulations (and learnings) on my perpetual quest to hone the (algorithmic) tools of my trade
---

This post documents the learnings, challenges i encountered and the decisions i made on my journey to hone the (algorithmic) tools of my trade. It's partly a tool for me to arrange my thoughts on this, partly a resource for me to revisit every now and then, and partly to serve as a guide for anyone who might find it useful. For any Hiring Managers/TA Partners seeing this, drop me an [email](mailto: harshseth2006@gmail.com) if you like what you see!

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


## Fundamental Data Structures
- Object
- Arrays
- Linked Lists
- Hash Maps
- Stacks
- Queues
- Priority Queues
- Trees
- Graphs
- (Binary) Heaps

> NOTE: It is possible to build all of these data structures from the first two in the list
> - Arrays -> Stacks, Queues
> - Objects -> Linked Lists -> Stacks, Queues
> - Objects, Arrays -> Hash Maps
> - Objects -> Trees, Graphs
> - Trees -> Heap -> Priority Queue

Each data structure should allow for the following operations: `Search`, `Insert`, `Update`, `Delete`, `Sort` (if applicable)


## Initial Thoughts
- A scripting language really allows for clarity in thought and lets the logic to shine though
    - See my [solution](https://github.com/harsh-seth/code-katas/blob/main/leetcode/1768-merge-strings-alternatively/solution.py) (and the [community solution](https://github.com/harsh-seth/code-katas/blob/main/leetcode/1768-merge-strings-alternatively/community_solution.py)) for LC 1768 for an example
- Switching between Python and Javascript can often cause "crossed wires"
    - Accessing `arr[-1]` yields `undefined` in JS and the last element in Python
    - Accessing `str[len(str)]` yields `undefined` in JS and an error in Python

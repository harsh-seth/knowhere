---
layout: post
title:  Preparing for Coding Interviews (A journey) - The Problem Solving Process
categories: [blog, leetcoding]
tags: []
excerpt: Documenting the steps I follow when I think through solutions for a programming problem
---

{% include about_this_series-lc.html %}

## The Typical Process 
- Create a notes document to accompany the question
- Select a language to solve the problem in, and write down the function prototype of the expected solution (to determine expected input and output formats)
- Write tests/asserts which call the function to verify if the solution works (AKA Test driven development)
    - Think of some on your own test cases before copying over the provided ones, and then think of some more after copying
    - Use this as an opportunity to clarify details about the problem from the interviewer
- In the notes document, list down assumptions, approach ideas and observations
    - This helps condense thoughts into atomic, verifiable claims
- For every potential solution, write out it's 'approach' pseudocode, even if it doesn't meet some of the question's limitations (like space or time complexity)
    - This helps develop ideas, and lets you fail fast, along with potentially getting helpful insights from the interviewer


## While Practicing
- All of steps from The Typical Process
- If a solution in a language feels like it can be optimized (either performance or readability), then attempt the same problem in a different language to inform the language selection process for future problems
- If a different (not necessarily better) solution is found after you've submitted your solution, analyse and write it down as an approach too

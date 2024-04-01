---
layout: post
title:  Informed Search and Heuristics 
categories: [AI]
tags: [notes]
excerpt: <todo>
---

### In a nutshell

### Key Ideas
- Exploit additional information about the problem domain itself to find more "promising" nodes
    - Uninformed search only used information from within the problem

- Evaluation Function `f(n)`
    - gives a utility value of a node
    - need not be linked to the ease of reaching a goal state

- Best First Searches
    - Implemented by means of a Priority Queue, in non-decreasing values of `f`

- Admissible Heuristics: Never overestimates cost to reach the goal node.
    - `h(n) in [0, h*(n)], for every n` where `h*(n)` is the true path cost

### Notes
#### Greedy Best-first Search
- `f(n) = h(n)`, where `h(n)` is a heuristic function, and it estimates the cheapest path from node till a goal
- "Expand the node that **appears** to be closest to goal"

|property|value|
|--------|-----|
|Complete?|Yes (if b is finite)|
|Optimal|No|
|Time|`O(b^m)`, but can be reduced by a good heuristic|
|Space|Max size is `O(b^m)`|

##### Cons
- Does not encode information about how far we had to **actually** travel to reach the goal
- Does not take into account actual distances


#### Heuristics
- Heuristics are an estimate of the cost till the goal node


#### A* Search
- `f(n) = g(n) + h(n)`, where `g(n)` is the actual cost to reach n from start node (via selected nodes so far) and `h(n)` is the estimated cost of the cheapest path from n to goal
- "Avoid expanding paths which are already expensive"
    - Sum of subpaths traveled till now might have been cheaper than the proposed option

**Theorem**: If `h(n)` is admissible, then A* using Tree-Search is optimal

*Proof*: 
- Argument: Intermediary nodes on the optimal path will be checked first before the suboptimal goal
- Specification: Tree-Search is required, cause Admissibility is a weak condition, and the algorithm may have to revisit nodes to find the optimal path.

**Theorem**: If `h(n)` is consistent, then A* using Graph-Search is optimal

*Proof*:  *todo*


#### Misc
- Uninformed search can have low space constraints, even if it has exponential time constraints
- Heuristics point to the closest goal
- Tree Search: Every node will be added to the frontier, regardless of whether it's been **explored** yet
- Graph Search: Only unexplored nodes will be added to the frontier.

### Resources

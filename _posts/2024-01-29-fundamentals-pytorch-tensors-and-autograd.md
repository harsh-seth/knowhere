---
layout: post
title:  Fundamentals - PyTorch (Tensors and Autograd)
categories: [Concept, Deep Learning, Code]
excerpt: An exploration of some of the most important features of PyTorch which make it such a valuable tool to create neural networks and perform deep learning operations
---

PyTorch is a deceptively simple library used to build and operate some of the most complex logical structures humans have ever built to date. With its [Python First](https://pytorch.org/docs/stable/community/design.html#principle-3-python-first-with-best-in-class-language-interoperability) approach and familiar API (if you're comfortable working with NumPy, you will feel right at home using PyTorch), it provides an accessible and performant way to create neural networks and perform machine learning operations while keeping the code interoperable across environments, infrastructures and frameworks.

## Fundamental Ideas

### Tensors
A tensor can effectively be described as an N-dimension data container. A scalar is a 0 rank tensor, a vector is a 1 rank tensor, a matrix is a 2 rank tensor.

PyTorch tensors are very pythonic in their implementation and allow all sorts of standard Python operations to be performed

```python
import torch

x = torch.Tensor([1, 2, 3, 4])
x.shape # torch.Size([4])

y = torch.Tensor([[1, 2], [3, 4]])
y.shape # torch.Size([2, 2])
y[0] # tensor([1., 2.])
y[:, 0] # tensor([1., 3.])
y[0, 0] # tensor(1.)
y[1][1] # tensor(4.)

z = torch.randn(size=(2, 3))
z # tensor([[0.56, 0.99, 0.47], [1.84, -0.08, 2.55]])

y*4 # tensor([[4, 8], [12, 16]])
```

#### Broadcasting
A powerful feature in PyTorch is broadcasting, which allows operations to be performed between tensors of different shapes, without the use of explict loops in code or implicit data copies. This makes them significantly memory and computation efficient, especially when working with large datasets

```python
import torch

a = torch.tensor([1, 2, 3, 4])
b = torch.tensor([3])
a + b # tensor([4, 5, 6, 7])

c = torch.tensor([[1, 2], [3, 4]])
d = torch.tensor([2, 4])
c * d # tensor([[2, 8], [6, 16]])
c / b # tensor([[0.33, 0.66], [1., 1.33]])

e = torch.tensor([[3], [2]])
c * e # tensor([3, 6], [6, 8])
```

**Rules of Broadcasting**
Tensor broadcasting follows a [set of simple rules](https://pytorch.org/tutorials/beginner/introyt/tensors_deeper_tutorial.html#in-brief-tensor-broadcasting) which can be summarized as the following (reproduced from source above)
1. Each tensor must have at least one dimension
2. When comparing the dimension sizes of the two tensors, going from last to first,
    a. Each dimenson must be equal, OR
    b. One of the dimensions must be of size, 1 OR 
    c. The dimension does not exist in one of the tensors


#### GPU Operations
Neural networks often deal with datasets too large to process on CPUs alone, with each training cycle (epoch) potentially hours or even days. GPUs, with their specialized architectures, are significantly better at performing parallel operations, speeding up tensor operations considerably.

However, given that the CPU and GPU are two separate entities (logically and physically), data would need to be present on the GPU (or more specifically, the GPU's RAM) for it to be able to run operations on the data.

PyTorch provides simple mechanisms to do just this

```python
import torch

gpu = torch.device('cuda') # this assumes that your setup has a GPU and is CUDA ready

# method 1: pass the device argument at creation (no copy required)
x = torch.tensor([1, 2], device=gpu)
x.device # device(type='cuda', index=0)

# method 2: use the `to` function to copy a tensor to a target device
y = torch.tensor([1, 2])
y.device # device(type='cpu')
y = y.to(gpu)
y.device # device(type='cuda')
```

### The Autograd System

How neural networks learn, the magic of it all, lies in the backpropagation mechanism, where based on the performance of the forward step (determined by the output of the selected cost function), the weights of each node in the network are tweaked such that the cost function might result in a lower value in the subsequent iterations. How much to tweak the weights often requires calculating differentials of functions involved in determining the cost

To calculate differentials, PyTorch uses a graph based autograd system, which keeps track of operations performed with variables created from scalars and were marked as `requires_grad` (also known as leaf tensor) or with the resultants of prior such operations. After all desired operations have concluded, the leaf variables will store the gradient of the operation when partially differentiated with respect to that variable.

i.e. 
```python
import torch

w = torch.tensor([1., 2.], requires_grad=True)
x = w ** 2
y = x * 2
z = y.sum()

w # tensor([1., 2.], requires_grad=True)
x # tensor([1., 4.], grad_fn=<PowBackward0>)
y # tensor([2., 8.], grad_fn=<MulBackward0>)
z # tensor(10., grad_fn=<SumBackward0>)

w.grad # None
z.backward()
w.grad # contains dz/dw = d(2(w^2))/dw = 4w i.e. [4., 8.]
```

There are a couple things to note in the example above
- `w` was created using floating point values. PyTorch (understandably) only allows variables of floating point or complex datatypes to be able to require gradients
- Every subsequent variable has a `grad_fn` attribute which helps PyTorch keep track of the operation which led to its assignment
  - This isn't the only mechanism PyTorch relies on though
- The `backward()` call specifies which variable (essentially 
a function) to differentiate. Gradients will not be calculated until a `backward()` call happens.
  - An important detail of the autograd system is that `backward` **cannot** be called on non-scalars.


#### Evaluation Mode and No Grad
When `backward` is called on a variable, gradients are calculated for all leaf tensors which have `requires_grad`. But there are some dynamic situations (such as model evaluation or transfer learning) when we may not wish to calculate gradients for all such variables. This helps preserve precalculated values (such as pretrained weights) and reduces the computation and memory load

To preserve precalculated weights of `model`s (and get other evaluation time behaviours), the model needs to be put into evaluation mode. This can be done calling `model.eval()` before performing evaluation on it. This freezes the layers of the model, makes dropout layers deterministic and other behaviours which are essential to protect the trained model from being contaminated by evaluation data. When ready to train the model again, simply calling `model.train()` primes it for weight updates and probablistic behaviours.

As for the memory savings, it can be achieved in two ways
1. Unset `requires_grad` to `False` for all variables you don't need a gradient for
```python
import torch

x = torch.tensor([1., 2., 3.], requires_grad=True)
x.requires_grad = False
y = (x**2).sum()
y # tensor(14.)
y.requires_grad # False

x.requires_grad = True
y = (x**2).sum()
y.requires_grad # True
```

2. Use PyTorch's no_grad
```python

x = torch.tensor([1., 2., 3.], requires_grad=True)

with torch.no_grad():
    y = (x**2).sum()

y # tensor(14.)
y.requires_grad # False

y = (x**2).sum()
y.requires_grad # True
```

Both `model.eval()` and `torch.no_grad()` are recommended to when performing evaluation runs, which may modify the model weights and may incur large memory and performance costs otherwise.

#### Gradient Accumulation
PyTorch accumulates gradients in `grad` between subsequent `backward()` calls. It does so to allow developers and researchers to perform mini batch training and other techniques where fine control over error accumulation is required.

```python
import torch

x = torch.tensor([1., 2., 3.], requires_grad=True)

y = (x**2).sum()
y.backward()
x.grad # tensor([2., 4., 6.])

y = (x**2).sum()
y.backward()
x.grad # tensor([4., 8., 12.]) !! This is incorrect !!
```

As a consequence of this behaviour, we will need to explictly clear out gradients between weight updates (often implemented as `optimizer.step()`) to be able to effectively reduce the cost function

```python
import torch

x = torch.tensor([1., 2., 3.], requires_grad=True)

y = (x**2).sum() # AKA loss calculation
y.backward()
x.grad # tensor([2., 4., 6.])
# weight update comes here AKA optimizer.step()

x.grad = None # AKA optimizer.zero_grad()

y = (x**2).sum() # AKA loss calculation
y.backward()
x.grad # tensor([2., 4., 6.])
# weight update comes here AKA optimizer.step()
```

When using an `optimizer`, the gradient clear can be done by calling `optimizer.zero_grad()`

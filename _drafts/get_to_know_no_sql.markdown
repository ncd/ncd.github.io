---
layout: post
title:  "Get to known to NoSQL"
description: >-
  Something that you need to aware of for your future Javascript interview sessions
date:   2020-07-10 21:11:40 +0700
categories: Database Knowledge
---
## Introduction

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;I have to admit that I'm not a pure Javascript developer. My mostly use programming language is C++. I didn't use Javascript frequently and continously enough to be able to own the language.  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This post is just a combination of my knowledge/experience and collected information about JS from internet. I will try to list out all the key concepts that a Javascript developer needs to understand in order to pass a interview session.  
**Please note that the post can be quite long to read**

## Concepts

### Data types
&nbsp;&nbsp;&nbsp;First we need to know that JS is **dynamically typed** and **weakly typed** language.  
&nbsp;&nbsp;&nbsp;**Statically typed** means *type is enforced*, variables must be declared with a type. Example: Java, C++...
&nbsp;&nbsp;&nbsp;**Dynamically typed** languages *infer variable type at runtimes*, means that at run time compiler/intepreter see variable's value then decide what type it is.  
&nbsp;&nbsp;&nbsp;**Weakly typed** languages *allow types to be inferred as another type*. Example, in JS `1 + '2' = '12'`, because a number can't be added to a string, JS coerces `1` into `'1'` then do the string concatenation.

&nbsp;&nbsp;&nbsp;JS **primitive types** are:
- **boolean**: `0, -0, null, false, NaN, undefined, ""` are `false`, otherwise are `true`. *Note* that there's a `Boolean` object type (not primitive `boolean` type)
  ```javascript
  var x = new Boolean(false);
  if (x) {
    // this code is executed
  }
  ``` 
- **undefined** means declared but hasn't been given a value
- **number** `NaN` has type `number` although it can't compare with any number including itself.
- **string**
- **symbol**
- Everything else is in **object** type
  - **null**: special value, type *object*, means no value, different with `undefined`

#### Questions
- Can we use `typeof bar === "object"` to check if `bar` is object --> No since null is also in `object` type.
- `null == undefined` and `null === undefined` -> `true` and `false`, since they're both false value, but different data type.
- Value of `typeof NaN === "number"` --> true
- Check a `value` is `NaN`, this is a tricky question since `value === NaN` will always return false :D. Use `Number.isNan(value)` or `value !== value` instead.

### Operator
- **Unary Operator**
  ```js
  console.log(1 +  +"2" + "2"); // 32
  console.log(1 +  -"1" + "2"); // 02
  console.log(+"1" +  "1" + "2"); //112
  ```
- **Operator +-**
  ```js
  console.log( "A" - "B" + "2"); //NaN2
  console.log( "A" - "B" + 2); //NaN
  ```
- **Operator ||** Left hand of the operator is evaluate first, if it's evaluated `true` then it doesn't need to evaluate right hand. Return the last value, not the `boolean` result.
   ```js
   console.log(2 || null) // 2
   console.log("" || "x") // x
   console.log("" || 0) // 0
   ```
- **Operator &&** Left hand of operator will be evaluate first, if it's evaluated `false` then it doesn't need to evaluate right hand value. Return the last value, not the `boolean` result
  ```js
  console.log(2 && null) // null
  console.log("" && "x") // ""
  console.log("" && 0)   // ""
  ```

### Declaration & Hoisting
&nbsp;&nbsp;&nbsp;We declare a variable by using `var, let, const` or only assign a value.

### Prototype

### Class (ES6)
### IIFS (Immediately Invoke Function Expression)
### Scope
### Closure
### Generator
### Module Pattern
### Currying
### Memoization
### Event Queue
### Apply, call and bind
### Asynchronous
#### Event Loop
#### Synchronous and Asynchronous Paradigm
### Babel async, await
### Callback Function
### Promise


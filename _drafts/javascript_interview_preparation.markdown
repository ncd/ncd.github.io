---
layout: post
title:  "Preparation for a Javascript Inteview"
description: >-
  Something that you need to aware of for your future Javascript interview sessions
date:   2020-07-10 21:11:40 +0700
categories: Javascript Languages Knowledge
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
- **number** 
  - `NaN` has type `number` although it can't compare with any number including itself.
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
- **Unary Operator +-**
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

### Prototype
&nbsp;&nbsp;&nbsp;Let's take a look at the example below:

  ```js
    function Bike(model,color){
      this.model = model,
      this.color = color,
      this.getDetails = function(){
        return this.model+' bike is '+this.color;
      }
    }
    var bikeObj1 = new Bike('BMW','BLACK');
    var bikeObj2 = new Bike('BMW','WHITE');
    console.log(bikeObj1.getDetails()); //output: BMW bike is BLACK
    console.log(bikeObj2.getDetails()); //output: BMW bike is WHITE
  ```
&nbsp;&nbsp;&nbsp;In JS, every object have there own methods and properties, so these 2 objects have 2 instances of `getDetails` although they're doing the same thing --> It doesn't make sense. Instead of using instance copy, we can use `prototype` property instead.
#### Prototype property
&nbsp;&nbsp;&nbsp;Prototype is an `object` that is associated with all functions and objects by default. Function's prototyp property is accessible and modifiable object's prototype property (aka attribute) is not visible.
&nbsp;&nbsp;&nbsp;When an object is created, JS adds a `__proto__` property to that object, that property will points to the `prototype object` of the constructor function. Let replace function `getDetails` above by this:
  ```js
  Bike.prototype.getDetails = function(){
    return this.model + " bike is " + this.color;
  }
  ```
&nbsp;&nbsp;&nbsp;The behavior is the same but in `bikeObj1` and `bikeObj2` the `__proto__` property is just the pointer to `getDetails` function. You can check by using 
  ```js
  console.log(bikeObj1.__proto__ === Bike.prototype );
  ```
&nbsp;&nbsp;&nbsp;Please note that prototype is just an `object`, it's not a `type`. For more information please take a look at `Class` session below.
#### Questions

### Class (ES6)
&nbsp;&nbsp;&nbsp;Class is introduced in JS6, is just an syntactical improvement of JS prototype-based. It try to hide the `prototype` syntax.
Let's look at the example below for you information
  ```js
  function Proto() {
    this.name = 'Proto'
    return this;
  }
  Proto.prototype.getName = function() {
    return this.name
  }
  class MyClass extends Proto {
    constructor() {
      super()
      this.name = 'MyClass'
    }
  }
  const instance = new MyClass()
  console.log(instance.getName()) // MyClass
  Proto.prototype.getName = function() {    return 'Overridden in Proto' }
  console.log(instance.getName()) // Overridden in Proto
  MyClass.prototype.getName = function() { return 'Overridden in MyClass' } 
  console.log(instance.getName()) // Overridden in MyClass
  instance.getName = function() { return  'Overridden in instance' }
  console.log(instance.getName()) // Overridden in instance
  ``` 

### IIFS (Immediately Invoke Function Expression)
> IIFS: Function that invoke immediatly after it is defined.

&nbsp;&nbsp;&nbsp;Syntax:
  ```js
  (function(){
    // logic
  })()
  ```
Main reasons for using IIFS is for data privacy, because JS `var` scopes variables can not be acccessed by the outside world. 
### Scope
> Scope is the accessibility of variables, functions, and objects in some particular part of your code during runtime. In other words, scope determines the visibility of variables and other resources in areas of your code.
&nbsp;&nbsp;&nbsp;There are 2 level scopes:
- Global Scope: declared in top level or declared without `var, let....`
- Local Scope
&nbsp;&nbsp;&nbsp;Let's check:
  ```js
  var greeting = "Hello"
  (function(){
    var greeting1 = "Good morning"
    greeting2 = greeting1
    console.log(greeting) // Hello
    console.log(greeting1) // Good morning
    console.log(greeting2) // Good morning
  }()
  console.log(greeting) //Hello
  console.log(greeting1) // Exception
  console.log(greeting2) // Good morning
  ```
&nbsp;&nbsp;&nbsp;Please note that the statement below:
  ```js
  var a = b = 3
  ```
&nbsp;&nbsp;&nbsp;Will be converted to this:
  ```js
  b = 3
  var a = b
  ```
&nbsp;&nbsp;&nbsp;With that declaration, `b` will be in global scope. To avoid this, we can use `strict mode` in JS.

### Declaration & Hoisting
&nbsp;&nbsp;&nbsp;

### Closure
> A closure is the combination of a function and the lexical environment within which that function was declared.
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
### Event propagation


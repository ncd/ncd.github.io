---
layout: post
title:  "Kubernetes Deployment Strategies"
description: >-
  Kubernetes Deployment Strategies
date:   2020-07-07 17:11:40 +0700
categories: Knowledge Kubernetes Management
---

## Introduction

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;To be able to deploy new applications to production environment, we can list out several approaches. Each of them will have their own pros and cons as well as specific usecases. Choosing the right strategy is an important decision. This document we will go through each of the popular deployments strategies.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Common deployment strategies includes:
- **Recreate** strategy: Version A is terminated then version B will be rolled out.
- **Rolling Update** strategy: Version B is slowly rolled out and replacing version A.
- **Blue/Green** strategy: Version B is released along side with version A, then the traffic is switched to version B.
- **Canary** strategy: Version B is released to a subset of users, then proceed to a full rollout.
- **A/B Testing** strategy: Version B is released to a subset of users under specific condition.
- **Shadow** strategy: Version B receives real-world traffic alongside version A and doesn't impact the response.

## Strategies walk through
### Recreate
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Recreate strategy is a dummy strategy, it consists of shutting down version A then deploying version B after A is turned off. This will create downtime of the service and the duration is depend on shutdown and boot up duration of services. This is rarely used in real product.

![Recreate]({{ site.url }}/assets/images/recreate.gif)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Pros:
- Easy to setup
- Application state is entirely renewed

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Cons:
- High impact on the user, expect downtime that depends on both shutdown and bootstrap duration

### Rolling Update
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The **Rolling Update** strategy consists of slowly rolling out a version of an application by replacing instances on after the other until all the instances are rolled out. Process: with a pool of version a behind a load balancer, one instance of version B is deployed. When the service is ready to accept traffic, the instance is added to the pool. Then, one instance of version A is removed from the pool and shut down.

![Rolling Update]({{ site.url }}/assets/images/rolling.gif)

Pros:
- Easy to set up.
- Version is slowly released across instances.
- Convenient for stateful applications that can handle rebalancing of the data.

Cons:
- Rollout/rollback can take time.
- Supporting multiple APIs is hard.
- No control over traffic.

NOTE: Depending on the management tools, we can modify the following settings to improve deploy/rollback time
- Parallelism and max batch size
- Max surge
- Max unavailable

### Blue/Green
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Version B is deployed along side with version A with exactly the same amount of instance. After verify that the new version meets all the testing criterias the traffic is switched from version A to verion B by the load balancer.

![Blue Green]({{ site.url}}/assets/images/blue-green.gif)

Pros:
- Instant rollout/rollback.
- Avoid versioning issue, the entire application state is changed in one go.

Cons:
- Expensive as it requires double the resources.
- Proper test of the entire platform should be done before releasing to production.
- Handling stateful applications can be hard.

### Canary
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Canary** deployment consists of gradually shifting production traffic from version A to version B. Usually the traffic is split based on weight. For example, 90% of requests go to A, 10% of requests go to B.
This approach is mostly used when the tests are lacking or not reliable.

![Canary]({{ site.url}}/assets/images/canary.gif)

Pros:
- Version released for a subset of users.
- Convenient for error rate and performance monitoring.
- Fast rollback.

Cons:
- Slow rollout.

### A/B Testing
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**A/B Testing** strategy consists of routing a subset of users to the new version under specific conditions. This is mostly used as a technique for evaluating new business decisions by statistics rather than a rolling strategy.
Conditions that can be used for defining traffic routing:
- Browser cookie
- Query parameters
- Geographical info
- Technology support: browser version, screensize...
- Language
- ...

![A/B Testing]({{ site.url}}/assets/images/a-b-testing.gif)

Pros:
- Several versions run in parallel.
- Full control over the traffic distribution.

Cons:
- Requires intelligent load balancer.
- Hard to troubleshoot errors for a given session, distributed tracing becomes mandatory.

### Shadow
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Shadow** strategy consists of releasing version B along side with version A, fork version A's incoming requests and send them to version B as well without impacting production traffic. This approach is partically useful when testing production load on a new feature. A rollout of the application is triggered when stability and performance meet the requirements.

![Shadow]({{ site.url}}/assets/images/shadow.gif)

Pros:
- Performance testing of the application with production traffic.
- No impact on the user.
- No rollout until the stability and performance of the application meet the requirements.

Cons:
- Expensive as it requires double the resources.
- Not a true user test and can be misleading.
- Complex to setup.
- Requires mocking service for certain cases.

## Summary

![Summary]({{ site.url}}/assets/images/deployment_strategies.png)
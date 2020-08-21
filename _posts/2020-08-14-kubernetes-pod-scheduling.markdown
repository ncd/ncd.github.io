---
layout: post
title:  "Kubernetes Pod Scheduling"
description: >-
  Kubernetes Scheduling
date:   2020-07-07 17:11:40 +0700
categories: Knowledge Kubernetes Management
---
## Introduction
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Although Kubernetes is a great tools to help us managing workloads and services in our backend system. User still need to configure it wisely to be able to optimize the resource usage and reduce cost. In this document I'll explain how Kubernetes Scheduler works in order to assign a Pod in to an appropriate Cluster Node.

## Kubernetes Scheduler
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Kubernetes have a default kube-scheduler to select optimal nodes for pods to run on. Kube-scheduler will continuously checking the API Server and start running scheduling whenever there are any newly created Pods or unscheduled Pods appear.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;As every Pods have different resource requirements, and each of its containers will have specific resource requirements also. Therefore, scheduler will have to filter among its available node to find the one that fix with scheduling requirements.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Until at least one `feasible node` is available, the pod will remain unscheduled.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Among the list of `feasible nodes`, schduler will choose the highest score one, we'll explain how they score nodes below. Scheduler will then notify API server about its decision, API Server will do the rest of the job to assign Pod to the selected one.

## Pod Scheduling

![Pod scheduling](https://miro.medium.com/max/3604/1*kz4a1XCogEX7PiGIqV-0ug.png)

### Scheduling cycle
Node selection have **2** steps:
- **Filtering**: using predicates, below are current predicated that are using in Kubernetes
  - PodFitsHostPorts
  - PodFitsHost
  - PodFitsResources
  - PodMatchNodeSelector
  - NoVolumeZoneConflict
  - NoDiskConflict
  - MaxCSIVolumeCount
  - CheckNodeMemoryPressure
  - CheckNodePIDPressure
  - CheckNodeDiskPressure
  - CheckNodeCondition
  - PodToleratesNodeTaints
  - CheckVolumeBinding
  
  Generally, the filter contains 3 main steps:
  - *Volume filter*  
  ![Volume filter](https://storage.googleapis.com/cdn.thenewstack.io/media/2018/04/26cd25f0-kublr2.png)
  - *Resource filter*  
  ![Resource filter](https://storage.googleapis.com/cdn.thenewstack.io/media/2018/04/1332bea8-kublr3.png)
  - *Affinity selector*  
  ![Affinity selector](https://storage.googleapis.com/cdn.thenewstack.io/media/2018/04/cd2295f8-kublr4.png)

- **Scoring** using priorities 
  - SelectorSpreadPriority
  - InterPodAffinityPriority
  - LeastRequestedPriority
  - MostRequestedPriority
  - RequestedToCapacityRatioPriority
  - BalancedResourceAllocation
  - NodePreferAvoidPodsPriority
  - NodeAffinityPriority
  - TaintTolerationPriority
  - ImageLocalityPriority
  - ServiceSpreadingPriority
  - EqualPriority
  - EvenPodsSpreadPriority

### Kube-scheduler config file
```json
{
"kind" : "Policy",
"apiVersion" : "v1",
"predicates" : [
	{"name" : "PodFitsHostPorts"},
	{"name" : "PodFitsResources"},
	{"name" : "NoDiskConflict"},
	{"name" : "NoVolumeZoneConflict"},
	{"name" : "MatchNodeSelector"},
	{"name" : "HostName"}
	],
"priorities" : [
	{"name" : "LeastRequestedPriority", "weight" : 1},
	{"name" : "BalancedResourceAllocation", "weight" : 1},
	{"name" : "ServiceSpreadingPriority", "weight" : 1},
	{"name" : "EqualPriority", "weight" : 1}
	],
"hardPodAffinitySymmetricWeight" : 10,
"alwaysCheckAllPredicates" : false
}
```

### User define node selection
- **NodeSelector**
  - Built-in labels
  ```
  - kubernetes.io/hostname
  - failure-domain.beta.kubernetes.io/zone
  - failure-domain.beta.kubernetes.io/region
  - topology.kubernetes.io/zone
  - topology.kubernetes.io/region
  - beta.kubernetes.io/instance-type
  - node.kubernetes.io/instance-type
  - kubernetes.io/os
  - kubernetes.io/arch
  ```
- **Node affinity/anti-affinity** expansion of `nodeSelector`
  - Rule matching, logical AND operator
  - Soft/Preference rule
  - Constrain against other pods in node --> control co-located pod

  ```yaml
  affinity:
    nodeAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
        nodeSelectorTerms:
        - matchExpressions:
          - key: kubernetes.io/e2e-az-name
            operator: In
            values:
            - e2e-az1
            - e2e-az2
      preferredDuringSchedulingIgnoredDuringExecution:
      - weight: 1
        preference:
          matchExpressions:
          - key: another-node-label-key
            operator: In
            values:
            - another-node-label-value
  ```
- **Inter-pod affinity/anti-affinity**
  ```yaml
  affinity:
    podAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
      - labelSelector:
          matchExpressions:
          - key: security
            operator: In
            values:
            - S1
        topologyKey: failure-domain.beta.kubernetes.io/zone
    podAntiAffinity:
      preferredDuringSchedulingIgnoredDuringExecution:
      - weight: 100
        podAffinityTerm:
          labelSelector:
            matchExpressions:
            - key: security
              operator: In
              values:
              - S2
          topologyKey: failure-domain.beta.kubernetes.io/zone
  ```
- **Taint and toleration**
  - Taint use in node to repel a set of Pods
    - Format: `<taintKey>=<taintValue>:<taintEffect>`
    - Effect: `NoSchedule`, `PreferNoSchedule`, `NoExecute`
  - Toleration use in pod to schedule on Node with matching taints
  
  Add taint
  ```
  kubectl taint nodes node1 key=value:NoSchedule
  ```
  
  Remove taint
  ```
  kubectl taint nodes node1 key:NoSchedule-
  ```

  Toleration configuration
  ```yaml
  tolerations:
  - key: "key"
    operator: "Equal"
    value: "value"
    effect: "NoSchedule"
  ```

## How to optimize the resource usage
- Resource request and resource limit
  ```yaml
    ...
    resources:
    limits:
        memory: 200Mi
    requests:
        memory: 100Mi
    ...
  ```

  ```sh
    kubectl top pod memory-demo --namespace=mem-example
  ```
  ```
  NAME                        CPU(cores)   MEMORY(bytes)
  memory-demo                 <something>  162856960
  ```

  You can see that kube-scheduler will assign a pod with memory > request but never > limits

  - If memory usage > memory request: The pod will keep running, if the node reach its resource limitation --> it will start the eviction process --> kill pods to reclaim their resource --> other pods in this node might get kills instead of your pod --> Pod Evicted
  - If usage > limit: Your pod will be killed
  Hint:
  - Resource request should be the highest resource usage that your pod can get, or there is very small times your pod exceed that value
  - Configure limit and request not so far to avoid wasting resource allocation
  - Keep the resource usage to be stable, avoid peek time --> saving money

- Choosing the most appropriate resource by node-affinity
  - Behind the scene each node is a instance in your cloud (EC2 in AWS, VirtualMachine in GCP ...), each instance have their type and desired usage (some have large CPU, some have large memory...)
  - Map pod to correct instance type  
  ```yaml
  - weight: 20
    preference:
      - matchExpressions:
        - key: beta.kubernetes.io/instance-type
          operator: In
          values:
            - c5.large
            - c5.xlarge
            - c5.2xlarge
  ```
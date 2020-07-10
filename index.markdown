---
layout: default
title: About me 
---

<div style="text-align: center">
<span style="font-weight: bold; font-size: 20px">Nguyen Cat Dinh</span><br/>
<span style="font-weight: bold; font-style: italic"> Master of Engineering </span><br/> 
<span style="font-weight: bold">Solution Architect at Fossil Inc.</span>
</div>

---

## About me
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Got my ***Master's Degree*** in Computer Science from the University Of Technology in 2013.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;***+10 years of experience*** in Software development.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;***Wide range of in charge***
- From Developer to DevOps, Data Engineer, Solution Architect
- From Desktop to Mobile and Cloud development
- From Television to Test Framework, E-Commerce, Wearable

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;***Product mindset***
- Do whatever it takes to make product success
- Willing to learn new technologies as long as it makes the product better
- Contribute ideas for improvement no matter what role you're at

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;***Product visioning***

- As a Solution Architect I worked closely with the Product Team to keep track of product roadmap. Any architecture decision making needs to comfort with future growth.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;***International exposure***

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;***Pragmatic programmer***

## Technical skills
- **SCM:** Git
- **IDE/Editor:** VS Code
- **Languages:** C++, Python, Shellscript, Golang, Javascript, SQL
- **Devops:** Terraform, Helm, Flux, Jenkins, Kubernetes, kops, Docker
- **Data:** Big Query, Airflow, Redshift, Kafka, Redash, Data Studio
- **Cloud service:** AWS, GCP, Firebase
- **Project/document management:** Jira, Trello, Confluence
- **Monitoring:** Prometheus, Grafana, Alert Manager, Jeager, Sentry
- **Misc:** redis, draw.io

---

## Posts

{% for post in site.posts %}
{% if post.title != null %}
[{{ post.title }}]({{ site.url }}{{ post.url }})   
{%- endif -%}
{%- endfor -%}
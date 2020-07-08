---
layout: default
title: category
---
{% for post in site.posts %}
{% if post.title != null %}
# {{ post.title }} 
{: .{{ post.categories | join: " ." }} .content}
{{ post.description }}
{: .{{ post.categories | join: " ." }} .content}
[Click for more detail]({{ site.url }}{{ post.url }})
{: .{{ post.categories | join: " ." }} .content}
---
{: .{{ post.categories | join: " ."}} .content}
{% endif %}
{% endfor %}

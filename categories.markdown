---
layout: default
title: category
---
{% for post in site.posts %}
{% if post.title != null %}
{% assign class = post.categories | join: " " %}
<div class="{{ class }} content" markdown="1">

## [{{ post.title }}]({{ site.url }}{{ post.url }})

<span style="font-weight: bold">Categories: </span> {%- for category in post.categories -%}
[{{ category }}]({{ site.url }}/categories?category={{ category }}) 
{% endfor %}

{{ post.description }}

---

</div>
{% endif %}
{% endfor %}

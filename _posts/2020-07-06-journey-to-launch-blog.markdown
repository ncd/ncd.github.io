---
layout: post
title: "My first ever blog"
description: >-
  My story about creating my first ever blog
date: 2020-07-06 22:48:40 +0700
categories: story 
---

## Context
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;I've been an IT engineer for more than 10 years. During that time, many things happened: I changed job, changed position, met smart people, learned new languages, forgot technologies that I've learned but haven't had time using them...

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;When I was young, my memory was very good, I can remember many things, I can gain new knowledge very fast, I could easily give up many things without a doubt because I knew that I could get them back easily later.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;But now I'm getting older, I realized that things that come to me will go away if I don't try to keep them. Everything that went through my life is valuable. I decided to start keeping as many things as possible, and I start blogging :).

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;P/s: Another reason is that I want my profile to look more impressive.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;In this very first blog post, I will tell you how did I create my very first blog. 

## Github Page

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;I decided to use Github Page as my blog because of the following reasons:
- I don't want to do management stuff: DNS, web hosting...
- I want to make it easy: Github Page only require me to learn Markdown, Jekyll. I knew Markdown, and Jekyll's document is simple
- Last but not least, I saw several friends used Github Page, and I was lazy finding alternatives. 
- *Note*, if you want your blog to be cool, a bit HTML, CSS, Javasccript knowledge will be perfect.

## Set up Github Page using Jekyll

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*First,* set up the environment. It's very simple, go to [this link](https://jekyllrb.com/docs/installation/) and follow exactly what they sad.  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;After finish your first blog will look like:

![First page]({{ site.url}}/assets/images/jekyll_set_up_1.png)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*Next,* update theme for the blog, I chose [leaf-day](https://github.com/pages-themes/leap-day) theme. ([Demo](https://pages-themes.github.io/leap-day/))

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*Next,* customize the UI, this step requires a bit knowledge of HTML, CSS and JS knowledge. For my little knowledge in Frontend development, I can only make small modifications like:
- Update left float bar to show current categories
{% raw %}
```
{% assign categories_list = site.categories %}
  {% if categories_list.first[0] == null %}
    {% for category in categories_list %}
      <li><a href="{{ site.url }}/categories.html?category={{ category | camelcase }}">{{ category | camelcase }} ({{ site.tags[category].size }})</a></li>
    {% endfor %}
  {% else %}
    {% for category in categories_list %}
      <li><a href="{{ site.url }}/categories.html?category={{ category[0] | camelcase }}">{{ category[0] | camelcase }} ({{ category[1].size }})</a></li>
    {% endfor %}
  {% endif %}
{% assign categories_list = nil %}
```
{% endraw %}

- Create right float bar to automatically list header tags and navigate between them. It will be used as the <span style="background: lightgray; font-weight: bold">table of content</span>.
  - Add a place holder for the right bar  
  
  ``` html
  <nav class="section">
    <ul>
    </ul>
  </nav>
  ```

  - Add jQuery script to modify them  
  
  ``` js
  $("section h1, section h2, section h3").each(function(){
    if ($(this).attr("id") !== "title") {
      $("nav.section ul").append("<li class='tag-" + this.nodeName.toLowerCase() + "'><a href='#" + $(this).text().toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g,'') + "'>" + $(this).text() + "</a></li>");
      $(this).attr("id",$(this).text().toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g,''));
      $("nav.section ul li:first-child a").parent().addClass("active");
    }
  });
  ```

- Do some CSS stuffs to make it look better.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*Last,* write the first ever blog post, this blog :).

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*That's it,* now I have created my own blog. My first blog post's view.

![My very first blog post]({{ site.url}}/assets/images/jekyll_set_up_2.png)
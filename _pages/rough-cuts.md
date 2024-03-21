---
layout: page
permalink: /wip/
title: Rough Cuts
---


<div id="rough-cuts">
  <section id="wip">
    <p class="rough-cuts-description"><i>Articles which may not be ready enough to be posted</i></p>
    {% for post in site.posts %}
      {% if post.tags contains "wip" %}
        <p><b><a href="{{ site.baseurl }}{{ post.url }}">{% if post.title and post.title != "" %}{{post.title}}{% else %}{{post.excerpt |strip_html}}{%endif%}</a></b> - {% if post.date and post.date != "" %}{{ post.date | date: "%e %B %Y" }}{%endif%}</p>
      {% endif %}
    {% endfor %}
  </section>
</div>

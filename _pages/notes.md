---
layout: page
permalink: /notes/
title: Notes
---


<div id="page--notes">
  <section id="notes">
    <p class="Notes-description"><i>A collection of topical observations and insights</i></p>
    {% for post in site.posts %}
      {% if post.tags contains "notes" %}
        <p><b><a href="{{ site.baseurl }}{{ post.url }}">{% if post.title and post.title != "" %}{{post.title}}{% else %}{{post.excerpt |strip_html}}{%endif%}</a></b> - {% if post.date and post.date != "" %}{{ post.date | date: "%e %B %Y" }}{%endif%}</p>
        {% assign list_exists = true %}
      {% endif %}
    {% endfor %}
    {% unless list_exists %}
    <p>No notes as of now ¯\_(ツ)_/¯</p>
    <p>Come back later to read some!</p>
    {% endunless %}
  </section>
</div>

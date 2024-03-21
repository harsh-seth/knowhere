---
layout: page
permalink: /archive/
title: Posts Archive
---


<div id="archives">
  <section id="archive">
     <h2 style="text-align:left;">Recent Posts</h2>
      {% for post in site.posts %}
        {% unless post.next %}
          {% comment %} only the most recent post will trigger this condition {% endcomment %}
            <ul class="recent-posts">
        {% else %}
          {% comment %} 'next' refers to the next (newer) post {% endcomment %}
          {% capture month %}{{ post.date | date: '%B %Y' }}{% endcapture %}
          {% capture year %}{{ post.date | date: '%Y' }}{% endcapture %}
          {% capture nmonth %}{{ post.next.date | date: '%B %Y' }}{% endcapture %}
          {% capture nyear %}{{ post.next.date | date: '%Y' }}{% endcapture %}
          {% comment %} logical operations are eval'ed rtl {% endcomment %}
          {% assign needs_new_section = year != nyear or year == nyear and month != nmonth %}
          {% if needs_new_section %}
            </ul>
            {% if year != nyear %}
              <h2 style="text-align:left;">{{ post.date | date: '%Y' }}</h2>
            {% endif %}
            {% if month != nmonth %}
              <h3 style="text-align:left;">{{ post.date | date: '%B %Y' }}</h3>
            {% endif %}
            <ul class="past-posts">
          {% endif %}
        {% endunless %}
        <li class='archive-item'>{% if post.tags contains "wip" %}[WIP] {% endif %}<b><a href="{{ site.baseurl }}{{ post.url }}">{% if post.title and post.title != "" %}{{post.title}}{% else %}{{post.excerpt |strip_html}}{%endif%}</a></b> - {% if post.date and post.date != "" %}{{ post.date | date: "%e %B %Y" }}{%endif%}</li>
        {% assign listed_content = true %}
      {% endfor %}
      {% if listed_content %}
        </ul>
      {% endif %}
  </section>
</div>

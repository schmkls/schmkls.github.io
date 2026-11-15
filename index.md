{% assign posts = site.pages | where_exp: "p", "p.path contains 'posts/'" %}
{%- for p in posts %}
- [{{ p.title }}]({{ p.url }}) — {{ p.content | markdownify | split: "</p>" | first | split: "<p>" | last | strip_html }}
{%- endfor %}

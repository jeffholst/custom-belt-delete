---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "SVG Belt"
  text: "Demo and Docs"
  tagline: Vue 3 component to easily create any style martial arts belt in SVG format.
  actions:
    - theme: brand
      text: Markdown Examples
      link: /markdown-examples
    - theme: alt
      text: API Examples
      link: /api-examples

features:
  - title: Feature A
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
  - title: Feature B
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
  - title: Feature C
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
---

# SVG Belt

<script setup>
import { SVGBelt, getStripedBelt } from 'vue-svg-belt'

</script>

<SVGBelt
        :belt-props="
          getStripedBelt(
            'USA Belt',
            'Red',
            'White',
            'Blue',
            'Black',
            true,
            'White',
            'Black',
            false,
            '',
            '',
            '',
            0,
            'Right',
            'USA Striped Belt',
            'USA Striped Belt no Stripes',
            '',
            0
          )
        "
      />

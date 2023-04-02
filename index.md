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
  - title: Color 1 
    details: <color-input v-model="color" format="hex object" /> 
  - title: Feature B
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
  - title: Feature C
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
---

# SVG Belt

<script setup>
import { SVGBelt, getStripedBelt, getBelt } from 'vue-svg-belt'
import ColorInput from 'vue-color-input'
import { ref, watch } from 'vue'

const color = ref('#ff0000')
const belt = ref(getStripedBelt(
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
))
watch (color, async (oldVar, newVar) => {
console.log(newVar);
belt.value = getStripedBelt(
  'USA Belt',
  newVar,
  'Purple',
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
});
</script>
<color-input v-model="color" format="hex object" />
<SVGBelt
        :belt-props="belt"
      />

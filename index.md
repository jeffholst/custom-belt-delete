---
# https://vitepress.dev/reference/default-theme-home-page
layout: home
---

<div class="container mx-auto">
# SVG Belt

  <SVGBelt :belt-props="belt" />
  <color-input v-model="color1" format="hex object" position="bottom right" disable-alpha disable-text-inputs/>
  <color-input v-model="color2" format="hex object" position="bottom right" disable-alpha disable-text-inputs/>
  <color-input v-model="color3" format="hex object" position="bottom right" disable-alpha disable-text-inputs/>
</div>

<script setup>
import { SVGBelt, getStripedBelt, getBelt } from 'vue-svg-belt'
import ColorInput from 'vue-color-input'
import { ref, watch } from 'vue'

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
));

const color1 = ref('#FF0000');
const color2 = ref('#FFFFFF');
const color3 = ref('#0000FF');

const updateBelt = () => {
  console.log(color1.value, color2.value, color3.value);
  belt.value = getStripedBelt(
    'USA Belt',
    color1.value,
    color2.value,
    color3.value,
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
    'USA Belt',
    'USA Belt no Stripes',
    '',
    0
  );
};

watch (color1, () => {
  updateBelt();
});

watch (color2, () => {
  updateBelt();
});

watch (color3, () => {
  updateBelt();
});
</script>
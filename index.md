---
# https://vitepress.dev/reference/default-theme-home-page
layout: home
---

<main> <!-- markdownlint-disable-line MD041 -->
  <SVGBelt :belt-props="belt" />
  <div>
     <input type="color" v-model="color1" />
     <input type="color" v-model="color2" />
     <input type="color" v-model="color3" />
  </div>
  <div>
    <button class="button">Solid</button>
    <button class="button">Striped</button>
    <button class="button">Coral</button>
    <button class="button">Split</button>
    <button class="button">Random</button>
  </div>
</main>

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

const selectedBelt = ref('1');
const beltOptions = ref([
  { text: 'Solid', value: '0' },
  { text: 'Striped', value: '1' },
  { text: 'Coral', value: '2' },
  { text: 'Split', value: '3' },
  { text: 'Checkered', value: '4' },
  { text: 'Random', value: '5' }
])

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

<style scoped>
main {
  padding: 20px;
  text-align: center;
}

.button {
   background-color: #4CAF50;
   border: none;
   color: white;
   padding: 15px 32px;
   text-align: center;
   text-decoration: none;
   display: inline-block;
   font-size: 16px;
   margin: 4px 2px;
   cursor: pointer;
   border-radius: 8px;
}
</style>

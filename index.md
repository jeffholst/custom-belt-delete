---
# https://vitepress.dev/reference/default-theme-home-page
layout: home
---

<main> <!-- markdownlint-disable-line MD041 -->
  <SVGBelt :belt-props="belt" />
  <div>
     <input class="colorSwatch" type="color" v-model="color1" />
     <input class="colorSwatch" type="color" v-model="color2" />
     <input class="colorSwatch" type="color" v-model="color3" />
  </div>
  <div style="padding-top: 40px;">
    <ul style="list-style: none; display: inline;">
       <li v-for="(button, index) in beltType" style="display: inline;">
         <button @click="pickBelt(button)" class="button">{{ button }}</button>
       </li>
    </ul>
  </div>
</main>

<script setup>
import { SVGBelt, getStripedBelt, getBelt, beltType } from 'vue-svg-belt'
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

const pickBelt = (bType) => {
  switch (bType) {
    case "Solid":
       break;
    case "Striped":
       break;
    case "Coral":
      break;
    case "Split":
      break;
    case "Checkered":
      break;
    case "Crazy":
      break;
  }
}
</script>

<style scoped>
main {
  padding: 20px;
  text-align: center;
}

.button {
   background-color: transparent;
   border: none;
   color: #3c3c43;
   padding: 15px 32px;
   text-align: center;
   text-decoration: none;
   display: inline-block;
   font-size: 16px;
   margin: 4px 2px;
   cursor: pointer;
   border-radius: 8px;
}

.button:hover {
  color: #10b981;
}

.dark .button {
  color: #ffffff;
}

.dark .button:hover {
  color: #10b981;
}

.colorSwatch {
  width: 75px;
  height: 75px;
  cursor: pointer;
}
</style>

---
# https://vitepress.dev/reference/default-theme-home-page
layout: home
---

<main> <!-- markdownlint-disable-line MD041 -->
  <SVGBelt :belt-props="belt" />
  <div>
     <input
        v-if="colorCount > 0"
        class="colorSwatch"
        type="color"
        v-model="color1"
      />
     <input
        v-if="colorCount > 1"
        class="colorSwatch"
        type="color"
        v-model="color2"
     />
     <input
        v-if="colorCount > 2"
        class="colorSwatch"
        type="color"
        v-model="color3"
     />
  </div>
  <div style="padding-top: 40px;">
    <ul style="list-style: none; display: inline;">
       <li v-for="(button, index) in beltTypes" style="display: inline;">
         <button @click="pickBelt(button)" class="button">{{ button }}</button>
       </li>
    </ul>
  </div>
</main>

<script setup>
import { SVGBelt, getPredefinedBelt, beltTypes } from 'vue-svg-belt'
import ColorInput from 'vue-color-input'
import { ref, watch } from 'vue'

const color1 = ref('#FF0000');
const color2 = ref('#FFFFFF');
const color3 = ref('#0000FF');
const beltType = ref('Striped');
const belt = ref(undefined);
const colorCount = ref(3);

const updateBelt = () => {
  belt.value = getPredefinedBelt(
    "Belt Name",
    beltType.value,
    color1.value,
    color2.value,
    color3.value,
    "#000000",
    true,
    "#000000",
    "#000000",
    false,
    "",
    "",
    "#FFFFFF",
    0,
    "Right",
    "My Title",
    "My Description",
    "",
    ""
  );
};

updateBelt();

watch (color1, () => {
  updateBelt();
});

watch (color2, () => {
  updateBelt();
});

watch (color3, () => {
  updateBelt();
});

const pickBelt = (newBeltType) => {
  switch (newBeltType) {
    case "Solid":
      colorCount.value = 1;
      break;
    case "Coral":
    case "Split":
    case "Checkered":
      colorCount.value = 2;
      break;
    case "Striped":
      colorCount.value = 3;
      break;
    case "Crazy":
      colorCount.value = 0;
      break;
  }
  beltType.value = newBeltType;
  updateBelt();
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

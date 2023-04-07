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
  <div style="padding-top: 20px;">
    <label v-for="group in beltGroups" :key="group.value" style="padding: 5px;">
       <input
          @change="beltGroupChanged(group.value)"
          type="radio"
          name="beltGroup"
          :value="group.value"
          v-model="selectedBeltGroup"
       />
       <span>{{ group.name }}</span>
    </label>
  </div>
  <div v-if="selectedBeltGroup === 0" style="padding-top: 20px;">
    <ul style="list-style: none; display: inline;">
       <li v-for="(belt, index) in ibjjfSystem.belts" style="display: inline;">
         <button
            @click="pickBeltIBJJF(belt)"
            class="buttonSmall"
            :class="{ neonText: belt.name === beltTypeIBJJF }"
          >
             {{ belt.name }}
          </button>
       </li>
    </ul>
  </div>
  <div v-else-if="selectedBeltGroup === 1" style="padding-top: 20px;">
    <ul style="list-style: none; display: inline;">
       <li v-for="(button, index) in beltTypes" style="display: inline;">
         <button
            @click="pickBeltCustom(button)"
            class="button"
            :class="{ neonText: button === beltTypeCustom }"
          >
             {{ button }}
          </button>
       </li>
    </ul>
  </div>
</main>

<script setup>
import {
  SVGBelt,
  getPredefinedBelt,
  beltTypes,
  getRandomBelt,
  ibjjfJSON,
  BeltSystem
} from 'vue-svg-belt'
import ColorInput from 'vue-color-input'
import { ref, watch } from 'vue'

const ibjjfSystem = new BeltSystem(ibjjfJSON);

const beltGroups = [
  { name: "IBJJF Belts", value: 0 },
  { name: "Custom Belts", value: 1 },
  { name: "Random Belts", value: 2}
];
const color1 = ref('#FF0000');
const color2 = ref('#FFFFFF');
const color3 = ref('#0000FF');
const beltTypeCustom = ref('Striped');
const beltTypeIBJJF = ref('White');
const belt = ref(undefined);
const colorCount = ref(3);
const selectedBeltGroup = ref(0);

const updateBeltCustom = () => {
  belt.value = getPredefinedBelt(
    "Belt Name",
    beltTypeCustom.value,
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

updateBeltCustom();

watch (color1, () => {
  updateBeltCustom();
});

watch (color2, () => {
  updateBeltCustom();
});

watch (color3, () => {
  updateBeltCustom();
});

const pickBeltIBJJF = (newBelt) => {
  beltTypeIBJJF.value = newBelt.name;
  belt.value = ibjjfSystem.getBeltPropsByName(newBelt.name, newBelt.stripeCount);
  colorCount.value = 0;
}

const pickBeltCustom = (newBeltType) => {
  setColorCount(newBeltType);
  beltTypeCustom.value = newBeltType;
  updateBeltCustom();
}

const setColorCount = (beltType) => {
  switch (beltType) {
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
};

const beltGroupChanged = (groupValue) => {
  if (groupValue === 1) { // Custom Belts
     pickBeltCustom(beltTypeCustom.value);
     updateBeltCustom();
  } else if (groupValue ===  2) { // Random Belts
     colorCount.value = 0;
     belt.value = getRandomBelt(
        true,
        false,
        0,
        undefined,
        "transition: all 1.0s ease-in-out;",
        ["Solid", "Striped", "Coral", "Split", "Checkered", "Crazy"],
        "2000"
     );
  };
};
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

.buttonSmall {
   background-color: transparent;
   border: none;
   color: #3c3c43;
   padding: 8px 16px;
   text-align: center;
   text-decoration: none;
   display: inline-block;
   font-size: 14px;
   margin: 4px 2px;
   cursor: pointer;
   border-radius: 8px;
}

.button:hover {
  color: #10b981;
}

.buttonSmall:hover {
  color: #10b981;
}

.neonText {
  color: #10b981;
  text-shadow:
      0 0 7px #0fa,
      0 0 10px #0fa,
      0 0 21px #0fa,
      0 0 42px #0fa,
      0 0 82px #0fa,
      0 0 92px #0fa,
      0 0 102px #0fa,
      0 0 151px #0fa;
}

.dark .button {
  color: #ffffff;
}

.dark .buttonSmall {
   color: #FFFFFF;
}

.dark .button:not(.neonText):hover {
  color: #10b981;
}

.dark .buttonSmall:not(.neonText):hover {
  color: #10b981;
}

.dark .neonText {
  color: #FFFFFF;
  text-shadow:
      0 0 7px #fff,
      0 0 10px #fff,
      0 0 21px #fff,
      0 0 42px #fff,
      0 0 82px #fff,
      0 0 92px #fff,
      0 0 102px #fff,
      0 0 151px #fff;
}

.colorSwatch {
  width: 75px;
  height: 75px;
  cursor: pointer;
}
</style>

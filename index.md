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
    <select
       v-model="selectedBeltGroup"
       @change="beltGroupChanged(selectedBeltGroup)"
    >
       <option
          v-for="group in beltGroups"
          :value="group.value"
       >
          {{ group.name }}
       </option>
    </select>
    <select
       v-if="selectedBeltGroup === 0"
       v-model="beltTypeIBJJF"
       style="margin-left: 10px;"
       @change="pickBeltIBJJF(beltTypeIBJJF)"
    >
       <option
          v-for="(belt, index) in ibjjfSystem.belts"
          :key="index"
          :value="belt.name"
       >
          {{ belt.name }}
       </option>
    </select>
    <select
       v-else-if="selectedBeltGroup === 1"
       v-model="beltTypeCustom"
       style="margin-left: 10px;"
       @change="pickBeltCustom(beltTypeCustom)"
    >
       <option
          v-for="(button, index) in beltTypes"
          :value="button"
       >
          {{ button }}
       </option>
    </select>
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
import { ref, watch } from 'vue'

const ibjjfSystem = new BeltSystem(ibjjfJSON);

const beltGroups = [
  { name: "IBJJF", value: 0 },
  { name: "Custom", value: 1 },
  { name: "Random", value: 2}
];
const color1 = ref('#FF0000');
const color2 = ref('#FFFFFF');
const color3 = ref('#0000FF');
const beltTypeCustom = ref('Striped');
const beltTypeIBJJF = ref('White');
const belt = ref(undefined);
const colorCount = ref(0);
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

watch (color1, () => {
  updateBeltCustom();
});

watch (color2, () => {
  updateBeltCustom();
});

watch (color3, () => {
  updateBeltCustom();
});

const pickBeltIBJJF = (beltName) => {
  const newBelt = ibjjfSystem.getBeltPropsByName(beltName, undefined);
  belt.value = newBelt;
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
  if (groupValue === 0) { // IBJJF Belts
     pickBeltIBJJF(beltTypeIBJJF.value);
  } else if (groupValue === 1) { // Custom Belts
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
pickBeltIBJJF(beltTypeIBJJF.value);
</script>

<style scoped>
main {
  padding: 20px;
  text-align: center;
}

select {
  /*Reset*/
  -webkit-appearance: none;
     -moz-appearance: none;
          appearance: none;
  border: 0;
  outline: 0;
  font: inherit;
  /*Personalize*/
  height: 2em;
  padding: 0 4em 0 1em;
  background: url(/caret-black.svg) no-repeat right 0.8em center/1.4em, linear-gradient(to left, rgba(0, 0, 0, 0.3) 3em, rgba(0, 0, 0, 0.2) 3em);
  color: black;
  border-radius: 0.25em;
  box-shadow: 0 0 1em 0 rgba(0, 0, 0, 0.2);
  cursor: pointer;
  /*<option> colors*/
  /*Remove focus outline*/
  /*Remove IE arrow*/
}

.dark select {
  background: url(/caret-white.svg) no-repeat right 0.8em center/1.4em, linear-gradient(to left, rgba(255, 255, 255, 0.3) 3em, rgba(255, 255, 255, 0.2) 3em);
  color: white;
}

select option {
  color: inherit;
  background-color: #320a28;
}
select:focus {
  outline: none;
}

select::-ms-expand {
  display: none;
}

.colorSwatch {
  width: 75px;
  height: 75px;
  cursor: pointer;
}
</style>

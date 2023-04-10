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
  <div class="controls">
    <div class="control">
       <label for="beltGroup">Type</label>
       <select
          id="beltGroup"
          v-model="selectedBeltGroup"
          style="margin-left: 10px;"
          @change="beltGroupChanged(selectedBeltGroup)"
       >
          <option
             v-for="group in beltGroups"
             :value="group.value"
          >
             {{ group.name }}
          </option>
       </select>
    </div>
    <div
       v-if="selectedBeltGroup === 0"
       class="control"
    >
       <label for="beltTypeIBJJF">Belt</label>
       <select
          id="beltTypeIBJJF"
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
    </div>
    <div
       v-else-if="selectedBeltGroup === 1"
       class="control"
    >
       <label for="beltTypeCustom">Belt</label>
       <select
          id="beltTypeCustom"
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
    <div class="control">
       <label for="stripeCount">Stripes</label>
       <select
          id="stripeCount"
          v-model="stripesSelected"
          style="margin-left: 10px;"
          @change="updateStripeCount(stripesSelected)"
       >
          <option
             v-for="(stripe, index) in stripesAvailable"
             :value="stripe"
          >
             {{ stripe }}
          </option>
       </select>
    </div>
  </div>
  <div @click="copyURLToClipboard" class="copyURL">
    <span >Copy URL to Clipboard</span>
       <svg xmlns="http://www.w3.org/2000/svg" class="svgIcon"
  viewBox="0 0 52 52" enable-background="new 0 0 52 52" xml:space="preserve">
<g>
 <path d="M17.4,11.6h17.3c0.9,0,1.6-0.7,1.6-1.6V6.8c0-2.6-2.1-4.8-4.7-4.8h-11c-2.6,0-4.7,2.2-4.7,4.8V10
  C15.8,10.9,16.5,11.6,17.4,11.6z"/>
 <path d="M43.3,6h-1.6c-0.5,0-0.8,0.3-0.8,0.8V10c0,3.5-2.8,6.4-6.3,6.4H17.4c-3.5,0-6.3-2.9-6.3-6.4V6.8
  c0-0.5-0.3-0.8-0.8-0.8H8.7C6.1,6,4,8.2,4,10.8v34.4C4,47.8,6.1,50,8.7,50h34.6c2.6,0,4.7-2.2,4.7-4.8V10.8C48,8.2,45.9,6,43.3,6z"
  />
</g>
</svg>
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
const stripesSelected = ref(0);
const stripesAvailable = ref([]);

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
    stripesSelected.value,
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
  setStripeSelect();
  const newBelt = ibjjfSystem.getBeltPropsByName(beltName, stripesSelected.value);
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

const updateStripeCount = (stripeCount) => {
  beltGroupChanged(selectedBeltGroup.value);
};

const beltGroupChanged = (groupValue) => {
  setStripeSelect();
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
        stripesSelected.value,
        "Right",
        "transition: all 1.0s ease-in-out;",
        ["Solid", "Striped", "Coral", "Split", "Checkered", "Crazy"],
        "2000"
     );
  };
};

const setStripeSelect = () => {
  switch (selectedBeltGroup.value) {
    case 0: // IBJJF
      const myBelt = ibjjfSystem.getBeltByName(beltTypeIBJJF.value);
      const ary = [];
      for (let i = myBelt.minStripes; i <= myBelt.maxStripes; i++) {
        ary.push(i);
      }
      stripesAvailable.value = ary;
      break;
    case 1: // Custom
    case 2: // Random
      stripesAvailable.value = [0, 1, 2, 3 ,4, 5, 6, 7, 8, 9, 10];
      break;
  }
  if (stripesSelected.value >
      stripesAvailable.value[stripesAvailable.value.length - 1]) {
     (stripesSelected.value = stripesAvailable.value[0]);
  } else if (stripesSelected.value < stripesAvailable.value[0]) {
     stripesSelected.value = stripesAvailable.value[0];
  }
};

const copyURLToClipboard = () => {
  if (typeof window !== "undefined") {
    const belt = ibjjfSystem.getBeltByName(beltTypeIBJJF.value);
    let url =  window.location.origin + window.location.pathname;
    const parm = `0|${belt.id}|${stripesSelected.value}`;
    url = `${url}?belt=${encodeURIComponent(parm)}`;
    copyToClipboard(url);
  }
};

const copyToClipboard = async (text) => {
  if (navigator) {
    try {
      await navigator.clipboard.writeText(text);
      console.log("Text copied to clipboard:", text);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  }
};

const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});
// Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
let value = params.belt; // "some_value"

if (value) {
   const parms = value.split("|");
   if (parms && parms.length === 3 && parms[0] === "0") {
      selectedBeltGroup.value = 0;
      const belt = ibjjfSystem.getBeltById(Number(parms[1]));
      beltTypeIBJJF.value = belt.name;
      stripesSelected.value = parseInt(parms[2]);
   }
}

pickBeltIBJJF(beltTypeIBJJF.value);

</script>

<style scoped>
main {
  padding: 20px;
  text-align: center;
}

 .copyURL {
  padding-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
 }

.svgIcon {
  width: 25px;
  height: 25px;
  fill: #000000;
  padding-left: 10px;
}

.dark .svgIcon {
  fill: #FFFFFF;
}

.control {
  background-color: #F6F6F7;
  color: white;
  padding: 1rem;
  height: 4rem;
  border-radius: 0.5rem;
}

.dark .control {
  background-color: #434245;
}

.controls {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-gap: 1rem;
  padding-top: 20px;
}

/*Screen larger than 600px? 2 column*/
@media (min-width: 600px) {
  .controls { grid-template-columns: repeat(2, 1fr); }
}

/*Screen larger than 900px? 3 columns*/
@media (min-width: 900px) {
  .controls { grid-template-columns: repeat(3, 1fr); }
}

label {
  color: gray;
}

.dark label {
  color: #FFFFFF;
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
  background: url(/caret-black.svg) no-repeat right 0.8em center/1.4em,
     linear-gradient(to left,
     rgba(0, 0, 0, 0.3) 3em,
     rgba(0, 0, 0, 0.2) 3em);
  color: black;
  border-radius: 0.25em;
  box-shadow: 0 0 1em 0 rgba(0, 0, 0, 0.2);
  cursor: pointer;
  /*<option> colors*/
  /*Remove focus outline*/
  /*Remove IE arrow*/
}

.dark select {
  background: url(/caret-white.svg) no-repeat right 0.8em center/1.4em,
     linear-gradient(to left, rgba(255, 255, 255, 0.3) 3em,
     rgba(255, 255, 255, 0.2) 3em);
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

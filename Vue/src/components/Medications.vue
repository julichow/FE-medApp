<template>
  <ul>
    <li v-for="card in cards">{{ card.name }}</li>
  </ul>
</template>

<script>
export default {
  name: "Medications",
  props: ["cards"],
  data() {
    return {
      name: "",
      // reason: "",
    };
  },

};

//Fetch requests from database
//GET list of medications
// const addMeds = {
//   fetch('http://localhost:4000/').then(response => response.json()).then(name => name)
  
// }

// const addMeds = {
//   method: 'GET',
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify({{name: name}})
// }

</script>

<style></style>
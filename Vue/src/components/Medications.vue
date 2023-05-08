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
    };
  },
};

</script>

<style></style>
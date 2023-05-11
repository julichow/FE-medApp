<template>
  <ul>

    <li v-for="card in cards">
      <div class="row">
        <div class="card">
          <h2>{{ card.name }}</h2>
        </div>
      </div> <!-- <button @click="handleDelete(card.name)">Delete</button> -->
    </li>
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
  methods: {
    // handleDelete(medName) {
    //   if (confirm(`Are you sure you want to remove this?`)) {
    //     fetch('http://localhost:4000/' + name, {
    //       method: "DELETE",
    //     })
    //       .then(response => response.json())
    //       .then(data => this.medCards = [...data])
    //       .catch(error => {
    //         console.log(error);
    //       });
    //   }
    // console.log(medName)

  },
}


</script>

<style></style>
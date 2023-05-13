<template>
  <ul>
    <div class="mx-10 grid grid-cols-1 sm:grid-cols-2">
      <!-- <div class="gridin"> -->
      <li v-for="card in cards">
        <div class="card">
          <h2>{{ card.name }}</h2>
        </div>

        <!-- <button @click="handleDelete(card.name)">Delete</button> -->
      </li>
      <!-- </div> -->
    </div>
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
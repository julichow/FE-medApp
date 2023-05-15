<template>
  <ul>
    <div class="mx-20 grid grid-cols-1 sm:grid-cols-2">

      <li v-for="card in cards">
        <div class="card">
          <h2>{{ card.name }}
            <div v-if="dose = true" class="dose">{{ (card.dose) }}</div>
          </h2>

          <div v-if="frequency = true" class="dose"> Daily Frequency: {{ card.frequency }} Time(s) per day</div>
        </div>

        <!-- <button @click="handleDelete(card.name)">Delete</button> -->
      </li>

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
      dose: "",
      frequency: "",
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
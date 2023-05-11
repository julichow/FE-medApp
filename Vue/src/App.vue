<template>
  <div class="@container px-20 py-10 bg-gray-400">

    <!--NavBar-->
    <div class="flex justify-end pb-6">

      <button :class="{ 'navbar underline underline-offset-4': Selected, 'navbar': !Selected }"
        @click="Selected = true">Home</button>
      <button :class="{ 'navbar underline underline-offset-4': !Selected, 'navbar': Selected }" @click="Selected = false">
        Settings </button>

    </div>

    <!--User Interface-->
    <div>
      <h1 class="pb-6">Hello, User</h1>
      <!-- <img src="./assets/people_standing.svg" />  -->
      <div class="inputarea">
        <input class="textbox" type="text" v-model="name" placeholder="Start by entering the name of a prescription:" />

        <button
          class="btn text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          @click="handleSubmit">Enter</button>
      </div>


      <!--Medication Display connect medCards array to display page-->
      <Medications :cards="medCards" />
    </div>
  </div>
</template>

<script>
import Medications from "./components/Medications.vue";

export default {
  name: "app",
  components: {
    Medications,
  },

  data() {
    return {
      //Use Selected class for underline active page
      Selected: true,
      name: "",
      reason: "",
      medCards: [{}],
    }
  },
  methods: {
    handleSubmit() {
      // this.medCards.push({ name: this.name, reason: this.reason });
      fetch('http://localhost:4000/', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: this.name })
      })
        .then(response => response.json())
        //POST data to medCards array by creating a copy with spread operator
        //and adding new inputs
        .then(data => this.medCards = [...data])
        .catch(error => {
          console.log(error);
        });
    },
  },
  //GET list of medications from database
  async created() {
    await fetch('http://localhost:4000/')
      .then(res => res.json())
      .then(data => (this.medCards = data))
      .catch(err => console.log(err.message))
  }
}



</script>

<style>
.underline {
  font-style: underline;
}

.gray {
  color: gray;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>

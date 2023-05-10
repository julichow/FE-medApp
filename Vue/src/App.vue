<template>
  <!-- <div class="container mx-auto bg-gray-500"> -->
  <!--NavBar-->
  <div>
    <button :class="{ 'underline': Selected, 'gray': !Selected }" @click="Selected = true">Home</button>
    <button :class="{ 'underline': !Selected, 'gray': Selected }" @click="Selected = false">Settings</button>
    <!-- </div> -->

    <!--User Interface-->
    <h1>Hello, User</h1>
    <!-- <img src="./assets/people_standing.svg" />  -->
    <input type="text" v-model="name" placeholder="Enter this" />
    <div class="mt-2 d-flex justify-content-center">
      <button class="btn btn-primary" @click="handleSubmit">SUBMIT</button>
    </div>

    <!--Medication Display connect medCards array to display page-->
    <Medications :cards="medCards" />
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

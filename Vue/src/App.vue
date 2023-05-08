<template>
  <!--NavBar-->
  <div class="container">
    <button :class="{ 'underline': Selected, 'gray': !Selected }" @click="Selected = true">Home</button>
    <button :class="{ 'underline': !Selected, 'gray': Selected }" @click="Selected = false">Settings</button>
  </div>

  <!--User Interface-->
  <h1>Hello, User</h1>
  <input type="text" v-model="name" placeholder="Enter this" />
  <div class="mt-2 d-flex justify-content-center">
    <button class="btn btn-primary" @click="handleSubmit">SUBMIT</button>
  </div>

  <!--Medication Display-->
  <Medications :cards="medCards" />
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
      medCards: [{}
      ],
    };
  },
  methods: {
    handleSubmit() {
      this.medCards.push(this.name);
    },
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

<template>
  <div class="navpanel absolute">

    <!-- ICON & NAVBAR-->
    <div class="left">
      <img src="./assets/pill_icon.png" class="logo" alt="Med App" />
      <h3>MedApp</h3>
    </div>

    <div class="float-right">
      <button :class="{ 'nav underline underline-offset-4': Selected, 'nav': !Selected }" 
      @click="Selected = true">
      Home
      </button>

      <button :class="{ 'nav underline underline-offset-4': !Selected, 'nav': Selected }"
        @click="Selected = false">
        Medications
      </button>
    </div>
  </div>

    <!--MEDICATION & HOME COMPONENT-->
    <div ref="medications">
    <!-- step 2: pass the prop down, using attributes -->
      <Home v-if="Selected"  @updatedmedCards="updateMeds" />
      <Medications v-else="!Selected" :cards="medCards" @delete="deleteCard"/>
    </div>
</template>


<script>
//1. Import the component
import Medications from "./components/Medications.vue";
import Modal from "./components/Modal.vue";
import Home from "./components/Home.vue"

export default {
//the name of this file is useful for debugging 
  name: "App",
//2. declare the component
  components: {
    Medications,
    Modal,
    Home, 
  },
  data() {
    return {
      //a property with a boolean value. true = Home display & false = Mediations displayed
      //Use Selected class for navbar if active
      Selected: true,
      medCards: [{}],
    }
  },
  methods: {
    deleteCard(meds) {
      this.medCards = [...meds]
    },
  updateMeds(meds) {
    this.medCards = [...meds];
    }
  },
  //GET list of medications from database
  created() {
    fetch('http://localhost:4000/')
      .then(res => res.json())
      .then(data => (this.medCards = data))
      .catch(err => console.log(err.message))
  }
}

</script>

<style></style>
  
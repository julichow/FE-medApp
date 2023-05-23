<template>
  <div class="navpanel absolute">

    <!-- ICON & NAVBAR-->
    <div class="left">
      <img src="./assets/pill_icon.png" class="logo" alt="Med App" />
      <h4>MedApp</h4>
    </div>

    <div class="float-right">
      <button :class="{ 'nav underline underline-offset-4': Selected, 'nav': !Selected }" 
      @click="Selected = true">Home
      </button>

      <button :class="{ 'nav underline underline-offset-4': !Selected, 'nav': Selected }"
        @click="Selected = false">Medications
      </button>
    </div>
  </div>

  <!--USER INTERFACE-->
  <div class="@container">
    <div class="user p-20">

      <div class="mx-10">
        <h1 class="pb-6">Hello, User</h1>
        <label>
          <p>Please enter the name of a prescription to begin:</p>
        </label>
        <div class="inputarea">
          <input class="textbox" type="text" required v-model="name" placeholder="e.g. Tylenol" />

          <button
            class="btn text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            @click="checkInput(e)">Enter</button>

        </div>

        <!-- Error message if input field is empty -->
        <div class="py-2 text-red-600 font-medium" v-if="nameError">{{ nameError }}</div>
      </div>

      <!-- MODAL POP UP COMPONENT-->
      <!-- step 2:Passing from modal to medication updated medcards array using $emit-->
      <Modal :show="showModal" @close="showModal = false" :medname="name" @updatedmedCards="updateMeds">
        <template #header>
          <h2 class=" w-3/4 w-1.5 border-b-2 border-gray-300">{{ name }}</h2>
        </template>
      </Modal>
    </div>

    <!--MEDICATION COMPONENT-->
    <div ref="medications">
    <!-- step 2: pass the prop down, using attributes -->
      <Medications :cards="medCards" @delete="deleteCard" />
    </div>
  </div>
</template>


<script>
//1. Import the component
import Medications from "./components/Medications.vue";
import Modal from "./components/Modal.vue";

export default {
//the name o this file is useful for debugging 
  name: "app",
//2. declare the component
  components: {
    Medications,
    Modal,
  },
  data() {
    return {
      //a property with a boolean value. true = Home display & false = Mediations displayed
      //Use Selected class for navbar if active
      Selected: true,
      //Medication card and and arary
      name: "",
      medCards: [{}],
      showModal: false,
      nameError: "",
    }
  },
  methods: {
    deleteCard(meds) {
      this.medCards = [...meds]
    },
    updateMeds(meds) {
      this.medCards = [...meds]
    },
    checkInput(e) {
      this.nameError = this.name.length > 0 ? "" : "This field cannot be empty";

      if (this.nameError === "") {
        this.showModal = true
      }
    },
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
  
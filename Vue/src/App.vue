<template>
  <div class="navpanel absolute">
    <!-- Logo/Icon -->
    <div class="left">
      <img src="./assets/pill_icon.png" class="logo" alt="Med App" />
      <h4>Med App</h4>
    </div>

    <!--NavBar-->
    <div class="float-right">
      <button :class="{ 'nav underline underline-offset-4': Selected, 'nav': !Selected }"
        @click="Selected = true">Home</button>
      <button :class="{ 'nav underline underline-offset-4': !Selected, 'nav': Selected }"
        @click="Selected = false">Medications </button>
      <button :class="{ 'nav underline underline-offset-4': !Selected, 'nav': Selected }"
        @click="Selected = false">Settings </button>
    </div>
  </div>

  <!--User Interface-->
  <div class="@container ">
    <div class="user p-10">
      <div class="mx-20">
        <h1 class="pb-6">Hello, User</h1>
        <p>Enter the name of a prescription to get started:</p>
        <div class="inputarea">
          <input class="input" required type="text" v-model="name" placeholder="e.g. Tylenol" />

          <button
            class="btn text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm text-center"
            @click="checkInput(e)">Enter
          </button>
        </div>

        <div class="text-red-600 font-medium" v-if="nameError">{{ nameError }}</div>

      </div>
    </div>

    <!-- <Teleport to="body"> -->
    <!-- use the modal component, pass in the prop -->
    <!-- Modal Pop up -->
    <Modal :show="showModal" :close="showModal">
      <!-- <Modal :show="showModal" @close="showModal = false"> -->
      <template #header>
        <h2>{{ name }}</h2>
      </template>
    </Modal>
    <!-- </Teleport> -->

    <!--Medication Display connect medCards array to display page-->
    <Medications :cards="medCards" />
  </div>
</template>

<script>
import Medications from "./components/Medications.vue";
import Modal from "./components/Modal.vue";


export default {
  name: "app",
  components: {
    Medications,
    Modal,
  },

  data() {
    return {
      //Use Selected class for underline active page
      Selected: true,
      name: "",
      dose: "",
      frequency: "",
      medCards: [{}],
      showModal: false,
      nameError: "",
    }
  },
  methods: {
    checkInput(e) {

      this.nameError = this.name.length > 0 ? "" : "This field cannot be empty";

      //If input field has content, open form and call handleSubmit function to post medication name
      if (this.nameError === "") {
        this.showModal = true,
          this.handleSubmit()
      }
      e.preventDeafult()
    },
    handleSubmit() {

      fetch('http://localhost:4000/', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: this.name })
      })
        .then(response => response.json())
        //POST data to medCards array by creating a copy with spread operator and adding new inputs
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
.modal-body {
  min-width: 300px;
}

input:invalid {
  border-color: red;
}

body {
  margin-bottom: 24pt;
}

.btn-space {
  margin-right: 5px !important;
}
</style>

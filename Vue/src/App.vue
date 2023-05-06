<template>
  <div class="container">
    <button :class="{ 'underline': Selected, 'gray': !Selected }" @click="Selected = true">Home</button>

    <button :class="{ 'underline': !Selected, 'gray': Selected }" @click="Selected = false">Settings</button>
  </div>
  <h1>Hello, User</h1>
  <!--Form input to add a new medication name-->
  <AddNew @createCard="newCard" />
  <!--Section below form input to display all newly added medications-->
  <Medications :cards="medCards" />
</template>

<script>
import AddNew from "./components/AddNew.vue";
import Medications from "./components/Medications.vue";

export default {
  name: "app",
  components: {
    AddNew,
    Medications,
  },
  data() {
    return {
      //When page is active use Selected class for underline
      Selected: true,
      medCards: [{

      }
      ],
    };
  },
  methods: {
    newCard(card) {
      this.medCards.push(card);

    }
  }
};
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

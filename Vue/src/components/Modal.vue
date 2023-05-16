<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-container">
        <div class="modal-header">
          <slot name="header" />
        </div>

        <div class="content-center">
          <div class="modal-body">

            <form>
              <label>Dose:</label>
              <input type="text" required v-model="dose" />

              <label>Reason:</label>
              <input type="text" v-model="reason" />

              <label>Daily Frequency: </label>
              <input type="number" required v-model="frequency" />

              <label>Prescribing Physician:</label>
              <input type="text" v-model="doctor" />
            </form>
          </div>

          <div class="text-red-600 font-medium" v-if="modalError">{{ modalError }}</div>

          <button
            class="btn text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm text-center"
            @click="handleSubmit()">Save & Continue</button>

          <!-- <button
            class="btn text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm text-center"
            @click="[$emit('close')], handleSave">Save & Continue</button> -->

        </div>
      </div>
      <div>
      </div>
    </div>
  </Transition>
</template>

<script>
export default {
  name: "Modal",
  props: {
    show: Boolean,
    medname: String, //['medname']
  },
  data() {
    return {
      dose: "",
      frequency: "",
      reason: "",
      doctor: "",
      modalError: "",
      medCards: [{}],
      // medname: "",
    }
  },
  methods: {
    handleSubmit() {
      this.modalError = (this.frequency.length) && (this.dose.length) > 0 ?
        "" : "Please complete all required fields";

      fetch('http://localhost:4000/', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: this.medname })
      })
        .then(response => response.json())
        //POST data to medCards array by creating a copy with spread operator and adding new inputs
        .then(data => {
          this.medCards = [...data]
          this.$emit('close')
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
}

</script>

<style></style>
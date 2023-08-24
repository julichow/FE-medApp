<template>
  <Transition name="modal">
    <!-- when show is true, it will display modal  -->
    <div v-if="show" class="modal-mask">
      <div class="modal-container">
        <div class="modal-header">
          <slot name="header" />
          <button class="close-button" @click="handleSubmit">X</button>
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

              <label>Medication Intake Time:</label>
              <input type="datetime-local" v-model="time_date" />

            </form>
          </div>

          <div class="text-red-600 font-medium" v-if="modalError">{{ modalError }}</div>

          <button
            class="btn text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm text-center"
            @click.prevent="handleSubmit()">Save & Continue</button>

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
  //step 1: declare the props in the child component
  props: {
    show: Boolean,
    medname: String, //['medname']
  },
  data() {
    return {
      dose: "",
      reason: "",
      frequency: 0,
      doctor: "",
      time_date:"",
      modalError: "",
    }
  },
  methods: {
    handleSubmit() {
      this.modalError = (this.frequency > 0 && this.dose.length > 0) ?
        "" : "Please complete all required fields";

      if (this.modalError === "") {
        // this.handlePost()
        //   }

        fetch('http://medapp.up.railway.app/prescriptions', {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: this.medname,
            dose: this.dose,
            reason: this.reason,
            frequency: this.frequency,
            doctor: this.doctor,
            time_date: this.time_date,
          })
        })
          .then(response => response.json())
          //POST data to medCards array by creating a copy with spread operator and adding new inputs

          .then(data => {
            //when handleSubmit() is executed, it emits updatedmedCards to Home.vue
            this.$emit('updatedmedCards', data)
            //Reset modal
            this.dose = '';
            this.reason = '';
            this.frequency = 0;
            this.doctor = '';
            this.time_date;
            this.$emit('close')
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        //if no date is entered, close the modal 
        this.$emit('close');
      }
    },
  }
}

</script>

<style></style>
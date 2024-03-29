<template>
  <ul>
    <div class="mx-20 grid grid-cols-1 sm:grid-cols-2">
      <li v-for="card in cards" :key="card.id">
        <div class="card">
          <h2>{{ card.name }}
            <div class="dose">{{ card.dose }}</div>
          </h2>
          <div class="w-1/2 w-1.5 border-b-2 border-gray-300" />

          <p v-if="card.frequency > 1"><strong>Daily Frequency:</strong> {{ card.frequency }} times a day</p>
          <p v-else> <strong>Daily Frequency:</strong> {{ card.frequency }} time a day</p>

          <p v-if="card.reason"><strong>Prescribed for:</strong> {{ card.reason }}</p>

          <p v-if="card.doctor"><strong>Prescribing Physician:</strong> {{ card.doctor }}</p>

          <p v-if="card.date_time"><strong>Medication Intake Time:</strong> {{ formatDate(card.date_time) }}</p>

          <button @click="handleDelete(card.id)">
            <img src="../assets/delete.png" class="delete-icon">
          </button>
          <button @click="handleEdit(card)">
            <img src="../assets/edit.png" class="edit-icon">
          </button>
        </div>
      </li>
    </div>
    <div v-if="showEditForm" class="edit-form"> 
      <div class="edit-close-button" @click="handleCloseForm">X</div>
      <form @submit="handleSubmit">
        <label>Name:</label>
        <input type="text" v-model="name" />

        <label>Dose:</label>
        <input type="text" v-model="dose" />

        <label>Reason:</label>
        <input type="text" v-model="reason" />

        <label>Daily Frequency:</label>
        <input type="number" v-model="frequency" />

        <label>Prescribing Physician:</label>
        <input type="text" v-model="doctor" />

        <label>Medication Intake Time:</label>
        <input type="datetime-local" v-model="date_time" />

      <button type="submit" class="edit-button">Update & Save</button>

      </form>
    </div>
  </ul>
</template>

<script>
import moment from 'moment';

export default {
  name: "Medications",
  props: ["cards"],
  data() {
    return {
      name: "",
      dose: "",
      reason: "",
      frequency: 0,
      doctor: "",
      date_time: "",
      showEditForm: false,
    };
  },
  methods: {
    handleDelete(id) {
      if (confirm(`Are you sure you want to remove this?`)) {
        fetch(`/prescriptions/${id}`, {
          method: "DELETE",
        })
          .then(response => response.json())
          .then(data => {
            this.$emit('update', data);
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    handleEdit(card) {
      const formattedDateTime = moment(card.date_time).format('YYYY-MM-DD HH:mm:SS');
      
      this.selectedMedicationId = card.id;
      this.name = card.name;
      this.dose = card.dose;
      this.reason = card.reason;
      this.frequency = card.frequency;
      this.doctor = card.doctor;
      this.date_time = formattedDateTime;
      //show the form when handleEdit is clicked
      this.showEditForm = true; 
    },
    handleSubmit() {
      
      const formattedDateTime = moment(this.date_time).format('YYYY-MM-DD hh:mm A');
      
      const updatedData = {
        name: this.name,
        dose: this.dose,
        reason: this.reason,
        frequency: this.frequency,
        doctor: this.doctor,
        date_time: formattedDateTime,
      };

      fetch(`/prescriptions/${this.selectedMedicationId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(updatedData),
      })
        .then(response => response.json()) 
        .then(data => {
          this.$emit('update', data);
        })
        .catch(error => {
          console.log(error);
        });
        // Prevent the form from reloading the page
      event.preventDefault();
      this.showEditForm = false;
    },
    formatDate(date) {
      return moment(date).format('YYYY-MM-DD hh:mm A');
    },
    handleCloseForm() {
      this.showEditForm = false;
    },
  }
}
</script>

<style></style>
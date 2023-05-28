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

          <p v-if="card.date_time"><strong>Date and Time:</strong> {{ formatDate(card.date_time) }}</p>

          <button @click="handleDelete(card.id)">
            <img src="../assets/delete.png" class="delete-icon">
          </button>
          <button @click="handleEdit(card)">
            <img src="../assets/edit.png" class="edit-icon">
          </button>
        </div>
      </li>
    </div>
    <div v-if="showEditForm"> 
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

        <button type="submit">
  {{ selectedMedicationId ? "Save" : "Update & Save" }}
</button>
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
      selectedMedicationId: null,
      name: "",
      dose: "",
      reason: "",
      frequency: 0,
      doctor: "",
      showEditForm: false,
    };
  },
  methods: {
    handleDelete(id) {
      if (confirm(`Are you sure you want to remove this?`)) {
        fetch(`http://localhost:4000/medications/${id}`, {
          method: "DELETE",
        })
          .then(response => response.json())
          .then(data => {
            this.$emit('delete', data);
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    handleEdit(card) {
      this.selectedMedicationId = card.id;
      this.name = card.name;
      this.dose = card.dose;
      this.reason = card.reason;
      this.frequency = card.frequency;
      this.doctor = card.doctor;
      //show the form when handleEdit is clicked
      this.showEditForm = true; 
    },
    handleSubmit(event) {
  event.preventDefault();

  const updatedData = {
    name: this.name,
    dose: this.dose,
    reason: this.reason,
    frequency: this.frequency,
    doctor: this.doctor,
  };

  if (this.selectedMedicationId) {
    // Update the existing medication
    fetch(`http://localhost:4000/medications/${this.selectedMedicationId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    })
      .then(response => response.json())
      .then(data => {
        this.$emit("put", data);
        // Clear the form after successful update
        this.clearForm();
      })
      .catch(error => {
        console.log(error);
      });
  } else {
    // Create a new medication
    fetch("http://localhost:4000/medications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    })
      .then(response => response.json())
      .then(data => {
        this.$emit("put", data);
      })
      .catch(error => {
        console.log(error);
      });
  }
    },
    clearForm() {
  this.selectedMedicationId = null;
  this.name = "";
  this.dose = "";
  this.reason = "";
  this.frequency = 0;
  this.doctor = "";
  //Hide the form after clearing
  this.showEditForm = false;
},
    formatDate(date) {
      return moment(date).format('YYYY-MM-DD HH:mm:ss');
    }
  }
}
</script>

<style></style>
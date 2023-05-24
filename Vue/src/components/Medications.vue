<template>
  <ul>
    <div class="mx-20 grid grid-cols-1 sm:grid-cols-2">

      <li v-for="card in cards">
        <div class="card">

          <h2>{{ card.name }}
            <div class="dose">{{ card.dose }}</div>
          </h2>
          <div class="w-1/2 w-1.5 border-b-2 border-gray-300" />

          <p v-if="card.frequency > 1"><strong>Daily Frequency:</strong> {{ card.frequency }} times a day</p>
          <p v-else> <strong>Daily Frequency:</strong> {{ card.frequency }} time a day</p>

          <p v-if="card.reason"><strong>Prescribed for:</strong> {{ card.reason }}</p>

          <p v-if="card.doctor"><strong>Prescribing Physician:</strong> {{ card.doctor }}</p>

          <p v-if="card.date_time"><strong>Date and Time:</strong> {{ card.date_time }}</p>

          <button @click="handleDelete(card.id)">
            <img src="../assets/delete.png" class="delete-icon">
          </button>
          <button @click="handleEdit(card)">
            <img src="../assets/edit.png" class="edit-icon">
          </button>
        </div>
      </li>
    </div>
  </ul>
</template>

<script>

export default {
  name: "Medications",
  //step 1: declare the props in the child component
  props: ["cards"],
  data() {
    return {
      name: "",
      dose: "",
      reason: "",
      frequency: 0,
      doctor: "",
      date_time: "",
      medCards: [{}]
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
            // this.medCards = [...data]
            this.$emit('deleted', data)
          })
          .catch(error => {
            console.log(error);
          });
      }
    }, 
    handleEdit(card) {
      // Set the data properties with the values from the selected card
      this.name = card.name;
      this.dose = card.dose;
      this.reason = card.reason;
      this.frequency = card.frequency;
      this.doctor = card.doctor;
      
      // Make the PUT request to update the card
      const updatedData = {
        name: this.name,
        dose: this.dose,
        reason: this.reason,
        frequency: this.frequency,
        doctor: this.doctor
      };

      fetch(`http://localhost:4000/medications/${card.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData)
      })
        .then(response => response.json())
        .then(data => {
          this.$emit("put", data);
        })
        .catch(error => {
          console.log(error);
        });
}
  }
}

</script>

<style></style>
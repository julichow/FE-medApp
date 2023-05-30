<template>
  <!--USER INTERFACE-->
  <div class="@container">
   <div class="user p-20">

     <div class="mx-10">
       <h1 class="pb-6">Hello, User</h1>
       <label>
         <p>Please enter the name of a prescription to begin:</p>
       </label>
       <div class="inputarea">
         
         <!-- required prevent form submission if the input field is empty -->
         <input type="text" required v-model="name" placeholder="e.g. Tylenol" />

           <!-- checkInput is triggered when Enter button clicked -->
         <button
           class="btn text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
           @click="checkInput(e)">Enter</button>

       </div>

       <!-- Error message if input field is empty -->
       <div class="py-2 text-red-600 font-medium" v-if="nameError">{{ nameError }}</div>
     </div>

     <!-- MODAL POP UP COMPONENT-->
     <!-- step 2:Passing from modal to medication updated medcards array using $emit-->
     <!-- updateMeds method is called in the Home component when Modal emits the updatedmedCards -->
     <Modal :show="showModal" @close="showModal = false" :medname="name" @updatedmedCards="updateMeds">
     <template #header>
      <h2 class=" w-3/4 w-1.5 border-b-2 border-gray-300">{{ name }}</h2>
     </template>
     </Modal>
   </div>
   </div>
   
   <img src="https://img.freepik.com/premium-photo/healthcare-medical-doctor-working-with-professional-team-physician-nursing-assistant_34200-767.jpg?w=2000" 
   alt="Medical App Image"
   />

</template>
<script>
//1. Import the component
import Modal from "./Modal.vue";

export default {
 name: "Home",
 //2. declare the component
 components: {
   Modal,
 },
 data() {
   return {
     showModal: false,
       //Medication card and and array
     name: "",
     medCards: [{}],
     nameError: "",
   }
 }, 
 methods: {
   checkInput(e) {
   //ternary operator - if name.length > 0, user has entered a field and there are no errors. if name.length < 0, we will receive a prompt that "this field cannot be empty"
     this.nameError = this.name.length > 0 ? "" : "This field cannot be empty";

   //if input field is not empty, it will display the Modal component 
     if (this.nameError === "") {
       this.showModal = true;
     }
   },
   updateMeds(meds) {
    //updatedmedCards will be emitted again to App.vue
    this.$emit('updatedmedCards', meds)
    },
 }
}
</script>
<style></style>
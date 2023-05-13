<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-container">
        <div class="modal-header">
          <slot name="header" />
        </div>

        <div class="modal-body">
          <form>
            <label>Dose:</label>
            <input type="text" />
          </form>
        </div>

        <div class="modal-footer">
          <slot name="footer">
            <button class="modal-default-button" @click="[$emit('close'), handleSave]">Save & Continue</button>
          </slot>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
export default {
  name: "Modal",
  props: {
    show: Boolean
  },

  data() {
    return {
      name: "",
    }
  },
  methods: {
    handleSave() {
      // this.medCards.push({ name: this.name, reason: this.reason });
      fetch('http://localhost:4000/', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: this.name })
      })
        .then(response => response.json())
        //POST data to medCards array by creating a copy with spread operator
        //and adding new inputs
        .then(data => this.medCards = [...data])
        .catch(error => {
          console.log(error);
        });
    },
  }
}

</script>

<style>
form {
  margin: 30px auto;
  text-align: left;
  padding: 40px;
  border-radius: 10px;
}

label {
  color: #aaa;
  display: inline-block;
  margin: 25px 0 15px;
  font-size: 0.6em;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
}

input {
  display: block;
  padding: 10px 6px;
  width: 100%;
  box-sizing: border-box;
  border: none;
  border-bottom: 3px solid #ddd;
  color: #555;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.3s ease;
}

.modal-container {
  width: 600px;
  margin: auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-body {
  margin: 20px 0;
  background: #eee;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
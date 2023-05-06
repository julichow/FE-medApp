<template>
  <div>
    <div class="row mb-2">
      <div class="col">
        <input class="form-control" v-model="name" />
      </div>

    </div>

    <div class="mt-2 d-flex justify-content-center">
      <button class="btn btn-primary" @click="handleSubmit">SUBMIT</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddNew",
  data() {
    return {
      name: "",
    };
  },
  methods: {
    handleSubmit() {
      this.$emit("createCard", {
        name: this.name,
      });
    },
  },
};
</script>

<style></style>


<template>
  <div class="row mb-4">
    <div class="col-4">
      <div class="col-8">
        <h2>{{ featured.name }}</h2>
      </div>
    </div>
  </div>

  <div class="row">
    <img v-for="card in cards" :src="card.name" @click="featured = card" class="col-3" />
  </div>
</template>

<script>

export default {
  name: "Medications",
  props: ["cards"],
  data() {
    return {
      featured: this.cards[0],
    };
  },
};

</script>

<style></style>
<template>
  <div v-if="pokemonDetails">
    <div class="pokemon-card">
      <h1>{{ pokemonDetails.name }}</h1>
      <div class="pokemon-card-header">
        <img :src="pokemonDetails.sprites.front_default" :alt="pokemonDetails.name">
      </div>

      <div class="pokemon-card-stats">
        <h3>Stats</h3>
        <div v-for="stat in pokemonDetails.stats" class="stat" v-bind:key="stat.stat.name">
          <span class="stat-name">{{ stat.stat.name }}:</span>
          <span class="stat-value">{{ stat.base_stat }}</span>
        </div>
      </div>
      <div class="pokemon-card-type">
        <h3>Types: </h3>

        <ul class="pokemon-card-type__list">
          <li class="pokemon-card-type__list-item" v-for="type in pokemonDetails.types" :key="type.type.name">
            {{ type.type.name }}
          </li>
        </ul>
      </div>

      <div class="pokemon-card-abilities">
        <h3>Abilities:</h3>

        <ul>
          <li v-for="ability in pokemonDetails.abilities" v-bind:key="ability.ability.name">
            {{ ability.ability.name }}
          </li>
        </ul>
      </div>
      <div class="pokemon-card-cry">
        <button @click="playCry">Play Cry</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import { onMounted, onUpdated } from 'vue';

onMounted(() => {
  playCry();
});

onUpdated(() => {
  playCry();
});

const props = defineProps({
  pokemonDetails: {
    type: Object,
    required: true,  // Make sure the object is passed
    default: () => ({ name: '', type: '', sprites: { front_default: '' }, hp: 0 })  // Provide default values for safety
  }
});

const playCry = () => {
  const cryUrl = props.pokemonDetails.cries.latest;
  const audio = new Audio(cryUrl);
  audio.play();
};
</script>

<style scoped>
.pokemon-card {
  background-color: var(--grey-color);
  padding: 40px;
  display: flex;
  flex-flow: column;
  align-items: baseline;
  border-radius: 16px 0 0 0;
  padding: 20px;
  width: 160px;
  height: 400px;
  overflow-y: hidden;
}

.pokemon-card-header h1 {
  font-family: "Pixelify Sans", sans-serif;
  font-weight: 100;
  font-style: normal;
  text-align: start;
  font-size: 24px;
  color: var(--primary-color);
}
</style>

<template>
  <div class="pokemon-list-container" ref="scrollContainer" @scroll="handleScroll">
    <!-- Display Pokémon -->
    <div v-for="pokemon in pokemons" :key="pokemon.name" class="pokemon-list" @click="$emit('select', pokemon)">
      <p>{{ pokemon.name }}</p>
    </div>
    <!-- Show loading state -->
    <div v-if="loading" class="loading">Loading more Pokémon...</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const pokemons = ref([]);
const offset = ref(0);
const limit = 20;
const loading = ref(false);
const allLoaded = ref(false);
const scrollContainer = ref(null);


const loadPokemons = async () => {
  if (loading.value || allLoaded.value) return;

  loading.value = true;

  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset.value}`
    );
    const data = await response.json();

    if (data.results.length === 0) {
      allLoaded.value = true;
    } else {
      pokemons.value.push(...data.results);
      offset.value += limit;
    }
  } catch (error) {
    console.error('Error loading Pokémon:', error);
  } finally {
    loading.value = false;
  }
};

const handleScroll = () => {
  const container = scrollContainer.value;
  const scrollTop = container.scrollTop;
  const containerHeight = container.clientHeight;
  const contentHeight = container.scrollHeight;

  if (scrollTop + containerHeight >= contentHeight - 10) {
    loadPokemons();
  }
};

onMounted(() => {
  loadPokemons();
});
</script>

<style scoped>
.pokemon-list-container {
  height: 500px;
  width: 40%;
  overflow-y: scroll;
  scroll-behavior: smooth;
  border-radius: 0 16px 0 0;
  padding: 20px;
  background-color: #6e6e6e;
  box-shadow: 0px 4px 7px 3px rgba(72, 39, 0, 0.68);
}

.pokemon-list-container::-webkit-scrollbar {
  width: 0px;
  background: transparent;
}

.pokemon-list {
  padding: 8px 0 8px 8px;
  border-radius: 0 8px 8px 0;
  text-align: start;
  background-color: #999999;
  width: 100%;
  margin-bottom: 4px;
  cursor: pointer;
}

.pokemon-list p {
  font-family: "Pixelify Sans", sans-serif;
  font-weight: 100;
  font-style: normal;
  color: var(--white-color);
}

.pokemon-list:hover {
  background-color: #d1d1d1;
}

.loading {
  text-align: center;
  width: 100%;
  margin-top: 20px;
}
</style>

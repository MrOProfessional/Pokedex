<template>
  <Transition name="main">
    <div class="container" v-if="!isLoading">
      <header>
        <div class="header">
          <img src="./assets/images/header.png" class="header-image" alt="you gotta catch em all">
        </div>
      </header>
      <section>

      </section>
      <main class="pokedex" :style="boxShadowStyle">
        <div class="pokedex-header">
          <PokedexInterface @changeColor="handleColorChange"></PokedexInterface>
        </div>
        <div class="pokedex-container">
          <PokemonList @select="handlePokemonSelect"></PokemonList>
          <PokemonDetail v-if="selectedPokemon" :pokemon-details="selectedPokemon" />
        </div>
        <div class="pokedex-footer"></div>
      </main>
    </div>
  </Transition>

  <Transition name="loading">
    <div class="isLoading" v-if="isLoading">
      <h1 class="loading-title">Charging out batteries...</h1>
      <img src="./assets/gifs/loading.gif" alt="pikachu running" class="loading-image">
    </div>
  </Transition>


</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import PokemonList from './components/PokemonList.vue'
import PokedexInterface from './components/PokedexInterface.vue'
import PokemonDetail from './components/PokemonDetail.vue'
import { ref, onBeforeMount, computed } from 'vue';

const selectedPokemon = ref(null); // To store the selected Pokémon
const isLoading = ref(false);
const selectedColor = ref(1);

onBeforeMount(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, 600);
  isLoading.value = true;
})
const handlePokemonSelect = async (pokemon) => {
  try {
    const response = await fetch(
      pokemon.url
    );

    const data = await response.json();
    if (!!data) {
      selectedPokemon.value = data;
      console.log(selectedPokemon.value);
    } else {

    }
  } catch (error) {
    console.error('Error loading Pokémon:', error);
  }
};

const boxShadowStyle = computed((color) => {
  let selectedColor = 'rgba(250, 219, 20, 1)';
  if (color === 1) {
    selectedColor = 'rgba(250, 219, 20, 1)';
  } else if (color === 2) {
    selectedColor = 'rgb(20, 250, 77)'
  } else {
    selectedColor = 'rgb(250, 20, 20)';
  }
  return {
    boxShadow: `box-shadow: 0px 15px 125px 130px ${selectedColor}`, // Apply dynamic box shadow
  };
});

// const handleColorChange = async (color) => {

// }

</script>


<style scoped>
#app {}

.loading-title {
  color: var(--primary-accent);
}

.header {
  z-index: 1;
  position: relative;
}

.header-image {
  width: 400px;
}

.loading-image {
  width: 300px;
  height: 200px;
}

.main-enter-active,
.main-leave-active {
  transition: opacity 0.5s ease-in;
}

.loading-main,
.loading-leave-to {
  opacity: 0;
}

.loading-enter-active,
.loading-leave-active {
  transition: opacity 0.1s ease;
}

.loading-main,
.loading-leave-to {
  opacity: 0;
}

.pokedex {
  width: 430px;
  height: 580px;
  border-radius: 16px;
  background-color: var(--primary-color);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-flow: column;
  -webkit-box-shadow: 0px 15px 125px 60px rgba(250, 219, 20, 1);
  -moz-box-shadow: 0px 15px 125px 60px rgba(250, 219, 20, 1);
  box-shadow: 0px 15px 125px 60px rgba(250, 219, 20, 1);
  overflow-y: hidden;
  position: relative;

  /* Allow the parent to be scrollable */
  scroll-behavior: smooth;
  /* Enable smooth scrolling */
}

/* Initial state of the second div */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.pokedex-footer {
  width: 100%;
  height: 60px;
  background-color: var(--primary-accent);
  position: absolute;
  bottom: 0;
  border-radius: 16px 16px 0 0;
}

.pokedex-container {
  display: flex;
  justify-content: space-between;
  gap: 2px;
  align-items: baseline;
  width: 100%;
  padding-bottom: 20px;
  margin-top: 20px;
}

.pokedex::-webkit-scrollbar {
  width: 0px;
  background: transparent;
}

.pokedex-header {
  width: inherit;
  background-color: var(--primary-accent);
  height: 100px;
  border-radius: 16px 16px 64px 16px;
  -webkit-box-shadow: inset 0px 4px 20px 4px rgba(97, 19, 0, 0.68);
  -moz-box-shadow: inset 0px 4px 20px 4px rgba(97, 19, 0, 0.68);
  box-shadow: 0px 4px 7px -3px rgba(128, 39, 0, 0.68);
}
</style>

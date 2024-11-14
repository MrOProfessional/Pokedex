<template>
  <main class="pokedex-interface">
    <div class="pokedex-interface__camera">
      <div class="pokedex-interface__camera-lens"></div>
    </div>
    <div class="pokedex-buttons">
      <button class="button1" @click="$emit('changeColor', 1)"></button>
      <button class="button2" @click="$emit('changeColor', 2)"></button>
      <button class="button3" @click="$emit('changeColor', 3)"></button>
    </div>
  </main>

</template>

<script setup lang="ts">

</script>

<style scoped>
button {
  cursor: pointer;
}

.pokedex-interface {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  height: inherit;
}

.pokedex-interface__camera {
  height: 48px;
  width: 48px;
  border-radius: 50%;
  background-color: var(--color-white);
  border: 2px solid var(--ternary-color);
}

.pokedex-interface__camera-lens {
  height: 48px;
  width: 48px;
  border-radius: 50%;
  background-color: var(--white-color);
  box-shadow: 0px 4px 7px 3px rgba(72, 39, 0, 0.68);
}

.pokedex-interface__camera-lens-highlight {
  height: 46px;
  width: 46px;
  border-radius: 50%;
  background-color: var(--ternary-color);
}

.pokedex-buttons button {
  height: 24px;
  width: 24px;
  border-radius: 50%;
}

.pokedex-buttons {
  display: flex;
  justify-content: space-between;
  gap: 2px;
  align-items: center;
}

.pokedex-buttons .button1 {
  background-color: #dff801;
}

.pokedex-buttons .button2 {
  background-color: #18ff18;
}

.pokedex-buttons .button3 {
  background-color: #f85c01;
}
</style>

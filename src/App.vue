<template>
  <div id="app">
    <h1>MOEBIUS DUNGEONS ADVENTURER CREATOR</h1>
    <CharacterCanvas />
  </div>
</template>

<script>
import '@/css/fonts.css'

import CharacterCanvas from "@/components/CharacterCanvas"

export default {
  name: 'App',
  components: {
    CharacterCanvas,
  }
}
</script>

<style>
#app {
  width:100%;
  height:100%;
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>

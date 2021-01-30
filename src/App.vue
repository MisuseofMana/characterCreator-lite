<template>
  <div id="app">
    <b-container>
      <b-row class="mb-4">
        <b-col>
          <h1 class="responsiveFont">KINGLOYAL ADVENTURER GENERATOR</h1>
          <p class="tiny">V.0.2. Created by Sean Yager, &copy; 2021, All rights reserved.</p>
        </b-col>
      </b-row>

        <CharacterCanvas />

    </b-container>
  </div>
</template>

<script>
import '@/css/globals.css'

import CharacterCanvas from "@/components/CharacterCanvas"

export default {
  name: 'App',
  components: {
    CharacterCanvas,
  },
}
</script>

<style>
#app {
  margin-top:15px;
}

.header {
  margin-bottom:30px;
}

.tiny {
  font-size:.6vw;
  align-self: auto;
  margin:5px;
}

.icon {
  font-size:1vw;
}

h1.responsiveFont {
  font-size:2vw;
}
</style>

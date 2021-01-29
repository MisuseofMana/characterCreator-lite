<template>
  <div id="app">
    <b-container>
      <b-row class="mb-4">
        <b-col>
          <h1 class="h1-responsive">KINGLOYAL ADVENTURER GENERATOR</h1>
          <p class="tiny">Created by Sean Yager, &copy; 2021, All rights reserved.</p>
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
  font-size:10px;
  align-self: auto;
}

::v-deep h1 {
  font-size:3vw;
}
</style>

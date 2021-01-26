<template>
  <div id="app">
    <div class="header">
      <h1>MOEBIUS DUNGEONS ADVENTURER CREATOR</h1>
      <p class="tiny">Created by Sean Yager, &copy; 2021, All rights reserved.</p>
    </div>
    <LoadingSpinner v-if="!loading" />
    <CharacterCanvas v-if="loading" @loaded-success="toggleLoading()"/>
  </div>
</template>

<script>
import '@/css/globals.css'

import CharacterCanvas from "@/components/CharacterCanvas"
import LoadingSpinner from "@/components/LoadingSpinner"

export default {
  name: 'App',
  data() {
    return {
      loading: true
    }
  },
  components: {
    CharacterCanvas,
    LoadingSpinner,
  },
  methods () {
    this.loading = !this.loading
  }
}
</script>

<style>

h1 {
  font-size:25px;
  line-height:27px;
}

p {
  font-size:10px;
  line-height:12px;
};

.header {
  margin-bottom:40px;
}

@media (min-width: 768px) {
#app {
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.header {
  margin-bottom:30px;
}

.tiny {
  font-size:8px;
  align-self: auto;
}
}
</style>

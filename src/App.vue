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

<style lang="scss">
@import "~bootstrap/scss/_functions.scss";
@import "~bootstrap/scss/_variables.scss";
@import "~bootstrap/scss/mixins/_breakpoints.scss";

@include media-breakpoint-up(xs) {  }
@include media-breakpoint-up(sm) {  }
@include media-breakpoint-up(md) {  }
@include media-breakpoint-up(lg) {  }
@include media-breakpoint-up(xl) {  }

#app {
  margin-top:15px;
}

.header {
  margin-bottom:30px;
}

@include media-breakpoint-up(xs) {
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
}
@include media-breakpoint-up(sm) {
.tiny {
  font-size:1.3vw;
  align-self: auto;
  margin:5px;
}

.icon {
  font-size:3vw;
}

h1.responsiveFont {
  font-size:3vw;
}
}
@include media-breakpoint-up(md) { 
.tiny {
  font-size:.9vw;
  align-self: auto;
  margin:5px;
}

.icon {
  font-size:2vw;
}

h1.responsiveFont {
  font-size:2vw;
}
}
@include media-breakpoint-up(lg) {
.tiny {
  font-size:.8vw;
  align-self: auto;
  margin:5px;
}

.icon {
  font-size:1.5vw;
}

h1.responsiveFont {
  font-size:2.4vw;
}
}
@include media-breakpoint-up(xl) {
.tiny {
  font-size:.9vw;
  align-self: auto;
  margin:5px;
}

.icon {
  font-size:1vw;
}

h1.responsiveFont {
  font-size:2vw;
}
}

// Example usage:

</style>

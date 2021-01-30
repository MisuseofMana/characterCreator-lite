<template>
  <div id="app">
    <b-container>
      <b-row class="mb-3">
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
import '@/css/globals.scss'

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

@include media-breakpoint-up(xs) {
#app {
  margin-top:5px;
}

h1.responsiveFont {
  font-size:clamp(5px, 4vw, 20px);
}
.tiny {
  font-size:clamp(3px, 1.7vw, 15px);
  margin:0;
}

.icon {
  font-size:clamp(10px, 2vw, 15px);
}

 .menuButton {
    width:100%;
    height:35px;
    margin:5px 0;
  }
}

@include media-breakpoint-up(sm) {

}
@include media-breakpoint-up(md) { 

}
@include media-breakpoint-up(lg) {

}
@include media-breakpoint-up(xl) {

}

// Example usage:

</style>

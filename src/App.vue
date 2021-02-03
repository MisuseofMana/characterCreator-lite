<template>
  <div id="app">
    <b-container>
      <b-row class="mb-3">
        <b-col>
          <h1 class="responsiveFont">KINGLOYAL ADVENTURER GENERATOR</h1>
          <p class="tiny">V.0.4. Created by Sean Yager, &copy; 2021, All rights reserved.</p>
        </b-col>
      </b-row>

      <CharacterCanvas />

    </b-container>
  </div>
</template>

<script>
import '@/css/globals.scss'
import '@/css/inputSlidersReset.css'
import '@/css/inputSliders.css'
import '@/css/specialSliders.css'

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

.dot{
    cursor:pointer;
    border-radius:999px;
    display:flex;
    justify-content: center;
    align-items: center;
}

.dotborder {
    border:solid 1px black;
    background:white;
    display:flex;
    justify-content: center;
    align-items: center;
}

@include media-breakpoint-up(xs) {
  .editorButton {
    width:10vw;
    height:10vw;
    margin:1px;
  }

  h1.responsiveFont {
    font-size:clamp(5px, 4vw, 20px);
    margin:10px 0;
  }
  .tiny {
    font-size:clamp(3px, 2vw, 12px);
    margin:0;
  }

  .icon {
    font-size:clamp(5px, 9vw, 18px);
  }

 .menuButton {
    width:100%;
    height:50px;
    margin:5px 0;
  }

  .dot {
    width:60px; 
    height:60px;
    margin:5px;
  }
}

@include media-breakpoint-up(sm) {
  .editorButton {
    width:8vw;
    height:8vw;
    margin:1px;
  }

  h1.responsiveFont {
    font-size:clamp(5px, 4vw, 20px);
    margin:10px 0;
  }

  .tiny {
    font-size:clamp(3px, 2vw, 12px);
    margin:0;
  }

  .icon {
    font-size:clamp(5px, 3vw, 25px);
  }

 .menuButton {
    width:100%;
    height:40px;
    margin:5px 0;
  }

  .dot {
    width:60px; 
    height:60px;
    margin:5px;
  }
}

@include media-breakpoint-up(md) {
  .editorButton {
    width:9vw;
    height:9vw;
    margin:1px;
  }

  h1.responsiveFont {
    font-size:clamp(5px, 6vw, 30px);
    margin:10px 0;
  }

  .tiny {
    font-size:clamp(3px, 3vw, 15px);
    margin:0;
  }

  .icon {
    font-size:clamp(5px, 2.5vw, 25px);
  }

 .menuButton {
    width:100%;
    height:50px;
    margin:5px 0;
  }

  .dot {
    width:50px; 
    height:50px;
    margin:5px;
  }
}
@include media-breakpoint-up(lg) {
  .editorButton {
    width:8vw;
    height:8vw;
    margin:1px;
  }

  h1.responsiveFont {
    font-size:clamp(5px, 6vw, 30px);
    margin:10px 0;
  }

  .tiny {
    font-size:clamp(3px, 2vw, 20px);
    margin:0;
  }

  .icon {
    font-size:clamp(10px, 5vw, 30px);
  }

 .menuButton {
    width:100%;
    height:70px;
    margin:5px 0;
  }

  .dot {
    width:70px; 
    height:70px;
    margin:5px;
  }
}
@include media-breakpoint-up(xl) {
  .editorButton {
    width:3vw;
    height:3vw;
    margin:1px;
  }

  h1.responsiveFont {
    font-size:clamp(5px, 6vw, 30px);
    margin:10px 0;
  }

  .tiny {
    font-size:clamp(3px, 2vw, 12px);
    margin:0;
  }

  .icon {
    font-size:clamp(10px, 3vw, 20px);
  }

 .menuButton {
    width:100%;
    height:60px;
    margin:5px 0;
  }

  .dot {
    width:50px; 
    height:50px;
    margin:5px;
  }
}


// Example usage:

</style>

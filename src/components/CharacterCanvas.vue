<template>
<div>
  <div class="grid">

  </div>
  <canvas id="canvas" width="500" height="500"></canvas>
</div>
</template>

<script>

export default {
  data() {
    return {
      selections: {
          body: 3,
          eyes: 5,
          mouth: 2,
          nose: 0,
          faceHair: 3,
          hair: 2,
          clothes: 1
      }
    }
  },
  mounted(){

    let bases = new Image();
    bases.src = require("@/assets/imgs/ss-all.png");
    bases.onload = function() {
      init();
    };

    let canvas = document.querySelector('canvas');
    let ctx = canvas.getContext('2d');

    let init = () => {
      let spriteHeight = 0;
      for(let selection in this.selections){
        if(selection !== null) {
           ctx.drawImage(bases, this.selections[selection]*500, spriteHeight, 500, 500, 0, 0, 500, 500);
        }
        spriteHeight += 500;
      }
    }
  },
}
</script>

<style scoped>
  #canvas {
    border: solid 2px black;
  }
</style>

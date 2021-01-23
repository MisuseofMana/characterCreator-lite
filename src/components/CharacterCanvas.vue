<template>
<div>

  <div class="flexColumn">
    <div class="flexRowFit">
      <div v-for="(mods, name) in selections" :key="selections[mods]">
        <PartMenu @current-open="setActive($event)" :type="name" :open.sync="active"> </PartMenu>
      </div>
    </div>

    <div class="flexRowFit">
      <transition name="fade" mode="out-in">
        <PartEditor
          @change-position="moveSprite($event)" 
          @new-pick="pickNewItem($event)"
          @disable-item="disableItem($event)"
          @change-color="changeColor($event)"
          :type="active" 
          :maxRange="selections[active].max" 
          :key="`${active}editor`" 
          :selected="selections[active].which" 
        />
      </transition>
    </div>
    <div class="flexRowFit">
      <p>Right click character and click save as to download. Have fun!</p>
    </div>
  </div>
  

  <canvas id="canvas" width="500" height="500"></canvas>

  <canvas id="stageCanvas" class="hidden" width="500" height="500"></canvas>

</div>
</template>

<script>
import PartMenu from '@/components/PartMenu'
import PartEditor from '@/components/PartEditor'

export default {
  components: {
    PartMenu,
    PartEditor,
  },
  data() {
    return {
      active: 'body',
      selections: {
          body: {
            which: 0,
            top: 0,
            left: 0,
            max: 5,
            disable: false,
            color: null
          },
          extras:{
            which: 0,
            top: 0,
            left: 0,
            max: 3,
            disable: false,
            color: null
          },
          eyes: {
            which: 0,
            top: 0,
            left: 0,
            max:11,
            disable: false,
            color: null
          },
          mouth: {
            which: 0,
            top: 0,
            left: 0,
            max: 4,
            disable: false,
            color: null
          },
          nose: {
            which: 0,
            top: 0,
            left: 0,
            max: 4,
            disable: false,
            color: null
          },
          beard: {
            which: 0,
            top: 0,
            left: 0,
            max: 1,
            disable: false,
            color: null
          },
          hair: {
            which: 0,
            top: 2,
            left: 0,
            max: 6,
            disable: false,
            color: null
          },
          clothes: {
            which: 0,
            top: 2,
            left: 0,
            max: 5,
            disable: false,
            color: null
          },
      },
      base: null,
      defaultColor:'rgba(255,255,255,0.1)',
      colors: {
        none: null,
        red: 'rgba(180, 0, 0, 0.3)',
        yellow: 'rgba(235, 199, 0, 0.3)',
        brown: 'rgba(119, 58, 23, 0.3)',
        peach: 'rgb(248, 192, 160, 0.3)',
        black: 'rgba(43, 38, 35, 0.3)',
        darkbrown: 'rgba(85, 60, 46, 0.3)',
        purple: 'rgba(151, 14, 105, 0.3)',
        green: 'rgba(7, 170, 89, 0.3)',
        blue: 'rgba(1, 94, 201, 0.3)',
        orange: 'rgba(255, 105, 18, 0.3)'
      },
    }
  },
  computed: {
    canvas () {
      return document.getElementById('canvas');
    },
    ctx () {
      return this.canvas.getContext('2d');
    },
    stageCanvas() {
      return document.getElementById('stageCanvas')
    },
    stagectx () {
      return this.stageCanvas.getContext('2d');
    }
  },
  methods:{
    setActive(e){
      this.active = e;
    },
    init(){
      let spriteHeight = 0;
      this.ctx.clearRect(0,0,500,500)

      for(let selection in this.selections){

        if(this.selections[selection].disable === false) {
          this.stagectx.globalCompositeOperation = "source-over";
          this.stagectx.drawImage(this.base, this.selections[selection].which*500, spriteHeight, 500, 500, this.selections[selection].top, this.selections[selection].left, 500, 500);
          
          if (this.selections[selection].color !== null) {
            this.stagectx.fillStyle = this.selections[selection].color;
            this.stagectx.globalCompositeOperation = "source-atop";
            this.stagectx.fillRect(0, 0, 500, 500);
          }

          this.ctx.globalCompositeOperation = "source-over";
          this.ctx.drawImage(this.stageCanvas, 0, 0, 500, 500, 0, 0, 500, 500);
          this.stagectx.clearRect(0,0,500,500)
        }
        spriteHeight += 500;
      }
    },
    moveSprite(e) {
      if(e.direction === 'y'){
        this.selections[this.active].left += e.value;
      }

      if(e.direction === 'x') {
        this.selections[this.active].top += e.value;
      }
        this.init();
    },
    pickNewItem(e) {
      this.selections[this.active].which = e;
      this.selections[this.active].disable = false;
      this.init();
    },
    disableItem(e) {
      if(e === 'disable') {
        this.selections[this.active].disable = true;
        this.init();
      }
    },
    changeColor(e) {
      this.selections[this.active].color = this.colors[e];
      this.init();
    },
  },
  mounted(){

    let bases = new Image();
    bases.src = require("@/assets/imgs/spritesheet.png");

    this.base = bases;

    for(let selection in this.selections){
      let randomPick = Math.floor(Math.random() * this.selections[selection].max);
      this.selections[selection].which = randomPick;
    }

    bases.onload = () => {
      this.init();
    };


  },
}
</script>

<style scoped>
  button {
    padding:10px;
  }

  .hidden {
    display:none;
  }

  #canvas {
    border: solid 2px black;
  }

  .flexRowFit {
    max-width:50vw;
    margin-right:50px;
    padding:10px;
    display:flex;
    flex-wrap:wrap;
    flex-direction:row;
    justify-content:flex-start;
    align-items:flex-start;
  }

  .flexColumn {
    padding:10px;
    max-width:50vw;
    margin-right:50px;
    float:left;
    display:flex;
    flex-direction:column;
    justify-content:flex-start;
    align-items:flex-start;
  }
  
  .flexRow {
    display:flex;
  }

  .fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>

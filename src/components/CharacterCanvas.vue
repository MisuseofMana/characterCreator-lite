<template>
<div class="flexRow">

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
          @randomize-character="randomize()"
          @reset-character="reset()"
          @rotate-canvas="rotateCanvas()"
          @reset-rotation="resetRotation()"
          :type="active" 
          :maxRange="selections[active].max" 
          :key="`${active}editor`" 
          :selected="selections[active].which" 
        />
      </transition>
    </div>
  </div>
  
  <div class="flexColumn">
    <canvas id="canvas" width="500" height="500"></canvas>
    <p>Right click character and click save image as to download. Have fun!</p>
  </div>

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
            rotation: 0,
            max: 5,
            disable: false,
            color: null
          },
          extras:{
            which: 0,
            top: 0,
            left: 0,
            rotation:0,
            max: 8,
            disable: true,
            color: null
          },
          eyes: {
            which: 0,
            top: 0,
            left: 0,
            rotation: 0,
            max:18,
            disable: false,
            color: null
          },
          brows: {
            which: 0,
            top: 0,
            left: 0,
            rotation: 0,
            max:7,
            disable: false,
            color: null
          },
          mouth: {
            which: 0,
            top: 0,
            left: 0,
            rotation: 0,
            max: 8,
            disable: false,
            color: null
          },
          nose: {
            which: 0,
            top: 0,
            left: 0,
            rotation: 0,
            max: 6,
            disable: false,
            color: null
          },
          beard: {
            which: 0,
            top: 0,
            left: 0,
            rotation: 0,
            max: 3,
            disable: true,
            color: null
          },
          ears: {
            which: 0,
            top: 2,
            left: 0,
            rotation: 0,
            max: 2,
            disable: true,
            color: null
          },
          hair: {
            which: 0,
            top: 2,
            left: 0,
            rotation: 0,
            max: 8,
            disable: false,
            color: null
          },
          hairExtra: {
            which: 0,
            top: 0,
            left: 0,
            rotation: 0,
            max: 2,
            disable: true,
            color: null
          },
          clothes: {
            which: 0,
            top: 2,
            left: 0,
            rotation: 0,
            max: 6,
            disable: false,
            color: null
          },
      },
      options: {
        body: null,
        extras: null,
        eyes: null,
        mouth: null,
        nose: null,
        beard: null,
        ears: null,
        hair: null,
        hairExtra: null,
        clothes: null,
      },
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
      colorList:['none','red', 'yellow', 'brown', 'peach', 'black', 'darkbrown', 'purple', 'green', 'blue', 'orange']
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
      this.ctx.clearRect(0,0,500,500)

      let optionsLoop = ['body', 'extras', 'eyes', 'brows', 'mouth', 'nose', 'beard', 'ears', 'hair', 'hairExtra', 'clothes'];

      let i = 0;

      for(let selection in this.selections){
        if(this.selections[selection].disable === false) {
          this.stagectx.globalCompositeOperation = "source-over";
          
          if (this.selections[selection].rotation !== 0) {
            this.stagectx.save();
            this.stagectx.translate(250, 250);
            this.stagectx.rotate(Math.PI / 4 * (-this.selections[selection].rotation / 2));
            this.stagectx.translate(-250, -250); 
          }
            
          this.stagectx.drawImage(this.options[optionsLoop[i]], this.selections[selection].which*500, 0, 500, 500, this.selections[selection].top, this.selections[selection].left, 500, 500);
          this.stagectx.restore(); 

          if (this.selections[selection].color !== null) {
            this.stagectx.fillStyle = this.selections[selection].color;
            this.stagectx.globalCompositeOperation = "source-atop";
            this.stagectx.fillRect(0, 0, 500, 500);
          }

          this.ctx.globalCompositeOperation = "source-over";
          this.ctx.drawImage(this.stageCanvas, 0, 0, 500, 500, 0, 0, 500, 500);
          this.stagectx.clearRect(0,0,500,500)
        }
        i++
      }
    },
    moveSprite(e) {
      if(e.direction === 'y'){
        this.selections[this.active].left += e.value;
      }

      if(e.direction === 'x') {
        this.selections[this.active].top += e.value;
      }

      if(e.direction === 'xy-neg') {
        this.selections[this.active].left += e.value;
        this.selections[this.active].top += e.value
      }

      if(e.direction === 'xy-pos') {
        this.selections[this.active].left += e.value;
        this.selections[this.active].top -= e.value
      }

      if(e.direction === 'reset') {
        this.selections[this.active].left = 0;
        this.selections[this.active].top = 0;
      }
        this.init();
    },
    pickNewItem(e) {
      this.selections[this.active].which = e;
      this.selections[this.active].disable = false;
      this.init();
    },
    rotateCanvas() {
      this.selections[this.active].rotation += 15;
      if(this.selections[this.active].rotation >= 360) {
        this.selections[this.active].rotation = 0;
      }
      this.init()
    },
    resetRotation(){
       this.selections[this.active].rotation = 0;
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
    randomize() {
      for(let selection in this.selections){
        let randomPick = Math.floor(Math.random() * this.selections[selection].max);
        this.selections[selection].which = randomPick;
        let randomColor = Math.floor(Math.random() * this.colorList.length-1);
        this.selections[selection].color = this.colors[this.colorList[randomColor]];
        this.init()
      }
    },
    reset() {
      for(let selection in this.selections){
        let randomPick = Math.floor(Math.random() * this.selections[selection].max);
        this.selections[selection].left = 0;
        this.selections[selection].top = 0;
        this.selections[selection].which = randomPick;
        this.selections[selection].color = null;
        this.selections[selection].rotation = 0;
        this.init();
    }
    }
  },
  mounted(){

    let bodys = new Image();
    bodys.src = require("@/assets/imgs/bodys.png");
    this.options.body = bodys;
    
    let extras = new Image();
    extras.src = require("@/assets/imgs/extras.png");
    this.options.extras = extras;
    
    let eyes = new Image();
    eyes.src = require("@/assets/imgs/eyes.png");
    this.options.eyes = eyes;
    
    let brows = new Image();
    brows.src = require("@/assets/imgs/brows.png");
    this.options.brows = brows;

    let mouth = new Image();
    mouth.src = require("@/assets/imgs/mouth.png");
    this.options.mouth = mouth;

    let nose = new Image();
    nose.src = require("@/assets/imgs/nose.png");
    this.options.nose = nose;

    let beard = new Image();
    beard.src = require("@/assets/imgs/beard.png");
    this.options.beard = beard;

    let ears = new Image();
    ears.src = require("@/assets/imgs/ears.png");
    this.options.ears = ears;

    let hair = new Image();
    hair.src = require("@/assets/imgs/hair.png");
    this.options.hair = hair;
    
    let hairExtra = new Image();
    hairExtra.src = require("@/assets/imgs/hairExtra.png");
    this.options.hairExtra = hairExtra;

    let clothes = new Image();
    clothes.src = require("@/assets/imgs/clothes.png");
    this.options.clothes = clothes;

    for(let selection in this.selections){
      let randomPick = Math.floor(Math.random() * this.selections[selection].max);
      this.selections[selection].which = randomPick;
    }

    clothes.onload = () => {
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
    margin:5px 0;
  }

  .fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>

<template>
<div class="flexRow">
  <div class="flexColumn">
    <div class="flexRowFit">
      <div class="menuItemPad" v-for="(mods) in selections" :key="mods.name+'menu'">
        <PartMenu @current-open="setActive($event)" :type="mods.name" :open.sync="active"> </PartMenu>
      </div>
    </div>

    <div class="flexRow">
      <transition name="fade" mode="out-in">
        <PartEditor
          @change-position="moveSprite($event)" 
          @new-pick="pickNewItem($event)"
          @random-item="randomItem()"
          @disable-item="disableItem($event)"
          @change-color="changeColor($event)"
          @rotate-canvas="rotateCanvas($event)"
          @reset-rotation="resetRotation()"
          @scale-sprite="scaleSprite($event)"
          @move-layer="moveLayer($event)"
          :hidden="selections[activeIndex].disable"
          :type="active" 
          :maxRange="selections[activeIndex].max" 
          :key="`${active}editor`" 
          :which="selections[activeIndex].which"
        />
      </transition>
    </div>
  
      <div class="flexRowFit">
          <div class="border margin arrow" @click="randomize()">
              <font-awesome-icon :icon="['fas', 'dice']" />
          </div>
          <div class="border margin arrow" @click="reset()">
              <font-awesome-icon :icon="['fas', 'sync']" />
          </div>
      </div>
  
  </div>
  
  <div class="flexColumnCenter">
    <canvas id="canvas" width="500" height="500"></canvas>
    <div id="download" @click="downloadImage()">
      <p class="border">DOWNLOAD CHARACTER</p>
    </div>
  </div>


  <canvas class="hidden" id="stageCanvas" width="500" height="500"></canvas>

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
      loading:true,
      active: 'body',
      selections: [
        {
          name:'hair-back',
          sprites: {
            lines:[],
            flats:[],
            options:[],
          },
          which: 0,
          top: 0,
          left: 0,
          rotation: 0,
          scaleWidth:500,
          scaleHeight:500,
          max: 0,
          disable: true,
          color: null
        },
        {
          name: 'body',
          sprites: {
            lines:[],
            flats:[],
            options:[],
          },
          which: 0,
          top: 2,
          left: 0,
          rotation: 0,
          scaleWidth:500,
          scaleHeight:500,
          max: 0,
          disable: false,
          color: null
        },
        {
          name: 'extras',
          sprites: {
            lines:[],
            flats:[],
            options:[],
          },
          which: 0,
          top: 0,
          left: 0,
          rotation:0,
          scaleWidth:500,
          scaleHeight:500,
          max: 0,
          disable: true,
          color: null
        },

        {
          name:'eyes',
          sprites: {
            lines:[],
            flats:[],
            options:[],
          },
          which: 0,
          top: 0,
          left: 0,
          rotation: 0,
          scaleWidth:500,
          scaleHeight:500,
          max:0,
          disable: false,
          color: null
        },

        {
          name:'brows',
          sprites: {
            lines:[],
            flats:[],
            options:[],
          },
          which: 0,
          top: 0,
          left: 0,
          rotation: 0,
          scaleWidth:500,
          scaleHeight:500,
          max:0,
          disable: false,
          color: null
        },

        {
          name:'mouth',
          sprites: {
            lines:[],
            flats:[],
            options:[],
          },
          which: 0,
          top: 0,
          left: 0,
          rotation: 0,
          scaleWidth:500,
          scaleHeight:500,
          max: 0,
          disable: false,
          color: null
        },

        {
          name:'nose',
          sprites: {
            lines:[],
            flats:[],
            options:[],
          },
          which: 0,
          top: 0,
          left: 0,
          rotation: 0,
          scaleWidth:500,
          scaleHeight:500,
          max: 0,
          disable: false,
          color: null
        },

        {
          name:'ears',
          sprites: {
            lines:[],
            flats:[],
            options:[],
          },
          which: 0,
          top: 2,
          left: 0,
          rotation: 0,
          scaleWidth:500,
          scaleHeight:500,
          max: 0,
          disable: true,
          color: null
        },

        {
          name:'hair-front',
          sprites: {
            lines:[],
            flats:[],
            options:[],
          },
          which: 0,
          top: 2,
          left: 0,
          rotation: 0,
          scaleWidth:500,
          scaleHeight:500,
          max: 0,
          disable: false,
          color: null
        },
        {
          name:'clothes',
          sprites: {
            lines:[],
            flats:[],
            options:[],
          },
          which: 0,
          top: 2,
          left: 0,
          rotation: 0,
          scaleWidth:500,
          scaleHeight:500,
          max: 0,
          disable: false,
          color: null
        },
      ],
      disabledByDefault: ['extras', 'beard', 'hairExtra'],
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
    stageCanvas () {
      return document.getElementById('stageCanvas')
    },
    stagectx () {
      return this.stageCanvas.getContext('2d');
    },
    activeIndex () {
      const findActive = (item) => item.name === this.active;
      return this.selections.findIndex(findActive);
    },
    downloadButton () {
     return document.getElementById('download');
    }
  },
  methods:{
    setActive(e){
      this.active = e;
    },
    init(){
      this.ctx.clearRect(0,0,500,500)

      for(let selection of this.selections){
        if(selection.disable === false) {
          this.stagectx.globalCompositeOperation = "source-over";
          
          if (selection.rotation !== 0) {
            this.stagectx.save();
            this.stagectx.translate(250, 250);
            this.stagectx.rotate(Math.PI / 12 * (selection.rotation));
            this.stagectx.translate(-250, -250); 
          }
            
          this.stagectx.drawImage(selection.sprites, selection.which*500, 0, 500, 500, selection.top, selection.left, selection.scaleWidth, selection.scaleHeight);
          this.stagectx.restore(); 

          if (selection.color !== null) {
            this.stagectx.fillStyle = selection.color;
            this.stagectx.globalCompositeOperation = "source-atop";
            this.stagectx.fillRect(0, 0, 500, 500);
          }

          this.ctx.globalCompositeOperation = "source-over";
          this.ctx.drawImage(this.stageCanvas, 0, 0, 500, 500, 0, 0, 500, 500);
          this.stagectx.clearRect(0,0,500,500)
        }
      }
    },
    moveSprite(e) {
      if(e.direction === 'y'){
        this.selections[this.activeIndex].left += e.value;
      }

      if(e.direction === 'x') {
        this.selections[this.activeIndex].top += e.value;
      }

      if(e.direction === 'xy-neg') {
        this.selections[this.activeIndex].left += e.value;
        this.selections[this.activeIndex].top += e.value
      }

      if(e.direction === 'xy-pos') {
        this.selections[this.activeIndex].left += e.value;
        this.selections[this.activeIndex].top -= e.value
      }

      if(e.direction === 'reset') {
        this.selections[this.activeIndex].left = 0;
        this.selections[this.activeIndex].top = 0;
      }
        this.init();
    },
    scaleSprite(e) {
      if(e === 'tall' || e === 'up') {
        this.selections[this.activeIndex].scaleHeight += 5;
        this.selections[this.activeIndex].top -= 5;
      }
      if(e === 'short' || e === 'down') {
        this.selections[this.activeIndex].scaleHeight -= 5;
      }
      if(e === 'wide' || e === 'up') {
        this.selections[this.activeIndex].scaleWidth += 5;
      }
      if(e === 'thin' || e === 'down') {
        this.selections[this.activeIndex].scaleWidth -= 5;
      }
      if(e === 'reset') {
        this.selections[this.activeIndex].scaleWidth = 500;
        this.selections[this.activeIndex].scaleHeight = 500;
      }
      this.init();
    },
    pickNewItem(e) {
      this.selections[this.activeIndex].which = e;
      this.selections[this.activeIndex].disable = false;
      this.init();
    },
    rotateCanvas(e) {
      if(e === 'clockwise'){
        this.selections[this.activeIndex].rotation++;
      }
      if(e === 'counterclockwise'){
        this.selections[this.activeIndex].rotation--;
      }
      if(this.selections[this.activeIndex].rotation >= 24) {
        this.selections[this.activeIndex].rotation = 0;
      }
      this.init()
    },
    resetRotation(){
       this.selections[this.activeIndex].rotation = 0;
       this.init();
    },
    disableItem(e) {
      if(e === 'disable') {
        this.selections[this.activeIndex].disable = true;
        this.init();
      }

      if(e === 'enable') {
        this.selections[this.activeIndex].disable = false;
        this.init();
      }
    },
    moveLayer(e) {
      let indexFrom = this.activeIndex;
      let forwardIndex = indexFrom++;
      let backwardIndex = indexFrom--;
      console.log(backwardIndex, indexFrom, forwardIndex, )

      if(forwardIndex > this.selections.length - 1) {
        forwardIndex = 0;
      }

      if(backwardIndex < 0) {
        backwardIndex = this.selections.length - 1;
      }

      let movingItem = this.selections[indexFrom]
      console.log(movingItem.name)
      
      if(e === 'up') {
        this.selections[indexFrom] = this.selections[forwardIndex];
        this.selections[forwardIndex] = movingItem;
      }

      if(e === 'down') {
        this.selections[indexFrom] = this.selections[backwardIndex];
        this.selections[backwardIndex] = movingItem;
      }

      this.init();
    },
    randomItem(){
      let randomPick = Math.floor(Math.random() * this.selections[this.activeIndex].max);
      this.selections[this.activeIndex].which = randomPick;
      this.selections[this.activeIndex].disable = false;
      this.init();
    },
    changeColor(e) {
      this.selections[this.activeIndex].color = this.colors[e];
      this.init();
    },
    randomize() {
      for(let selection of this.selections){
        let randomPick = Math.floor(Math.random() * selection.max);
        selection.which = randomPick;
        let randomColor = Math.floor(Math.random() * this.colorList.length-1);
        selection.color = this.colors[this.colorList[randomColor]];
        selection.disable = false;
        this.init()
      }
    },
    reset() {
      for(let selection of this.selections){
        let randomPick = Math.floor(Math.random() * selection.max);
        selection.left = 0;
        selection.top = 0;
        selection.which = randomPick;
        selection.color = null;
        selection.rotation = 0;
        selection.scaleWidth = 500;
        selection.scaleHeight = 500;
        if(this.disabledByDefault.includes(selection.name)) {
          selection.disable = true;
        }
    }
        this.init();
    },
    downloadImage(){
    let downloadLink = document.createElement('a');
    downloadLink.setAttribute('download', 'YourAdventurer.png');
    this.canvas.toBlob(function(blob) {
      let url = URL.createObjectURL(blob);
      downloadLink.setAttribute('href', url);
      downloadLink.click();
    });
}
  },
  mounted(){
    let order = 0;
    let spriteOptions = ['flatCount', 'lineCount', 'optionsCount']
    let spriteOrder = spriteOptions[order];

    let promiseArray = this.selections.map((item, index) => {
      let numberOfImages = require(`@/assets/sprites/${item.name}/count.js`);
        let imagePromise = new Promise((resolve, reject) => {
          if(numberOfImages.default[spriteOrder] !== null){
            for( let folders = 0; folders <= spriteOptions.length-1; folders++ ) {
              for(let imageCount = 0; imageCount <= numberOfImages.default[spriteOptions]; imageCount++) {
                let img = new Image();
                img.src = require(`@/assets/sprites/${item.name}/${spriteOrder}/${index + 1}.png`);
                img.onload = () => {
                  this.selections[index].sprites.spriteOrder.push(img)
                  this.selections[index].max = numberOfImages;
                  resolve();
                }
                img.error = () => {
                  reject('An image loaded incorrectly. Try refreshing');
                }
              }
            }
          }
        });
      return imagePromise;
    });

    Promise.all(promiseArray).then(() => {
      this.selections.forEach((item, index) => {
        let randomPick = Math.floor(Math.random() * item.max);
        this.selections[index].which = randomPick;
      })
      this.$emit('loaded-success')
      this.init()
    })
  }
}
</script>

<style scoped>
  .hidden {
    display:none;
  }

@media (min-width: 768px) {
  #download {
    text-align:center;
    transition: all .1s;
  }

  #download p {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  #download:hover {
    background:rgb(136, 255, 215);
    transform:scale(1.05);
    transition: all .1s;
    cursor:pointer;
  }

  .border {
      border:solid 1px black;
      padding:10px;
  }

  .margin {
      margin:5px;
      width:15px;
      height:15px;
      display:flex;
      align-items: center;
      justify-content: center;
  }

  .arrow {
    cursor:pointer;
    transition: all .1s;
  }

  button {
    padding:10px;
  }

  #canvas {
    border: solid 2px black;
  }

  .flexRowFit {
    margin:0 50px 10px 0;
    padding:0px 10px 0 0;
    display:flex;
    flex-wrap:wrap;
    flex-direction:row;
    justify-content:flex-start;
    align-items:flex-start;
  }

  .flexColumn {
    margin-right:50px;
    max-width:70vw;
    display:flex;
    flex-direction:column;
  }
  
  .flexRow {
    display:flex;
    justify-content:center;
    align-items:center;
    margin:5px 0;
  }

  .fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
}
</style>

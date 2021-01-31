<template>
<b-row>
  <b-col cols="12" xl="2" class="mb-3">
    <b-row>
        <PartMenu @current-open="setActive($event)" type="body" :open.sync="active"> </PartMenu>
        <PartMenu @current-open="setActive($event)" type="eyes" :open.sync="active"> </PartMenu>
        <PartMenu @current-open="setActive($event)" type="brows" :open.sync="active"> </PartMenu>
        <PartMenu @current-open="setActive($event)" type="nose" :open.sync="active"> </PartMenu>
        <PartMenu @current-open="setActive($event)" type="mouth" :open.sync="active"> </PartMenu>
        <PartMenu @current-open="setActive($event)" type="ears" :open.sync="active"> </PartMenu>
        <PartMenu @current-open="setActive($event)" type="hair-front" :open.sync="active"> </PartMenu>
        <PartMenu @current-open="setActive($event)" type="hair-back" :open.sync="active"> </PartMenu>
        <PartMenu @current-open="setActive($event)" type="clothes" :open.sync="active"> </PartMenu>
        <PartMenu @current-open="setActive($event)" type="extras" :open.sync="active"> </PartMenu>
    </b-row>
  </b-col>

        <PartEditor
          @change-position="moveSprite($event)" 
          @new-pick="pickNewItem($event)"
          @random-item="randomItem()"
          @disable-item="disableItem($event)"
          @change-color="changeColor($event)"
          @rotate-clockwise="rotateClockwise($event)"
          @rotate-anti-clockwise="rotateAntiClockwise($event)"
          @reset-rotation="resetRotation()"
          @scale-sprite="scaleSprite($event)"
          @move-layer="moveLayer($event)"
          @randomize-character="randomize()"
          @reset-character="reRoll()"
          @reset-active="resetActive()"
          @set-open="setOpen($event)"
          :hidden="selections[activeIndex].disable"
          :type="active"
          :activeColor="selections[activeIndex].color"
          :maxRange="selections[activeIndex].max" 
          :key="`${active}editor`" 
          :which="selections[activeIndex].which"
          :expandedMenu="expandedMenu"
          :colorList="colorList"
        />

  <b-col cols="12" xl="5" class="mb-4 d-flex flex-row justify-content-center">
    <b-row align-h="center">
    <b-col cols="12" sm="11" md="10" class="d-flex flex-column justify-content-center ">
      <canvas id="canvas" class="mb-3" width="500" height="500"></canvas>
      <LoadingSpinner v-show="false" key="loader"/>
      <b-button id="download" class="mb-3" @click="downloadImage()">
        <h1 class="responsiveFont">
          DOWNLOAD CHARACTER
        </h1> 
      </b-button>
      <p class="tiny">Characters created using this generator are bound by the Creative Commons Attribution Share-Alike license. By downloading, using, distributing, or manipulating the characters here you are agreeing to the terms <a href="https://creativecommons.org/licenses/by-sa/3.0/us/">lain out here.</a>  </p>
    </b-col>
    </b-row>
  </b-col>
  
  <canvas class="hidden" width="500" height="500" id="stageCanvas"></canvas>

</b-row>
</template>

<script>
import PartMenu from '@/components/PartMenu'
import PartEditor from '@/components/PartEditor'
import LoadingSpinner from '@/components/LoadingSpinner'

export default {
  components: {
    PartMenu,
    PartEditor,
    LoadingSpinner
  },
  data() {
    return {
      loading:true,
      active: 'body',
      selections: [
        {
          name:'hair-back',
          sprites: {
            flat:[],
            flatImg: null,
            line:[],
            lineImg: null,
          },
          optionOn: false,
          which: 0,
          top: 0,
          left: 0,
          rotation: 0,
          scaleWidth:500,
          scaleHeight:500,
          max: 7,
          disable: false,
          color: null
        },
        {
          name: 'body',
          sprites: {
            flat:[],
            flatImg:null,
            line:[],
            lineImg:null,
          },
          optionOn: false,
          which: 0,
          top: 2,
          left: 0,
          rotation: 0,
          scaleWidth:500,
          scaleHeight:500,
          max: 6,
          disable: false,
          color: null
        },

        {
          name:'eyes',
          sprites: {
            flat:[],
            flatImg:null,
            line:[],
            lineImg:null,
          },
          optionOn: false,
          which: 0,
          top: 0,
          left: 0,
          rotation: 0,
          scaleWidth:500,
          scaleHeight:500,
          max:16,
          disable: false,
          color: null
        },

        {
          name:'brows',
          sprites: {
            flat:[],
            flatImg:null,
            line:[],
            lineImg:null,
          },
          optionOn: false,
          which: 0,
          top: 0,
          left: 0,
          rotation: 0,
          scaleWidth:500,
          scaleHeight:500,
          max:9,
          disable: false,
          color: null
        },

        {
          name:'mouth',
          sprites: {
            flat:[],
            flatImg:null,
            line:[],
            lineImg:null,
          },
          optionOn: false,
          which: 0,
          top: 0,
          left: 0,
          rotation: 0,
          scaleWidth:500,
          scaleHeight:500,
          max: 11,
          disable: false,
          color: null
        },

        {
          name:'nose',
          sprites: {
            flat:[],
            flatImg:null,
            line:[],
            lineImg:null,
          },
          optionOn: false,
          which: 0,
          top: 0,
          left: 0,
          rotation: 0,
          scaleWidth:500,
          scaleHeight:500,
          max: 11,
          disable: false,
          color: null
        },

        {
          name:'ears',
          sprites: {
            flat:[],
            flatImg:null,
            line:[],
            lineImg:null,
          },
          optionOn: false,
          which: 0,
          top: 2,
          left: 0,
          rotation: 0,
          scaleWidth:500,
          scaleHeight:500,
          max: 10,
          disable: false,
          color: null
        },
        
        {
          name: 'extras',
          sprites: {
            flat:[],
            flatImg:null,
            line:[],
            lineImg:null,
          },
          optionOn: false,
          which: 0,
          top: 0,
          left: 0,
          rotation:0,
          scaleWidth:500,
          scaleHeight:500,
          max: 14,
          disable: false,
          color: null
        },

        {
          name:'hair-front',
          sprites: {
            flat:[],
            flatImg:null,
            line:[],
            lineImg:null,
          },
          optionOn: false,
          which: 0,
          top: 2,
          left: 0,
          rotation: 0,
          scaleWidth:500,
          scaleHeight:500,
          max: 8,
          disable: false,
          color: null
        },
        {
          name:'clothes',
          sprites: {
            flat:[],
            flatImg:null,
            line:[],
            lineImg:null,
          },
          optionOn: false,
          which: 0,
          top: 2,
          left: 0,
          rotation: 0,
          scaleWidth:500,
          scaleHeight:500,
          max: 7,
          disable: false,
          color: null
        },
      ],
      defaultColor:'rgba(255,255,255,0.3)',
      imagesToLoad:0,
      expandedMenu: 'choose',
      colorList: {
        none:null,
        pale:'rgb(248, 220, 180)',
        peach:'rgb(248, 192, 160)',
        tan:'rgb(220, 131, 100)',
        brown:'rgb(119, 58, 23)',
        darkBrown:'rgb(85, 60, 46)',
        black:'rgb(30, 10, 30)',
        pink:'rgb(255, 106, 106)',
        red:'rgb(180, 0, 0)',
        orange:'rgb(255, 105, 18)',
        burntOrange:'rgb(200, 100, 0)',
        yellow:'rgb(255, 225, 0)',
        gold:'rgb(255, 190, 0)',
        lightGreen:'rgb(120, 255, 200)',
        blueGreen:'rgb(66, 245, 155)',
        green:'rgb(50, 180, 100)',
        blue:'rgb(0, 50, 255)',
        darkBlue:'rgb(0, 0, 100)',
        indigo:'rgb(50, 14, 100)',
        purple:'rgb(151, 14, 105)',
        neonPurple:'rgb(255, 0, 200)',
    }
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
    },
  },
  methods:{
    setActive(e){
      this.active = e;
    },
    init() {
      this.loading = true;
      this.imagesToLoad = 0;
      var img;
        for(let selection in this.selections){
          if (!this.selections[selection].disable){
            this.imagesToLoad += 2
          }
        }

        for(let selection in this.selections){
          let current = this.selections[selection]
          if(!current.disable){
              for(let i = 0; i < 2; i++){
                let sources = [current.sprites.flat[current.which], current.sprites.line[current.which]];
                let targets = ['flatImg', 'lineImg'];
                img = new Image(500,500);
                current.sprites[targets[i]] = img;
                img.onload = () => {
                  this.imagesToLoad--;
                  if (this.imagesToLoad <= 0) {
                    this.loading = false;
                    this.drawImages();
                  }
                }
                img.onerror = () => {
                  console.log('error loading image')
                }
                try {
                  img.src = require(`@/assets/sprites/${sources[i]}`);
                } catch {
                  this.imagesToLoad--;
                  current.sprites[targets[i]] = null;
                }
          }
        }
      }
    },
    drawImages(){
      this.ctx.clearRect(0,0,500,500)

      for(let selection in this.selections) {
        this.stagectx.globalCompositeOperation = "source-over";
        let current = this.selections[selection];

        if (current.rotation !== 0) {
          this.stagectx.save();
          this.stagectx.translate(250, 250);
          this.stagectx.rotate(Math.PI / 12 * (current.rotation));
          this.stagectx.translate(-250, -250); 
        }
        
          if(current.disable === false) {
            if(current.sprites.flatImg){
              this.stagectx.drawImage(current.sprites.flatImg, 0, 0, 500, 500, current.top, current.left, current.scaleWidth, current.scaleHeight);
            }
            
            if (current.color !== null && current.sprites) {
              this.stagectx.fillStyle = current.color;
              this.stagectx.globalCompositeOperation = "source-atop";
              this.stagectx.fillRect(0, 0, 500, 500);
            }
            this.stagectx.globalCompositeOperation = "source-over";

            if(current.sprites.lineImg){
              this.stagectx.drawImage(current.sprites.lineImg, 0, 0, 500, 500, current.top, current.left, current.scaleWidth, current.scaleHeight);
            }
          }

        this.stagectx.restore(); 
        
        
        this.ctx.drawImage(this.stageCanvas, 0, 0, 500, 500, 0, 0, 500, 500);
        this.stagectx.clearRect(0,0,500,500);
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
        this.init();
    },
    scaleSprite(e) {
      if(e === 'tall' || e === 'up') {
        this.selections[this.activeIndex].scaleHeight += 10;
        this.selections[this.activeIndex].top -= 5;
      }
      if(e === 'short' || e === 'down') {
        this.selections[this.activeIndex].scaleHeight -= 10;
        this.selections[this.activeIndex].top += 5;
      }
      if(e === 'wide' || e === 'up') {
        this.selections[this.activeIndex].scaleWidth += 10;
        this.selections[this.activeIndex].left -= 5;
      }
      if(e === 'thin' || e === 'down') {
        this.selections[this.activeIndex].scaleWidth -= 10;
        this.selections[this.activeIndex].left += 5;
      }
      if(e === 'reset') {
        this.selections[this.activeIndex].scaleWidth = 500;
        this.selections[this.activeIndex].scaleHeight = 500;
        this.selections[this.activeIndex].left = 0;
        this.selections[this.activeIndex].top = 0;
      }
      this.init();
    },
    pickNewItem(e) {
      this.selections[this.activeIndex].which = e;
      this.selections[this.activeIndex].disable = false;
      this.init();
    },
    rotateClockwise(e) {
      console.log('clockwise', e)
      this.selections[this.activeIndex].rotation += e
      if(this.selections[this.activeIndex].rotation >= 24) {
        this.selections[this.activeIndex].rotation = 0;
      }
      this.init()
    },
    rotateAntiClockwise(e) {
      console.log('anti-clockwise', e)
      this.selections[this.activeIndex].rotation -= e
      if(this.selections[this.activeIndex].rotation <= -24) {
        this.selections[this.activeIndex].rotation = 0;
      }
      this.init()
    },
    resetRotation(){

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
      if(e === null){
        this.selections[this.activeIndex].color = null;
      }
      else{
      let colorString = e.replace('(','a(').replace(')',', 0.3)')
      this.selections[this.activeIndex].color = colorString;
      }
      this.init();
    },
    randomize() {
      for(let selection of this.selections){
        let randomProperty = () => {
            let keys = Object.keys(this.colorList);
            return this.colorList[keys[ keys.length * Math.random() << 0]];
        };
        let getRandomColor = randomProperty();
        if(getRandomColor !== null){
          selection.color = getRandomColor.replace('(','a(').replace(')',', 0.3)');
        }
        else {
          selection.color = null;
        }
        let randomPick = Math.floor(Math.random() * selection.max);
        selection.which = randomPick;
        selection.disable = false;
      }
        this.init()
    },
    setOpen(e){
      this.expandedMenu = e;
    },
    reRoll() {
      for(let selection of this.selections){
        let randomPick = Math.floor(Math.random() * selection.max);
        selection.which = randomPick
        selection.left = 0;
        selection.top = 0;
        selection.color = null;
        selection.rotation = 0;
        selection.scaleWidth = 500;
        selection.scaleHeight = 500;
    }
        this.init();
    },
    resetActive(){
      this.selections[this.activeIndex].left = 0;
      this.selections[this.activeIndex].top = 0;
      this.selections[this.activeIndex].color = null;
      this.selections[this.activeIndex].rotation = 0;
      this.selections[this.activeIndex].scaleWidth = 500;
      this.selections[this.activeIndex].scaleHeight = 500;
      this.selections[this.activeIndex].disable = false;
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
    },
  },
  mounted(){
    let random = Math.floor(Math.random() * 6)
    //add snipped image paths to appropriate arrays in the selections array
    for(let selection in this.selections){
      let current = this.selections[selection];
      current.which = random;
      let count = current.max;
      for (let array in current.sprites) {
        let into = current.sprites[array];
        for(let image = 1; image <= count; image++){
          if(into === null){ 
            // do nothing
          }
          else {
            into.push(`${current.name}/${array}/${image}.png`);
            this.imgsToLoad++;
          }
        }
      }
    }
    this.init();
  }
}
</script>

<style scoped>
  .hidden {
    display:none;
  }

  .border {
      border:solid 1px black;
      padding:10px;
  }

  #canvas, #stageCanvas {
    border: solid 2px black;
    width: 100%;
    max-width:500px;
    height: auto;
  }
</style>

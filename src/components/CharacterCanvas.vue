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
          @random-active-color="randomActiveColor()"
          @rotate-clockwise="rotateClockwise($event)"
          @rotate-anti-clockwise="rotateAntiClockwise($event)"
          @reset-rotation="resetRotation()"
          @scale-sprite="scaleSprite($event)"
          @move-layer="moveLayer($event)"
          @randomize-character="randomize()"
          @reset-colors="reRollColors($event)"
          @reset-color="resetColor()"
          @reset-active="resetActive()"
          @reset-all="resetAll()"
          @set-open="setOpen($event)"
          @new-hue="setHue($event)"
          @new-saturation="setSaturation($event)"
          @new-lightness="setLightness($event)"
          @save-color="saveColor($event)"
          @color-match="colorMatch($event)"
          @swatch-pick="swatchPick($event)"
          @re-roll-features="reRollFeatures()"
          :hidden="selections[activeIndex].disable"
          :type="active"
          :activeColor="selections[activeIndex].color"
          :hue="selections[activeIndex].hue"
          :saturation="selections[activeIndex].saturation"
          :lightness="selections[activeIndex].lightness"
          :maxRange="selections[activeIndex].max" 
          :key="`${active}editor`" 
          :which="selections[activeIndex].which"
          :expandedMenu="expandedMenu"
          :colorHistory="colorList"
        />

  <b-col cols="12" xl="5" class="mb-4 d-flex flex-row justify-content-center">
    <b-row align-h="center">
    <b-col cols="12" sm="12" md="10" class="d-flex flex-column justify-content-center ">
      <b-row class="mb-3">
          <b-col cols="12" class="d-flex justify-content-center">
              <p class="tiny" :key="this.selections[this.activeIndex].name">Editing {{this.selections[this.activeIndex].name.replace('-', ' ').toUpperCase() }} : v.{{ this.selections[this.activeIndex].which}}</p>
          </b-col>
      </b-row>
      
      <b-row align-h="center" class="d-flex flex-row justify-content-center">
        <b-col cols="12" class="d-flex flex-row justify-content-center">
          <canvas id="canvas" class="mb-3" width="500" height="500"></canvas>
        </b-col>
      </b-row>
      
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
  
  <canvas class="d-none" width="500" height="500" id="stageCanvas"></canvas>

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
          max: 9,
          disable: false,
          color:false,
          hue:0,
          saturation:0,
          lightness:0
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
          max: 8,
          disable: false,
          color:false,
          hue:0,
          saturation:0,
          lightness:0
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
          max:21,
          disable: false,
          color:false,
          hue:0,
          saturation:0,
          lightness:0
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
          max:12,
          disable: false,
          color:false,
          hue:0,
          saturation:0,
          lightness:0
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
          max: 17,
          disable: false,
          color:false,
          hue:0,
          saturation:0,
          lightness:0
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
          max: 15,
          disable: false,
          color:false,
          hue:0,
          saturation:0,
          lightness:0
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
          max: 12,
          disable: false,
          color:false,
          hue:0,
          saturation:0,
          lightness:0
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
          max: 15,
          disable: false,
          color:false,
          hue:0,
          saturation:0,
          lightness:0,
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
          max: 11,
          disable: false,
          color:false,
          hue:0,
          saturation:0,
          lightness:0
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
          color:false,
          hue:0,
          saturation:0,
          lightness:0
        },
      ],
      imagesToLoad:0,
      expandedMenu: 'choose',
      colorList: [],
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
                    // this.testDraw();
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
    testDraw() {
      this.stagectx.clearRect(0,0,500,500)
      let current = this.selections[4]

      this.stagectx.globalCompositeOperation = "source-over";
      this.stagectx.drawImage(current.sprites.flatImg, 0, 0, 500, 500, current.top, current.left, current.scaleWidth, current.scaleHeight);

      this.stagectx.globalCompositeOperation = 'lighter';
      // this.stagectx.globalCompositeOperation = 'lighter';
      this.stagectx.fillStyle = 'hsl(200, 100%, 50%)';
      this.stagectx.fillRect(0, 0, 500, 500);

      // this.stagectx.globalCompositeOperation = "saturation";
      // this.stagectx.fillStyle = `hsl(0, 100%, 50%)`;
      // this.stagectx.fillRect(0, 0, 500, 500);

      // this.stagectx.globalCompositeOperation = "hue";
      // this.stagectx.fillStyle = `hsl(200, 1%, 50%)`;
      // this.stagectx.fillRect(0, 0, 500, 500);

      this.stagectx.globalCompositeOperation = "destination-in";
      this.stagectx.drawImage(current.sprites.flatImg, 0, 0, 500, 500, current.top, current.left, current.scaleWidth, current.scaleHeight);

      this.stagectx.globalCompositeOperation = "source-over";
      this.stagectx.drawImage(current.sprites.lineImg, 0, 0, 500, 500, current.top, current.left, current.scaleWidth, current.scaleHeight);
    },
    drawImages(){
      this.ctx.clearRect(0,0,500,500) //clear the display canvas
      this.stagectx.clearRect(0,0,500,500) //clear the display canvas

      for(let selection in this.selections) { //loop through all selections
        // this.stagectx.clearRect(0,0,500,500) //clear the display canvas
        let current = this.selections[selection];
        
        if(current.disable === true) { /*draw nothing if the option is disabled*/ }
          else {          
            if (current.rotation !== 0) {
              this.stagectx.save();
              this.stagectx.translate(250, 250);
              this.stagectx.rotate(Math.PI / 12 * (current.rotation));
              this.stagectx.translate(-250, -250); 
            }
    
            if(current.sprites.flatImg && current.color === true){

              this.stagectx.globalCompositeOperation = "source-over";
              this.stagectx.drawImage(current.sprites.flatImg, 0, 0, 500, 500, current.top, current.left, current.scaleWidth, current.scaleHeight);

              let mode = current.lightness <= 50 ? 'darken' : 'lighten' 
              this.stagectx.globalCompositeOperation = mode;
              this.stagectx.fillStyle = `hsl(${current.hue}, ${current.saturation}%, ${current.lightness}%)`;
              this.stagectx.fillRect(0, 0, 500, 500);
              
              this.stagectx.globalCompositeOperation = "destination-in";
              this.stagectx.drawImage(current.sprites.flatImg, 0, 0, 500, 500, current.top, current.left, current.scaleWidth, current.scaleHeight);
            }

            else if(current.sprites.flatImg && current.color !== true){
              this.stagectx.globalCompositeOperation = "source-over";
              this.stagectx.drawImage(current.sprites.flatImg, 0, 0, 500, 500, current.top, current.left, current.scaleWidth, current.scaleHeight);
            }
    
            if(current.sprites.lineImg) {
              this.stagectx.globalCompositeOperation = "source-over";
              this.stagectx.drawImage(current.sprites.lineImg, 0, 0, 500, 500, current.top, current.left, current.scaleWidth, current.scaleHeight);
            }
    
            this.stagectx.restore();
          }
        this.ctx.globalCompositeOperation = "source-over";
        this.ctx.drawImage(this.stageCanvas, 0, 0, 500, 500, 0, 0, 500, 500);
      } //End for loop
      // this.stagectx.clearRect(0,0,500,500)
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
      this.selections[this.activeIndex].rotation += e
      if(this.selections[this.activeIndex].rotation >= 24) {
        this.selections[this.activeIndex].rotation = 0;
      }
      this.init()
    },
    rotateAntiClockwise(e) {
      this.selections[this.activeIndex].rotation -= e
      if(this.selections[this.activeIndex].rotation <= -24) {
        this.selections[this.activeIndex].rotation = 0;
      }
      this.init()
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

      if(forwardIndex > this.selections.length - 1) {
        forwardIndex = 0;
      }

      if(backwardIndex < 0) {
        backwardIndex = this.selections.length - 1;
      }

      let movingItem = this.selections[indexFrom]
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
    addNewColor() {
      let active = this.selections[this.activeIndex]
      if(this.colorList.length >= 12){
        this.colorList.pop()
      } 
      
      this.colorList.unshift(`hsl(${active.hue}, ${active.saturation}%, ${active.lightness}%)`);
      
    },
    colorMatch() {
      let matchHue = this.selections[this.activeIndex].hue
      let matchSat = this.selections[this.activeIndex].saturation
      let matchLight = this.selections[this.activeIndex].lightness
      let options = this.selections;
      let currentSelected = this.selections[this.activeIndex].name

      const skin = ['body', 'ears', 'nose', 'mouth'];
      const hair = ['hair-front', 'hair-back', 'brows'];
      const extra = ['clothes', 'extras'];

        for(let item of options){
          if(skin.includes(currentSelected) && skin.includes(item.name)){
            this.assignHSL([matchHue, matchSat, matchLight], item);
          }
          if(hair.includes(currentSelected) && hair.includes(item.name)){
            this.assignHSL([matchHue, matchSat, matchLight], item);
          }
          if(extra.includes(currentSelected) && extra.includes(item.name)){
            this.assignHSL([matchHue, matchSat, matchLight], item);
          }
        }
      this.init()
    },
    randomNumber(min,max){
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    randomize() {
      for(let selection of this.selections){
        // let randomProperty = () => {
        //     let keys = Object.keys(this.colorList);
        //     return this.colorList[keys[ keys.length * Math.random() << 0]];
        // };
        // let getRandomColor = randomProperty();
  
        selection.color = true
        selection.hue = this.randomNumber(0, 359)
        selection.saturation = this.randomNumber(0,100)
        selection.lightness = this.randomNumber(15,100)
        
        selection.which = this.randomNumber(1,selection.max-1);
        selection.disable = false;
      }
        this.init()
    },
    randomActiveColor() {
       let selection = this.selections[this.activeIndex]
      selection.color = true
      selection.hue = this.randomNumber(0, 359)
      selection.saturation = this.randomNumber(0,100)
      selection.lightness = this.randomNumber(15,100)
      this.init()
    },
    setOpen(e){
      this.expandedMenu = e;
    },
    swatchPick(e){
      let parsedHSL = e.slice(4, -1).replaceAll(',', '').replaceAll('%', '');
      let hslArray = parsedHSL.split(' ')
      this.assignHSL(hslArray, this.selections[this.activeIndex])
      this.init()
    },
    setHue(e){
      this.selections[this.activeIndex].color = true
      this.selections[this.activeIndex].hue = e
      this.addNewColor()
      this.init()
    },
    setSaturation(e){
      this.selections[this.activeIndex].color = true
      this.selections[this.activeIndex].saturation = e
      this.addNewColor()
      this.init()
    },
    setLightness(e){
      this.selections[this.activeIndex].color = true
      this.selections[this.activeIndex].lightness = e
      this.addNewColor()
      this.init()
    },
    resetColor() {
      this.selections[this.activeIndex].color = false
      this.selections[this.activeIndex].hue = 0
      this.selections[this.activeIndex].saturation = 0
      this.selections[this.activeIndex].lightness = 50
      this.init()
    },
    reRollColors(e) {
      const skin = [this.randomNumber(1,50), this.randomNumber(15,55), this.randomNumber(50,95)];
      const hair = [this.randomNumber(0,360), this.randomNumber(0,100), this.randomNumber(50,100)]
      const garb = [this.randomNumber(0,360), this.randomNumber(0,50), this.randomNumber(50,75)]

      for(let selection of this.selections){
        if(e === 'fullRandom'){
          selection.which = this.randomNumber(1,selection.max-1)
          selection.left = 0;
          selection.top = 0;
          selection.rotation = 0;
          selection.scaleWidth = 500;
          selection.scaleHeight = 500;
        }

        switch (selection.name) {
          case 'body':
          case 'ears':
          case 'nose':
            this.assignHSL(skin, selection)
            break;
          case 'hair-front':
          case 'hair-back':
          case 'brows':
          case 'mouth':
            this.assignHSL(hair, selection)
            break;
          case 'clothes':
          case 'extra':
            this.assignHSL(garb, selection)
            break;
          default:
            selection.color = false;
        }
    }
        this.init();
    },
    reRollFeatures(){
      for(let selection of this.selections){
        selection.which = this.randomNumber(1,selection.max-1)
        selection.left = 0;
        selection.top = 0;
        selection.rotation = 0;
        selection.scaleWidth = 500;
        selection.scaleHeight = 500;
      }
      this.init()
    },
    assignHSL(array, selection){
      selection.color = true;
      selection.hue = array[0]
      selection.saturation = array[1]
      selection.lightness = array[2]
    },
    resetActive(){
      this.selections[this.activeIndex].left = 0;
      this.selections[this.activeIndex].top = 0;
      this.selections[this.activeIndex].color = false;
      this.selections[this.activeIndex].hue = 0;
      this.selections[this.activeIndex].saturation = 0;
      this.selections[this.activeIndex].lightness = 0;
      this.selections[this.activeIndex].rotation = 0;
      this.selections[this.activeIndex].scaleWidth = 500;
      this.selections[this.activeIndex].scaleHeight = 500;
      this.selections[this.activeIndex].disable = false;
      this.init();
    },
    resetAll(){
      for(let selection of this.selections){
        selection.left = 0;
        selection.top = 0;
        selection.hue = 0;
        selection.color = false;
        selection.saturation = 0;
        selection.lightness = 0;
        selection.rotation = 0;
        selection.scaleWidth = 500;
        selection.scaleHeight = 500;
        selection.disable = false;
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
    },
  },
  mounted(){
    let random = this.randomNumber(0,0)
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

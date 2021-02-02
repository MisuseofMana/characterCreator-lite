<template>
    <b-col cols="12" xl="5" class="mb-3">
        <b-row class="mb-3" align-h="center">
            <b-col cols="11" class="d-flex flex-row justify-content-center align-items-center mb-3">
                <b-button-group>
                    <b-button :disabled="expandedMenu === 'random'" variant="warning" @click="$emit('set-open', 'random')">
                       <p class="tiny">RANDOM</p> <font-awesome-icon  class="icon" :icon="['fas', 'dice']" />
                    </b-button>
                    <b-button :disabled="expandedMenu === 'reset'" variant="warning" @click="$emit('set-open', 'reset')">
                        <p class="tiny">RESET</p>
                        <font-awesome-icon :icon="['fas', 'retweet']" class="icon"/>
                    </b-button>
                    <b-button :disabled="expandedMenu === 'choose'" variant="primary" @click="$emit('set-open', 'choose')">
                       <p class="tiny">CHOOSE</p> <font-awesome-icon  class="icon" :icon="['fas', 'user-edit']" />
                    </b-button>
                    <b-button :disabled="expandedMenu === 'move'" variant="primary" @click="$emit('set-open', 'move')">
                        <p class="tiny">MOVE</p><font-awesome-icon class="icon" :icon="['fas', 'hand-point-up']" />
                    </b-button>
                    <b-button :disabled="expandedMenu === 'color'" variant="primary" @click="$emit('set-open', 'color')">
                        <p class="tiny">COLOR</p><font-awesome-icon class="icon" :icon="['fas', 'palette']" />
                    </b-button>
                </b-button-group>
            </b-col>
        </b-row>

        <!-- RESET -->
        <b-row v-if="expandedMenu === 'reset'" align-h="center" class="mb-3">
            <b-col cols="11" class="d-flex flex-column justify-content-center align-items-center">
                <p class="tiny mb-2">WARNING: The button below will reset the option you're currently editing. Be careful! </p>
                <b-button variant="danger" @click="$emit('reset-active')">
                    <p class="tiny">RESET MY CURRENT OPTION</p>
                    <font-awesome-icon :icon="['fas', 'retweet']" class="icon"/>
                </b-button>
            </b-col>
        </b-row>

        <!-- CHOOSE -->
        <b-row v-if="expandedMenu === 'choose'" align-h="center" class="mb-3">
            <b-col cols="3">
                <b-button-group>
                    <b-button v-if="!hidden" :disabled="hidden" @click="$emit('disable-item', 'disable')">
                        <p class="tiny">SHOWING</p>
                        <font-awesome-icon :icon="['fas', 'eye']" class="icon"/>
                    </b-button>
                    <b-button v-if="hidden" :disabled="!hidden" @click="$emit('disable-item', 'enable')">
                        <p class="tiny">HIDDEN</p>
                        <font-awesome-icon :icon="['fas', 'eye-slash']" class="icon"/>
                    </b-button>
                </b-button-group>
            </b-col>
            <b-col cols="8" class="d-flex justify-content-center align-items-center">
                <b-form-input  min="0" :max="maxRange-1" v-model="selected" type="range"></b-form-input>
            </b-col>
        </b-row>


        <!-- MOVE -->
        <b-row v-if="expandedMenu === 'move'" align-h="around" class="d-flex flex-row justify-content-center align-items-center mb-3">
            <b-col cols="5" class="d-flex flex-column justify-content-center align-items-center">
                <b-button-group class="mb-1">
                    <b-button class="editorButton" @click="reposition(-5, 'xy-neg')">
                        <font-awesome-icon class="fa-rotate-n45 icon" :icon="['fas', 'arrow-up']" />
                    </b-button>
                    <b-button class="editorButton" @click="reposition(-5, 'y')">
                        <font-awesome-icon class="icon" :icon="['fas', 'arrow-up']" />
                    </b-button>
                    <b-button class="editorButton" @click="reposition(-5, 'xy-pos')">
                        <font-awesome-icon class="fa-rotate-45 icon" :icon="['fas', 'arrow-up']" />
                    </b-button>
                </b-button-group>

                <b-button-group class="mb-1">
                    <b-button class="editorButton" @click="reposition(-5, 'x')">
                        <font-awesome-icon class="icon" :icon="['fas', 'arrow-left']" />
                    </b-button>

                    <b-button variant="danger" class="editorButton" @click="$emit('reset-active')">
                        <font-awesome-icon class="icon" :icon="['fas', 'sync']" />
                    </b-button>
                    <b-button class="editorButton" @click="reposition(5, 'x')">
                        <font-awesome-icon class="icon" :icon="['fas', 'arrow-right']" />
                    </b-button>
                </b-button-group>
            
                <b-button-group>
                        <b-button class="editorButton" @click="reposition(5, 'xy-pos')">
                        <font-awesome-icon class="fa-rotate-45 icon" :icon="['fas', 'arrow-down']" />
                    </b-button>
                    <b-button class="editorButton" @click="reposition(5, 'y')">
                        <font-awesome-icon class="icon" :icon="['fas', 'arrow-down']" />
                    </b-button>
                    <b-button class="editorButton" @click="reposition(5, 'xy-neg')">
                        <font-awesome-icon class="fa-rotate-n45 icon" :icon="['fas', 'arrow-down']" />
                    </b-button>
                </b-button-group>
            </b-col>

            <b-col cols="6" class="d-flex flex-wrap justify-content-start">
                <b-button-group class="mb-1">
                    <b-button class="editorButton" @click="$emit('rotate-clockwise', .1)">
                        <font-awesome-icon class="fa-flip-horizontal icon" :icon="['fas', 'undo']" />
                    </b-button>
                    <b-button class="editorButton" @click="$emit('rotate-anti-clockwise', .1)">
                        <font-awesome-icon class="icon" :icon="['fas', 'undo']" />
                    </b-button>
                    <b-button class="editorButton" variant="dark" @click="$emit('rotate-clockwise', .5)">
                        <font-awesome-icon class="fa-flip-horizontal icon" :icon="['fas', 'undo']" />
                    </b-button>
                    <b-button class="editorButton" variant="dark" @click="$emit('rotate-anti-clockwise', .5)">
                        <font-awesome-icon class="icon" :icon="['fas', 'undo']" />
                    </b-button>
                </b-button-group>

                <b-button-group class="mb-1">
                    <b-button variant="dark" class="editorButton"></b-button>
                    <b-button class="editorButton" @click="$emit('scale-sprite', 'tall')">
                        <font-awesome-icon class="fa-rotate-n45 icon" :icon="['fas', 'expand-alt']" />
                    </b-button>
                    <b-button class="editorButton" @click="$emit('scale-sprite', 'short')">
                        <font-awesome-icon class="fa-rotate-n45 icon" :icon="['fas', 'compress-alt']" />
                    </b-button>
                    <b-button variant="dark" class="editorButton"></b-button>
                </b-button-group>

                <b-button-group>
                    <b-button class="editorButton" @click="$emit('scale-sprite', 'wide')">
                        <font-awesome-icon class="fa-rotate-45 icon" :icon="['fas', 'expand-alt']" />
                    </b-button>
                    <b-button  class="editorButton" @click="$emit('scale-sprite', 'thin')">
                        <font-awesome-icon class="fa-rotate-45 icon" :icon="['fas', 'compress-alt']" />
                    </b-button>
                    <b-button class="editorButton" @click="$emit('scale-sprite', 'up')">
                        <font-awesome-icon class="icon" :icon="['fas', 'expand-arrows-alt']" />
                    </b-button>
                    <b-button  class="editorButton" @click="$emit('scale-sprite', 'down')">
                        <font-awesome-icon class="icon" :icon="['fas', 'compress-arrows-alt']" />
                    </b-button>
                </b-button-group>
            </b-col>
        </b-row>

        <!-- COLOR -->
        <!-- <b-row v-if="expandedMenu === 'color'" class="mb-3">
            <b-col cols="12" class="d-flex flex-wrap justify-content-center">
                <span v-for="color in colorList" :key="color">
                    <div @click="changeColor(color)" :style="{backgroundColor:color}" :class="{'dotborder':color === null || color === 'rgb(255, 255, 255)' }" class="dot" >
                        <span v-if="color===null && currentColor !== null">
                            <font-awesome-icon class="icon" style="color:tomato" :icon="['fas', 'sync']" />
                        </span>

                        <span class="fa-stack fa-2x" v-if="color===null && currentColor === null">
                            <font-awesome-icon class="icon fa-stack-1x" style="color:tomato" :icon="['fas', 'sync']" />
                            <font-awesome-icon  class="icon fa-stack-2x" style="color:white" :icon="['fas', 'circle']" />
                            <font-awesome-icon  class="icon fa-stack-1x" style="color:black" :icon="['fas', 'eye']" />
                        </span>
 
                        <span class="fa-stack fa-2x" v-if="currentColor === color && currentColor !== null">
                            <font-awesome-icon  class="icon fa-stack-2x" style="color:white" :icon="['fas', 'circle']" />
                            <font-awesome-icon  class="icon fa-stack-1x" style="color:black" :icon="['fas', 'eye']" />
                        </span>
                    </div>
                </span>
            </b-col>
        </b-row> -->

        <b-row v-if="expandedMenu === 'color'" align-v="center" class="mb-3">
            <b-col cols="2">
                <p class="tiny">HUE</p>
            </b-col>
            <b-col cols="7">
                <b-form-input debounce="500" min="0" max="360" v-model="activeHue" type="range"></b-form-input>
            </b-col>
            <b-col cols="3">
                <b-form-input debounce="500" min="0" max="360" v-model="activeHue" type="number"></b-form-input>
            </b-col>
        </b-row>
        
        <b-row v-if="expandedMenu === 'color'" align-v="center" class="mb-3">
            <b-col cols="4">
                <p class="tiny">SATURATION</p>
            </b-col>
            <b-col cols="5">
                <b-form-input debounce="500" min="0" max="100" v-model="activeSaturation" type="range"></b-form-input>
            </b-col>
            <b-col cols="3">
                <b-form-input debounce="500" min="0" max="100" v-model="activeSaturation" type="number"></b-form-input>
            </b-col>
        </b-row>
        
        <b-row v-if="expandedMenu === 'color'" align-v="center" class="mb-3">
            <b-col cols="4">
                <p class="tiny">LIGHTNESS</p>
            </b-col>
            <b-col cols="5">
                <b-form-input debounce="500" min="50" max="100" v-model="activeLightness" type="range"></b-form-input>
            </b-col>
            <b-col cols="3">
                <b-form-input debounce="500" min="50" max="100" v-model="activeLightness" type="number"></b-form-input>
            </b-col>
        </b-row>

        <b-row class="mb-3" v-if="expandedMenu === 'color'">
            <b-col cols="12">
                <div class="color" :style="{backgroundColor: activeColor}"></div>
            </b-col>
        </b-row>
        
        <b-row class="mb-3" align-h="center" v-if="expandedMenu === 'color'">
            <b-col cols="6" class="d-flex justify-content-center">
                <b-button variant="warning" @click="$emit('reset-color')">
                    <p class="tiny">RESET COLOR</p>
                    <font-awesome-icon class="icon" :icon="['fas', 'retweet']" />
                </b-button>
            </b-col>
            <b-col cols="6" class="d-flex justify-content-center">
                <b-button @click="$emit('reset-color')">
                    <p class="tiny">COLOR MATCH</p>
                    <font-awesome-icon class="icon" :icon="['fas', 'palette']" />
                </b-button>
            </b-col>
        </b-row>






        <span v-if="expandedMenu === 'random'">
            <b-row class="mb-3" align-h="center">
                <b-col cols="10">
                    <p class="tiny">WARNING: The buttons below will randomize your character, use with caution. Randomization is not undo-able.</p>
                </b-col>
            </b-row>

            <b-row align-h="center" class="mb-3">
                <b-col cols="5" class="d-flex flex-row justify-content-center
                align-items-center">
                    <b-button variant="danger" size="lg"  class="mr-4" @click="$emit('randomize-character')">
                        <p class="tiny">JUST MESS MY WHOLE THING UP.</p>
                        <font-awesome-icon class="icon" :icon="['fas', 'dice']" />
                    </b-button>
                </b-col>
                <b-col cols="5" class="d-flex flex-row justify-content-center
                align-items-center">
                    <b-button variant="danger" size="lg" @click="$emit('reset-character')">
                        <p class="tiny">MESS ME UP, BUT KEEP THINGS NEAT.</p>
                        <font-awesome-icon class="icon" :icon="['fas', 'sync']" />
                    </b-button>
                </b-col>
            </b-row>
        </span>

            <!-- <div class="line"></div>

            <div class="flexColumn">
                <div class="flexRow">
                    <div  @click="$emit('move-layer', 'up')">
                        <font-awesome-icon :icon="['fas', 'arrow-up']" />
                    </div>
                </div>
                <div class="flexRow">
                    <div class="border-grey margin">
                        <font-awesome-icon style="color:#CCC" :icon="['fas', 'layer-group']" />
                    </div>
                </div>
                <div class="flexRow">
                    <div  @click="$emit('move-layer', 'down')">
                        <font-awesome-icon :icon="['fas', 'arrow-down']" />
                    </div>
                </div>
            </div> -->

            </b-col>

</template>

<script>
    export default {
        props:['type', 'maxRange', 'which', 'hidden', 'expandedMenu', 'color', 'hue', 'saturation', 'lightness'],
        computed: {
            selected: {
                get: function() {
                    return parseInt(this.which, 10) + 1;
                },
                set: function (newValue){
                    this.$emit('new-pick', newValue);
                    return newValue
                }
            },
            activeHue: {
                get: function() {
                    return this.hue
                },
                set: function (newValue){
                    this.$emit('new-hue', newValue);
                    return newValue
                }
            },
            activeSaturation: {
                get: function() {
                    return this.saturation
                },
                set: function (newValue){
                    this.$emit('new-saturation', newValue);
                    return newValue
                }
            },
            activeLightness: {
                get: function() {
                    return this.lightness
                },
                set: function (newValue){
                    this.$emit('new-lightness', newValue);
                    return newValue
                }
            },
            activeColor: function () {
                return `hsl(${this.hue}, ${this.saturation}%, ${this.lightness}%)`
            }
        },
        methods: {
            reposition(value, direction) {
                this.$emit('change-position', {value, direction})
            },
            randomizeCharacter() {
                this.$emit('randomize-character');
            },
            changeColor(e){
                this.$emit('change-color', e);
            },
            setActive(which) {
                this.expandedMenu = which;
            }
        },
    }
</script>

<style scoped>

.fa-rotate-45 {
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    transform: rotate(45deg);
}

.fa-rotate-n45 {
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    transform: rotate(-45deg);
}

.reverse-animation {
    animation-direction: reverse;
}

.line {
    width:1px;
    height:150px;
    margin:0 10px;
    border-right:solid black 2px;
}

.color {
    border: solid 2px black;
    height:50px;
    width:100%;
}
</style>
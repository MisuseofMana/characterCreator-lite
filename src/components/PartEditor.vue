<template>
    <b-col sm="12" md="5" class="mb-3">
        <b-row>
            <b-col cols="12" class="d-flex justify-content-start">
                <h1 class="responsiveFont" :key="type">{{ type.replace('-', ' ').toUpperCase() }} #{{ selected }}</h1>
            </b-col>
        </b-row>

        <b-row class="mb-3">
            <b-col cols="4">
                <b-button-group>
                    <b-button variant="warning" @click="$emit('reset-active')">
                        <p class="tiny">RESET</p>
                        <font-awesome-icon :icon="['fas', 'retweet']" class="icon"/>
                    </b-button>
                    <b-button v-if="!hidden" :disabled="hidden" @click="$emit('disable-item', 'disable')">
                        <p class="tiny">HIDE</p>
                        <font-awesome-icon :icon="['fas', 'eye-slash']" class="icon"/>
                    </b-button>
                    <b-button v-if="hidden" :disabled="!hidden" @click="$emit('disable-item', 'enable')">
                        <p class="tiny">SHOW</p>
                        <font-awesome-icon :icon="['fas', 'eye']" class="icon"/>
                    </b-button>
                </b-button-group>
            </b-col>
            <b-col cols="8" class="d-flex justify-content-center align-items-center">
                <b-form-input  min="0" :max="maxRange-1" v-model="selected" type="range"></b-form-input>
            </b-col>
        </b-row>

        <b-row class="mb-3" align-h="center">
            <b-col cols="11">
                <b-button-group>
                    <b-button variant="danger" @click="$emit('set-open', 'random')">
                       <p class="tiny">RANDOM</p> <font-awesome-icon  class="icon" :icon="['fas', 'dice']" />
                    </b-button>
                    <b-button :disabled="expandedMenu === 'move'" variant="primary" @click="$emit('set-open', 'move')">
                        <p class="tiny">MOVE</p><font-awesome-icon class="icon" :icon="['fas', 'hand-point-up']" />
                    </b-button>
                    <b-button :disabled="expandedMenu === 'color'" variant="primary" @click="$emit('set-open', 'color')">
                        <p class="tiny">COLOR</p><font-awesome-icon class="icon" :icon="['fas', 'palette']" />
                    </b-button>
                    <b-button :disabled="expandedMenu === 'rotate'" variant="primary" @click="$emit('set-open', 'rotate')">
                        <p class="tiny">ROTATE</p><font-awesome-icon class="icon" :icon="['fas', 'sync']" />
                    </b-button>
                    <b-button :disabled="expandedMenu === 'scale'" variant="primary" @click="$emit('set-open', 'scale')">
                        <p class="tiny">SCALE</p><font-awesome-icon class="icon" :icon="['fas', 'expand-arrows-alt']" />
                    </b-button>
                </b-button-group>
            </b-col>
        </b-row>

        <b-row v-if="expandedMenu === 'move'">
            <b-col sm="12">
            <b-button-group>
                <b-button class="editorButton" @click="reposition(-5, 'xy-neg')">
                    <font-awesome-icon class="fa-rotate-n45 icon" :icon="['fas', 'angle-double-up']" />
                </b-button>

                <b-button disabled variant="light" class="editorButton"></b-button>
                <b-button disabled variant="light" class="editorButton"></b-button>

                <b-button class="editorButton" @click="reposition(-5, 'y')">
                    <font-awesome-icon class="icon" :icon="['fas', 'angle-double-up']" />
                </b-button>
                
                <b-button disabled variant="light" class="editorButton"></b-button>
                <b-button disabled variant="light" class="editorButton"></b-button>
                
                <b-button class="editorButton" @click="reposition(-5, 'xy-pos')">
                    <font-awesome-icon class="fa-rotate-45 icon" :icon="['fas', 'angle-double-up']" />
                </b-button>
            </b-button-group>

            <b-button-group>
                <b-button disabled variant="light" class="editorButton"></b-button>

                <b-button class="editorButton" @click="reposition(-1, 'xy-neg')">
                    <font-awesome-icon class="fa-rotate-n45 icon" :icon="['fas', 'arrow-up']" />
                </b-button>

                <b-button disabled variant="light" class="editorButton"></b-button>

                <b-button class="editorButton" @click="reposition(-1, 'y')">
                    <font-awesome-icon class="icon" :icon="['fas', 'arrow-up']" />
                </b-button>

                <b-button disabled variant="light" class="editorButton"></b-button>

                <b-button class="editorButton" @click="reposition(-1, 'xy-pos')">
                    <font-awesome-icon class="fa-rotate-45 icon" :icon="['fas', 'arrow-up']" />
                </b-button>

                <b-button disabled variant="light" class="editorButton"></b-button>

            </b-button-group>

            <b-button-group>
                <b-button class="editorButton" @click="reposition(-5, 'x')">
                    <font-awesome-icon class="icon" :icon="['fas', 'angle-double-left']" />
                </b-button>

                <b-button disabled variant="light" class="editorButton"></b-button>

                <b-button class="editorButton" @click="reposition(-1, 'x')">
                    <font-awesome-icon class="icon" :icon="['fas', 'arrow-left']" />
                </b-button>

                <b-button variant="danger" class="editorButton" @click="reposition(null, 'reset')">

                    <font-awesome-icon class="fa-rotate-45" :icon="['fas', 'sync']" />
                </b-button>

                <b-button class="editorButton" @click="reposition(1, 'x')">
                    <font-awesome-icon :icon="['fas', 'arrow-right']" />
                </b-button>

                <b-button disabled variant="light" class="editorButton"></b-button>

                <b-button class="editorButton" @click="reposition(5, 'x')">
                    <font-awesome-icon class="icon" :icon="['fas', 'angle-double-right']" />
                </b-button>
            </b-button-group>
        
            <b-button-group>
                <b-button disabled variant="light" class="editorButton"></b-button>
                    <b-button class="editorButton" @click="reposition(1, 'xy-pos')">
                    <font-awesome-icon class="fa-rotate-45 icon" :icon="['fas', 'arrow-down']" />
                </b-button>
                <b-button disabled variant="light" class="editorButton"></b-button>
                <b-button class="editorButton" @click="reposition(1, 'y')">
                    <font-awesome-icon class="icon" :icon="['fas', 'arrow-down']" />
                </b-button>
                <b-button disabled variant="light" class="editorButton"></b-button>
                <b-button class="editorButton" @click="reposition(1, 'xy-neg')">
                    <font-awesome-icon class="fa-rotate-n45 icon" :icon="['fas', 'arrow-down']" />
                </b-button>
                <b-button disabled variant="light" class="editorButton"></b-button>
            </b-button-group>
        
            <b-button-group>
                <b-button class="editorButton" @click="reposition(5, 'xy-pos')">
                    <font-awesome-icon class="fa-rotate-45 icon" :icon="['fas', 'angle-double-down']" />
                </b-button>

                <b-button disabled variant="light" class="editorButton"></b-button>
                <b-button disabled variant="light" class="editorButton"></b-button>
                
                <b-button class="editorButton" @click="reposition(5, 'y')">
                    <font-awesome-icon class="icon" :icon="['fas', 'angle-double-down']" />
                </b-button>
                
                <b-button disabled variant="light" class="editorButton"></b-button>
                <b-button disabled variant="light" class="editorButton"></b-button>
                
                <b-button class="editorButton" @click="reposition(5, 'xy-neg')">
                    <font-awesome-icon class="fa-rotate-n45 icon" :icon="['fas', 'angle-double-down']" />
                </b-button>
            </b-button-group>
            </b-col>
        </b-row>





        <!-- COLOR -->
        <b-row v-if="expandedMenu === 'color'" class="mb-3">
            <b-col sm="12" class="d-flex flex-wrap justify-content-start">
                <span v-for="color in colorList" :key="color">
                    <div @click="changeColor(color)" :style="{backgroundColor:color}" :class="{'dotborder':color === null || color === 'rgb(255, 255, 255)' }" class="dot">
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
        </b-row>






        <!-- ROATATE -->
        <b-row class="mb-2" align-h="center" v-if="expandedMenu === 'rotate'">
            <b-col sm="12" class="d-flex justify-content-center">
                <b-button-group>
                    <b-button variant="danger" class="editorButton" @click="$emit('reset-rotation')">
                        <font-awesome-icon class="icon" :icon="['fas', 'ban']" />
                    </b-button>
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
            </b-col>
        </b-row>

        <b-row class="mb-4" v-if="expandedMenu === 'scale'">
            <b-col sm="12" class="d-flex justify-content-center">
                <b-button-group>
                    <b-button variant="danger"  class="editorButton" @click="$emit('scale-sprite', 'reset')">
                        <font-awesome-icon class="icon" :icon="['fas', 'ban']" />
                    </b-button>
                    <b-button class="editorButton" @click="$emit('scale-sprite', 'tall')">
                        <font-awesome-icon class="fa-rotate-n45 icon" :icon="['fas', 'expand-alt']" />
                    </b-button>
                    <b-button  class="editorButton" @click="$emit('scale-sprite', 'short')">
                        <font-awesome-icon class="fa-rotate-n45 icon" :icon="['fas', 'compress-alt']" />
                    </b-button>
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

        <span v-if="expandedMenu === 'random'">
            <b-row class="mb-3">
                <b-col sm="12">
                    <p class="tiny">WARNING: The buttons below will randomize your character, use with caution. Randomization is not undo-able.</p>
                </b-col>
            </b-row>

            <b-row align-h="around">
                <b-col sm="6" class="d-flex justify-content-center">
                    <b-button variant="danger" size="lg"  class="mr-4" @click="$emit('randomize-character')">
                        <p class="tiny">JUST MESS MY WHOLE THING UP.</p>
                        <font-awesome-icon class="icon" :icon="['fas', 'dice']" />
                    </b-button>
                </b-col>
                <b-col sm="6">
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
        props:['type', 'maxRange', 'which', 'hidden', 'expandedMenu', 'colorList', 'activeColor'],
        computed: {
            selected: {
                get: function() {
                    return this.which;
                },
                set: function (newValue){
                    this.$emit('new-pick', newValue);
                    return newValue
                }
            },
            currentColor: function() {
                if(this.activeColor === null){
                    return null
                }
                let formattedColor = this.activeColor.replace('rgba', 'rgb').replace(', 0.3', '');
                return formattedColor;
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

.editorButton {
    width:3.2vw;
    height:3.2vw;
    margin:1px;
}
</style>
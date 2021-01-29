<template>
    <b-col md="4" lg="5" class="mb-4">
        <b-row align-h="around">
            <b-col sm="3">
                <transition name="fade" mode="out-in">
                    <p :key="type">{{ type.replace('-', ' ').toUpperCase() }}</p>
                </transition>
            </b-col>
            <b-col sm="6">
                <b-form-input  min="0" :max="maxRange-1" v-model="selected" type="range"></b-form-input>
            </b-col>
            <b-col sm="2" class="ml-auto">
                <p>#{{ selected }}</p>
            </b-col>
        </b-row>

        <b-row class="mb-2" align-h="center">
            <b-col sm='8' class="d-flex justify-content-center">
                <b-button-group>
                    <b-button :disabled="hidden" @click="$emit('disable-item', 'disable')">HIDE {{ type.toUpperCase() }}</b-button>
                    <b-button :disabled="!hidden" @click="$emit('disable-item', 'enable')">UNHIDE {{ type.toUpperCase() }}</b-button>
                </b-button-group>
            </b-col>
        </b-row>

        <b-row class="mb-3" align-h="center">
            <b-col sm="11">
                <b-button-group>
                    <b-button :disabled="expandedMenu === 'move'" @click="setActive('move')">
                        <p class="tiny">MOVE</p><font-awesome-icon class="fa-2x" :icon="['fas', 'hand-point-up']" />
                    </b-button>
                    <b-button :disabled="expandedMenu === 'color'" @click="setActive('color')">
                        <p class="tiny">COLOR</p><font-awesome-icon class="fa-2x" :icon="['fas', 'palette']" />
                    </b-button>
                    <b-button :disabled="expandedMenu === 'rotate'" @click="setActive('rotate')">
                        <p class="tiny">ROTATE</p><font-awesome-icon class="fa-2x" :icon="['fas', 'undo']" />
                    </b-button>
                    <b-button :disabled="expandedMenu === 'scale'" @click="setActive('scale')">
                        <p class="tiny">SCALE</p><font-awesome-icon class="fa-2x" :icon="['fas', 'expand-arrows-alt']" />
                    </b-button>
                    <b-button variant="warning" @click="$emit('random-item')">
                       <p class="tiny">RANDOM</p> <font-awesome-icon  class="fa-2x" :icon="['fas', 'dice']" />
                    </b-button>

                </b-button-group>
            </b-col>
        </b-row>

        <b-row v-if="expandedMenu === 'color'" class="mb-3" align-h="center">
            <b-col sm="12" class="d-flex flex-wrap">
                <div @click="colorize('none')" class="dotborder"><font-awesome-icon class="fa-rotate-45" style="color:tomato" :icon="['fas', 'sync']" /></div>
                <div @click="colorize('red')" class="red dot"></div>
                <div @click="colorize('yellow')" class="yellow dot"></div>
                <div @click="colorize('peach')" class="peach dot"></div>
                <div @click="colorize('orange')" class="orange dot"></div>
                <div @click="colorize('blue')" class="blue dot"></div>
                <div @click="colorize('green')" class="green dot"></div>
                <div @click="colorize('purple')" class="purple dot"></div>
                <div @click="colorize('brown')" class="brown dot"></div>
                <div @click="colorize('darkbrown')" class="darkbrown dot"></div>
                <div @click="colorize('black')" class="black dot"></div>
            </b-col>
        </b-row>

        <span v-if="expandedMenu === 'move'">
        <b-row align-h="center">
            <b-button-group>
                <b-button class="editorButton" @click="reposition(-5, 'xy-neg')">
                    <font-awesome-icon class="fa-rotate-n45" :icon="['fas', 'angle-double-up']" />
                </b-button>

                <b-button disabled variant="light" class="editorButton"></b-button>
                <b-button disabled variant="light" class="editorButton"></b-button>

                <b-button class="editorButton" @click="reposition(-5, 'y')">
                    <font-awesome-icon :icon="['fas', 'angle-double-up']" />
                </b-button>
                
                <b-button disabled variant="light" class="editorButton"></b-button>
                <b-button disabled variant="light" class="editorButton"></b-button>
                
                <b-button class="editorButton" @click="reposition(-5, 'xy-pos')">
                    <font-awesome-icon class="fa-rotate-45" :icon="['fas', 'angle-double-up']" />
                </b-button>
            </b-button-group>
        </b-row>
            
            <b-row align-h="center">
                <b-button-group>
                    <b-button disabled variant="light" class="editorButton"></b-button>

                    <b-button class="editorButton" @click="reposition(-1, 'xy-neg')">
                        <font-awesome-icon class="fa-rotate-n45" :icon="['fas', 'arrow-up']" />
                    </b-button>

                    <b-button disabled variant="light" class="editorButton"></b-button>

                    <b-button class="editorButton" @click="reposition(-1, 'y')">
                        <font-awesome-icon :icon="['fas', 'arrow-up']" />
                    </b-button>

                    <b-button disabled variant="light" class="editorButton"></b-button>

                    <b-button class="editorButton" @click="reposition(-1, 'xy-pos')">
                        <font-awesome-icon class="fa-rotate-45" :icon="['fas', 'arrow-up']" />
                    </b-button>

                    <b-button disabled variant="light" class="editorButton"></b-button>

                </b-button-group>
            </b-row>
            
            <b-row align-h="center">
                <b-button-group>
                    <b-button class="editorButton" @click="reposition(-5, 'x')">
                        <font-awesome-icon :icon="['fas', 'angle-double-left']" />
                    </b-button>

                    <b-button disabled variant="light" class="editorButton"></b-button>

                    <b-button class="editorButton" @click="reposition(-1, 'x')">
                        <font-awesome-icon :icon="['fas', 'arrow-left']" />
                    </b-button>

                    <b-button variant="danger" class="editorButton" @click="reposition(null, 'reset')">

                        <font-awesome-icon class="fa-rotate-45" :icon="['fas', 'sync']" />
                    </b-button>

                    <b-button class="editorButton" @click="reposition(1, 'x')">
                        <font-awesome-icon :icon="['fas', 'arrow-right']" />
                    </b-button>

                    <b-button disabled variant="light" class="editorButton"></b-button>

                    <b-button class="editorButton" @click="reposition(5, 'x')">
                        <font-awesome-icon :icon="['fas', 'angle-double-right']" />
                    </b-button>
                </b-button-group>
            </b-row>
            
            <b-row align-h="center">
                <b-button-group>
                    <b-button disabled variant="light" class="editorButton"></b-button>
                     <b-button class="editorButton" @click="reposition(1, 'xy-pos')">
                        <font-awesome-icon class="fa-rotate-45" :icon="['fas', 'arrow-down']" />
                    </b-button>
                    <b-button disabled variant="light" class="editorButton"></b-button>
                    <b-button class="editorButton" @click="reposition(1, 'y')">
                        <font-awesome-icon :icon="['fas', 'arrow-down']" />
                    </b-button>
                    <b-button disabled variant="light" class="editorButton"></b-button>
                    <b-button class="editorButton" @click="reposition(1, 'xy-neg')">
                        <font-awesome-icon class="fa-rotate-n45" :icon="['fas', 'arrow-down']" />
                    </b-button>
                    <b-button disabled variant="light" class="editorButton"></b-button>
                </b-button-group>
            </b-row>
            
            <b-row align-h="center" class="mb-4">
                <b-button-group>
                    <b-button class="editorButton" @click="reposition(5, 'xy-pos')">
                        <font-awesome-icon class="fa-rotate-45" :icon="['fas', 'angle-double-down']" />
                    </b-button>

                    <b-button disabled variant="light" class="editorButton"></b-button>
                    <b-button disabled variant="light" class="editorButton"></b-button>
                    
                    <b-button class="editorButton" @click="reposition(5, 'y')">
                        <font-awesome-icon :icon="['fas', 'angle-double-down']" />
                    </b-button>
                    
                    <b-button disabled variant="light" class="editorButton"></b-button>
                    <b-button disabled variant="light" class="editorButton"></b-button>
                    
                    <b-button class="editorButton" @click="reposition(5, 'xy-neg')">
                        <font-awesome-icon class="fa-rotate-n45" :icon="['fas', 'angle-double-down']" />
                    </b-button>
                </b-button-group>
            </b-row>
        </span>

        <b-row class="mb-2" align-h="center" v-if="expandedMenu === 'rotate'">
            <b-col sm="12" class="d-flex justify-content-center">
                <b-button-group>
                    <b-button variant="danger" class="editorButton" @click="$emit('reset-rotation')">
                        <font-awesome-icon :icon="['fas', 'ban']" />
                    </b-button>
                    <b-button class="editorButton" @click="$emit('rotate-canvas', 'clockwise')">
                        <font-awesome-icon class="fa-flip-horizontal" :icon="['fas', 'undo']" />
                    </b-button>
                    <b-button class="editorButton" @click="$emit('rotate-canvas', 'counterclockwise')">
                        <font-awesome-icon :icon="['fas', 'undo']" />
                    </b-button>
                    <b-button class="editorButton" variant="dark" @click="$emit('rotate-canvas', 'clockwise')">
                        <font-awesome-icon class="fa-flip-horizontal" :icon="['fas', 'undo']" />
                    </b-button>
                    <b-button class="editorButton" variant="dark" @click="$emit('rotate-canvas', 'counterclockwise')">
                        <font-awesome-icon :icon="['fas', 'undo']" />
                    </b-button>
                </b-button-group>
            </b-col>
        </b-row>

        <b-row class="mb-4" v-if="expandedMenu === 'scale'">
            <b-col sm="12" class="d-flex justify-content-center">
                <b-button-group>
                    <b-button variant="danger"  class="editorButton" @click="$emit('scale-sprite', 'reset')">
                        <font-awesome-icon :icon="['fas', 'ban']" />
                    </b-button>
                    <b-button class="editorButton" @click="$emit('scale-sprite', 'tall')">
                        <font-awesome-icon class="fa-rotate-n45" :icon="['fas', 'expand-alt']" />
                    </b-button>
                    <b-button  class="editorButton" @click="$emit('scale-sprite', 'short')">
                        <font-awesome-icon class="fa-rotate-n45" :icon="['fas', 'compress-alt']" />
                    </b-button>
                    <b-button class="editorButton" @click="$emit('scale-sprite', 'wide')">
                        <font-awesome-icon class="fa-rotate-45" :icon="['fas', 'expand-alt']" />
                    </b-button>
                    <b-button  class="editorButton" @click="$emit('scale-sprite', 'thin')">
                        <font-awesome-icon class="fa-rotate-45" :icon="['fas', 'compress-alt']" />
                    </b-button>
                    <b-button class="editorButton" @click="$emit('scale-sprite', 'up')">
                        <font-awesome-icon :icon="['fas', 'expand-arrows-alt']" />
                    </b-button>
                    <b-button  class="editorButton" @click="$emit('scale-sprite', 'down')">
                        <font-awesome-icon :icon="['fas', 'compress-arrows-alt']" />
                    </b-button>
                    
                </b-button-group>
            </b-col>
        </b-row>

        <b-row>
            <b-col sm="12">
                <p class="tiny">WARNING: The buttons below will randomize your character, use with caution. Randomization is not undo-able.</p>
            </b-col>
        </b-row>

        <b-row>
            <b-col sm="12" class="d-flex justify-content-center">
                <b-button-group>
                    <b-button class="editorButton" variant="danger" @click="$emit('randomize-character')">
                        <font-awesome-icon :icon="['fas', 'dice']" />
                    </b-button>
                    <b-button class="editorButton" variant="danger" @click="$emit('reset-character')">
                        <font-awesome-icon :icon="['fas', 'sync']" />
                    </b-button>
                </b-button-group>
            </b-col>
        </b-row>

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
        props:['type', 'maxRange', 'which', 'hidden'],
        data() {
            return {
                expandedMenu: 'move'
            }
        },
        computed: {
            selected: {
                get: function() {
                    return this.which;
                },
                set: function (newValue){
                    this.$emit('new-pick', newValue);
                    return newValue
                }
            }
        },
        methods: {
            reposition(value, direction) {
                this.$emit('change-position', {value, direction})
            },
            colorize(color) {
                this.$emit('change-color', color)
            },
            randomizeCharacter() {
                this.$emit('randomize-character');
            },
            resetCharacter() {
                this.$emit('reset-character');
            },
            setActive(which) {
                this.expandedMenu = which;
            }
        },
        mounted() {
            this.$emit('run-init');
        }
    }
</script>

<style scoped>
.dot {
    width:50px;
    height:50px;
    margin:10px;
    cursor:pointer;
    border-radius:999px;
}

.dotborder {
    width:50px;
    height:50px;
    border:solid 1px black;
    margin:10px;
    font-size:8px;
    display:flex;
    justify-content: center;
    align-items: center;
    cursor:pointer;
    border-radius:999px;
}

.red {
    background:rgb(180, 0, 0);
}

.yellow {
    background:rgb(235, 199, 0);
}

.brown {
    background:rgb(119, 58, 23);
}

.peach {
    background:rgb(248, 192, 160);
}

.black {
    background:rgb(43, 38, 35);
}

.darkbrown {
    background:rgb(85, 60, 46);    
}

.purple {
    background:rgb(151, 14, 105);    
}

.green {
    background:rgb(7, 170, 89);    
}

.blue {
    background:rgb(1, 94, 201);    
}

.orange {
    background:rgb(255, 105, 18);    
}

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
    width:45px;
    height:45px;
    margin:2px 5px;
}
</style>
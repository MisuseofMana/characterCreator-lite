<template>
    <div class="border">
        <h2>You are editing the {{ type }}.</h2>

        <div class="flexRow section">
            <button v-if="!hidden" @click="$emit('disable-item', 'disable')">HIDE {{ type.toUpperCase() }}</button>
            <button v-else-if="hidden" @click="$emit('disable-item', 'enable')">UNHIDE {{ type.toUpperCase() }}</button>
        </div>

        <div class="flexRow section">
            <div class="border margin arrow" @click="$emit('random-item')">
                <font-awesome-icon class="fa-rotate-n45" :icon="['fas', 'dice']" />
            </div>
            <input type="range" min="0" :max="maxRange-1" v-model="selected" class="slider" id="myRange">
            <p>#{{ selected }}</p>
        </div>

        <div class="flexRow section">
            <div @click="colorize('none')" class="dotborder"><p>NONE</p></div>
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

        </div>

        <div class="flexRow section">
            <div class="flexColumn">
                <div class="flexRow">
                    <div class="border margin arrow" @click="reposition(-1, 'xy-neg')">
                        <font-awesome-icon class="fa-rotate-n45" :icon="['fas', 'arrow-up']" />
                    </div>
                    <div class="border margin arrow" @click="reposition(-1, 'y')">
                        <font-awesome-icon :icon="['fas', 'arrow-up']" />
                    </div>
                    <div class="border margin arrow" @click="reposition(-1, 'xy-pos')">
                        <font-awesome-icon class="fa-rotate-45" :icon="['fas', 'arrow-up']" />
                    </div>
                </div>

                <div class="flexRow">
                    <div class="border margin arrow" @click="reposition(-1, 'x')">
                        <font-awesome-icon :icon="['fas', 'arrow-left']" />
                    </div>
                    <div class="border margin arrow" @click="reposition(null, 'reset')">
                        <font-awesome-icon class="fa-rotate-45" style="color:tomato" :icon="['fas', 'sync']" />
                    </div>
                    <div class="border margin arrow" @click="reposition(1, 'x')">
                        <font-awesome-icon :icon="['fas', 'arrow-right']" />
                    </div>
                </div>
                
                <div class="flexRow">
                    <div class="border margin arrow" @click="reposition(1, 'xy-pos')">
                        <font-awesome-icon class="fa-rotate-45" :icon="['fas', 'arrow-down']" />
                    </div>
                    <div class="border margin arrow" @click="reposition(1, 'y')">
                        <font-awesome-icon :icon="['fas', 'arrow-down']" />
                    </div>
                    <div class="border margin arrow" @click="reposition(1, 'xy-neg')">
                        <font-awesome-icon class="fa-rotate-n45" :icon="['fas', 'arrow-down']" />
                    </div>
                </div>
            </div>
            
            <div class="line"></div>

            <div class="flexColumn">

                <div class="flexRow">
                    <div class="border margin arrow" @click="reposition(-5, 'xy-neg')">
                        <font-awesome-icon class="fa-rotate-n45" :icon="['fas', 'angle-double-up']" />
                    </div>
                    <div class="border margin arrow" @click="reposition(-5, 'y')">
                        <font-awesome-icon :icon="['fas', 'angle-double-up']" />
                    </div>
                    <div class="border margin arrow" @click="reposition(-5, 'xy-pos')">
                        <font-awesome-icon class="fa-rotate-45" :icon="['fas', 'angle-double-up']" />
                    </div>
                </div>

                <div class="flexRow">
                    <div class="border margin arrow" @click="reposition(-5, 'x')">
                        <font-awesome-icon :icon="['fas', 'angle-double-left']" />
                    </div>
                    <div class="border margin arrow" @click="reposition(null, 'reset')">
                        <font-awesome-icon class="fa-rotate-45" style="color:tomato" :icon="['fas', 'sync']" />
                    </div>
                    <div class="border margin arrow" @click="reposition(5, 'x')">
                        <font-awesome-icon :icon="['fas', 'angle-double-right']" />
                    </div>
                </div>
                
                <div class="flexRow">
                    <div class="border margin arrow" @click="reposition(5, 'xy-pos')">
                        <font-awesome-icon class="fa-rotate-45" :icon="['fas', 'angle-double-down']" />
                    </div>
                    <div class="border margin arrow" @click="reposition(5, 'y')">
                        <font-awesome-icon :icon="['fas', 'angle-double-down']" />
                    </div>
                    <div class="border margin arrow" @click="reposition(5, 'xy-neg')">
                        <font-awesome-icon class="fa-rotate-n45" :icon="['fas', 'angle-double-down']" />
                    </div>
                </div>
            </div>
           
            <div class="line"></div>

            <div class="flexColumn">
                <div class="flexRow">
                    <div class="border margin arrow" @click="$emit('rotate-canvas', 'clockwise')">
                        <font-awesome-icon class="fa-flip-horizontal" :icon="['fas', 'undo']" />
                    </div>
                </div>
                <div class="flexRow">
                    <div class="border margin arrow" @click="$emit('rotate-canvas', 'counterclockwise')">
                        <font-awesome-icon :icon="['fas', 'undo']" />
                    </div>
                </div>

                <div class="flexRow">
                    <div class="border margin arrow" @click="$emit('reset-rotation')">
                        <font-awesome-icon style="color:tomato" :icon="['fas', 'ban']" />
                    </div>
                </div>

            </div>

            <div class="line"></div>

            <div class="flexColumn">
                <div class="flexRow">
                    <div class="border margin arrow" @click="$emit('scale-sprite', 'tall')">
                        <font-awesome-icon class="fa-rotate-n45" :icon="['fas', 'expand-alt']" />
                    </div>
                    <div class="border margin arrow"  @click="$emit('scale-sprite', 'short')">
                        <font-awesome-icon class="fa-rotate-n45" :icon="['fas', 'compress-alt']" />
                    </div>
                </div>
                <div class="flexRow">
                    <div class="border margin arrow" @click="$emit('scale-sprite', 'wide')">
                        <font-awesome-icon class="fa-rotate-45" :icon="['fas', 'expand-alt']" />
                    </div>
                    <div class="border margin arrow"  @click="$emit('scale-sprite', 'thin')">
                        <font-awesome-icon class="fa-rotate-45" :icon="['fas', 'compress-alt']" />
                    </div>
                </div>
                <div class="flexRow">
                    <div class="border margin arrow" @click="$emit('scale-sprite', 'up')">
                        <font-awesome-icon :icon="['fas', 'expand-arrows-alt']" />
                    </div>
                    <div class="border margin arrow"  @click="$emit('scale-sprite', 'down')">
                        <font-awesome-icon :icon="['fas', 'compress-arrows-alt']" />
                    </div>
                    <div class="border margin arrow"  @click="$emit('scale-sprite', 'reset')">
                        <font-awesome-icon style="color:tomato" :icon="['fas', 'ban']" />
                    </div>
                </div>
            </div>
            
            <div class="line"></div>

            <div class="flexColumn">
                <div class="flexRow">
                    <div class="border margin arrow" @click="$emit('move-layer', 'up')">
                        <font-awesome-icon :icon="['fas', 'arrow-up']" />
                    </div>
                </div>
                <div class="flexRow">
                    <div class="border-grey margin">
                        <font-awesome-icon style="color:#CCC" :icon="['fas', 'layer-group']" />
                    </div>
                </div>
                <div class="flexRow">
                    <div class="border margin arrow" @click="$emit('move-layer', 'down')">
                        <font-awesome-icon :icon="['fas', 'arrow-down']" />
                    </div>
                </div>
            </div>
        </div>

        
    </div>
</template>

<script>
    export default {
        props:['type', 'maxRange', 'which', 'hidden'],
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
    margin-right:10px;
    cursor:pointer;
    border-radius:999px;
}

.dotborder {
    width:50px;
    height:50px;
    border:solid 1px black;
    margin-right:10px;
    font-size:8px;
    display:flex;
    justify-content: center;
    align-items: center;
    cursor:pointer;
    border-radius:999px;
}

.dotborder p{
    margin:0;
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

button {
    padding:10px;
    margin-right:10px;
}

.line {
    width:1px;
    height:150px;
    margin:0 10px;
    border-right:solid black 2px;
}

.arrow {
    cursor:pointer;
    transition: all .1s;
}

.arrow:hover {
    transform:scale(1.1);
    background:rgb(136, 255, 215);
    transition: all .1s;
}

 .border {
        border:solid 1px black;
        padding:10px;
    }
    
    .border-grey {
        border:solid 1px #CCC;
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

    .flexRow {
        display:flex;
        flex-direction: row;
        align-items:center;
    }
 
    .flexRowCenter {
        display:flex;
        flex-direction: row;
        align-items:center;
        justify-content:center;
    }
    
    .flexColumnCenter {
        display:flex;
        flex-direction: column;
        align-items:center;
        justify-content:center;
        width:60px;
        height:60px;
    }

    .section {
        margin:10px 0;
    }

@media (min-width: 768px) {
    .slidecontainer {
    width: 100%; /* Width of the outside container */
    }

    /* The slider itself */
    .slider {
    -webkit-appearance: none;  /* Override default CSS styles */
    appearance: none;
    width: 60%; /* Full-width */
    height: 35px; /* Specified height */
    background: #d3d3d3; /* Grey background */
    outline: none; /* Remove outline */
    opacity: 0.7; /* Set transparency (for mouse-over effects on hover) */
    -webkit-transition: .2s; /* 0.2 seconds transition on hover */
    transition: opacity .2s;
    margin-right:10px;
    }

    /* Mouse-over effects */
    .slider:hover {
    opacity: 1; /* Fully shown on mouse-over */
    }

    /* The slider handle (use -webkit- (Chrome, Opera, Safari, Edge) and -moz- (Firefox) to override default look) */
    .slider::-webkit-slider-thumb {
    -webkit-appearance: none; /* Override default look */
    appearance: none;
    width: 25px; /* Set a specific slider handle width */
    height: 50px; /* Slider handle height */
    background: #7a7a7a; /* Green background */
    cursor: pointer; /* Cursor on hover */
    }

    .slider::-moz-range-thumb {
    width: 25px; /* Set a specific slider handle width */
    height: 25px; /* Slider handle height */
    background: #7a7a7a; /* Green background */
    cursor: pointer; /* Cursor on hover */
    }
}

</style>
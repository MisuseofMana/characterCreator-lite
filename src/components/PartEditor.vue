<template>
    <div class="border">
        <h2>You are editing the {{ type }}.</h2>

        <div class="flexRow">
            <button @click="$emit('disable-item', 'disable')">NO {{ type.toUpperCase() }}</button>
        </div>

        <div class="flexRow">
            <p>Selection</p>
            <input type="range" min="0" :max="maxRange" v-model="value" class="slider" id="myRange">
            <p>Option</p>
            <p>{{ value }}</p>
        </div>

        <div class="flexRow">
            <p>COLORS</p>
            <div @click="colorize('none')" class="dotborder"><p>NONE</p></div>
            <div @click="colorize('red')" class="red dot"></div>
            <div @click="colorize('yellow')" class="yellow dot"></div>
            <div @click="colorize('orange')" class="orange dot"></div>
            <div @click="colorize('blue')" class="blue dot"></div>
            <div @click="colorize('green')" class="green dot"></div>
            <div @click="colorize('purple')" class="purple dot"></div>
            <div @click="colorize('brown')" class="brown dot"></div>
            <div @click="colorize('darkbrown')" class="darkbrown dot"></div>
            <div @click="colorize('black')" class="black dot"></div>

        </div>

        <div class="flexRow">
            <p>Move Up or Down</p>
            <button @click="reposition(-1, 'y')">UP 1px</button>
            <button @click="reposition(1, 'y')">DOWN 1px</button>
            <p>|</p>
            <button @click="reposition(-5, 'y')">UP 5px</button>
            <button @click="reposition(5, 'y')">DOWN 5px</button>
        </div>
        
        <div class="flexRow">
            <p>Move Left or Right</p>
            <button @click="reposition(-1, 'x')">LEFT 1px</button>
            <button @click="reposition(1, 'x')">RIGHT 1px</button>
            <p>|</p>
            <button @click="reposition(-5, 'x')">LEFT 5px</button>
            <button @click="reposition(5, 'x')">RIGHT 5px</button>
        </div>
    </div>
</template>

<script>
    export default {
        props:['type', 'maxRange', 'selected'],
        data() {
            return {
                value: 0,
            }
        },
        watch: {
            value: function() {
                this.$emit('new-pick', this.value);
            }
        },
        methods: {
            reposition(value, direction) {
                this.$emit('change-position', {value, direction})
            },
            colorize(color) {
                this.$emit('change-color', color)
            }
        },
        mounted() {
            this.value = this.selected;
            this.$emit('run-init');
        }
    }
</script>

<style scoped>

    p {
        margin-right:10px;
    }

    button {
        padding:10px;
        margin-right:10px;
    }
    
    .flexRow {
        display:flex;
        flex-direction: row;
        align-items:center;
        margin:10px 0;
    }

    .border {
        border:solid 1px black;
        padding:10px;
    }

    .slidecontainer {
  width: 100%; /* Width of the outside container */
}

/* The slider itself */
.slider {
  -webkit-appearance: none;  /* Override default CSS styles */
  appearance: none;
  width: 100%; /* Full-width */
  height: 25px; /* Specified height */
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
  height: 25px; /* Slider handle height */
  background: #7a7a7a; /* Green background */
  cursor: pointer; /* Cursor on hover */
}

.slider::-moz-range-thumb {
  width: 25px; /* Set a specific slider handle width */
  height: 25px; /* Slider handle height */
  background: #7a7a7a; /* Green background */
  cursor: pointer; /* Cursor on hover */
}

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

</style>
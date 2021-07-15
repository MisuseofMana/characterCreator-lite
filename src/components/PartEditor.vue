<template>
    <b-card class="m-2">
        <div class="text-uppercase mb-2">{{type}}</div>
        <div class="d-flex justify-content-between align-items-center">
            <b-button>
                -
            </b-button>
                <span class="tiny text-uppercase mx-2">ITEM {{selected}}</span>
            <b-button>
                +
            </b-button>
        </div>
    </b-card>
</template>

<script>
    export default {
        props:['type', 'maxRange', 'which', 'hidden', 'expandedMenu', 'lightness',],
        data() {
            return {
                selected: 0,
            }
        },
        computed: {
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
    }
</script>

<style scoped>
.widthSet {
    width:200px;
}
</style>
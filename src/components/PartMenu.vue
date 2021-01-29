<template>
    <b-col xs="2" sm="3" md="12">
        <h3 @click="$emit('current-open', type)" class="pointer" :class="{'active' : isOpen}">{{ type.replace('-', ' ').toUpperCase() }}</h3>
    </b-col>
</template>

<script>
    export default {
        props:['type', 'open'],
        computed: {
            isOpen(){
                if (this.open === this.type) return true;
                return false;
            }
        },
    }
</script>

<style scoped>
    .active {
        color:rgb(255, 153, 0);
    }

    .pointer {
        display:block;
        cursor:pointer;
        transition: all .1s;
        padding:10px 0px;
        border:solid 1px black;
        margin: 0 0px 10px 0;
    }

    h3{
        font-size:10px;
        display:block;
        text-align:center;
    }
</style>
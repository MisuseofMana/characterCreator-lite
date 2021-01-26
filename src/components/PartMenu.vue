<template>
    <h3 @click="$emit('current-open', type)" class="pointer" :class="{'active' : isOpen}">{{ type.toUpperCase() }}</h3>
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
    }

    @media (min-width: 768px) {
        .pointer {
        cursor:pointer;
        transition: all .1s;
        padding:10px 10px;
        border:solid 1px black;
        margin: 0 10px 10px 0;
    }

    .pointer:hover {
        transform:scale(1.1);
        transition: all .1s;
    }

    h3{
        display:block;
        font-size:16px;
        margin:10px;
        padding:10px;
    }
    }
</style>
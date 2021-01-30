<template>
    <b-col xs="2" sm="3" md="12">
        <b-button @click="$emit('current-open', type)" class="d-flex flex-column justify-content-center align-items-center menuButton" :disabled="isOpen"><p class="tiny">{{ type.replace('-', ' ').toUpperCase() }}</p></b-button>
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

    .menuButton {
        width:100%;
        height:auto;
        margin:0 0 10px 0;
        font-size:1vw;
    }
</style>
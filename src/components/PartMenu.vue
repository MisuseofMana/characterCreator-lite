<template>
    <div>
        <h2 @click="$emit('current-open', type)" class="pointer" :class="{'active' : isOpen}">{{ type.toUpperCase() }}</h2>
    </div>
</template>

<script>
    export default {
        props:['type', 'open'],
        data() {
            return {
            }
        },
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
        cursor:pointer;
        transition: all .1s;
        padding:10px;
        border:solid 1px black;
        margin-right:10px
    }

    .pointer:hover {
        transform:scale(1.1);
        transition: all .1s;
    }

    .fullSpan {
        width:100%;
    }
</style>
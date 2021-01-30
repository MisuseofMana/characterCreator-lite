<template>
    <b-col cols="3" xs="12">
        <b-button @click="$emit('current-open', type)" class="d-flex flex-column justify-content-center align-items-center menuButton" :disabled="isOpen">
            <p class="tiny">{{ type.replace('-', ' ').toUpperCase() }}</p>
        </b-button>
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
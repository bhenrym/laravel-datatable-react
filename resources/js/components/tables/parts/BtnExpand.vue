<template>
<div>
    <v-btn v-if="!item.slide" @click="slide(true)" color="primary" icon small>
        <v-icon>mdi-chevron-up</v-icon>
    </v-btn>
    <v-btn v-else @click="slide(false)" color="primary" icon small>
        <v-icon>mdi-chevron-down</v-icon>
    </v-btn>
</div>
</template>

<script>
// <v-btn v-if="item.slide=== undefined || item.slide !=true" @click="slide(true)">expandir</v-btn>
export default {
    name: 'BtnExpand',
    props: {
        //urls
        indice: Number,
        multiple: Boolean,
        item: Object

    },
    data() {
        return {
            itemAll: [],
        }
    },

    methods: {
        slide(show) {
            //this.item.splice(0);
            this.$set(this.item, 'slide', show)
            this.$set(this.itemAll, this.indice, show)
        }
    }
}
</script>

<template>
<renderless-length-menu :query="query">
    <template v-slot:default="{query}">

        <v-menu v-model="menuLenght" :close-on-content-click="false" offset-y :nudge-bottom="5">
            <template v-slot:activator="{ on }">

                <v-chip class="mr-2" v-on="on" label outlined dark>
                    <v-avatar left class="mr-0">
                        <span class="font-weight-bold">{{query.limit}}</span>
                    </v-avatar>

                    <v-icon small v-if="menuLenght" right v-text="'mdi-chevron-up'" />
                    <v-icon small v-else right v-text="'mdi-chevron-down'" />
                </v-chip>

            </template>
            <v-card>
                <v-list dense>
                    <template v-for="(value,index) in lengthMenu">
                        <template v-if="value >= 1 || value==='all'">
                            <v-list-item :key="index" @click="updateLimit(value), menuLenght=!menuLenght" :disabled="loading">
                                <v-list-item-title>
                                    {{ value }}
                                </v-list-item-title>
                                <v-list-item-icon v-if="query.limit===value">
                                    <v-icon right small color="teal">mdi-check</v-icon>
                                </v-list-item-icon>

                            </v-list-item>
                        </template>
                    </template>
                </v-list>
            </v-card>
        </v-menu>
    </template>

</renderless-length-menu>
</template>

<script>
import RenderlessLengthMenu from './RenderlessLengthMenu.vue';
// pagina genera codigo de botones https://www.bestcssbuttongenerator.com/
export default {
    data() {
        return {
            menuLenght: {
                type: Boolean,
                default: false,
            },
        }
    },

    props: {
        query: {
            type: Boolean,
            default: false,
        },
        lengthMenu: {
            type: Array,
            default: []
        }

    },

    components: {
        RenderlessVuePagination
    }
}
</script>

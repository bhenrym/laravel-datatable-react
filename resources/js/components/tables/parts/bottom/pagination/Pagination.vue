<template>
<renderless-pagination :data="data" :limit="limit" :show-disabled="showDisabled" :size="size" :align="align" v-on:pagination-change-page="onPaginationChangePage">
    <div v-if="computed.total > computed.perPage" slot-scope="{ data, limit, showDisabled, size, align, computed, prevButtonEvents, nextButtonEvents, pageButtonEvents }">
        <v-row no-gutters :justify="align">

            <v-chip :small="size==='small'" :class="{'px-0':size==='small','px-1':size!='small'}" id="prevPageUrl" color="white" class="elevation-2 mr-1" label :disabled="!computed.prevPageUrl" v-if="computed.prevPageUrl || showDisabled" :tabindex="!computed.prevPageUrl && -1" v-on="prevButtonEvents">
                <v-avatar>
                    <v-icon>mdi-chevron-left</v-icon>
                </v-avatar>
            </v-chip>

            <v-chip :small="size==='small'" class="white mx-1 elevation-2" label v-for="(page, key) in computed.pageRange" :key="key" :class="{ 'primary': page == computed.currentPage, 'px-0':size==='small','px-1':size!='small' }" v-on="pageButtonEvents(page)">
                <span class="mx-2">
                    {{ page}}
                </span>
                <span class="d-sr-only" v-if="page == computed.currentPage">(current)</span>
            </v-chip>

            <v-chip :small="size==='small'" id="nextPageUrl" color="white" :class="{'px-0':size==='small','px-1':size!='small'}" class="elevation-2 ml-1" label :disabled="!computed.nextPageUrl" v-if="computed.nextPageUrl || showDisabled" :tabindex="!computed.nextPageUrl && -1" v-on="nextButtonEvents">
                <v-avatar>
                    <v-icon>mdi-chevron-right</v-icon>
                </v-avatar>
            </v-chip>

        </v-row>

    </div>

</renderless-pagination>
</template>

<script>
import RenderlessPagination from './RenderlessPagination.vue';
// pagina genera codigo de botones https://www.bestcssbuttongenerator.com/
export default {
    props: {
        data: {
            type: Object,
            default: () => {}
        },
        limit: {
            type: Number,
            default: 0
        },
        showDisabled: {
            type: Boolean,
            default: false
        },
        size: {
            type: String,
            default: false,
            /*
            validator: value => {
                return ['small', 'default', 'large'].indexOf(value) !== -1;
            }
            */
        },
        align: {
            type: String,
            default: 'left',
            /*
            validator: value => {
                return ['left', 'center', 'right'].indexOf(value) !== -1;
            }
            */
        }
    },

    methods: {
        onPaginationChangePage(page) {
            this.$emit('pagination-change-page', page);
        }
    },

    components: {
        RenderlessPagination
    }
}
</script>

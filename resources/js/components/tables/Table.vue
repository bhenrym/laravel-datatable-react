<template>
<div>

    <v-card color="primary" class="elevation-1 rounded-0 rounded-t">
        <v-row no-gutters justify="space-between">
            <v-col cols="auto" md="auto">
                <v-container class="fill-height" fluid>

                    <template v-if="controls.menuRowLenght">

                        <v-menu v-model="menuRowLenght" :close-on-content-click="false" offset-y :nudge-bottom="5">
                            <template v-slot:activator="{ on }">

                                <v-chip class="mr-2" v-on="on" label outlined dark>
                                    <v-avatar left class="mr-0">
                                        <span class="font-weight-bold">{{query.limit}}</span>
                                    </v-avatar>

                                    <v-icon small v-if="menuRowLenght" right v-text="'mdi-chevron-up'" />
                                    <v-icon small v-else right v-text="'mdi-chevron-down'" />
                                </v-chip>

                            </template>
                            <v-card>
                                <v-list dense>
                                    <template v-for="(value,index) in lengthMenu">
                                        <template v-if="value >= 1 || value==='all'">
                                            <v-list-item :key="index" @click="updateLimit(value), menuRowLenght=!menuRowLenght" :disabled="loading">
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

                    <template v-if="controls.menuFilter">

                        <v-menu v-model="menuFilter" :close-on-content-click="false" offset-y :nudge-bottom="5">
                            <template v-slot:activator="{ on }">

                                <v-chip class="mr-2" v-on="on" label outlined dark>
                                    <v-avatar left class="mr-0">
                                        <v-icon>mdi-filter</v-icon>
                                    </v-avatar>
                                    <v-icon small v-if="menuFilter" right v-text="'mdi-chevron-up'" />
                                    <v-icon small v-else right v-text="'mdi-chevron-down'" />
                                </v-chip>
                            </template>

                            <v-card max-width="500">

                                <v-toolbar color="blue darken-1" dense dark>
                                    <span>{{$t('filtering') }}</span>
                                    <v-spacer></v-spacer>

                                    <v-icon>mdi-magnify</v-icon>

                                </v-toolbar>

                                <!-- vform  select and inputs -->

                                <v-row class="px-4 mt-6" no-gutters>

                                    <v-col cols="6">
                                        <v-select class="mr-1" v-model="filter_column" :items="filterColumns" item-text="label" item-value="name" @click:clear="resetVarsFilter(true, true,true, true), resetValidation()" :menu-props="{offsetY: true}" :label="$t('search_for')" :placeholder="$t('search_for_placeholder')" dense outlined clearable return-object hide-details>
                                        </v-select>

                                    </v-col>

                                    <v-col cols="6">
                                        <v-select class="ml-1" v-model="filter_operator" :items="fetchOperators" item-text="label" item-value="name" ref="focus_operator" @change="resetVarsFilter(false, false, true, true), resetValidation()" @click:clear="resetVarsFilter(false, true,true, true), resetValidation()" :menu-props="{offsetY: true}" :label="$t('operator')" :placeholder="$t('operator_placeholder')" dense outlined clearable return-object hide-details>

                                            <template v-slot:no-data>
                                                <v-list-item>
                                                    <v-list-item-content>
                                                        <v-list-item-title>

                                                            {{$t('waiting')}}...
                                                        </v-list-item-title>
                                                        <v-list-item-subtitle>

                                                            {{$t('for_a_field_to_search')}}
                                                        </v-list-item-subtitle>
                                                    </v-list-item-content>
                                                </v-list-item>
                                            </template>

                                            <template v-slot:selection="{ attr,item }">
                                                <span v-bind="attr" class="black--text d-inline-block text-truncate" style="max-width: 100%;">{{ $t(item.label) }}</span>
                                            </template>
                                            <template v-slot:item="{ item }">
                                                <v-list-item-content>
                                                    <v-list-item-title>{{ $t(item.label) }}</v-list-item-title>
                                                </v-list-item-content>
                                            </template>

                                        </v-select>

                                    </v-col>
                                </v-row>

                                <v-form ref="form_yrneh" v-model="valid">
                                    <v-row class="px-4" no-gutters>

                                        <!-- default null-->

                                        <template v-if="filter_operator==null">
                                            <v-col cols="12">
                                                <v-text-field class="mt-3" :placeholder="$t('waiting_operator_placeholder')" :rules="[v => !!v || '']" append-icon="mdi-magnify" disabled outlined dense />
                                            </v-col>
                                        </template>

                                        <template v-if="filter_operator!=null && filter_operator.component==='single'">
                                            <v-col cols="12">
                                                <v-text-field v-model="filter_query_1" :rules="[v => !!v || $t('item_is_required')]" :type="filter_column.type==='numeric'?'number':'string'" :min='1' :label="$t('search')" :placeholder="$t('placeholder_search')" append-icon="mdi-magnify" class="mt-3" dense outlined autofocus />
                                            </v-col>
                                        </template>

                                        <template v-if="filter_operator!=null && filter_operator.component==='double'">
                                            <v-col cols="6">
                                                <v-text-field v-model="filter_query_1" :rules="[v => !!v || $t('item_is_required')]" :type="filter_column.type==='numeric'?'number':'string'" :max='filter_query_2' :label="$t('start')" :placeholder="$t('placeholder_start')" append-icon="mdi-magnify" class="mr-1 mt-3" dense outlined />

                                            </v-col>
                                            <v-col cols="6">
                                                <v-text-field v-model="filter_query_2" :rules="[v => !!v || $t('item_is_required')]" :type="filter_column.type==='numeric'?'number':'string'" :min='filter_query_1' :label="$t('end')" :placeholder="$t('placeholder_end')" append-icon="mdi-magnify" class="ml-1 mt-3" dense outlined />

                                            </v-col>
                                        </template>

                                        <template v-if="filter_operator!=null && filter_operator.component==='single_datetime'">
                                            <v-col cols="12">
                                                <v-menu ref="startDate1" :close-on-content-click="false" :return-value.sync="computedDateFormatted1" offset-y min-width="290px">
                                                    <template v-slot:activator="{ on, attrs }">
                                                        <v-text-field v-model="computedDateFormatted1" :rules="[v => !!v || $t('item_is_required')]" class="mt-3" :label="$t('date')" :placeholder="$t('placeholder_date')" prepend-inner-icon="mdi-calendar" readonly v-bind="attrs" v-on="on" outlined dense clearable @click:clear="filter_query_1 = null" />
                                                    </template>
                                                    <v-date-picker v-model="filter_query_1" :locale="locale" color="primary" no-title scrollable>

                                                        <v-spacer></v-spacer>
                                                        <v-btn text color="primary" @click="$refs.startDate1.isActive = false">Cancel</v-btn>
                                                        <v-btn text color="primary" @click="$refs.startDate1.save(filter_query_1)">OK</v-btn>
                                                    </v-date-picker>
                                                </v-menu>
                                            </v-col>
                                        </template>

                                        <template v-if="filter_operator!=null && filter_operator.component==='double_datetime'">
                                            <v-col cols="6">
                                                <v-menu ref="startDate1" :close-on-content-click="false" :return-value.sync="computedDateFormatted1" offset-y min-width="290px">
                                                    <template v-slot:activator="{ on, attrs }">
                                                        <v-text-field v-model="computedDateFormatted1" :rules="[v => !!v || $t('item_is_required')]" class="mt-3 mr-1" :label="$t('start')" :placeholder="$t('placeholder_start')" prepend-inner-icon="mdi-calendar" readonly v-bind="attrs" v-on="on" outlined dense clearable @click:clear="filter_query_1 = null" />
                                                    </template>
                                                    <v-date-picker v-model="filter_query_1" :max="filter_query_2" no-title scrollable>
                                                        <v-spacer></v-spacer>
                                                        <v-btn text color="primary" @click="$refs.startDate1.isActive = false">Cancel</v-btn>
                                                        <v-btn text color="primary" @click="$refs.startDate1.save(filter_query_1)">OK</v-btn>
                                                    </v-date-picker>
                                                </v-menu>
                                            </v-col>
                                            <v-col cols="6">
                                                <v-menu ref="startDate2" :close-on-content-click="false" :return-value.sync="computedDateFormatted2" offset-y min-width="290px">
                                                    <template v-slot:activator="{ on, attrs }">
                                                        <v-text-field v-model="computedDateFormatted2" :rules="[v => !!v || $t('item_is_required')]" class="mt-3 ml-1" :label="$t('end')" :placeholder="$t('placeholder_end')" prepend-inner-icon="mdi-calendar" readonly v-bind="attrs" v-on="on" outlined dense clearable @click:clear="filter_query_2 = null" />
                                                    </template>
                                                    <v-date-picker v-model="filter_query_2" :min="filter_query_1" no-title scrollable>
                                                        <v-spacer></v-spacer>
                                                        <v-btn text color="primary" @click="$refs.startDate2.isActive = false">Cancel</v-btn>
                                                        <v-btn text color="primary" @click="$refs.startDate2.save(filter_query_2)">OK</v-btn>
                                                    </v-date-picker>
                                                </v-menu>
                                            </v-col>
                                        </template>

                                    </v-row>

                                    <v-card-actions class="px-4 pt-0 mt-0 pb-0">

                                        <v-btn outlined color="indigo" @click="resetFilter()" small :disabled="!appliedFilters.length">
                                            <v-icon left>mdi-filter-remove-outline</v-icon> {{$t('clear_all') }}
                                        </v-btn>

                                        <v-spacer></v-spacer>

                                        <v-btn outlined color="blue darken-1" @click="applyFilter()" small :disabled="!valid">
                                            <v-icon left>mdi-filter-plus-outline</v-icon> {{$t('apply_filter') }}
                                        </v-btn>

                                    </v-card-actions>
                                </v-form>

                                <v-card-actions @click="panel = !panel" class="yrnehTableHeadersPointer">
                                    <v-btn class="ml-2" text>
                                        <div class="caption">{{$t('active_filters') }}</div>
                                    </v-btn>

                                    <v-spacer></v-spacer>

                                    <v-btn text v-if="appliedFilters.length">
                                        <div class="caption">{{$t('filtered_results') }} : {{collection.total}}</div>
                                    </v-btn>

                                    <v-btn icon class="mr-2" @click="''">
                                        <v-icon>{{ panel ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                                    </v-btn>

                                </v-card-actions>

                                <v-expand-transition>
                                    <div v-show="panel">
                                        <v-divider></v-divider>
                                        <v-card-text>

                                            <template v-if="appliedFilters.length===0">
                                                <v-chip small label>
                                                    {{$t('no_active_filter') }}...
                                                </v-chip>
                                            </template>

                                            <template v-else>
                                                <template v-for="(filter,index) in appliedFilters">

                                                    <v-tooltip top :key="index" content-class="py-0 blue darken-1">
                                                        <template v-slot:activator="{ on, attrs }">
                                                            <v-chip class="mx-1 my-1" v-bind="attrs" v-on="on" label small :key="index" close @click:close="removeFilter(index)">
                                                                {{filter.chip_text}}
                                                            </v-chip>
                                                        </template>
                                                        <span> {{$t(filter.chip_tooltip) }} </span>
                                                    </v-tooltip>

                                                </template>
                                            </template>

                                        </v-card-text>
                                    </div>
                                </v-expand-transition>

                                <!--
                                <v-expansion-panels v-model="panel" :disabled="loading" flat>
                                    <v-expansion-panel>

                                        <v-expansion-panel-header>

                                            <v-row no-gutters>
                                                <v-col cols="6">
                                                    <div class="caption">{{$t('active_filters') }}</div>
                                                </v-col>
                                                <v-col cols="6" class="text-right">
                                                    <v-fade-transition leave-absolute>
                                                        <div class="caption mr-1" v-if="appliedFilters.length"> {{$t('filtered_results') }} : {{collection.total}}</div>

                                                    </v-fade-transition>
                                                </v-col>
                                            </v-row>
                                        </v-expansion-panel-header>

                                        <v-expansion-panel-content class="text-center">
                                            <template v-if="appliedFilters.length===0">
                                                <v-chip small label>
                                                    {{$t('no_active_filter') }}...
                                                </v-chip>
                                            </template>
                                            <template v-else>
                                                <template v-for="(filter,index) in appliedFilters">

                                                    <v-tooltip top :key="index" content-class="py-0 blue darken-1">
                                                        <template v-slot:activator="{ on, attrs }">
                                                            <v-chip class="mx-1 my-1" v-bind="attrs" v-on="on" label small :key="index" close @click:close="removeFilter(index)">
                                                                {{filter.chip_text}}
                                                            </v-chip>
                                                        </template>
                                                        <span> {{$t(filter.chip_tooltip) }} </span>
                                                    </v-tooltip>

                                                </template>

                                            </template>

                                        </v-expansion-panel-content>
                                    </v-expansion-panel>
                                </v-expansion-panels>
                                -->
                            </v-card>

                        </v-menu>
                    </template>

                    <template v-if="controls.menuTableStyle">

                        <v-menu v-model="menuTableStyle" :close-on-content-click="false" offset-y :nudge-bottom="5">
                            <template v-slot:activator="{ on }">

                                <v-chip class="mr-2" v-on="on" label outlined dark>
                                    <v-avatar left class="mr-0">
                                        <v-icon>mdi-table</v-icon>
                                    </v-avatar>
                                    <v-icon small v-if="menuTableStyle" right v-text="'mdi-chevron-up'" />
                                    <v-icon small v-else right v-text="'mdi-chevron-down'" />
                                </v-chip>
                            </template>
                            <v-card min-width="140">
                                <v-list dense>
                                    <v-list-item @click="narrow  =!narrow ">
                                        <v-list-item-title>
                                            is-narrow
                                        </v-list-item-title>
                                        <v-list-item-icon v-if="narrow">
                                            <v-icon right small color="teal">mdi-check</v-icon>
                                        </v-list-item-icon>
                                    </v-list-item>

                                    <v-list-item @click="striped =!striped">
                                        <v-list-item-title>
                                            is-striped
                                        </v-list-item-title>
                                        <v-list-item-icon v-if="striped">
                                            <v-icon right small color="teal">mdi-check</v-icon>
                                        </v-list-item-icon>
                                    </v-list-item>

                                    <v-list-item @click="border  =!border ">
                                        <v-list-item-title>
                                            is-bordered
                                        </v-list-item-title>
                                        <v-list-item-icon v-if="border">
                                            <v-icon right small color="teal">mdi-check</v-icon>
                                        </v-list-item-icon>
                                    </v-list-item>

                                    <v-list-item @click="mobile  =!mobile ">
                                        <v-list-item-title>
                                            is-mobile
                                        </v-list-item-title>
                                        <v-list-item-icon v-if="mobile">
                                            <v-icon right small color="teal">mdi-check</v-icon>
                                        </v-list-item-icon>
                                    </v-list-item>

                                </v-list>
                            </v-card>
                        </v-menu>
                    </template>

                    <template v-if="controls.menuRefresh">

                        <v-chip class="mr-2" label outlined dark @click="refresh()" :disabled="loading">
                            <v-icon>mdi-cached</v-icon>
                        </v-chip>
                    </template>

                    <template v-if="controls.menuReset">
                        <v-chip class="mr-2" label outlined dark @click="reset()" :disabled="loading">
                            <v-icon>mdi-restore</v-icon>
                        </v-chip>
                    </template>

                    <template v-if="controls.menuPrinter">
                        <v-chip class="mr-2" label outlined dark @click="printer()" :disabled="loading">
                            <v-icon>mdi-printer</v-icon>
                        </v-chip>
                    </template>

                    <template v-if="controls.menuDownloadPdf">
                        <v-chip class="mr-2" label outlined dark @click="downloadPdf()" :disabled="loading">
                            <v-icon>mdi-file-pdf-outline</v-icon>
                        </v-chip>
                    </template>

                    <template v-if="controls.menuSort && mobile && breakpoint">

                        <v-menu v-model="menuSort" :close-on-content-click="false" offset-y :nudge-bottom="5">
                            <template v-slot:activator="{ on }">

                                <v-chip class="mr-2" v-on="on" label outlined dark :disabled="loading">
                                    <v-avatar left class="mr-0">
                                        <v-icon>mdi-sort</v-icon>
                                    </v-avatar>
                                    <v-icon small v-if="menuSort" right v-text="'mdi-chevron-up'" />
                                    <v-icon small v-else right v-text="'mdi-chevron-down'" />
                                </v-chip>
                            </template>
                            <v-card min-width="140">
                                <v-list dense>

                                    <v-list-item-group>
                                        <template v-for="header in headers">
                                            <template v-if="header.orderable">
                                                <v-list-item :key="header.name" @click="updateOrderDirection(header.name)">

                                                    <v-list-item-content>
                                                        <v-list-item-title>
                                                            {{ header.label.toLowerCase()}}
                                                        </v-list-item-title>
                                                    </v-list-item-content>

                                                    <v-list-item-icon>
                                                        <v-icon v-if="query.order_direction === 'asc' && query.order_column === header.name" small>mdi-arrow-up</v-icon>
                                                        <v-icon v-if="query.order_direction === 'desc' && query.order_column === header.name" small>mdi-arrow-down</v-icon>
                                                    </v-list-item-icon>

                                                </v-list-item>
                                            </template>
                                        </template>
                                    </v-list-item-group>

                                </v-list>
                            </v-card>
                        </v-menu>
                    </template>

                    <slot name="controls"></slot>

                </v-container>
            </v-col>

            <v-col cols="12" md="4" v-if="controls.search">
                <v-container class="fill-height" :class="{'pt-0':$vuetify.breakpoint.xsOnly}" fluid>
                    <v-text-field v-model="term" autocomplete="off" name="search" dark dense clearable single-line hide-details append-icon="mdi-magnify" @click:clear="clearSearch()" @input="debounceSearch()" :label="$t('search_place_all')"></v-text-field>
                </v-container>
            </v-col>

        </v-row>

    </v-card>

    <v-card class="elevation-1 rounded-0 rounded-b">
        <template>
            <!-- progree linear in top headers loading-->
            <v-progress-linear :active="loading" :indeterminate="loading" :height="5" absolute top color="light-blue"></v-progress-linear>
            <!-- overlay loading in body-->
            <v-overlay :absolute="true" :opacity="0.04" :value="loading">
                <span class="subtitle-2 primary--text">
                    <v-chip small text-color="white" color="primary">
                        <v-avatar left>
                            <v-progress-circular :width="2" :size="14" indeterminate> </v-progress-circular>
                        </v-avatar>
                        {{$t('loading') }}
                    </v-chip>
                </span>
            </v-overlay>

            <v-progress-linear v-if="mobile && breakpoint" :active="loading" :indeterminate="loading" :height="5" absolute bottom color="light-blue"></v-progress-linear>

        </template>

        <v-simple-table :id="url" ref="yrnehTableRef" :dense="narrow" v-bind:class="{ 'yrnehTableStriped' : striped, 
        'yrnehTableBorder':border,
        'yrnehTableMobile yrnehTableMobileBorderDisable':mobile && breakpoint, 
        'yrnehTableIsNarrow':narrow,
        'yrnehTableMobileBorder':border  }" class="yrnehTableExpand yrnehTableHidden">

            <!--<v-simple-table dense fixed-header height="300">-->

            <template v-slot:default>
                <template v-if="collection.data && collection.data.length>0 && hasError===false">
                    <thead>
                        <tr>
                            <template v-for="(header,index) in headers">

                                <th v-if="header.orderable" @click="updateOrderDirection(header.name)" :style="header.style" :width="header.width" :key="'cell-'+index" :ref="'cell-'+index" v-bind:class="{ ['cell-'+index]: true, [header.class]:header.class !== undefined }" class="yrnehTableHeadersPointer">
                                    <span> {{header.label.toUpperCase()}} </span>

                                    <v-icon v-if="query.order_direction === 'asc' && query.order_column === header.name" small>mdi-arrow-up</v-icon>
                                    <v-icon v-if="query.order_direction === 'desc' && query.order_column === header.name" small>mdi-arrow-down</v-icon>
                                    <!--
                                    <v-icon v-if="query.order_direction === 'asc' && query.order_column != header.name" small dark>mdi-arrow-down</v-icon>
                                    <v-icon v-if="query.order_direction === 'desc' && query.order_column != header.name" small dark>mdi-arrow-down</v-icon>
                                    -->
                                </th>

                                <th v-else :width="header.width" :key="'cell-'+index" :ref="'cell-'+index" v-bind:class="{ ['cell-'+index]: true, [header.class]:header.class !== undefined }">
                                    <span>{{header.label.toUpperCase()}}</span>
                                </th>

                            </template>
                        </tr>
                    </thead>

                    <tbody>

                        <template v-for="(item,indice) in collection.data">

                            <slot :item="item" :indice="indice">

                            </slot>

                        </template>

                    </tbody>
                </template>

                <!-- primera carga refresh pag-->
                <template v-if="loading===true && hasError===false && collection.data.length===0">
                    <tbody>
                        <tr id="is-loading">
                            <td class="py-6" style="padding-left: 5% !important;"></td>
                        </tr>
                    </tbody>
                </template>

                <!-- no hay registros que mostrar-->
                <template v-if="loading===false && collection.total===0 && hasError===false">
                    <tbody>
                        <tr id="no-data">
                            <td class="text-center py-4" style="padding-left: 5% !important;">

                                {{$t('not_records')}}
                            </td>
                        </tr>

                    </tbody>
                </template>

                <!-- error server -->
                <template v-if="loading===false && hasError===true">
                    <tbody>
                        <tr id="is-error">
                            <td class="text-center py-4" style="padding-left: 5% !important;">
                                {{$t('has_error')}}
                            </td>
                        </tr>
                    </tbody>
                </template>

                <!-- primera cuando hay error  y refresh-->
                <template v-if="loading===true && hasError===true">
                    <tbody>
                        <tr id="is-loading-error">
                            <td class="py-6" style="padding-left: 5% !important;"></td>
                        </tr>
                    </tbody>
                </template>

            </template>

        </v-simple-table>

    </v-card>

    <template v-if="collection.data && collection.data.length && !hasError">
        <v-row class="mt-2" no-gutters>
            <v-col cols="12" md="6">

                <div class="text-subtitle-2 font-weight-regular">
                    {{$t('showing')}} {{collection.from}} {{$t('to')}} {{collection.to}} {{$t('of')}} {{collection.total}} {{$t('entries')}}
                </div>

                <!-- Mostrando del {{collection.from}} al {{collection.to}} de un total {{collection.total}} registros. -->
            </v-col>
            <v-col cols="12" md="6">
                <pagination :data="collection" v-on:pagination-change-page="updatePage" :show-disabled="true" :size="pagination.size" :align="pagination.align" :limit="pagination.limit">
                </pagination>
            </v-col>
        </v-row>

    </template>


    <!--

        <div v-if="$vuetify.breakpoint.xsOnly">
        mobile

    </div>

    <v-btn class="text-capitalize">Continue</v-btn>
    <div class="text-center pt-2">
        <v-btn @click="stared">hola</v-btn>
    </div>
    -->

</div>
</template>

<script>
// https://dev.to/codeply/building-a-paged-responsive-data-iterator-with-vue-vuetify-3ma9

// https://codepen.io/thokkane/pen/PooemJP  expandedvuetable

// https://github.com/codekerala/Laravel-5.6-and-Vue.j-2-Dataviewer-Advanced-Filter  

import Pagination from './parts/bottom/pagination/Pagination';
window._ = require('lodash');
import i18n from '~/plugins/i18n';
import {
    mapGetters
} from 'vuex';

import jsPDF from 'jspdf';
import 'jspdf-autotable';

//var _ = require('lodash');
export default {
    name: 'YrnehTable',

    components: {
        Pagination
    },

    props: {
        //urls
        url: String,

        formatedDate: {
            type: String,
            default: 'YYYY-MM-DD' //DD-MM-YYYY //MM-DD-YYYY //YYYY-MM-DD
        },
        pagination: {
            type: Object,
            default: function () {
                return {
                    size: 'small', // default small
                    align: 'end',
                    limit: 2,
                }
            }
        },

        isMobile: {
            type: Boolean,
            default: true
        },

        isStriped: {
            type: Boolean,
            default: false
        },
        isBorder: {
            type: Boolean,
            default: false
        },
        isNarrow: {
            type: Boolean,
            default: true
        },

        //size responsive mobile
        sizeMobile: {
            type: String,
            default: 'xsOnly' //  xsOnly smAndDown mdAndDown
        },

        //config component father

        controls: {
            type: Object,
            default: function () {
                return {
                    menuRowLenght: true,
                    menuFilter: false,
                    menuTableStyle: false,
                    menuRefresh: false,
                    menuReset: false,
                    menuPrinter: false,
                    menuDownloadPdf: false,
                    menuSort: true,
                    search: false
                }
            }

        },

        queryIni: {
            type: Object,
            default: function () {
                return {
                    order_column: "id",
                    order_direction: "desc", //
                    filter_match: "and",
                    limit: 10, //inicia cuantos registros mostrar
                    page: 1
                }
            }
        },

        post: {
            type: Boolean,
            default: false //  xsOnly smAndDown mdAndDown
        },

        dataPost: {
            type: Array,
            default: () => [],
        },

        lengthMenu: {
            type: Array,
            default: () => [10, 50, 100],
        },

        columns: {
            type: Array,
            default: () => [],
        },

        //filteer
        filterColumns: {
            type: Array,
            default: () => [],
        },

        //jspdfColumns  export props *********************************************************************************************************************
        exportColumns: {
            type: Array,
            default: () => [],
        },

        jspdfWillDrawCellFormatDate: {
            type: Array,
            default: () => ['created_at'],
        },

        jspdfImages: {
            type: Array,
            default: () => [],
        },

        jspdfTitle: {
            type: Object,
            default: () => {},
        },

        jspdfSubTitle: {
            type: Object,
            default: () => {},
        },

        jspdfOrientation: {
            type: String,
            default: 'landscape',
        },
        jspdfFormat: {
            type: String,
            default: 'letter',
        },
        jspdfNameDocument: {
            type: String,
            default: 'reporte pedidos.pdf',
        },

        jspdfAutoTableConfig: {
            type: Object,
            default: () => {},
        },

    },

    data() {
        return {
            title: true,

            //validate
            valid: true,

            //precarga
            loading: false,
            hasError: false,

            //style table control

            narrow: this.isNarrow,
            border: this.isBorder,
            striped: this.isStriped,
            mobile: this.isMobile,
            //style

            // menus
            menuTableStyle: false,
            menuRowLenght: false,
            menuFilter: false,
            menuSort: false,
            panel: null,
            ///////---------

            // header and shower
            headers: [],

            //search
            term: null,
            term_temp: null,

            //filter
            appliedFilters: [], // enviar
            filterCandidates: [],

            filterCandidatesCache: [],
            //temp_date 

            menu_date_1: false,
            menu_date_2: false,
            //
            filter_column: null,
            filter_operator: null,
            filter_query_1: null,
            filter_query_2: null,

            // data propio

            query: {},
            collection: {
                data: []
            },

            //post
            localDataPost: []

        };
    },

    mounted() {
        this.$yrnehTable.$on('event.resetFilter', this.resetFilter);
        this.$yrnehTable.$on('event.reset', this.reset);
        this.$yrnehTable.$on('event.refresh', this.refresh);
        this.init()
        this.fetch()
    },

    beforeDestroy() {
        this.$yrnehTable.$off('event.resetFilter', this.resetFilter);
        this.$yrnehTable.$off('event.reset', this.reset);
        this.$yrnehTable.$off('event.refresh', this.refresh);
    },

    computed: {
        ...mapGetters('lang', ['locale']),

        //responsive
        breakpoint() {

            switch (this.sizeMobile) {
                case 'xsOnly':
                    return this.$vuetify.breakpoint.xsOnly;
                    break;
                case 'smAndDown':
                    return this.$vuetify.breakpoint.smAndDown;
                    break;
                case 'mdAndDown':
                    return this.$vuetify.breakpoint.mdAndDown;
                    break;
            }

        },

        //menus

        //fetch operators

        fetchOperators() {

            // reset this.filter_.......   resetVarsFilter(colum, operator, query_1, query_2)
            this.resetVarsFilter(false, true, true, true)

            //retur operator object
            return this.availableOperators().filter(operator => {
                if (this.filter_column && operator.parent.includes(this.filter_column.type)) {
                    this.$refs.focus_operator.isMenuActive = true
                    return operator;
                }
            });

        },

        computedDateFormatted1: {
            // getter
            get: function () {
                return this.formatDate(this.filter_query_1)
            },
            // setter
            set: function (newValue) {
                return this.formatDate(newValue)
            }
        },

        computedDateFormatted2: {
            // getter
            get: function () {
                return this.formatDate(this.filter_query_2)
            },
            // setter
            set: function (newValue) {
                return this.formatDate(newValue)
            }
        },

        narrowComputed() {
            return !this.narrow;
        },

    },

    methods: {

        validate() {
            this.$refs.form_yrneh.validate();
        },

        resetValidation() {
            this.$refs.focus_operator.isMenuActive = false;
            this.$refs.form_yrneh.resetValidation();
        },

        init() {
            Object.assign(this.query, this.queryIni);
            //Object.assign(this.localDataPost, this.dataPost);

            this.localDataPost = Object.values(this.dataPost);

            this.headers = Object.values(this.columns);
        },

        //date ************************************************************************
        formatDate(date) {
            if (!date) return null

            switch (this.formatedDate) {
                case 'DD-MM-YYYY':
                    const [year, month, day] = date.split('-');
                    return `${day}-${month}-${year}`;
                    break;
                case 'YYYY-MM-DD':
                    const [year2, month2, day2] = date.split('-');
                    return `${year2}-${month2}-${day2}`;
                    break;
                case 'MM-DD-YYYY':
                    const [year3, month3, day3] = date.split('-');
                    return `${month3}-${day3}-${year3}`;
                    break;
            }

        },

        //responsive ************************************************************************

        //order ************************************************************************
        updateOrderDirection(head_name) {
            //console.log(this.query.order_column)
            if (this.query.order_direction === "asc" && this.query.order_column === head_name) {
                this.query.order_direction = "desc";
                this.$set(this.query, "order_column", head_name)
            } else {
                this.query.order_direction = "asc";
                this.$set(this.query, "order_column", head_name)

            }
            this.applyChange();
        },

        // page************************************************************************
        updatePage(page) {
            if (typeof page === 'undefined') {
                page = 1;
            } else {
                this.query.page = Number(page);
                this.applyChange();
            }

        },

        // method in plugin global 
        reset() {
            Object.assign(this.query, this.queryIni)
            this.term = null
            this.resetFilter();
        },
        refresh() {
            this.fetch();
        },

        //filter advanced

        resetFilter() {
            this.filterCandidates.splice(0);
            this.filterCandidatesCache.splice(0);

            this.applyChange();
        },

        removeFilter(index) {
            this.filterCandidatesCache = Object.values(this.filterCandidates);
            this.filterCandidates.splice(index, 1);

            this.applyChange();
        },

        applyFilter() {
            this.term = null

            this.filterCandidates.push({
                column: this.filter_column.name,
                operator: this.filter_operator.name,
                query_1: this.filter_query_1,
                query_2: this.filter_query_2,
                chip_text: this.getChipText(),
                chip_tooltip: this.filter_operator.name
            })

            this.query.page = 1;
            this.panel = 0
            this.resetVarsFilter(true, true, true, true)
            this.applyChange();

        },

        // input search apply

        resetSearch() {
            this.filterCandidates.splice(0);
            this.filterCandidatesCache.splice(0);
            this.query.page = 1;
            this.resetVarsFilter(true, true, true, true);

            //console.log(this.getFilters())
        },

        clearSearch() {
            this.term = null
            this.resetSearch()
            this.applyChange()
        },

        debounceSearch: _.debounce(function (e) {
            //this.answer = e.target.value;
            //console.log('get', this.question)
            if (this.term === '') {
                this.term = null
                this.resetSearch()
                this.applyChange();

            } else {
                this.applySearch()
            }
        }, 850),

        applySearch() {
            this.resetSearch()
            if (this.term != null) {
                this.applyChange();
            }

        },

        // verify date format input search
        checkNumber(arr) {
            //console.log(arr)

            switch (this.formatedDate) {
                case 'DD-MM-YYYY':
                    if (arr.length === 2) {
                        if ((arr[0].length === 1 || arr[0].length >= 3) ||
                            (arr[1].length === 1 || arr[1].length >= 3)) {
                            return false;
                        }
                    }

                    if (arr.length === 3) {
                        if ((arr[0].length === 1 || arr[0].length >= 3) ||
                            (arr[1].length === 1 || arr[1].length >= 3) ||
                            (arr[2].length !== 0 && arr[2].length <= 3 || arr[2].length > 4)) {
                            return false;
                        }
                    }

                    break;
                case 'YYYY-MM-DD':
                    return false;

                    break;
                case 'MM-DD-YYYY':
                    if (arr.length === 2) {
                        if ((arr[0].length === 1 || arr[0].length >= 3) ||
                            (arr[1].length === 1 || arr[1].length >= 3)) {
                            return false;
                        }
                    }

                    if (arr.length === 3) {
                        if ((arr[0].length === 1 || arr[0].length >= 3) ||
                            (arr[1].length === 1 || arr[1].length >= 3) ||
                            (arr[2].length !== 0 && arr[2].length <= 3 || arr[2].length > 4)) {
                            return false;
                        }
                    }

                    break;
            }

            for (let i = 0; i < arr.length; i++) {
                const num = arr[i] + '';

                if (isNaN(num)) {
                    //console.log(isNaN(num), " no number") //when is not number
                    return false;
                } //si se puede convertir en num !true   parts[i].length >= 2

            }
            return true;
        },

        checkDateFormat() {

            if (this.term.includes('-')) {
                const parts = this.term.split('-')
                const size = parts.length

                if (size >= 2 && size <= 3 && this.checkNumber(parts)) {
                    switch (size) {
                        case 2:
                            const se = this.term.split('-');

                            switch (this.formatedDate) {
                                case 'DD-MM-YYYY':

                                    this.term_temp = `${se[1]}-${se[0]}`; //start end
                                    break;
                                case 'YYYY-MM-DD':
                                    // return term.......
                                    break;
                                case 'MM-DD-YYYY':

                                    this.term_temp = `${se[0]}-${se[1]}`; //start end

                                    break;
                            }

                            break;
                        case 3:
                            switch (this.formatedDate) {
                                case 'DD-MM-YYYY':
                                    const dmy = this.term.split('-');

                                    this.term_temp = `${dmy[2]}-${dmy[1]}-${dmy[0]}`;
                                    //this.term_temp = `${D}-${M}-${YY}`;
                                    break;
                                case 'YYYY-MM-DD':
                                    //return term

                                    break;
                                case 'MM-DD-YYYY':
                                    const mdy = this.term.split('-');

                                    this.term_temp = `${mdy[2]}-${mdy[0]}-${mdy[1]}`;
                                    //this.term_temp = `${YYYYY}-${MMM}-${DDD}`
                                    break;
                            }

                    }
                    return true;

                } else {
                    this.term_temp = this.term;
                    return false;
                }
            } else {
                return false;
            }

        },

        //get search or filter advanced
        getFilters() {

            if (this.term === null) {
                const f = {};

                this.filterCandidates.forEach((filter, i) => {
                    f[`f[${i}][column]`] = filter.column;
                    f[`f[${i}][operator]`] = filter.operator;
                    f[`f[${i}][query_1]`] = filter.query_1;
                    f[`f[${i}][query_2]`] = filter.query_2;
                });

                if (this.post) {
                    f.post_http = this.post;
                    this.localDataPost.forEach((filter, i) => {
                        f[`init[${i}][post_column]`] = filter.column;
                        f[`init[${i}][post_params]`] = filter.params;
                    });
                    /*
                    f.post_http = this.post;
                    f.post_column = this.localDataPost.column;
                    f.post_params = this.localDataPost.params;
                    */
                }
                //console.dir(f)
                return f;
            } else {

                const columns = [];
                this.filterColumns.filter(function (obj, index) {
                    columns[index] = obj.name; //label/name/type
                });

                const words_search = {};

                if (this.checkDateFormat()) {

                    //console.log('date formted ' + this.term_temp)

                    words_search.w_term = this.term_temp
                    words_search.w_columns = columns

                } else {
                    //console.log('not formted ' + this.term)

                    words_search.w_term = this.term
                    words_search.w_columns = columns

                }
                if (this.post) {
                    words_search.post_http = this.post;

                    this.localDataPost.forEach((filter, i) => {
                        words_search[`init[${i}][post_column]`] = filter.column;
                        words_search[`init[${i}][post_params]`] = filter.params;
                    });
                    /*
                    words_search.post_column = this.localDataPost.column;
                    words_search.post_params = this.localDataPost.params;
                    */
                }

                return words_search;

            }

        },

        resetVarsFilter(colum, operator, query_1, query_2) {

            this.$nextTick(() => {

                if (colum) {
                    this.filter_column = null;
                }
                if (operator) {
                    this.filter_operator = null;
                }
                if (query_1) {
                    this.filter_query_1 = null;
                }
                if (query_2) {
                    this.filter_query_2 = null;
                }
            })

        },

        fetch() {

            this.loading = true;
            const filters = this.getFilters();

            const paramsSet = {
                ...filters,
                ...this.query
            };

            axios.get(this.url, {
                params: paramsSet
            }).then(res => {
                this.hasError = false;
                this.loading = false;

                this.$set(this.$data, "collection", res.data.collection);
                this.query.page = res.data.collection.current_page;

                this.appliedFilters = Object.values(this.filterCandidates);

            }).catch(error => {
                this.loading = false;
                this.hasError = true;
                this.filterCandidates = Object.values(this.filterCandidatesCache);
            }).finally(() => {
                this.loading = false;
            });

        },
        applyChange() {
            this.fetch();
        },
        updateLimit(limit) {

            if (limit == 'all') {
                this.$set(this.query, "limit", this.collection.total)

                this.query.page = 1;
                this.applyChange();
                this.$set(this.query, "limit", 'all')
            } else {
                this.$set(this.query, "limit", limit)
                this.query.page = 1;
                this.applyChange();
            }

        },

        availableOperators() {
            return [{
                    label: "contains",
                    name: "contains", //contiene like
                    parent: ["numeric", "string"],
                    component: "single"
                },
                {
                    label: "equal_to", //i18n.t("equal_to"),
                    name: "equal_to", //igual a
                    parent: ["numeric", "string"],
                    component: "single"
                },
                {
                    label: "not_equal_to",
                    name: "not_equal_to", //no igual a
                    parent: ["numeric", "string"],
                    component: "single"
                },
                {
                    label: "less_equal_to",
                    name: "less_equal_to", //menor igual a
                    parent: ["numeric"],
                    component: "single"
                },
                {
                    label: "greater_equal_to", //mayor igaul
                    name: "greater_equal_to",
                    parent: ["numeric"],
                    component: "single"
                },

                {
                    label: "between",
                    name: "between", //entre
                    parent: ["numeric"],
                    component: "double"
                },

                {
                    label: "not_between",
                    name: "not_between", //no este entre
                    parent: ["numeric"],
                    component: "double"
                },

                {
                    label: "starts_with",
                    name: "starts_with", //comienza en 
                    parent: ["numeric", "string"],
                    component: "single"
                },
                {
                    label: "ends_with",
                    name: "ends_with", //termina en 
                    parent: ["numeric", "string"],
                    component: "single"
                },

                //date_time
                {
                    label: "equal_to_the_date_of", //igual a la fecha de
                    name: "equal_to_the_date_of",
                    parent: ["datetime"],
                    component: "single_datetime"
                },
                {
                    label: "not_equal_to_the_date_of", //no igual a la fecha de
                    name: "not_equal_to_the_date_of",
                    parent: ["datetime"],
                    component: "single_datetime"
                },
                {
                    label: "before_or_equal_to_the_date", //menor igual  antes o igual de la fecha
                    name: "before_or_equal_to_the_date",
                    parent: ["datetime"],
                    component: "single_datetime"
                },
                {
                    label: "after_or_equal_to_the_date", //mayor igual  despues o igual de la fecha
                    name: "after_or_equal_to_the_date",
                    parent: ["datetime"],
                    component: "single_datetime"
                },
                {
                    label: "between_dates", //entre las fechas
                    name: "between_dates",
                    parent: ["datetime"],
                    component: "double_datetime"
                },

                {
                    label: "not_between_the_dates",
                    name: "not_between_the_dates", //no este entre las fechas
                    parent: ["datetime"],
                    component: "double_datetime"
                },

            ];
        },

        getChipText() {

            let chip_text = "";
            switch (this.filter_operator.name) {

                // string and numeric
                case "equal_to":
                    chip_text = this.filter_column.label + " = " + this.filter_query_1;
                    break;
                case "not_equal_to":
                    chip_text = this.filter_column.label + " != " + this.filter_query_1;
                    break;
                case "less_equal_to":
                    chip_text = this.filter_column.label + " <= " + this.filter_query_1;
                    break;
                case "greater_equal_to":
                    chip_text = this.filter_column.label + " >= " + this.filter_query_1;
                    break;
                case "between":
                    chip_text = this.filter_column.label + " : " + this.filter_query_1 + "/" + this.filter_query_2;
                    break;
                case "not_between":
                    chip_text = this.filter_column.label + " : " + this.filter_query_1 + " !/" + this.filter_query_2;
                    break;
                case "contains":
                    chip_text = this.filter_column.label + " *" + this.filter_query_1 + "*";
                    break;
                case "starts_with":
                    chip_text = this.filter_column.label + " *" + this.filter_query_1;
                    break;
                case "ends_with":
                    chip_text = this.filter_column.label + " " + this.filter_query_1 + "*";
                    break;

                    // date

                case "equal_to_the_date_of":
                    chip_text = this.filter_column.label + " = " + this.formatDate(this.filter_query_1);
                    break;
                case "not_equal_to_the_date_of":
                    chip_text = this.filter_column.label + " != " + this.formatDate(this.filter_query_1);
                    break;
                case "before_or_equal_to_the_date":
                    chip_text = this.filter_column.label + " <= " + this.formatDate(this.filter_query_1);
                    break;
                case "after_or_equal_to_the_date":
                    chip_text = this.filter_column.label + " >= " + this.formatDate(this.filter_query_1);
                    break;
                case "between_dates":
                    chip_text = this.filter_column.label + " : " + this.formatDate(this.filter_query_1) + "/" + this.formatDate(this.filter_query_2);
                    break;
                case "not_between_the_dates":
                    chip_text = this.filter_column.label + " : " + this.formatDate(this.filter_query_1) + " !/" + this.formatDate(this.filter_query_2);
                    break;

            }
            return chip_text;

        },

        // export pdf

        jspdf() {

            //examples https://simonbengtsson.github.io/jsPDF-AutoTable/#defaults

            //autoTable jspdf

            const jspdfColumns = Object.values(this.exportColumns); // is array []
            const jspdfRows = Object.values(this.collection.data); // is array []

            //console.log(jspdfColumns)
            //var doc = jsPDF();
            let self = this;

            let doc = new jsPDF({
                orientation: this.jspdfOrientation,
                format: this.jspdfFormat
                //format: 'a6'
            });
            //doc.autoTable(columns, rows);

            let pageSize = doc.internal.pageSize;
            let pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
            //var pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
            let pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
            let totalPagesExp = "{total_pages_count_string}";

            //doc.setFontType('italic');
            doc.setFont("times", "bolditalic");
            //doc.setFont("courier", "bolditalic");
            doc.setTextColor(66, 66, 66);
            //doc.setFontType('normal');

            // ***********title*************************************************************************
            doc.setFontSize(this.jspdfTitle.fontSize); //.(12)
            const title = doc.splitTextToSize(this.jspdfTitle.text, pageWidth - 30, {});
            doc.text(title, this.jspdfTitle.startX, this.jspdfTitle.startY); //(title,14,20)

            doc.setTextColor(0, 0, 0);

            // ***********subtitle************************************************************************
            doc.setFont("times", "italic");
            doc.setFontSize(this.jspdfSubTitle.fontSize);
            const subtitle = doc.splitTextToSize(this.jspdfSubTitle.text, pageWidth - 30, {});
            doc.text(subtitle, this.jspdfSubTitle.startX, this.jspdfSubTitle.startY); //(subtitle,14,30)

            // ***********image***************************************************************************
            this.jspdfImages.forEach(elem =>
                //console.log(elem.format)
                doc.addImage(elem.imageUrl, elem.format, elem.startX, elem.startY, elem.width, elem.height) //doc.addImage(imageUrl, "PNG", 245, 15, 20, 23)
            );
            /*
            let imageUrl = `${process.env.MIX_APP_URL}/images/imgPrint.png`; //http://127.0.0.1:8000
            doc.addImage(imageUrl, "PNG", 245, 15, 20, 23); // (X, Y , WIDTH ,HEIGHT)
            */
            const config = {
                ...this.jspdfAutoTableConfig
            };
            doc.setFontSize(config.styles.fontSize); // reset tamaño de fuente

            doc.autoTable({
                body: jspdfRows,
                columns: jspdfColumns,
                //tableWidth: 'wrap',
                //showHead: false,
                theme: config.theme, ///        theme: 'striped'|'grid'|'plain'|'css' = 'striped'
                //halign: 'left',   //halign: 'left'|'center'|'right' = 'left'
                startY: config.startY,
                bodyStyles: config.bodyStyles,
                styles: config.styles,
                //columnStyles: { fecha_envio: {halign: "right",fontStyle:"bold",fillColor:40}},
                columnStyles: config.columnStyles,
                headStyles: config.headStyles,
                footStyles: config.footStyles,
                //showHead: 'firstPage' 
                showFoot: config.showFoot,

                // Úselo para personalizar textos o estilos de celdas específicas después de que hayan sido formateados por este complemento.
                // Este gancho se llama justo antes de que se calculen el ancho de la columna y otras características.
                didParseCell: function (data) {
                    const arrayDates = self.jspdfWillDrawCellFormatDate;
                    for (let i = 0; i < arrayDates.length; i++) {
                        if (data.row.section === 'body' && data.column.dataKey === arrayDates[i] /*'created_at'*/ ) {
                            const dateTimeU = data.cell.text;
                            const dateU = dateTimeU.toString().split(" ");
                            const dateFormatU = self.formatDate(dateU[0]);
                            data.cell.text = dateFormatU;
                            //console.log(dateFormatU);
                        }
                    }

                },

                // Úselo para cambiar estilos con funciones jspdf o personalizar el posicionamiento de celdas o texto de celda
                // justo antes de que se dibujen en la página.
                willDrawCell: function (data) {
                    /*
                    if (data.row.section === 'body' && data.column.dataKey === "expenses") {
                        if (data.cell.raw > 750) {
                            doc.setTextColor(231, 76, 60); // Red
                            doc.setFontStyle('bold');
                        }
                    }
                    */
                },

                // Úselo para agregar contenido a las celdas después de dibujarlas. Pueden ser imágenes o enlaces.
                // También puede usar esto para dibujar otro contenido jspdf personalizado en celdas con doc.text o doc.rect
                // por ejemplo.

                didDrawCell: function (data) {
                    /*
                    if ((data.row.section === 'head' || data.row.section === 'foot') && data.column.dataKey === "expenses" && coinBase64Img) {
                        doc.addImage(coinBase64Img, 'PNG', data.cell.x + 5, data.cell.y + 2, 5, 5);
                    }
                    */
                },

                // Use esto para agregar contenido a cada página que tenga autoTable. Pueden ser encabezados de página,
                // pies de página y números de página, por ejemplo.

                didDrawPage: function (data) {

                    // Footer
                    let str = "Pag " + doc.internal.getNumberOfPages()
                    // Total page number plugin only available in jspdf v1.0+
                    if (typeof doc.putTotalPages === 'function') {
                        str = str + " of " + totalPagesExp;
                    }
                    doc.text(str, data.settings.margin.left, pageHeight - 10);
                },

            });

            // Total page number plugin only available in jspdf v1.0+
            if (typeof doc.putTotalPages === 'function') {
                doc.putTotalPages(totalPagesExp);
            }

            // ***********textdate report****************************
            let f = new Date();
            let date = f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear() + "  Hrs " + f.getHours() + ":" + String(f.getMinutes()).padStart(2, "0");
            doc.text(date, pageWidth - 14, pageHeight - 10, 'right'); //aling center right
            //doc.text(date, pageWidth / 2, pageHeight  - 10, 'center'); //aling center
            //doc.text(date, pageWidth - 55, 40);

            if (this.collection.data.length > 0) {
                doc.text("Total de " + this.collection.to + " registros", 14, doc.autoTable.previous.finalY + 8);
            }

            return doc;
        },

        printer() {
            let doc = this.jspdf();
            doc.autoPrint();
           
            doc.output('dataurlnewwindow');
            //window.open(doc.output('bloburl'), '_blank')
        },

        downloadPdf() {
            let doc = this.jspdf();
            doc.save(this.jspdfNameDocument);
        },

        exportPdf2() {

            //examples https://simonbengtsson.github.io/jsPDF-AutoTable/#defaults

            //autoTable jspdf

            const jspdfColumns = Object.values(this.exportColumns); // is array []
            const jspdfRows = Object.values(this.collection.data); // is array []

            //console.log(jspdfColumns)
            //var doc = jsPDF();
            let self = this;

            let doc = new jsPDF({
                orientation: this.jspdfOrientation,
                format: this.jspdfFormat
                //format: 'a6'
            });
            //doc.autoTable(columns, rows);

            let pageSize = doc.internal.pageSize;
            let pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
            //var pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
            let pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
            let totalPagesExp = "{total_pages_count_string}";

            //doc.setFontType('italic');
            doc.setFont("times", "bolditalic");
            //doc.setFont("courier", "bolditalic");
            doc.setTextColor(66, 66, 66);
            //doc.setFontType('normal');

            // ***********title*************************************************************************
            doc.setFontSize(this.jspdfTitle.fontSize); //.(12)
            const title = doc.splitTextToSize(this.jspdfTitle.text, pageWidth - 30, {});
            doc.text(title, this.jspdfTitle.startX, this.jspdfTitle.startY); //(title,14,20)

            doc.setTextColor(0, 0, 0);

            // ***********subtitle************************************************************************
            doc.setFont("times", "italic");
            doc.setFontSize(this.jspdfSubTitle.fontSize);
            const subtitle = doc.splitTextToSize(this.jspdfSubTitle.text, pageWidth - 30, {});
            doc.text(subtitle, this.jspdfSubTitle.startX, this.jspdfSubTitle.startY); //(subtitle,14,30)

            // ***********image***************************************************************************
            this.jspdfImages.forEach(elem =>
                //console.log(elem.format)
                doc.addImage(elem.imageUrl, elem.format, elem.startX, elem.startY, elem.width, elem.height) //doc.addImage(imageUrl, "PNG", 245, 15, 20, 23)
            );
            /*
            let imageUrl = `${process.env.MIX_APP_URL}/images/imgPrint.png`; //http://127.0.0.1:8000
            doc.addImage(imageUrl, "PNG", 245, 15, 20, 23); // (X, Y , WIDTH ,HEIGHT)
            */
            const config = {
                ...this.jspdfAutoTableConfig
            };
            doc.setFontSize(config.styles.fontSize); // reset tamaño de fuente

            doc.autoTable({
                body: jspdfRows,
                columns: jspdfColumns,
                //tableWidth: 'wrap',
                //showHead: false,
                theme: config.theme, ///        theme: 'striped'|'grid'|'plain'|'css' = 'striped'
                //halign: 'left',   //halign: 'left'|'center'|'right' = 'left'
                startY: config.startY,
                bodyStyles: config.bodyStyles,
                styles: config.styles,
                //columnStyles: { fecha_envio: {halign: "right",fontStyle:"bold",fillColor:40}},
                columnStyles: config.columnStyles,
                headStyles: config.headStyles,
                footStyles: config.footStyles,
                //showHead: 'firstPage' 
                showFoot: config.showFoot,

                // Úselo para personalizar textos o estilos de celdas específicas después de que hayan sido formateados por este complemento.
                // Este gancho se llama justo antes de que se calculen el ancho de la columna y otras características.
                didParseCell: function (data) {
                    const arrayDates = self.jspdfWillDrawCellFormatDate;
                    for (let i = 0; i < arrayDates.length; i++) {
                        if (data.row.section === 'body' && data.column.dataKey === arrayDates[i] /*'created_at'*/ ) {
                            const dateTimeU = data.cell.text;
                            const dateU = dateTimeU.toString().split(" ");
                            const dateFormatU = self.formatDate(dateU[0]);
                            data.cell.text = dateFormatU;
                            //console.log(dateFormatU);
                        }
                    }

                },

                // Úselo para cambiar estilos con funciones jspdf o personalizar el posicionamiento de celdas o texto de celda
                // justo antes de que se dibujen en la página.
                willDrawCell: function (data) {
                    /*
                    if (data.row.section === 'body' && data.column.dataKey === "expenses") {
                        if (data.cell.raw > 750) {
                            doc.setTextColor(231, 76, 60); // Red
                            doc.setFontStyle('bold');
                        }
                    }
                    */
                },

                // Úselo para agregar contenido a las celdas después de dibujarlas. Pueden ser imágenes o enlaces.
                // También puede usar esto para dibujar otro contenido jspdf personalizado en celdas con doc.text o doc.rect
                // por ejemplo.

                didDrawCell: function (data) {
                    /*
                    if ((data.row.section === 'head' || data.row.section === 'foot') && data.column.dataKey === "expenses" && coinBase64Img) {
                        doc.addImage(coinBase64Img, 'PNG', data.cell.x + 5, data.cell.y + 2, 5, 5);
                    }
                    */
                },

                // Use esto para agregar contenido a cada página que tenga autoTable. Pueden ser encabezados de página,
                // pies de página y números de página, por ejemplo.

                didDrawPage: function (data) {

                    // Footer
                    let str = "Pag " + doc.internal.getNumberOfPages()
                    // Total page number plugin only available in jspdf v1.0+
                    if (typeof doc.putTotalPages === 'function') {
                        str = str + " of " + totalPagesExp;
                    }
                    doc.text(str, data.settings.margin.left, pageHeight - 10);
                },

            });

            // Total page number plugin only available in jspdf v1.0+
            if (typeof doc.putTotalPages === 'function') {
                doc.putTotalPages(totalPagesExp);
            }

            // ***********textdate report****************************
            let f = new Date();
            let date = f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear() + "  Hrs " + f.getHours() + ":" + String(f.getMinutes()).padStart(2, "0");
            doc.text(date, pageWidth - 14, pageHeight - 10, 'right'); //aling center right
            //doc.text(date, pageWidth / 2, pageHeight  - 10, 'center'); //aling center
            //doc.text(date, pageWidth - 55, 40);

            if (this.collection.data.length > 0) {
                doc.text("Total de " + this.collection.to + " registros", 14, doc.autoTable.previous.finalY + 8);
            }

            //doc.autoPrint();
            window.open(doc.output('bloburl'), '_blank')

        },

    }
}
</script>

<style>
.yrnehTableExpand tbody tr.v-data-table__expanded__content {
    box-shadow: inset 0 2px 6px -5px rgba(80, 70, 70, 0.75),
        inset 0 -4px 8px -5px rgba(192, 190, 190, 0.75) !important;
}

.yrnehTableStriped tbody tr:nth-of-type(odd) {
    background-color: rgba(0, 0, 0, 0.04);
}

.yrnehTableBorder table th+th {
    border-left: 1px solid #dddddd;
}

.yrnehTableBorder table td+td {
    border-left: 1px solid #dddddd;
}

.yrnehTableHoverFalseStriped tbody tr:hover:nth-of-type(odd) {
    background-color: rgba(0, 0, 0, 0.04) !important;
}

.yrnehTableHoverFalseStriped tbody tr:hover:nth-of-type(even) {
    background-color: transparent !important;
}

.yrnehTableHeadersPointer {
    cursor: pointer;
}

.v-expansion-panel--active>.v-expansion-panel-header {
    min-height: 54px !important;
}

/* mode mobile */

/*responsive*/

.yrnehTableMobile thead {
    display: none;
}

.yrnehTableMobile,
.yrnehTableMobile tbody,
.yrnehTableMobile tr,
.yrnehTableMobile td {
    display: block !important;
    width: 100% !important;
    height: auto !important;
}

.yrnehTableMobile td {

    padding-top: 8px !important;
    padding-bottom: 8px !important;

}

.yrnehTableMobile tr {
    margin-bottom: 1rem !important;
    box-shadow: 0 2px 3px hsla(0, 0%, 4%, .1), 0 0 0 1px hsla(0, 0%, 4%, .1) !important;
    padding-top: 10px !important;
    padding-bottom: 10px !important;
}

.yrnehTableMobile tr:last-child {
    margin-bottom: 0rem !important;
}

.yrnehTableMobile td:last-child {
    border-bottom: none !important;
}

.yrnehTableMobile td {
    text-align: right !important;
    padding-left: 40% !important;
    position: relative !important;
    border-bottom: none !important;
}

.yrnehTableMobileBorderDisable table th+th {
    border-left: none;
}

.yrnehTableMobileBorderDisable table td+td {
    border-left: none;
}

.yrnehTableMobileBorder td {
    border-bottom: thin solid rgba(0, 0, 0, .12) !important;
}

.yrnehTableIsNarrow td {
    padding-top: 2px !important;
    padding-bottom: 2px !important;
}

.yrnehTableMobile td::before {
    content: attr(data-label);
    position: absolute;
    left: 0;
    width: 50%;
    padding-left: 15px;
    font-size: .85rem;
    color: rgb(131, 129, 129);
    font-weight: bold;
    text-align: left;
}
</style>

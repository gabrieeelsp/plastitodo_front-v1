<template>
    <div class="pa-sm-3">

        <v-card class="rounded-md" :loading="loadingTable">
            <v-card-title class="d-flex justify-space-between align-center pt-1 pb-1">
                <span class="text-h4 font-weight-light">Categories</span>
                <v-btn @click="setNew" color="success" outlined small >New <v-icon small>mdi-plus</v-icon></v-btn>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <div class="">
                    <v-row class="pb-3" >
                        <v-col cols="3" class="d-flex align-center font-weight-bold text-body-1 grey--text text--darken-1">
                            <span class=" font-weight-bold text-caption grey--text font-weight-light ml-4">Enable</span>
                            <div style="width: 120px;">
                                <v-select
                                    v-model="select_is_enable_object"
                                    solo
                                    dense
                                    :items="select_is_enable_items"
                                    item-text="label"
                                    item-value="value"
                                    hide-details=""
                                    return-object
                                    class="rounded-sm ml-2 text-caption"
                                    @change="setIsEnable"
                                    style="width: auto;"
                                ></v-select>
                            </div>
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-col cols="5">
                            <v-text-field
                                solo
                                label="Search"
                                append-icon="mdi-magnify"
                                dense
                                hide-details
                                v-model="q"
                                v-on:keyup.enter="setSearch"
                                class="rounded-sm"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-divider></v-divider>
                    <v-row >
                        <v-col cols="12">
                            <v-simple-table>
                                <template v-slot:default>
                                <thead >
                                    <tr>
                                        <th class="text-left font-weight-bold text-subtitle-1 grey--text text--darken-3">
                                            Name
                                        </th>

                                        <th class="text-left font-weight-bold text-subtitle-1 grey--text text--darken-3"  style="width: 80px;">
                                            Enable
                                        </th>
                                        <th class="text-left font-weight-bold text-subtitle-1 grey--text text--darken-3" style="width: 100px;">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr
                                        v-for="(item, index) in items"
                                        :key="index"
                                    >
                                        <td>{{ item.attributes.name }}</td>
                                        <td >
                                            <v-chip v-if="item.attributes.is_enable" x-small class="" color="success">Enable</v-chip>
                                            <v-chip v-else x-small class="" color="warning">Disable</v-chip>
                                        </td> 
                                        <td>                                            
                                            <v-btn small
                                                @click="setEdit(item.id)"
                                                color="success"
                                                elevation="2"
                                                icon
                                                outlined
                                            >
                                                <v-icon small >
                                                    mdi-pencil
                                                </v-icon>
                                            </v-btn>
                                            
                                            <v-btn small
                                                @click="setEdit(item.id)"
                                                color="error"
                                                elevation="2"
                                                icon
                                                outlined
                                                class="ml-2"
                                            >
                                                <v-icon small >
                                                    mdi-delete
                                                </v-icon>
                                            </v-btn>
                                        </td>   
                                    </tr>
                                </tbody>
                                </template>
                            </v-simple-table>
                        </v-col>
                    </v-row>

                    <v-row class=""> 
                        <v-col cols="3">

                        </v-col>
                        <v-col cols="9" class="d-flex justify-end align-center pt-1 pb-1">
                                
                                <span class=" font-weight-bold text-caption grey--text font-weight-light mt-2 mr-2">Items per page:</span>
                                <div style="width: 63px; ">                                
                                    <v-select
                                        :items="select_limit_items"
                                        v-model="limitSelected"
                                        label="Standard"
                                        hide-details=""
                                        single-line
                                        class="rounded-sm ml-2 text-caption ml-3"
                                        
                                        dense
                                        @input="setLimit"
                                    ></v-select>
                                </div>
                                <v-pagination
                                    v-model="page"
                                    :length="last_page"
                                    :total-visible="5"
                                    @input="setPage"
                                    :disabled="last_page <2"
                                    prev-icon="mdi-menu-left"
                                    next-icon="mdi-menu-right"
                                ></v-pagination>
                            
                        </v-col>
                    </v-row>

            
                </div>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    mounted() {
        this.select_is_enable_object = this.select_is_enable_items.find((item) => {
            return item.value === this.filter_is_enable
        })
        this.getItems()
    },
    data () {
        return {
            loadingTable: false,
            items: [],
            last_page: 1,
            q: this.$route.query.q || '',
            page: parseInt(this.$route.query.page) || 1,
            limit: parseInt(this.$route.query.limit) || 5,

            limitSelected: parseInt(this.$route.query.limit) || 5,
            select_limit_items: [5, 10, 15, 20],

            filter_is_enable: parseInt(this.$route.query.filter_is_enable) || 2,
            select_is_enable_object: { label: 'ALL', value: 1 },
            select_is_enable_items: [
                { label: 'ALL', value: 1 },
                { label: 'Enable', value: 2 },
                { label: 'Disable', value: 3 },
            ],

        }
    },
    methods: {
        async getItems () {
            this.loadingTable = true,
            await axios.get('/categories', {
                params: {
                    'q': this.q,
                    'page': this.page,
                    'limit': this.limit,
                    'filter_is_enable': this.filter_is_enable
                }
            }).then((result) => {
                this.items = result.data.data

                this.last_page = result.data.meta.last_page
                //console.log(this.items)
            }).catch((error) => {
                console.log(error)
            }).finally(() => {
                this.loadingTable = false
            })           
        },

        setLimit(){
            this.limit = this.limitSelected;
            this.$router.push({path: this.$route.path, query: { ...this.$route.query, q: this.q, page: this.page, limit: this.limit, 'filter_is_enable': this.select_is_enable_object.value }})
            this.getItems()
        },
        setPage(){
            this.$router.push({path: this.$route.path, query: { ...this.$route.query, q: this.q, page: this.page, limit: this.limit, 'filter_is_enable': this.select_is_enable_object.value }})
            this.getItems()
        },
        setSearch(){
            this.page = 1
            this.$router.push({path: this.$route.path, query: { ...this.$route.query, q: this.q, page: this.page, limit: this.limit, 'filter_is_enable': this.select_is_enable_object.value }})
            this.getItems()
        },
        setIsEnable(){
            if( this.filter_is_enable != this.select_is_enable_object.value) {
                this.page = 1
                this.filter_is_enable = this.select_is_enable_object.value
                this.$router.push({path: this.$route.path, query: { ...this.$route.query, q: this.q, page: this.page, limit: this.limit, 'filter_is_enable': this.select_is_enable_object.value }})
                this.getItems()
            }
        },

        setEdit(id) {
            this.$router.push({
                  name: 'Categories_Edit',
                  params: {
                      id: id
                  }
              })
        },
        setNew() {
            this.$router.push({
                  name: 'Categories_Create'
              })
        }
    }

}
</script>

<style lang="scss" scoped>

</style>
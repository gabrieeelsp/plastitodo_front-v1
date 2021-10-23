<template>
<div class="pa-3">
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Name
          </th>
          <th class="text-left">
            Enable
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in items"
          :key="index"
        >
          <td>{{ item.attributes.name }}</td>
          <td><v-checkbox class=""
              v-model="item.attributes.is_enable"
              color="red"
              dense
              hide-details
              readonly
            ></v-checkbox></td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
<div class="d-flex justify-end align-center">
    <div>
        <v-select
          v-model="limitSelected"
          :items="limits"
          item-text="limit"
          item-value="limit"
          label="Select"
          return-object
          single-line
        ></v-select>
        </div>
    <div>
        <v-pagination
      v-model="page"
      :length="15"
      :total-visible="5"
      @input="change_page"
    ></v-pagination>
    </div>
    
  </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
    mounted() {
        this.getItems()
    },
    data () {
        return {
            headers: [
                {
                    text: 'Name',
                    align: 'start',
                    sortable: true,
                    value: 'attributes.name',
                },
                {
                    text: 'Enable',
                    value: 'attributes.is_enable',
                }
            ],
            items: [],
            q: 'ee',
            page: 1,
            limitSelected: 10,

            select: { limit: 5 },
            limits: [
                { limit: 5 },
                { limit: 10 },
                { limit: 15 },
                { limit: 20 },
            ],
        }
    },

    methods: {
        getItems() {
            axios.get('/categories', {
                params: {
                    'q': this.q,
                    'page': this.page,
                    'limit': this.limit
                }
            }).then((result) => {
                this.items = result.data.data
                console.log(this.items)
            })
        },
        change_page() {
            this.$router.push({path: this.$route.path, query: { ...this.$route.query, page: this.page, limit: this.limitSelected }})
            this.getItems()
        }
    },
    filters: {
        toBoolean: function(value) {
            return Boolean(value)
        }
    }
  }
</script>

<style>

</style>
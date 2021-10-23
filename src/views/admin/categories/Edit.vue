<template>
  <div class="pa-sm-3">
      <v-card class="">
            <v-card-title class="d-flex justify-space-between align-center pt-1 pb-1">                
                <div>
                    <span class="text-h4 font-weight-light">Categories</span>
                    <span class="grey--text text-h5 font-weight-light ml-3">Edit</span>
                </div>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text >
                <v-row class="">
                    <v-col cols="12" class="">
                        <v-form @submit.prevent="submit" ref="form" v-model="valid" >
                            <v-row>
                                <v-col cols="12" sm="3"  class="pt-2 pb-0 d-flex justify-sm-end">
                                    <span class="font-weight-bold black--text">Name</span>
                                </v-col>
                                <v-col cols="12" sm="9"  class=" pt-0 pb-0">
                                    <v-text-field
                                        counter="30"
                                        class=""
                                        dense
                                        v-model="item.attributes.name"
                                        :rules="nameRules"
                                        :error-messages="errorNameMessages"
                                        @keyup="errorNameMessages = ''"
                                    ></v-text-field>
                                </v-col>
                            </v-row>

                            <v-row>
                                <v-col cols="0" sm="3" class="pt-0 pb-0">

                                </v-col>
                                <v-col cols="12" sm="9">
                                    <v-checkbox class="mt-0 mb-0 pt-0 pb-0"
                                        v-model="item.attributes.is_enable"
                                        dense
                                        hide-details="true"
                                        label="is enable?"
                                        required
                                    ></v-checkbox>
                                </v-col>
                            </v-row>

                            <v-row>
                                <v-col cols="0" sm="3" class="pt-0 pb-0">

                                </v-col>
                                <v-col cols="12" sm="9">
                                    <v-btn color="success" type="submit" class=""
                                        :loading="loading"
                                        :disabled="loading"
                                        small
                                    >Save</v-btn>
                                    <v-btn color="warning" class=" ml-2"
                                        :disabled="loading"
                                        small
                                    >Cancel</v-btn>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-col>
                </v-row>
            </v-card-text>
      </v-card>

  </div>
</template>

<script>
import axios from 'axios'
export default {
    mounted() {
        this.getItem()
    },
    data () {
        return {
            id: parseInt(this.$route.params.id),
            item: {
                id: '',
                type: '',
                attributes: {
                    name: '',
                    is_enable: false,
                    created_at: '',
                    updated_at: ''
                }
            },

            valid: true,
            nameRules: [
                v => !!v || 'Name is required',
                v => (v && v.length <= 30) || 'Name must be less than 30 characters',
            ],
            errorNameMessages: '',

            loading: false,
        }
    },

    methods: {
        getItem () {
            axios.get(`/categories/${this.id}` )
            .then((result) => {
                this.item = result.data.data
                //console.log(this.item.attributes.name)
            }).catch(() => {
                //console.log(error)
            })            
        },
        validate () {
            this.$refs.form.validate()
        },

        errorHandler(error) {
            let message = ''
            if('data.attributes.name' in error.response.data.errors) {
                let errors = error.response.data.errors                
                for( let k in errors['data.attributes.name']){                                
                    message = message + errors['data.attributes.name'][k]
                    this.errorNameMessages = errors['data.attributes.name'][k]
                }   
                this.$toast.error(message, { timeout: 3000 });                   
                
            }
        },
        
        submit() {
            this.validate()
            if( this.valid ){
                this.loading = true
                axios.patch(`categories/${this.item.id}`, { 
                    'data': {
                        'id': (this.item.id).toString(),
                        'type': 'categories',
                        'attributes': {
                            'name': this.item.attributes.name,
                            'is_enable': this.item.attributes.is_enable
                        }
                        
                    }
                    }).then((resp) => {
                        this.loading = false
                        this.item = resp.data.data
                        this.$toast.success("Updated!", {
                            timeout: 3000
                        });
                    }).catch((error) => {
                        this.loading = false

                        if (error.response) {
                            // client received an error response (5xx, 4xx)
                            if ( error.response.status === 422) {
                                this.errorHandler(error)
                            }
                        } else if (error.request) {
                            // client never received a response, or request never left
                            this.$toast.error('Network error connection.', { timeout: 3000 });
                        } else {
                            // anything else
                        }
                    })
                
            }
        }
    },
  }
</script>

<style>

</style>
<template>
  <v-form @submit.prevent="submit" ref="form" v-model="valid" >   

    <v-text-field
        solo
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        prepend-inner-icon="mdi-email"
        
        :error-messages="errorEmailMessages"
        @keyup="errorEmailMessages = ''"
    ></v-text-field>

    <v-text-field
        solo
            v-model="password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="passwordRules"
            :type="showPassword ? 'text' : 'password'"
            label="Enter your password"

            prepend-inner-icon="mdi-lock"
            @click:append="showPassword = !showPassword"
            
            :error-messages="errorPasswordMessages"
            @keyup="errorPasswordMessages = ''"
          ></v-text-field>
          
    <v-btn
        block
      color="success"
      type="submit"
      :loading="loading"
      :disabled="loading"
    >
      Login
    </v-btn>


  </v-form>
</template>

<script>
import { mapActions } from 'vuex'
  export default {
    data: () => ({
      valid: true,

      email: 'test@mail.com',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      errorEmailMessages: '',

        showPassword: false,
        password: 'secret999',
        passwordRules: [
            v => !!v || 'Password is required',
        ],
        errorPasswordMessages: '',

        loading: false,
    }),

    methods: {
      ...mapActions({
          signIn: 'auth/signIn',
          set_message: 'set_message'
      }),
      validate () {
        this.$refs.form.validate()
      },

      errorHandler(error) {
          let message = ''
          if('password' in error.response.data.errors) {
              let errors = error.response.data.errors                
              for( let k in errors['password']){                                
                  message = message + errors['password'][k]
                  this.errorPasswordMessages = errors['password'][k]
                  this.password = ''
              }
          }
          if('email' in error.response.data.errors) {
              let errors = error.response.data.errors                
              for( let k in errors['email']){          
                if (message.length != 0) { message = message + '\n'}                      
                  message = message + errors['email'][k]
                  this.errorEmailMessages = errors['email'][k]
              }
          }
          this.$toast.error(message, { timeout: 3000 });
      },
      
      submit() {
        this.validate()
        if( this.valid ){
          this.loading = true
          this.signIn({ 'email': this.email, 'password': this.password }).then(() => {
              this.loading = false
              this.$toast.success("Wellcome!", {
                  timeout: 3000
              });
              this.$router.replace({
                  name: 'Dashboard'
              })
          }).catch((error) => {
            this.loading = false
            if (error.response) {
                // client received an error response (5xx, 4xx)
                if ( error.response.status === 422) {
                    this.errorHandler(error)
                }
                if ( error.response.status === 401) {
                    this.$toast.error('Email and Password does not match.', { timeout: 3000 });
                }
            } else if (error.request) {
                // client never received a response, or request never left
                this.$toast.error('Network error connection.', { timeout: 3000 });
            } else {
                // anything else
            }
          })
        }else{
          console.log('noooo')
        }
      }
    },
  }
</script>


<template>
    <div>
        <v-toolbar dark >


            <v-toolbar-title>Application</v-toolbar-title>

            <v-spacer></v-spacer>
        </v-toolbar>
        
    <v-list dense>
      <v-subheader v-if="authenticated"> {{ user.name }}</v-subheader>
      <v-subheader v-else>REPORTS</v-subheader>
      <v-list-item-group
        v-model="selectedItem"
        color="primary"
      >
        <v-list-item
          v-for="(item, i) in items"
          :key="i"

          :to="item.route"
          exact
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>




    
</div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    data: () => ({
      selectedItem: 1,
      items: [
        { text: 'Dashboard', icon: 'mdi-view-dashboard', 'route': '/admin' },
        { text: 'Categories', icon: 'mdi-flag', 'route': '/admin/categories' },
        { text: 'Products', icon: 'mdi-flag', 'route': '/admin/products' },
        { text: 'Users', icon: 'mdi-account', 'route': '/admin/users' },
      ],
    }),
    computed: {
      ...mapGetters({
          authenticated: 'auth/authenticated',
          user: 'auth/user'
      })
    },
  }
</script>

<style>

</style>
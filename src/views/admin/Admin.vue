<template>
    <div >
        <v-navigation-drawer v-model="drawer" app>
            <Menu />            
        </v-navigation-drawer>

        <v-app-bar app>
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
                <v-spacer></v-spacer>
                <MenuUser />
            <!-- <v-toolbar-title>Application</v-toolbar-title> -->
        </v-app-bar>

        <v-main>
            <v-container fluid class="grey lighten-4 pa-1">
                <transition name="fade" mode="out-in">
            <router-view />
                </transition>
            </v-container>
        <v-footer app inset>
            dd
        </v-footer>
        </v-main>
        
          
        
        <!--  -->        
        
        
    </div>
</template>

<script>
import Menu from '../../components/admin/utils/Menu.vue'
import MenuUser from '../../components/admin/utils/MenuUser.vue'
export default {
    components: {
        Menu,
        MenuUser
    },
    data: () => ({ 
        drawer: null,

    }),
    methods: {


        
    }

}
</script>


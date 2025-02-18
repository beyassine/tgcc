<template>
    <v-navigation-drawer color="#fcfcfc" class="lg-and-down elevation-3 " elevation="0" width="250" location="left">
        <v-list>
            <v-list-item>
                <v-img width="180" aspect-ratio="16/9" :src=logo></v-img>
                <v-divider class="mb-3"></v-divider>
            </v-list-item>
        </v-list>
        <v-list class="" density="compact" nav>
            <v-list-item class="text-body-1" prepend-icon="mdi-view-dashboard-outline" :to="{
                            name: 'dashboard',
                        }">
                Projects
            </v-list-item>
            <v-list-item class="text-body-1 mt-2" prepend-icon="mdi-key-variant" :to="{
                            name: 'apikey',
                        }">
                API Key
            </v-list-item>
        </v-list>
        <template v-slot:append>
            <div class="pa-2">
                <v-divider class="mt-2 mb-2" />
                <v-btn  elevation="0" variant="text" block @click="() => this.openFeedbackModal()">
                    <h4 class="lowercase">Send Feedback</h4>
                </v-btn>
                <v-divider class="mt-2 mb-2 " />
                <v-btn color="red-lighten-1" variant="elevated" class="text-white" block @click="logout">
                    <h4 class="lowercase">Log Out <v-icon class="ml-2">mdi-logout</v-icon></h4>
                </v-btn>
            </div>
        </template>
    </v-navigation-drawer>
</template>

<script>
import logo from "../assets/logo.png";


export default {
    name: "Sidebar",

    setup() {
        const store = useAuth();

        return { store }
    },
    data() {
        return {
            demoApiKey:'',
            logo: logo,
        };
    },
    computed: {
    },
    methods: {
        logout() {
            this.$router.push({
                name: "login",
            });
        },
    },
    mounted() {
        this.demoApiKey=process.env.VUE_APP_APIKEY
    },
};
</script>

<style>
.lowercase {
  text-transform: none;
}

.grey {
  background-color:red;
}
</style>
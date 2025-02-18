<template>
  <v-app class="app">
    <Sidebar  v-if="this.$route.meta.sidebar"/>        
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>


<script>
import Header from './components/Header.vue'
import Sidebar from './components/Sidebar.vue'


export default {
  name: 'App',
  components: {
    Header,
    Sidebar,
  },

  mounted() {
    document.title = "TGCC AI";
  }
}
</script>

<style  lang="scss">
@import "./scss/variables.scss";

.app {
  font-family: 'Inter', sans-serif !important;
}
.modal{
  font-family: 'Inter', sans-serif !important;
}

.main {
  background-color: #fcfcfc;
}

.white{
  background-color: white;

}

.lowercase {
  text-transform: none;
}

</style>
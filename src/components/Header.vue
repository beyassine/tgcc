<template>
    <v-app-bar class="d-flex pl-5 pr-5" elevation="0">
      <template v-slot:prepend>
        <router-link class="text-decoration-none" :to="{
          name: 'home',
        }">
          <v-img aspect-ratio="16/9" width="200" :src="logo"></v-img>
        </router-link>
      </template>
  
    </v-app-bar>
  </template>
  
  <script>
  import logo from "../assets/logo.png";
  import { useDisplay } from "vuetify";
  
  
  export default {
    name: "Header",
  
    setup() {
      const { display } = useDisplay();
    },
    data() {
      return {
        logo: logo,
      };
    },
    computed: {
    },
    methods: {
    },
    mounted() { },
  };
  </script>
  
  <style>
  .lowercase {
    text-transform: none;
  }
  </style>
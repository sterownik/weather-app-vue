import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import firebase from "firebase/app";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.config.productionTip = false;

var firebaseConfig = {
  apiKey: "AIzaSyCIzEP9ZLPObKVI_7qzGPhuLRFuMOG2DBI",
  authDomain: "weather-app-30687.firebaseapp.com",
  databaseURL: "https://weather-app-30687.firebaseio.com",
  projectId: "weather-app-30687",
  storageBucket: "weather-app-30687.appspot.com",
  messagingSenderId: "864171147164",
  appId: "1:864171147164:web:8365a288ebcc2ba647d259",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

new Vue({
  vuetify,
  render: (h) => h(App),
}).$mount("#app");

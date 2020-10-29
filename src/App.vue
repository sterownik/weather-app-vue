<template>
  <div :class="{ 'add-height': whichComponent !== 'MainPage' }" class="allApp">
    <!-- <Register></Register> -->
    <component :is="whichComponent"></component>
  </div>
</template>

<script>
import Register from "./components/Register.vue";
import Login from "./components/Login.vue";
import firebase from "firebase";
import MainPage from "./components/MainPage.vue";
export default {
  components: {
    Register,
    Login,
    MainPage,
  },
  mounted() {
    this.isUser();
  },

  provide() {
    return { changeTabs: this.changeTabs };
  },
  data() {
    return {
      whichComponent: "Login",
    };
  },

  methods: {
    changeTabs(tab) {
      this.whichComponent = tab;
    },
    isUser() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // User is signed in.
          this.whichComponent = "MainPage";
          console.log(user);
        } else {
          // No user is signed in.
          console.log("no");
        }
      });
    },
  },
};
</script>
<style scoped>
.allApp {
  /* height: 100vh; */
  background: linear-gradient(to bottom, #03045e, #caf0f8);
}
.add-height {
  height: 100vh;
}
</style>

<template>
  <div
    elevation="18"
    align="center"
    class=" col-8 col-md-6 col-lg-4 col-xl-3 container  "
  >
    <header class="font-weight-bold" cols="12" sm="6" md="3" align="center">
      Zaloguj się
    </header>
    <form v-on:submit.prevent="onSubmit">
      <v-card-text class="pa-0">
        <div cols="12" sm="6" md="3">
          <v-text-field
            outlined
            required
            class="my-2"
            v-model="email"
            color="primary"
            type="email"
            placeholder="email"
          ></v-text-field>
        </div>
        <div class="row-sm">
          <v-text-field
            v-model="password1"
            outlined
            type="password"
            required
            placeholder="Hasło"
          ></v-text-field>
        </div>

        <button type="submit" class="btn">Zaloguj się</button>
        <div>
          <button @click="changeToRegister" class="login">
            Zarejestruj się!
          </button>
        </div>
      </v-card-text>
    </form>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  inject: ["changeTabs"],
  data() {
    return {
      email: "",
      password1: "",
    };
  },
  methods: {
    changeToRegister() {
      this.changeTabs("Register");
    },
    onSubmit() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password1)
        .then((data) => {
          console.log(data);
          this.changeTabs("MainPage");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
header {
  background-color: #03045e;
  margin: 0 0px 20px 0px;
  padding: 10px;
  border-top-left-radius: 18px;
  color: #caf0f8;
  border-top-right-radius: 18px;
  position: relative;
  top: -10px;
  text-transform: uppercase;
  font-size: 20px;
}
.container {
  background-color: #48cae4;

  padding: 0;

  border-radius: 20px;
  transform: translateY(20%);
}
.btn {
  border: solid #03045e 1px;
  background-color: #03045e;
  color: #48cae4;
  text-transform: uppercase;
  font-family: sans-serif;
  font-weight: bold;
  transition: 0.4s;
}
.btn:hover {
  color: #03045e;
  background-color: #48cae4;
}
.login {
  color: #485693;
  font-size: 18px;
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  margin-top: 12px;

  transition: 0.4s;
}

.login:hover {
  color: #263471;
  transform: scale(1.2);
}
</style>

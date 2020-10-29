<template>
  <div
    elevation="18"
    align="center"
    class=" col-8 col-md-6 col-lg-4 col-xl-3 container  "
  >
    <header class="font-weight-bold" cols="12" sm="6" md="3" align="center">
      Rejestracja
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
            :rules="[rules.required, rules.email]"
          ></v-text-field>
        </div>
        <div class="row-sm">
          <v-text-field
            v-model="password1"
            outlined
            required
            placeholder="Hasło"
            :rules="[rules.required]"
          ></v-text-field>
        </div>
        <div class="row-sm">
          <v-text-field
            outlined
            required
            color="primary"
            v-model="password2"
            placeholder="Powtórz hasło"
            :rules="[rules.required, rules.identical(password1, password2)]"
          ></v-text-field>
        </div>

        <button type="submit" class="btn">Zarejestruj się</button>
        <div>
          <button @click="changeToLogin" class="login">Zaloguj się</button>
        </div>
      </v-card-text>
    </form>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  inject: ["changeTabs"],
  methods: {
    changeToLogin() {
      this.changeTabs("Login");
    },
    async onSubmit() {
      try {
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password1)
          .then((data) => {
            console.log(data);
          })
          .catch((err) => {
            console.log(err.message);
          });
        // console.log(user);
      } catch (err) {
        // console.log(err);
      }
    },
  },
  data() {
    return {
      email: "",
      password2: "",
      password1: "",
      rules: {
        required: (value) => !!value || "Pole wymagane",
        identical: (value1, value2) =>
          value1 === value2 || "Hasła nie są identyczne",
        counter: (value, num, end) =>
          value.length >= num || "Minimum " + num + " znak" + end,
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Adres e-mail nie jest poprawny";
        },
      },
    };
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
  position: relative;
  top: -10px;
  border-top-right-radius: 18px;
  text-transform: uppercase;
  font-size: 20px;
}
.container {
  background-color: #48cae4;
  position: relative;
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

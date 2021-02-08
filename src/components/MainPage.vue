<template>
  <div class="app">
    <div class="nav-top text-center">
      <button
        @click="logOut"
        class="logout col-8 col-md-6 col-lg-4 col-xl-3 text-center"
      >
        Wyloguj się
      </button>
    </div>
    <section class="col-xs-11 col-sm-10 col-lg-8 mt-3  mx-auto pb-2 mb-3 ">
      <div class="charts col-xs-11 col-sm-10 col-lg-8 mx-2 ">
        <Chart
          :title="whichCityClicked"
          v-if="isClicked"
          :info="infoOneCity"
          type="Temperatura"
        ></Chart>
        <Chart
          :title="whichCityClicked"
          v-if="isClicked"
          type="Wilgotoność"
          :info="infoOneCity"
        ></Chart>
      </div>
      <div class="blured"></div>
      <div
        class="cities d-sm-none d-md-block  col-lg-4 mx-sm-0  px-sm-0 mx-lg-2 px-sm-2 "
      >
        <DialogComponent
          v-if="show"
          @btnCancelCity="showAddCity"
          @btnAddCity="addCity"
        ></DialogComponent>
        <button @click="showAddCity" type="button" class="btn btn-primary">
          Dodaj miasto
        </button>
        <Cities
          @tapCity="onSelectCity"
          v-for="city in cities"
          :temp="city.temp"
          :city="city.city"
          :key="city.id"
          :desc="city.desc"
          :icon="city.icon"
        >
        </Cities>
      </div>
    </section>
  </div>
</template>
<script>
import firebase from "firebase";
import Chart from "./Chart.vue";
import DialogComponent from "./DialogComponent.vue";
import Cities from "./Cities.vue";

import { getWeather } from "../methods/getWeatherMain";
import { getDaysWeather } from "../methods/getDaysWeather";
export default {
  inject: ["changeTabs"],
  components: {
    DialogComponent,
    Cities,
    Chart,
  },
  mounted() {
    this.cities = [];
    this.getData();
  },
  watch: {
    cities() {},
  },
  data() {
    return {
      cities: [],
      isClicked: false,
      infoOneCity: [],
      show: false,
      whichCityClicked: "",
    };
  },

  methods: {
    onSelectCity(city) {
      this.whichCityClicked = city;
      this.isClicked = true;
      let that = this;
      getDaysWeather(city).then((thiscity) => {
        if (thiscity.list[0].dt !== 0) {
          that.infoOneCity = thiscity.list;
        }
      });
    },
    showAddCity() {
      this.show = !this.show;
    },
    addCity(city) {
      let flag = true;
      this.cities.forEach((cityy) => {
        // console.log(cityy.city);
        if (cityy.city === city) {
          flag = false;
        }
      });
      console.log(flag);

      getWeather(city).then((onecity) => {
        if (onecity.cod === 200 && flag) {
          this.cities = [];
          firebase
            .database()
            .ref("cities/" + firebase.auth().currentUser.uid)
            .push(city);
          this.show = !this.show;
        } else if (!flag) {
          console.log("miasto już jest w kolekcji");
        } else {
          console.log("nie odnaleziono miasta lub miasto");
        }
      });
    },
    getData() {
      this.cities = [];
      let that = this;

      firebase
        .database()
        .ref("cities/" + firebase.auth().currentUser.uid)
        .on("value", function(snapshot) {
          snapshot.forEach(function(childSnapshot) {
            // this.cities.push(childSnapshot.val());
            let temp;
            let desc;
            let icon;
            getWeather(childSnapshot.val()).then((city) => {
              temp = city.main.temp;
              desc = city.weather[0].description;

              icon = city.weather[0].icon;
              that.cities.unshift({
                city: childSnapshot.val(),
                temp: temp,
                icon: icon,
                desc: desc,
                id: that.cities.length + 1,
              });
            });
          });
        });
    },
    logOut() {
      this.logOutFirebase();
      this.changeTabs("Login");
    },
    logOutFirebase() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          console.log("logout");
        });
    },
  },
};
</script>
<style scoped>
.app {
  overflow: hidden;
}
section {
  overflow: hidden;

  /* height: 85vh; */
  /* margin: 30px; */
  position: relative;
  display: flex;
  padding-bottom: 20px;
  justify-content: space-around;
  /* width: 100%; */
  /* padding: 40px; */
}
::-webkit-scrollbar {
  width: 20px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #0069d9;
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #0069d9;
}

.btn {
  width: 100%;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.3);
  text-transform: uppercase;
  font-size: 23px;
  font-weight: 500;
}

section div.charts {
  /* background-color; */
  flex-basis: 68%;
  position: relative;
  z-index: 2;
  /* height: 93vh; */
  margin: 20px;
}
section div.cities {
  flex-basis: 27%;
  overflow-y: scroll;
  height: 93vh;
  /* background-color: red; */
  position: relative;
  margin-bottom: 10px;
  margin-top: 10px;
  z-index: 2;
}
.blured {
  width: 100%;
  border-radius: 40px;

  height: 97%;
  background-color: white;

  position: absolute;
  /* z-index: -1; */
  filter: blur(2px);
}
.nav-top {
  background: linear-gradient(to top, #03045e, #01023b);
  width: 100%;
}
.logout {
  text-transform: uppercase;
  border: 1px tomato solid;
  padding: 10px;
  font-size: 30px;
  font-weight: 500;
  color: white;
  border-radius: 20px;
  background-color: tomato;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>

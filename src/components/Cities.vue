<template>
  <div @click="tapCity" class="cloud">
    <p class="name-city">{{ city }}</p>
    <img :src="getSrc" alt="" />
    <p>{{ desc }}</p>
    <p>{{ Math.floor(temp) }}℃</p>
  </div>
</template>
<script>
export default {
  emits: ["tapCity"],
  props: ["city", "temp", "desc", "icon"],
  mounted() {},
  computed: {
    getSrc() {
      return "http://openweathermap.org/img/wn/" + this.icon + "@2x.png";
    },
  },
  methods: {
    tapCity() {
      // console.log(this.city);

      this.$emit("tapCity", this.city);
    },
  },
};
</script>
<style scoped>
.cloud {
  padding: 10px 5px 20px 5px;
  background-color: #228AEA;
  cursor: pointer;
  border-radius: 5%;
  margin: 20px 5px 20px 5px;
  box-shadow: 1px 1px 3px 4px #228AEA;
}

img {
  display: block;
  margin: 0 auto;
}

p {
  color: #DDD;
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  padding: 0;
  margin: 0;
  font-size: 22px;
  text-align: center;
}

.name-city {
  text-transform: capitalize;
  font-size: 30px;
}
</style>

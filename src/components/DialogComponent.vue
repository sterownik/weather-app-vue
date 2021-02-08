<template>
  <div class="col-8 col-md-6 col-lg-4 col-xl-3 wrapper-content">
    <div class="content">
      <p @click="cancel" class="cancel">&#10008;</p>
      <header>Dodaj miasto</header>
      <v-text-field
          v-model="city"
          outlined
          required
          placeholder="City"
      ></v-text-field>
      <button @click="addCity" class="btn btn-primary">Dodaj</button>
    </div>
  </div>
</template>
<script>
export default {
  emits: ["btnAddCity"],
  mounted() {},
  data() {
    return {
      city: "",
    };
  },
  methods: {
    cancel() {
      this.$emit("btnCancelCity");
    },
    addCity() {
      this.$emit("btnAddCity", this.city);
    },
  },
};
</script>
<style scoped>
.wrapper-content {
  border-radius: 30px;
  background-color: #90e0ef;
  position: fixed;
  padding: 0;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.content {
  position: relative;
}

.v-text-field {
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  margin-top: 30px;
}

.btn {
  position: relative;
  bottom: 6%;
  width: 80%;
  left: 50%;
  transform: translateX(-50%);
  text-transform: uppercase;
  font-size: 23px;
  font-weight: 500;
  margin-bottom: 30px;
}
header {
  position: relative;
  border-top-left-radius: 30px;
  width: 100%;
  text-align: center;
  font-size: 30px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  top: 0%;
  left: 0%;
  color: white;
  height: 50px;
  background-color: #02034d;
}
.cancel {
  position: absolute;
  top: -6%;
  right: -3%;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  z-index: 2;
  cursor: pointer;
  background-color: tomato;
  line-height: 26px;
  font-size: 20px;
  text-align: center;
  border: solid black 1px;
}
</style>

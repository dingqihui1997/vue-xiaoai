<template>
  <div class="img">
    <img src="../../assets/404/404.jpg" alt="" />
    <div class="flex-ja"><button>返回首页</button></div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  data() {
    return {};
  },
  components: {},
  methods: {},
  mounted() {},
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.img {
  margin: 100px auto;
  width: 800px;
  height: 500px;
}
button {
  height: 30px;
  width: 80px;
  background-color: #3bb6fc;
  border: none;
  border-radius: 5px;
  color: #fff;
  font-size: 16px;
  position: relative;
  top: -50px;
}
</style>
<template>
  <!-- 首页面 -->
  <div>
    <top></top>
    <linechart></linechart>
    <radar></radar>
    <Buttom></Buttom>
  </div>
</template>

<script>
import Buttom from "../components/buttom/Buttom.vue";
import Linechart from "../components/linechart/Linechart.vue";
import Radar from "../components/radar/Radar.vue";
import top from "../components/top/Top";
export default {
  name: "",
  props: {},
  data() {
    return {};
  },
  components: {
    top,
    Linechart,
    Radar,
    Buttom,
  },
  methods: {},
  mounted() {},
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
</style>
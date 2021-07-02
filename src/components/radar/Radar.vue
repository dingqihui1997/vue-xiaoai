<template>
  <!-- 雷达图父组件 -->
  <div>
    <div class="box flex">
      <div class="flex1 hei100">
        <one></one>
      </div>
      <div class="flex1 hei100 one">
        <piechart></piechart>
      </div>
      <div class="flex1 hei100">
        <histogram></histogram>
      </div>
    </div>
  </div>
</template>

<script>
import Histogram from "../histogram/Histogram.vue";
import One from "../one/One.vue";
import Piechart from "../piechart/Piechart.vue";
export default {
  name: "",
  props: {},
  data() {
    return {};
  },
  components: {
    One,
    Piechart,
    Histogram,
  },
  method: {},
  mounted() {},
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.box {
  height: 445px;
  width: 100%;
  margin-bottom: 20px;
  margin-top: 20px;
}
.one {
  margin-left: 15px;
  margin-right: 15px;
}
</style>
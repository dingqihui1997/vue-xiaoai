<template>
  <!-- 统计 -->
  <div>
    <stat-top></stat-top>
    <stat-center></stat-center>
    <statisticsbottom></statisticsbottom>
  </div>
</template>

<script>
import StatCenter from "../../components/statcenter/StatCenter.vue";
import StatTop from "../../components/statTop/StatTop.vue";
import statisticsbottom from "../../components/statisticsBottom/StatisticsBottom";
export default {
  name: "",
  props: {},
  data() {
    return {};
  },
  components: { StatTop, StatCenter, statisticsbottom },
  methods: {},
  mounted() {},
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
</style>
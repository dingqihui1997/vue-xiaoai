<template>
  <el-container>
    <el-header class="">
      <!-- 顶部 -->
      <heads></heads>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <lfet></lfet>
      </el-aside>
      <el-main> <router-view></router-view> </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Heads from "../../components/heads/Heads.vue";
import Lfet from "../../components/left/Lfet.vue";
export default {
  name: "",
  props: {},
  data() {
    return {};
  },
  components: { Heads, Lfet },
  methods: {},
  mounted() {},
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.el-header {
  padding: 0px;
}
.el-main {
  background-color: #f0f2f5;
}
.el-aside {
  background-color: #545c64;
}
</style>
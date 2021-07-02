<template>
  <div>
    <div class="box flex-dja">
      <div class="weclo flex-ja">期待您的下次光临</div>
      <div class="flex-ja">
        <el-button type="primary" @click="out">确定退出</el-button>
      </div>
    </div>
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
  methods: {
    out() {
      localStorage.removeItem("username");
      localStorage.removeItem("time");
      this.$router.push("/register");
    },
  },
  mounted() {},
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.box {
  height: 100%;
  width: 1660px;
}
.weclo {
  font-weight: 700;
  font-size: 24px;
  margin-bottom: 20px;
  margin-top: 60px;
}
</style>
<template>
  <div>
    <!-- 顶部 -->
    <div class="box flex-sb">
      <div class="welcome flex-ja">欢迎{{ username1 }}来到小爱后台管理系统</div>
      <div class="hai flex-ja">
        {{ all }}，亲爱的{{ username1 }}.上次登录时间: {{ time1 }}
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  name: "",
  props: {},
  data() {
    return {
      time1: "",
      username1: "",
      seihai: "",
    };
  },
  components: {},
  methods: {},
  mounted() {
    // console.log(localStorage.getItem("time"));
    this.time1 = dayjs(localStorage.getItem("time")).format(
      `YYYY年MM月DD日 HH时mm分ss秒`
    );
    this.username1 = localStorage.getItem("username");
  },
  computed: {
    all() {
      let hour = dayjs(new Date()).format("HH");
      console.log(this.seihai);
      if (hour <= 6) {
        this.seihai = "该睡觉了";
      } else if (hour <= 12) {
        this.seihai = "早上好";
      } else if (hour <= 14) {
        this.seihai = "中午好";
      } else if (hour <= 18) {
        this.seihai = "下午好";
      } else if (hour <= 24) {
        this.seihai = "晚上好";
      }
      return this.seihai;
    },
  },
  watch: {},
};
</script> 

<style lang='scss' scoped>
.box {
  width: 100%;
  height: 60px;
  background-color: #2e5e85;
  color: #fff;
  .welcome {
    width: 240px;
    margin-left: 25px;
  }
  .hai {
    width: 550px;
    margin-right: 35px;
  }
}
</style>
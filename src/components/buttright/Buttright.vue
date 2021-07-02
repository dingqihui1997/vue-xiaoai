<template>
  <div>
    <div class="box flex-d">
      <div>
        <img
          src="https://wpimg.wallstcn.com/e7d23d71-cf19-4b90-a1cc-f56af8c0903d.png"
          class="img100"
        />
      </div>
      <!-- 进度条 -->
      <div class="two">
        <div>{{ name[0] }}</div>
        <el-progress :percentage="arr[0]">vue</el-progress>
        <div>{{ name[1] }}</div>
        <el-progress :percentage="arr[1]" status="success"></el-progress>
        <div>{{ name[2] }}</div>
        <el-progress :percentage="arr[2]"></el-progress>
        <div>{{ name[3] }}</div>
        <el-progress :percentage="arr[3]"></el-progress>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "",
  props: {},
  data() {
    return {
      list: [],
      arr: [],
      name: [],
    };
  },
  components: {},
  methods: {
    getData() {
      axios
        .get("api/progress")
        .then((res) => {
          // console.log(res);
          this.list = res.data.data;
          this.list.map((item) => {
            item.progress = item.progress * 100; //的到具体的数值
            this.arr.push(item.progress);
            this.name.push(item.name);
          });
          console.log(this.list[0].name);
        })
        .catch((err) => {
          console.log("请求失败", err);
        });
    },
  },
  mounted() {
    this.getData();
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.box {
  width: 100%;
  height: 100%;
}
.one {
  width: 100%;
  height: 515px;
}
.two {
  margin-top: 25px;
}
</style>
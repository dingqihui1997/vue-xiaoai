<template>
  <!-- 点击查看 详情-->
  <div>
    <div class="bady flex-d">
      <div class="btn">
        <el-button type="primary" size="mini" @click="back">返回</el-button>
      </div>
      <div class="top flex-dja">
        <div class="flex-ja title">{{ list.title }}</div>
        <div class="flex-ja abstract">{{ list.abstract }}</div>
        <div class="flex-ja time">发表于: {{ list.date }}</div>
      </div>
    </div>
    <mavon-editor
      class="md"
      v-model="list.text"
      :subfield="false"
      :defaultOpen="'preview'"
      :toolbarsFlag="false"
      :editable="false"
      :scrollStyle="true"
      :ishljs="true"
    />
  </div>
</template>

<script>
import mavonEditor from "mavon-editor";
import axios from "axios";
import dayjs from "dayjs";

export default {
  name: "",
  props: {},
  data() {
    return {
      id1: "",
      time: "",
      list: {},
    };
  },
  components: {},
  methods: {
    back() {
      this.$router.push("/release");
    },
    getData() {
      axios
        .post("api/article/article", {
          _id: this.id1, //传递id获得这个详情页
        })
        .then((res) => {
          // console.log(res);
          // 把获取过来的数据，直接赋值给表单之前的数组
          this.list = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    //接收点击查看之后传递过来的值
    this.id1 = this.$route.query.id;
    // console.log(this.id1);
    this.getData();
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.top {
  width: 100%;
  height: 150px;
  background-color: #f0f2f5;
}
.btn {
  background-color: #f0f2f5;
}
.title {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 30px;
}
.abstract {
  margin-bottom: 20px;
}
.time {
  color: #cdced1;
}
</style>
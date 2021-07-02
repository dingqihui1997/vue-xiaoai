<template>
  <!-- 统计顶部 -->
  <div>
    <div class="flex box">
      <div class="flex1 time xiaoxi flex-sb">
        <div class="one">
          <div>今日发布</div>
          <div>{{ all1 }}</div>
        </div>
        <div class="flex-ja"><i class="el-icon-check"></i></div>
      </div>
      <div class="flex1 one original flex-sb">
        <div class="one">
          <div>原创文章</div>
          <div>{{ length }}</div>
        </div>
        <div class="flex-ja"><i class="el-icon-document"></i></div>
      </div>
      <div class="flex1 message flex-sb">
        <div class="one">
          <div>新留言</div>
          <div>0</div>
        </div>
        <div class="flex-ja"><i class="el-icon-chat-dot-square"></i></div>
      </div>
      <div class="flex1 one xiaoxi flex-sb">
        <div class="one">
          <div>新消息</div>
          <div>0</div>
        </div>
        <div class="flex-ja"><i class="el-icon-phone-outline"></i></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import lodash from "lodash";
import dayjs from "dayjs";
export default {
  name: "",
  props: {},
  data() {
    return {
      list: [],
      length: 0,
      time: null,
      num: 0,
      arr: [],
    };
  },
  components: {},
  methods: {
    getData() {
      axios
        .get("api/article/allArticle")
        .then((res) => {
          // console.log(res);
          this.list = res.data.data;
          // console.log(this.list);
          this.arr = lodash.groupBy(this.list, "source"); //lodash.groupBy 方法，按这个属性source分类
          this.length = this.arr.原创.length; //计算出原创属性
          //   let YMD = new Date().toLocaleDateString(); //获取当天的时间
        })
        .catch((err) => {
          console.log("请求失败", err);
        });
    },
  },
  mounted() {
    this.getData();
  },
  computed: {
    //   计算今日发布的，num++    all1或者把时间等于今天的过滤出来计算长度
    // all() {
    //   this.list.map((item) => {
    //     item.date = dayjs(item.date).format(`YYYY/M/DD`); //把里面的时间转化成年月日
    //     if (item.date === new Date().toLocaleDateString()) {
    //       return this.num++;
    //     }
    //   });
    //   return this.num;
    // },
    all1() {
      this.list1 = this.list.filter((item) => {
        return (
          dayjs(item.date).format(`YYYY/M/DD`) ===
          new Date().toLocaleDateString()
        );
      });
      return this.list1.length;
    },
  },
  watch: {},
};
</script>

<style lang='scss' scoped>
.box {
  width: 100%;
  height: 60px;
}

.original {
  background: #e88a87;
  padding-right: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
}
.message {
  background-color: #8375a3;
  padding-right: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
}
.xiaoxi {
  background: #9fcec1;
  padding-right: 30px;
  padding-top: 10px;
  padding-bottom: 10px;
}
i {
  font-size: 35px;
  color: #fff;
}
.one {
  width: 350px;

  color: #fff;
}
.one div {
  text-align: center;
}
</style>
<template>
  <!-- 统计中间部分， -->
  <div>
    <div class="box flex">
      <div class="flex1 hei100" id="left"></div>
      <div class="flex1" id="right"></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import lodash from "lodash";
import * as echarts from "echarts";

export default {
  name: "",
  props: {},
  data() {
    return {
      list: [],
      arr: "", //第一个饼图的数据
      arr1: "", //第二个饼图的数据
      option: {
        legend: {
          top: "top",
        },
        tooltip: { trigger: "item" }, //触发文字
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            // dataView: { show: true, readOnly: false }, 数据视图
            restore: { show: true },
            saveAsImage: { show: true }, //下载图片
          },
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "60%",
            center: ["50%", "50%"],
            // roseType: "area",
            data: [
              //   { value: 40, name: "rose 1" }, //展示的数据
            ],
          },
        ],
      }, //第一个图表
      option1: {
        legend: {
          top: "top",
        },
        tooltip: { trigger: "item" },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            // dataView: { show: true, readOnly: false }, 数据视图
            restore: { show: true },
            saveAsImage: { show: true }, //下载图片
          },
        },
        series: [
          {
            name: "面积模式",
            type: "pie",
            radius: [20, 120],
            center: ["50%", "50%"],
            roseType: "area",
            itemStyle: {
              borderRadius: 0,
            },
            data: [
              //   { value: 40, name: "rose 1" }, //展示的数据
            ],
          },
        ],
      }, //第二个图表
    };
  },
  components: {},
  methods: {
    getData() {
      axios
        .get("api/article/allArticle")
        .then((res) => {
          //   console.log(res); //第一个饼图
          this.list = res.data.data;
          this.arr = lodash.groupBy(this.list, "category"); //拿到category 类目的值
          //循环这个对象，i就是对象里面的每一项,加到图表里面data里面的数据
          for (let i in this.arr) {
            this.option.series[0].data.push({
              value: this.arr[i].length,
              name: i,
            });
          }
          let chartDom = document.getElementById("left");
          let myChart = echarts.init(chartDom);
          myChart.setOption(this.option);
          // 第二个图
          this.arr1 = lodash.groupBy(this.list, "source"); //拿到来源source的值并循环到series[0].data里面
          //   console.log(this.arr1);
          for (let n in this.arr1) {
            this.option1.series[0].data.push({
              value: this.arr1[n].length,
              name: n,
            });
          }
          let chartDom1 = document.getElementById("right");
          let myChart1 = echarts.init(chartDom1);
          myChart1.setOption(this.option1);
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
  height: 470px;
  background: #f0f2f5;
}
#left,
#right {
  padding-top: 30px;
}
</style>
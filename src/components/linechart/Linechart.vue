<template>
  <!-- 折线图 -->
  <div>
    <div class="box" id="main"></div>
  </div>
</template>

<script>
import axios from "axios";
import * as echarts from "echarts";
export default {
  name: "",
  props: {},
  data() {
    return {
      list: null,
      list1: null,
      arr: [], //actual数据
      arr1: [], //expected数据
      time: [], //x轴数据
      option: {
        tooltip: {
          trigger: "axis",
        },

        legend: {
          //   data: ["expected", "actual"],
        },
        grid: {
          left: "6%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            //保存图像
            saveAsImage: {},
          },
        },
        xAxis: {
          //类别x轴
          type: "category",
          //   boundaryGap: false,
          data: [],
        },
        yAxis: {
          // //y轴
          type: "value",
        },
        series: [
          //折线数据
          {
            name: "expected",
            type: "line",
            stack: "总量",
            smooth: true, //圆弧
            data: [],
            color: "#5D9CF8",
          },
          {
            name: "actual",
            type: "line",
            stack: "总量",
            smooth: true,
            data: [],
            color: "#FD6F9A",
          },
        ],
      },
    };
  },
  components: {},
  methods: {
    getData() {
      axios
        .get("api/homeChat")
        .then((res) => {
          // console.log(res);
          this.list = res.data.data;
          // 循环拿到单项数据，list1单项数组对象
          this.list.map((item) => {
            this.list1 = item;
            this.arr.push(item.expected); //直接将里面的数据新增到新建的数组里面expected数据
            this.arr1.push(item.actual);
            this.time.push(item.date);
          });
          this.option.series[0].data = this.arr; //series是数组，用下标
          this.option.series[1].data = this.arr1;
          this.option.xAxis.data = this.time;

          let chartDom = document.getElementById("main");
          let myChart = echarts.init(chartDom);
          myChart.setOption(this.option);
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
  margin-top: 50px;
  background-color: #fff;
}
</style>
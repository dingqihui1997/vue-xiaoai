<template>
  <!-- 雷达 柱状图 -->
  <div id="histo"></div>
</template>

<script>
import * as echarts from "echarts";
import axios from "axios";
export default {
  name: "",
  props: {},
  data() {
    return {
      list: [],
      time: [],
      arr: [],
      arr1: [],
      option: {
        legend: {
          data: ["actual", "expected"],
        },
        xAxis: {
          type: "category",
          data: [], //时间
        },
        yAxis: {
          type: "value",
        },
        series: [
          { name: "actual", data: [], type: "bar" },
          { name: "expected", data: [], type: "bar" },
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
          this.list.map((item) => {
            this.time.push(item.date);
            this.arr.push(item.actual);
            this.arr1.push(item.expected);
          });
          // console.log(this.time);
          this.option.xAxis.data = this.time;
          this.option.series[0].data = this.arr;
          this.option.series[1].data = this.arr1;

          let chartDom = document.getElementById("histo");
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
#histo {
  width: 548px;
  height: 445px;
  background-color: #fff;
}
</style>
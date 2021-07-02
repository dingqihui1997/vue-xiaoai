<template>
  <!-- 雷达图的饼图 -->
  <div id="Piechart"></div>
</template>

<script>
import axios from "axios";
import * as echarts from "echarts";
export default {
  name: "",
  props: {},
  data() {
    return {
      list: [],
      option: {
        legend: { top: "top" },
        // toolbox: {
        //   show: true,
        //   feature: {
        //     mark: { show: true },
        //     dataView: { show: true, readOnly: false },
        //     restore: { show: true },
        //     saveAsImage: { show: true },
        //   },
        // },
        tooltip: { trigger: "item" }, //触发文字
        series: [
          {
            containLabel: true,
            name: "面积模式",
            type: "pie",
            radius: [25, 150],
            center: ["50%", "50%"],
            roseType: "area",
            itemStyle: {
              borderRadius: 8,
            },
            data: [{ value: 40, name: "rose 1" }],
          },
        ],
      },
    };
  },
  components: {},
  methods: {
    getData() {
      axios
        .get("api/ringChat")
        .then((res) => {
          // console.log(res);
          this.list = res.data.data;
          // console.log(this.list);
          this.list.forEach((item) => {
            //修改属性的名字; value替换成data
            item.value = item.data;
            delete item.data;
          });
          //   console.log(this.list);
          this.option.series[0].data = this.list;
          let chartDom = document.getElementById("Piechart");
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
#Piechart {
  width: 548px;
  height: 445px;
  background-color: #fff;
  padding: 10px;
}
</style>
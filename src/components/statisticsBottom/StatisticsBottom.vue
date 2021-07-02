<template>
  <div>
    <div class="box" id="box"></div>
  </div>
</template>

<script>
import axios from "axios";
import lodash from "lodash";
import * as echarts from "echarts";
import dayjs from "dayjs";
export default {
  name: "",
  props: {},
  data() {
    return {
      arr: [],
      list: {},
      xzhou: [],
      yzhou: [], //y轴的数据
      num: [],
      sum: [],
      option: {
        title: {
          text: "数量",
        },

        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: function (params) {
            var tar = params[1];
            return tar.name + "<br/>" + tar.seriesName + " : " + tar.value;
          }, //不显示辅助空白条的文字
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          splitLine: { show: false },
          data: [], //x轴的时间数据
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "辅助",
            type: "bar",
            stack: "总量",
            itemStyle: {
              bordercolor: "rgba(0,0,0,0)",
              color: "rgba(0,0,0,0)",
            },
            emphasis: {
              itemStyle: {
                barBorderColor: "rgba(0,0,0,0)",
                color: "rgba(0,0,0,0)",
              },
            },
            data: [], //空白数据
          },
          {
            name: "发布数",
            type: "bar",
            stack: "总量",
            label: {
              show: true,
              position: "inside",
            },
            itemStyle: {
              bordercolor: " #5AB1EF",
              color: " #5AB1EF",
            },

            data: [], //y轴发布数量显示的数据
          },
        ],
      },
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
          this.list.map((item) => {
            item.date = dayjs(item.date).format(`YYYY年MM月DD日`); //x轴需要展示总计和时间把时间格式转化了
          }); //把时间转化成年月日再按时间分类
          // console.log(this.list);
          this.arr = lodash.groupBy(this.list, "date"); //按时间分类，去除重复的时间
          // console.log(this.arr);
          for (let i in this.arr) {
            this.xzhou.push(i); //添加横坐标时间显示
            this.yzhou.push(this.arr[i].length); //y轴要显示的数据发布条数就是数组的长度
          }
          this.xzhou.unshift("总计"); //为x轴坐标时间数据头部添加一个总计，

          // yzhou的发布条数计算,第一项是数组的长度
          let n = this.list.length; //最开始的总和
          this.yzhou.map((item) => {
            this.sum.push(n - item); //sum空白条,第一个数据是0,后面添加
            n = n - item; //第二个是的数据用总计减去item,得到的结果再减去下一项
          });
          this.yzhou.unshift(this.list.length); //给要显示的数据yzhou数据添加总计数据
          this.sum.unshift(0); //空白条的第一项
          // console.log(this.yzhou);
          // console.log(this.yzhou);
          // console.log(this.sum);
          this.option.xAxis.data = this.xzhou; //时间轴
          this.option.series[1].data = this.yzhou; //数据显示轴
          this.option.series[0].data = this.sum; //空白轴
          let chartDom = document.getElementById("box");
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
  height: 350px;
  background: #f0f2f5;
}
</style>
<template>
  <!-- 雷达图第一张 雷达 -->
  <div>
    <div id="lei" class="lei"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import axios from "axios";
export default {
  name: "",
  props: {},
  data() {
    return {
      obj: null,
      list: [], //最开始的数据
      indi: [],
      name: [], //三个数据名
      option: {
        legend: {
          data: [], //代表三条线的数据名
        },
        radar: {
          // shape: 'circle',
          indicator: [
            //坐标的显示名字
            {},
          ],
          center: ["50%", "50%"],
          radius: 160,
          startAngle: 90,
          splitNumber: 4,
          shape: "circle",
        },
        tooltip: { trigger: "item" },
        series: [
          {
            type: "radar", //雷达
            data: [
              //单个线条的数据
              {
                //delelopmer数据
                value: [],
                name: "",
              },
              {
                //marketing数据
                value: [],
                name: "",
              },
              {
                //ministration数据
                value: [],
                name: "",
              },
            ],
          },
        ],
      },
    };
  },
  components: {},
  methods: {
    getData() {
      axios
        .get("api/radarChat")
        .then((res) => {
          // console.log(res);
          this.list = res.data.data;
          // console.log(this.list);
          this.obj = this.list.map((item) => {
            this.name.push(item.name); //name是三个数据名 legend的data里面的值
            delete item.name; //然后再删除里面的name属性，得到一个全部的数字数据，
            return Object.values(item); // 得到这个对象的值，return出来的1个数组，里面三个数组，分别对应三条数据
          });
          let arr1 = Object.keys(this.list[0]); //需要得到一个对象的key，先获取list一个下标，的到一个新数组
          arr1.map((item) => {
            //然后再循环拿到数组里面的每一项，就拿到了key的每一项
            let obj1 = {};
            obj1.name = item;
            this.indi.push(obj1);
          });
          this.option.radar.indicator = this.indi;
          this.option.series[0].data[0].value = this.obj[0]; //单个线条的数据
          this.option.series[0].data[1].value = this.obj[1];
          this.option.series[0].data[2].value = this.obj[2];
          this.option.legend.data = this.name;
          this.option.series[0].data[0].name = this.name[0]; //单个线条的name
          this.option.series[0].data[1].name = this.name[1];
          this.option.series[0].data[2].name = this.name[2];
          let chartDom = document.getElementById("lei");
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
.lei {
  width: 548px;
  height: 445px;
  background-color: #fff;
  padding: 10px;
}
</style>
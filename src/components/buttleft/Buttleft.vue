<template>
  <!-- 首页底部右边板块 -->
  <div>
    <div>
      <template>
        <el-table :data="tableData" style="width: 700px" class="box">
          <el-table-column
            prop="num"
            label="Order. No"
            width="400"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="price" :label="one" width="200" align="center">
          </el-table-column>
          <el-table-column prop="status" :label="two" width="100">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.status === 0" type="danger"
                >pending</el-tag
              >
              <el-tag v-if="scope.row.status === 1" type="success"
                >success</el-tag
              >
            </template>
          </el-table-column>
        </el-table>
      </template>
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
      tableData: [],
      one: "",
      two: "",
      num1: "",
    };
  },
  components: {},
  methods: {
    getData() {
      axios
        .get("api/orderData ")
        .then((res) => {
          // console.log(res);
          this.tableData = res.data.data;
          this.list = Object.keys(this.tableData[0]);
          this.list.shift();
          this.one = this.list[0];
          this.two = this.list[1]; //顶部标签数据
          // 循环给价格加上￥
          this.tableData.map((item) => {
            return (item.price = `￥${item.price}`);
          });
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
  height: 560px;
  padding: 10px;
}
</style>
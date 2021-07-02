<template>
  <div>
    <template>
      <el-input
        v-model="input"
        placeholder="请输入商品名称"
        class="ipt"
      ></el-input>
      <el-table :data="list" style="width: 100%">
        <el-table-column prop="NAME" label="商品名称" width="400">
        </el-table-column>
        <el-table-column prop="ORI_PRICE" label="姓名" width="300">
        </el-table-column>
        <el-table-column prop="PRESENT_PRICE" label="地址"> </el-table-column>
        <el-table-column prop="PRESENT_PRICE" label="操作">
          <el-button type="primary" icon="el-icon-edit">修改</el-button>
          <el-button type="danger" icon="el-icon-delete">删除</el-button>
        </el-table-column>
      </el-table>
    </template>
    <!-- 分页 -->
    <div class="block">
      <span class="demonstration">完整功能</span>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 50, 100, 200]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length"
      >
      </el-pagination>
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
      tableData: [], //全部的数据
      input: "",
      currentPage: 1, //初始的页数
      pagesize: 10, //初始一页展示的条数
      list: [], //分页后的数据
    };
  },
  components: {},
  methods: {
    getData() {
      axios
        .get("api/tableData")
        .then((res) => {
          console.log(res);
          this.tableData = res.data.data;
          this.list = this.tableData.slice(0, this.pagesize); //首先一进页面就展示分页后的数据
        })
        .catch((err) => {
          console.log("请求失败", err);
        });
    },
    handleSizeChange(val) {
      //每页展示的条数
      console.log(`每页 ${val} 条`);
      this.pagesize = val;
      this.paging();
      //
    },
    handleCurrentChange(val) {
      //当前第几页，点击页数时，就截取相应页数的数据
      this.currentPage = val;
      this.paging();
    },
    paging() {
      this.list = this.tableData.slice(
        (this.currentPage - 1) * this.pagesize,
        this.pagesize * this.currentPage
      );
    },
  },
  mounted() {
    this.getData();
  },
  computed: {},
  watch: {
    input(val) {
      this.tableData = this.tableData.filter((item) => {
        return item.NAME.includes(val) === true;
      });
      this.paging();
      if (val === "") {
        this.getData();
      }
    },
  },
};
</script>

<style lang='scss' scoped>
.ipt {
  width: 400px;
}
</style>
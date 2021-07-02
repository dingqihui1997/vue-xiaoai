<template>
  <!-- 已发布 -->
  <div>
    <template>
      <el-table :data="list1" border style="width: 100%">
        <el-table-column label="#" width="50" type="index" align="center">
        </el-table-column>
        <el-table-column prop="title" label="标题" width="490" align="center">
        </el-table-column>
        <el-table-column prop="author" label="作者" width="100" align="center">
        </el-table-column>
        <!-- 类目 -->
        <el-table-column
          prop="category"
          label="类目"
          width="120"
          align="center"
          :filters="[
            { text: 'React', value: 'React' },
            { text: 'JavaScript', value: 'JavaScript' },
            { text: '工具类', value: '工具类' },
            { text: 'Vue', value: 'vue' },
            { text: '其他', value: '其他' },
          ]"
          :filter-method="filterTag"
          filter-placement="bottom-end"
        >
          <template slot-scope="scope">
            <el-tag
              v-if="scope.row.category === 'React'"
              type="info"
              disable-transitions
              >{{ scope.row.category }}</el-tag
            >
            <el-tag
              v-else-if="scope.row.category === 'JavaScript'"
              type="warning"
              disable-transitions
              >{{ scope.row.category }}</el-tag
            >
            <el-tag
              v-else-if="scope.row.category === '工具类'"
              type="danger"
              disable-transitions
              >{{ scope.row.category }}</el-tag
            >
            <el-tag
              v-else-if="scope.row.category === 'vue'"
              type="success"
              disable-transitions
              >{{ scope.row.category }}</el-tag
            >
            <el-tag v-else type="primary" disable-transitions>{{
              scope.row.category
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="source" label="来源" width="100" align="center">
        </el-table-column>
        <el-table-column prop="star" label="重要性" width="180" align="center">
          <template slot-scope="scope">
            <el-rate v-model="scope.row.star1" disabled text-color="#ff9900">
              >
            </el-rate>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="发布时间" width="140">
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作"
          width="480px"
          align="center"
        >
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="edit(scope.row._id)"
              >编辑</el-button
            >
            <el-button type="danger" size="mini" @click="click(scope.row._id)"
              >删除</el-button
            >
            <el-button
              type="success"
              size="mini"
              @click="details(scope.row._id)"
              >查看</el-button
            >
          </template></el-table-column
        ></el-table
      ></template
    >
    <!-- 分页 -->
    <div class="block">
      <span class="demonstration"></span>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[10]"
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
import dayjs from "dayjs";
export default {
  name: "",
  props: {},
  data() {
    return {
      currentPage4: 1,
      tableData: [],
      list1: [],
    };
  },
  components: {},
  methods: {
    handleSizeChange(val) {},
    handleCurrentChange(val) {
      this.currentPage4 = val;
      this.list1 = this.tableData.slice(
        (this.currentPage4 - 1) * 10,
        this.currentPage4 * 10
      );
    },
    // 进入页面请求数据
    getData() {
      axios
        .get("api/article/allArticle")
        .then((res) => {
          // console.log(res);
          this.leng = res.data.data.length;
          this.tableData = res.data.data;
          this.list1 = this.tableData.slice(0, 10);
          this.tableData.map((item) => {
            item.date = dayjs(item.date).format(`YYYY年MM月DD日 HH时mm分ss秒`);
            return this.$set(item, "star1", Number(item.star)); //新增属性
          });
        })
        .catch((err) => {
          console.log("请求失败", err);
        });
    },
    // 删除按钮
    click(id) {
      axios
        .post("api/article/delete", {
          _id: id,
        })
        .then((res) => {
          // console.log(res);
          this.getData();
          this.$message.success("已删除");
        })
        .catch(() => {
          console.log("请求失败");
        });
    },
    // 跳转有页面并传参数 点击编辑跳转
    edit(id) {
      axios
        .post("api/article/article", {
          _id: id,
        })
        .then((res) => {
          // console.log(res);
          if (res.data.code === 200) {
            this.$router.push({
              path: "/edit",
              query: {
                id: id,
              },
            });
          }
        })
        .catch(() => {
          console.log("请求失败");
        });
    },
    // 点击查看
    details(id) {
      axios
        .post("api/article/article", {
          _id: id,
        })
        .then((res) => {
          // console.log(res);
          if (res.data.code === 200) {
            this.$router.push({
              path: "/details",
              query: {
                id: id,
              },
            });
          }
        })
        .catch(() => {
          console.log("请求失败");
        });
    },
    // 标签页
    resetDateFilter() {
      this.$refs.filterTable.clearFilter("date");
    },
    clearFilter() {
      this.$refs.filterTable.clearFilter();
    },
    formatter(row, column) {
      return row.address;
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
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
</style>
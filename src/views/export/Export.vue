<template>
  <!-- 导出表格 -->
  <div>
    <div>
      <el-form ref="form" :model="form">
        <div class="ipt">
          <el-input v-model="value" class="inpt"></el-input>
        </div>
      </el-form>
    </div>
    <div>
      <!-- 表格数据 -->
      <template>
        <el-table :data="list1" style="width: 100%">
          <el-table-column prop="NAME" label="名称" width="300" align="center">
          </el-table-column>
          <el-table-column
            prop="GOODS_SERIAL_NUMBER"
            label="商品编号"
            width="300"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="ORI_PRICE"
            label="原价"
            width="380"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="PRESENT_PRICE"
            label="现价"
            width="380"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="address"
            label="操作"
            width="270"
            align="center"
          >
            <template slot-scope="scope">
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="modify(scope.row)"
                >修改</el-button
              >
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="del(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <!-- 修改框 -->
    <el-dialog :visible.sync="dialogVisible" width="30%">
      <el-form ref="form" :model="form1" label-width="80px">
        <el-form-item label="名称:">
          <el-input v-model="form1.NAME"></el-input>
        </el-form-item>
        <el-form-item label="原价:">
          <el-input v-model="form1.ORI_PRICE"></el-input>
        </el-form-item>
        <el-form-item label="现价:">
          <el-input v-model="form1.PRESENT_PRICE"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <div class="block">
      <span class="demonstration"></span>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[10, 50, 100]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length"
      >
      </el-pagination>
    </div>
    <!-- 导出表格 -->
    <div class="flex export">
      <download-excel
        class="export-excel-wrapper"
        :data="list1"
        header="这是个excel的头部"
        name="xiazai"
      >
        <el-button type="primary" size="mini">导出xls</el-button>
      </download-excel>
      <download-excel
        class="export-excel-wrapper"
        :data="list1"
        header="这是个excel的头部"
        name="导出的表格"
        type="csv"
      >
        <el-button type="danger" size="mini">导出csv</el-button>
      </download-excel>
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
      form: {
        name: "",
      },
      value: "",
      form1: {},
      tableData: [],
      dialogVisible: false,
      currentPage4: 1,
      list1: [],
      pagesize: 10,
    };
  },
  components: {},
  methods: {
    getData() {
      axios
        .get("api/tableData")
        .then((res) => {
          // console.log(res);
          this.tableData = res.data.data;
          this.list1 = this.tableData.slice(0, this.pagesize);
        })
        .catch((err) => {
          console.log("请求失败", err);
        });
    },
    del(row) {
      //删除原数组的这一行，然后给页面上展示的这个数组重新赋值重新截取
      this.tableData.splice(row, 1);
      this.list1 = this.tableData.slice(
        (this.currentPage4 - 1) * this.pagesize,
        this.currentPage4 * this.pagesize
      );
    },
    modify(row) {
      // 显示弹框
      this.dialogVisible = true;
      this.form1 = row;
    },
    handleSizeChange(val) {
      this.pagesize = val;
      console.log(`每页 ${val} 条`);
      this.search(); //当点击页数的时候,再次调用页数
    },
    handleCurrentChange(val) {
      //当我点击第几页是，val就是几，
      this.currentPage4 = val; //然后截取该页面应该展示的数组，第二页就是20到30的下标
      // this.num();
    },
    search() {
      //搜索功能,查找包含的项,然后过滤,
      this.tableData = this.tableData.filter((item) => {
        return item.NAME.includes(this.value) === true;
      });
      this.list1 = this.tableData.slice(
        (this.currentPage4 - 1) * this.pagesize,
        this.currentPage4 * this.pagesize
      );
    },
    // num() {
    //   this.list1 = this.tableData.slice(
    //     (this.currentPage4 - 1) * this.pagesize,
    //     this.currentPage4 * this.pagesize
    //   );
    // },
  },
  mounted() {
    this.getData();
  },
  computed: {},
  watch: {
    value(val) {
      this.search(); //当输入框里面没有值了，那么就又调用发请求的方法，从新获取值
      if (val === "") {
        this.getData();
      }
    },
  },
};
</script>

<style lang='scss' scoped>
.ipt {
  width: 300px;
  margin-bottom: 10px;
}
.export {
  margin-top: 10px;
}
.block {
  margin-top: 10px;
}
</style>
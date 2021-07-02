<template>
  <!--编辑文章 -->
  <div>
    <div class="box">
      <div class="title flex-sb">
        <el-button type="primary" class="but" size="mini" @click="back"
          >返回</el-button
        >
        <el-button type="primary" class="but1" size="mini" @click="click"
          >发布</el-button
        >
      </div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <!-- 文章标题 -->
        <div class="">
          <el-form-item label="文章标题" prop="title">
            <el-input v-model="ruleForm.title"></el-input>
          </el-form-item>
        </div>
        <!-- 文章摘要 -->
        <div class="">
          <el-form-item label="文章摘要" prop="abstract">
            <el-input v-model="ruleForm.abstract"></el-input>
          </el-form-item>
        </div>
        <!-- 作者 -->
        <div class="flex author">
          <div class="flex1">
            <el-form-item label="作者" prop="author">
              <el-input v-model="ruleForm.author"></el-input>
            </el-form-item>
          </div>
          <!-- 类目 -->
          <div class="flex1">
            <el-form-item label="类目" prop="category">
              <el-select v-model="ruleForm.category" placeholder="请选择">
                <el-option label="vue" value="vue"></el-option>
                <el-option label="React" value="React"></el-option>
                <el-option label="Node.js" value="Node.js"></el-option>
                <el-option label="性能优化" value="性能优化"></el-option>
                <el-option label="JavaScript" value="JavaScript"></el-option>
                <el-option label="小程序" value="小程序"></el-option>
                <el-option label="工具类" value="工具类"></el-option>
                <el-option label="其他" value="其他"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <!-- 来源 -->
          <div class="flex1">
            <el-form-item label="来源" prop="source">
              <el-select v-model="ruleForm.source" placeholder="请选择">
                <el-option label="原创" value="原创"></el-option>
                <el-option label="转载" value="转载"></el-option>
                <el-option label="与他人合作" value="与他人合作"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="flex1">
            <el-form-item label="重要性" prop="star">
              <el-select v-model="ruleForm.star" placeholder="请选择">
                <el-option label="1" value="1"></el-option>
                <el-option label="2" value="2"></el-option>
                <el-option label="3" value="3"></el-option>
                <el-option label="4" value="4"></el-option>
                <el-option label="5" value="5"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <!-- 时间 -->
          <div class="flex1">
            <div class="block">
              <span class="demonstration">默认</span>
              <el-date-picker
                v-model="ruleForm.date"
                type="datetime"
                placeholder="选择日期时间"
              >
              </el-date-picker>
            </div>
          </div>
        </div>
        <!-- 内容 -->
        <div class="content">
          <mavon-editor
            v-model="ruleForm.text"
            placeholder="内容"
          ></mavon-editor>
        </div>
      </el-form>
      <div class="flex-ja release">
        <el-button type="primary" @click="click">发布</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import mavonEditor from "mavon-editor";
import axios from "axios";
export default {
  name: "home",
  props: {},
  data() {
    return {
      ruleForm: {
        title: "",
        abstract: "",
        author: "",
        category: "",
        source: "",
        star: "",
        text: "",
        date: "",
      },
      rules: {
        //标题，摘要，作者，类目 来源，重要性
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        abstract: [{ required: true, message: "请输入摘要", trigger: "blur" }],
        author: [{ required: true, message: "请输入 id", trigger: "blur" }],
        category: [
          { required: true, message: "请选择类目", trigger: "change" },
        ],
        source: [{ required: true, message: "请选择来源", trigger: "change" }],
        star: [{ required: true, message: "请选择重要性", trigger: "change" }],
      },
      id1: "",
    };
  },
  components: {},
  methods: {
    click() {
      console.log(this.ruleForm.title);
      console.log(this.id1);
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          axios
            .post("/api/article/update", {
              id: this.id1,
              title: this.ruleForm.title,
              abstract: this.ruleForm.abstract,
              author: this.ruleForm.author,
              category: this.ruleForm.category,
              source: this.ruleForm.source,
              star: this.ruleForm.star,
              text: this.ruleForm.text,
              date: this.ruleForm.date,
            })
            .then((res) => {
              // console.log(res);编辑好，跳转已发布页面
              if (res.status === 200) {
                this.$message.success("发布成功");
                this.$router.push("/release");
              } else {
                this.$message.error("发布失败");
              }
            })
            .catch((err) => {
              console.log("请求失败", err);
            });
        } else {
          this.$message.error("表单填写有误,请检查");
          return;
        }
      });
    },
    back() {
      this.$router.push("/release");
    },
    getData() {
      axios
        .post("api/article/article", {
          _id: this.id1, //传递id获得这个详情页
        })
        .then((res) => {
          console.log(res);
          // 把获取过来的数据，直接赋值给表单之前的数组
          this.ruleForm = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    // 获取上一页面传递过来的id
    this.id1 = this.$route.query.id;
    console.log(this.id1);
    this.getData();
    // 获取单页数据
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.title {
  width: 100%;
  height: 40px;
  background-color: #59a586;
  line-height: 40px;
  margin-bottom: 30px;
  padding: 5px;
}
.but {
  background-color: #f56c6c;
  margin-left: 150px;
}
.but1 {
  margin-right: 150px;
}
.author {
  width: 100%;
  height: 40px;
  padding: 0;
  div {
    margin-left: 15px;
  }
}
.content {
  margin-top: 30px;
}
.release {
  margin-top: 20px;
}
</style>
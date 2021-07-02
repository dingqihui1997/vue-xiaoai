<template>
  <!-- 注册 -->
  <div class="box1">
    <div class="box fllex-dji">
      <div class="title flex-ja">欢迎来到小爱后台管理系统</div>
      <div class="user flex">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="120px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="ruleForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="ruleForm.password" show-password></el-input>
          </el-form-item>
          <el-form-item
            ><el-button type="primary" @click="login">立即注册</el-button>
            <el-button type="primary" @click="sign">立即登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "",
  props: {},
  data() {
    // 自定义验证用户名不能含中文
    let checkReUsername = (rule, value, callback) => {
      if (value.length < 6 || value.length > 15) {
        return callback(new Error("用户名在6-15位之间"));
      }
      if (/[\u4E00-\u9FA5]/g.test(value)) {
        return callback(new Error("用户名不能包含中文"));
      } else {
        callback();
      }
    };

    return {
      // dialogVisible: false,

      ruleForm: { username: "", password: "" },
      rules: {
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur",
          },
          {
            min: 6,
            message: "密码不能小于6位",
          },
        ],
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          {
            validator: checkReUsername,
            trigger: "blur",
          },
        ],
      },
    };
  },
  components: {},
  methods: {
    login() {
      // 判断表单验证是否通过验证
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          axios
            .post("/api/user/register", {
              username: this.ruleForm.username,
              password: this.ruleForm.password,
            })
            .then((res) => {
              console.log(res);
              this.$message.success("注册成功");
              this.$router.push("/signin");
            })
            .catch((err) => {
              console.log("请求失败", err);
            });
        } else {
          // $message: success成功 error失败 warning警告 info信息
          this.$message.error("表单填写有误,请检查");
          return;
        }
      });
    },
    sign() {
      this.$router.push("/signin");
    },
  },
  mounted() {},
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.box {
  width: 580px;
  height: 280px;
  background-color: #fff;
  margin: auto auto;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  box-shadow: 0 0 2px #ebeef5;
}
.title {
  height: 50px;
  width: 100%;
  border-bottom: 1px solid #ebeef5;
  margin-bottom: 20px;
}
.el-input {
  width: 300px;
  height: 40px;
  margin-left: 5px;
}
.el-form-item__label {
  width: 150px !important;
}
.user {
  margin-bottom: 10px;
}
.el-button + .el-button {
  margin-left: 120px;
}
.box1 {
  height: 100vh;
  background-color: #88c0da;
}
</style>
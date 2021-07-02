<template>
  <!-- 登录 -->
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
          <el-form-item label="请输入验证码" prop="code">
            <div class="Code flex">
              <el-input v-model="ruleForm.code" class="iput"></el-input>
              <div class="yanzm" v-html="list" @click="switch1">验证码</div>
              <!-- 验证码 -->
            </div>
          </el-form-item>
          <!-- 按钮 -->
          <div class="one">
            <el-form-item
              ><el-button type="primary" @click="signin">立即登录</el-button>
              <el-button type="primary" @click="register">立即注册</el-button>
              <!-- 登录注册绑定点击事件 点击登录将数据传给后端 -->
            </el-form-item>
          </div>
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
      list: "",
      ruleForm: { username: "", password: "", code: "" },
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
        code: [
          {
            required: true,
            message: "验证码不能为空",
            trigger: "blur",
          },
        ],
      },
    };
  },
  components: {},
  methods: {
    getData() {
      axios
        .get("/api/captcha")
        .then((res) => {
          console.log(res);
          this.list = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    switch1() {
      this.getData();
    },
    register() {
      this.$router.push("/register");
    },
    signin() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          axios
            .post("/api/user/login", {
              username: this.ruleForm.username,
              password: this.ruleForm.password,
              code: this.ruleForm.code,
            })
            .then((res) => {
              console.log(res);
              if (res.status === 200) {
                if (res.data.code === 200) {
                  localStorage.setItem("username", res.data.data[0].username);
                  localStorage.setItem("time", res.headers.date);
                  this.$message.success("登录成功");
                  this.$router.push("/");
                } else {
                  this.$message.error(res.data.message);
                  return;
                }
              }
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
  width: 580px;
  height: 360px;
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
.one {
  margin-top: 30px;
}
.iput {
  width: 140px;
}
.yanzm {
  width: 170px;
  height: 50px;
  margin-left: 20px;
}
</style>
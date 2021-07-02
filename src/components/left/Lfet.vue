<template>
  <div class="box">
    <el-col :span="12">
      <el-menu
        :default-active="$route.meta.index"
        class="el-menu-vertical-demo left-new-bc"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
      >
        <el-menu-item index="/">
          <i class="el-icon-location"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/release">
          <i class="el-icon-menu"></i>
          <span slot="title">已发布</span>
        </el-menu-item>
        <el-menu-item index="/statistics">
          <i class="el-icon-menu"></i>
          <span slot="title">统计</span>
        </el-menu-item>
        <el-menu-item index="/article">
          <i class="el-icon-check"></i>
          <span slot="title">发表文章</span>
        </el-menu-item>
        <el-menu-item index="/tab">
          <i class="el-icon-setting"></i>
          <span slot="title">标签页</span>
        </el-menu-item>
        <el-menu-item index="/export">
          <i class="el-icon-setting"></i>
          <span slot="title">导出</span>
        </el-menu-item>
        <el-menu-item index="/picture">
          <i class="el-icon-setting"></i>
          <span slot="title">图片上传</span>
        </el-menu-item>
        <el-menu-item index="/out">
          <i class="el-icon-delete-solid"></i>
          <span slot="title">退出系统</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  data() {
    return {};
  },
  components: {},
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
  mounted() {},
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.el-menu-item {
  width: 200px;
  height: 60px;
}
.el-submenu {
  width: 200px;
}
.el-aside {
  background-color: #545c64;
}
</style>
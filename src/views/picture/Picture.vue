<template>
  <div>
    <!-- 图片上传 -->
    <div class="box">
      <div class="support">支持拖拽</div>
      <div class="upload flex-a">Element UI自带上传组件</div>
      <div>
        <el-upload class="upload-demo" drag action="/api/upload" multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">
            只能上传jpg/png文件，且不超过500kb
          </div>
        </el-upload>
      </div>
      <div class="support">支持裁剪</div>
      <div class="upload flex-a">vue-image-crop-upload</div>
      <div class="butt">
        <div id="image">
          <!--上传图片的按钮-->
          <!--组件主体-->
          <el-button size="small" type="primary" @click="toggleShow"
            >点击上传</el-button
          >
          <my-upload
            field="file"
            @crop-success="cropSuccess"
            v-model="show"
            :width="400"
            :height="200"
            img-format="jpg"
            :size="size"
            url="/api/upload"
          ></my-upload>
          <!-- <img :src="avatar" /> -->
          <!-- //用于显示小图标 -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "babel-polyfill";
import myUpload from "vue-image-crop-upload/upload-2.vue";
import axios from "axios";
export default {
  name: "",
  props: {},
  data() {
    return {
      avatar: "/api/upload", //用于存储剪切完图片的base64Data和显示回调图片
      show: false, //剪切框显示和隐藏的flag
      size: 2.1,
    };
  },
  components: {
    "my-upload": myUpload,
  },
  methods: {
    toggleShow() {
      this.show = !this.show;
    },
    cropSuccess(imgDataUrl) {
      // imgDataUrl其实就是图片的base64data码;
      this.avatar = imgDataUrl;
      console.log(imgDataUrl); //这里打印出来的是base64格式的资源
    },
  },
  mounted() {},
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.box {
  width: 1680px;
  height: 600px;
  box-shadow: 0 2px 8px 4px #eee;
  padding: 20px;
}
.support {
  font-size: 22px;
  margin-top: 10px;
  margin-bottom: 10px;
}
.upload {
  width: 90%;
  height: 60px;
  background-color: #eeeeee;
  padding-left: 20px;
  margin-bottom: 20px;
}
</style>
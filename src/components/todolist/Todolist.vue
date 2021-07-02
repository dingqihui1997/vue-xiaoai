<template>
  <div>
    <div class="flex-sba top">
      <div class="el-icon-arrow-down"></div>
      <div>Todo list</div>
    </div>
    <!-- all展示页面  num1是1时才显示-->
    <div v-if="num === 1">
      <div v-for="(item, index) in list" :key="index" class="flex-sb one">
        <div class="flex">
          <!-- 动态绑定类名 -->
          <div class="choice" @click="click(item, index)">
            <i
              class="el-icon-check icon"
              :class="{ app: item.checked === true }"
            ></i>
          </div>
          <!-- 动态绑定class -->
          <div>{{ item.title }}</div>
        </div>
        <div class="el-icon-close del" @click="del(item)"></div>
      </div>
    </div>
    <!-- active展示页面  num2是显示-->
    <div v-else-if="num === 2">
      <div
        v-for="(item, index) in list.filter((item) => {
          return item.checked === false;
        })"
        :key="index"
        class="flex-sb one"
      >
        <div class="flex">
          <div class="choice" @click="click(item, index)">
            <i
              class="el-icon-check icon"
              :class="{ app: item.checked === true }"
            ></i>
          </div>
          <!-- 动态绑定class -->
          <div>{{ item.title }}</div>
        </div>
        <div class="el-icon-close del" @click="del(item)"></div>
      </div>
    </div>
    <!-- Completed展示页面 num是3时显示 -->
    <div v-else>
      <div
        v-for="(item, index) in list.filter((item) => {
          return item.checked === true;
        })"
        :key="index"
        class="flex-sb one"
      >
        <div class="flex">
          <div class="choice" @click="click(item)">
            <i
              class="el-icon-check icon"
              :class="{ app: item.checked === true }"
            ></i>
          </div>
          <!-- 动态绑定class -->
          <div>{{ item.title }}</div>
        </div>
        <div class="el-icon-close del" @click="del(item)"></div>
      </div>
    </div>
    <div class="flex-ja two">
      <div class="flex1">{{ itemsleft }} items left</div>
      <div class="flex1" @click="all(1)">all</div>
      <div class="flex1" @click="all(2)">Active</div>
      <div class="flex1" @click="all(3)">Completed</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  data() {
    return {
      list: [
        { title: "star this repository", checked: false },
        { title: "fork this repository", checked: false },
        { title: "follow author", checked: false }, //动态绑定class
        { title: "vue-admin", checked: false },
        { title: "vue", checked: true },
        { title: "element-ui", checked: true },
        { title: "axios", checked: false },
        { title: "webpack", checked: false },
      ],
      list1: [],
      arr: [],
      num: 1,
    };
  },
  components: {},
  methods: {
    click(item, index) {
      //点击圆圈时,就取反,选中的不选,没选的选中
      item.checked = !item.checked;
    },
    // all点击事件,传入不同的参数,然后显示不同的页面
    all(index) {
      this.num = index;
    },
    del(item) {
      this.list = this.list.filter((item1) => {
        return item1.title !== item.title; //满足条件的过滤 item1是数组里面的每一项
      }); //item是传入的参数,代表点击的这一项
    },
  },
  mounted() {},
  computed: {
    itemsleft() {
      return this.list.filter((item) => {
        return item.checked === false;
      }).length;
    },
  },
  watch: {},
};
</script>

<style lang='scss' scoped>
.top {
  height: 50px;
  padding: 0 10px;
  border-bottom: 1px solid #f0f0f0;
}
.choice {
  width: 20px;
  height: 20px;
  border-radius: 100%;
  border: 1px solid black;
  margin-right: 20px;
}
.one {
  padding: 10px;
  height: 50px;
  padding-right: 30px;
  &:hover {
    .del {
      display: block;
    }
  }
}
.two {
  border-top: 1px solid #f0f0f0;
  padding-top: 20px;
}
.icon {
  display: none;
}
.app {
  display: block;
}
.del {
  display: none;
}
</style>
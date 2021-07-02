<template>
  <!-- 标签页 -->
  <div>
    <template>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane :label="one" name="first">
          <!-- 未读消息 -->
          <div class="box1" v-show="obj.length > 0">
            <div v-for="(item, index) in obj" :key="index" class="flex-sb box">
              <div class="flex-ja">
                <div>{{ item.title }}</div>
              </div>
              <div class="flex-ja">
                <div>{{ item.time }}</div>
                <div>
                  <el-button @click="read(item, index)">标为已读</el-button>
                </div>
              </div>
            </div>
            <el-button type="primary" @click="all">全部标为已读</el-button>
          </div>
        </el-tab-pane>
        <!-- 已读消息 -->
        <el-tab-pane :label="two" name="second">
          <div class="box1" v-show="obj1.length > 0">
            <div v-for="(item, index) in obj1" :key="index" class="flex-sb box">
              <div class="flex-ja">
                <div>{{ item.title }}</div>
              </div>
              <div class="flex-ja">
                <div>{{ item.time }}</div>
                <div>
                  <el-button @click="del1(item, index)">删除</el-button>
                </div>
              </div>
            </div>
            <el-button type="danger" @click="whole">全部删除</el-button>
          </div>
        </el-tab-pane>
        <!-- 回收站 -->
        <el-tab-pane :label="del" name="third">
          <div class="box1" v-show="obj2.length > 0">
            <div v-for="(item, index) in obj2" :key="index" class="flex-sb box">
              <div class="flex-ja">
                <div>{{ item.title }}</div>
              </div>
              <div class="flex-ja">
                <div>{{ item.time }}</div>
                <div>
                  <el-button @click="reduction(item, index)">还原</el-button>
                </div>
              </div>
            </div>
            <el-button type="danger" @click="recovery">清空回收站</el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
    </template>
  </div>
</template>
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  data() {
    return {
      activeName: "first",
      // obj是未读 obj1是已读 obj2是回收站
      obj: [
        {
          title: "【系统通知】该系统将维护更新",
          time: "2018-04-19 20:00:00",
        },
        {
          title: "今晚12点整发大红包,先到先得",
          time: "2018-04-19 21:00:00",
        },
      ],
      obj1: [
        {
          title: "[系统通知]该系统将于今晚凌晨2点到5点进行升级维护",
          time: "2018-04-19 20:00:00",
        },
      ],
      obj2: [
        {
          title: "[系统通知]您的优惠券已经过期",
          time: "2018-04-19 20:00:00",
        },
      ],
      none: [],
    };
  },
  components: {},
  methods: {
    handleClick(tab, event) {},
    // 标为已读和全部已读
    read(item, index) {
      this.obj1.push(item);
      this.obj.splice(index, 1);
    },
    all() {
      this.obj.map((item, index) => {
        this.obj1.push(item);
      });
      this.obj = [];
    },
    // 删除和删除全部
    del1(item, index) {
      this.obj2.push(item);
      this.obj1.splice(index, 1);
    },
    whole() {
      this.obj1.map((item, index) => {
        this.obj2.push(item);
      });
      console.log(this.obj2);
      this.obj1 = this.none;
    },
    // 还原
    reduction(item, index) {
      console.log(item);
      this.obj1.push(item);
      this.obj2.splice(index, 1);
    },
    recovery() {
      this.obj2 = [];
    },
  },
  mounted() {},
  computed: {
    one() {
      return `未读消息${this.obj.length}`;
    },
    two() {
      return `已读消息${this.obj1.length}`;
    },
    del() {
      return `回收站${this.obj2.length}`;
    },
  },
  watch: {},
};
</script>

<style lang='scss' scoped>
.box1 {
  background: #fff;
  padding-bottom: 20px;
}
.box {
  height: 80px;
  border-bottom: 1px solid #d2d2d2;
  padding-left: 15px;
  padding-right: 50px;
}
.el-button {
  margin-left: 10px;
}
.el-button--primary {
  margin-top: 25px;
}
.el-button--danger {
  margin-top: 25px;
}
</style>
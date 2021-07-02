<template>
  <!--首页底部父组件 -->
  <div>
    <div class="flex-ja box">
      <div class="left flex-a">
        <div class="price"><buttleft></buttleft></div>
        <div class="todo"><todolist></todolist></div>
      </div>
      <div class="right">
        <buttright></buttright>
      </div>
    </div>
  </div>
</template>

<script>
import Buttleft from "../buttleft/Buttleft.vue";
import Buttright from "../buttright/Buttright.vue";
import Todolist from "../todolist/Todolist.vue";
export default {
  name: "",
  props: {},
  data() {
    return {};
  },
  components: { Buttleft, Buttright, Todolist },
  methods: {},
  mounted() {},
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.box {
  width: 100%;
  height: 560px;
  margin-top: 15px;
}
.left {
  width: 1100px;
  height: 100%;
  margin-right: 15px;
  background: #f0f2f5;
}
.right {
  width: 560px;
  height: 100%;
  padding: 20px;
  background: #fff;
}
.price {
  width: 700px;
}
.todo {
  width: 400px;
  height: 100%;
  margin-left: 10px;
  background-color: #fff;
}
</style>
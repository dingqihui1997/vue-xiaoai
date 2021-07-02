<template>
  <!-- 计数器 -->
  <div>
    <div class="flex top">
      <div class="flex1 flex-sb one">
        <div class="flex-ja"><i class="iconfont icon-yonghu user"></i></div>
        <div class="flex-d num">
          <div class="text">{{ key[0] }}</div>
          <div>
            <countTo
              :startVal="startVal"
              :endVal="obj.visits"
              :duration="3000"
            ></countTo>
          </div>
        </div>
      </div>
      <div class="flex1 flex-sb one">
        <div class="flex-ja"><i class="iconfont icon-xinxi"></i></div>
        <div>
          <div class="flex-dji num">
            <div class="text">{{ key[1] }}</div>
            <div>
              <countTo
                :startVal="startVal"
                :endVal="obj.messages"
                :duration="3000"
              ></countTo>
            </div>
          </div>
        </div>
      </div>
      <div class="flex1 flex-sb one">
        <div class="flex-ja"><i class="iconfont icon-qian"></i></div>
        <div>
          <div class="flex-dji num">
            <div class="text">{{ key[2] }}</div>
            <div>
              <countTo
                :startVal="startVal"
                :endVal="obj.purchases"
                :duration="3000"
              ></countTo>
            </div>
          </div>
        </div>
      </div>
      <div class="flex1 flex-sb one">
        <div class="flex-ja"><i class="iconfont icon-qicheqianlian-"></i></div>
        <div>
          <div class="flex-dji num">
            <div class="text">{{ key[3] }}</div>
            <div>
              <countTo
                :startVal="startVal"
                :endVal="obj.shopping"
                :duration="3000"
              ></countTo>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import countTo from "vue-count-to";
import axios from "axios";
export default {
  name: "",
  props: {},
  data() {
    return {
      obj: {},
      key: [],
      name: "",
      startVal: 0,
    };
  },
  components: {
    countTo,
  },
  methods: {
    getData() {
      axios
        .get("api/homeData")
        .then((res) => {
          // console.log(res);
          this.obj = res.data.data;
          // console.log(this.obj);
          this.key = Object.keys(this.obj);
        })
        .catch((err) => {
          console.log("请求失败", err);
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
.top {
  height: 110px;
  width: 100%;
  margin-top: 20px;
  div {
    margin-left: 10px;
  }
  i {
    font-size: 60px;
  }
  .one {
    background-color: #fff;
  }
}
.user {
  color: #5fd0cd;
}
.icon-xinxi {
  color: #3ba2f4;
}
.icon-qian {
  color: #f47489;
}
.icon-qicheqianlian- {
  color: #feba85;
}
.num {
  position: relative;
  top: 30px;
  padding-right: 25px;
}
.num div {
  padding-top: 5px;
}
.text {
  font-size: 20px;
  color: #a9b7c5;
}
</style>
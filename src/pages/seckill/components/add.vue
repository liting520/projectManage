<template>
  <div>
    <el-dialog
      :title="info.isadd?'添加活动':'编辑活动'"
      :visible.sync="info.isshow"
    >
      {{seckill}}
      <el-form :model="seckill">
        <el-form-item
          label="活动名称"
          label-width="100px"
        >
          <el-input
            v-model="seckill.title"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="活动期限"
          label-width="100px"
        >
          <!-- value-format="timestamp" -->
          <el-date-picker
            v-model="value1"
            type="datetimerange"
            align="right"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="[value1[0],value1[1]]"
            value-format='timestamp'
          >
          </el-date-picker>

          <div>{{value1}}</div>

        </el-form-item>
        <el-form-item
          label="一级分类"
          label-width="100px"
        >
          <el-select
            @change="changeFirst"
            v-model="seckill.first_cateid"
          >
            <el-option
              label="请选择"
              disabled
              value="shanghai"
            ></el-option>
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="二级分类"
          label-width="100px"
        >
          <el-select
            @change="changSecond"
            v-model="seckill.second_cateid"
          >
            <el-option
              label="请选择"
              disabled
              value="shanghai"
            ></el-option>
            <el-option
              v-for="item in secondCateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="商品"
          label-width="100px"
        >
          <el-select v-model="seckill.goodsid">
            <el-option
              label="请选择"
              value="shanghai"
            ></el-option>
            <el-option
              v-for="item in thiredCateList"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="状态"
          label-width="100px"
        >
          <el-switch
            v-model="seckill.status"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="cancel">取 消</el-button>
        <el-button
          type="primary"
          v-if="!info.isadd"
          @click="update"
        >修 改</el-button>
        <el-button
          type="primary"
          v-else
          @click="add"
        >添 加</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  reqCateList,
  reqGoodsList,
  reqSeckillAdd,
  reqSeckillUpdate,
  reqSeckillOne,
} from "../../../utils/http";
import { successalert } from "../../../utils/alert";
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      cateList: "cate/list",
      goodsList: "goods/list",
      seckillList: "seckill/list",
    }),
  },
  data() {
    return {
      seckill: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      },

      //二级分类
      secondCateList: [],
      thiredCateList: [],
      //  value1: [seckill.begintime,seckill.endtime],
      value1: [],
    };
  },
  methods: {
    ...mapActions({
      reqCateL: "cate/reqList",
      reqGoodsL: "goods/reqList",
      reqSeckillList: "seckill/reqList",
    }),
    cancel() {
      if (!this.info.isadd) {
        this.empty()
      }
      this.info.isshow = false;
    },
    empty() {
      (this.seckill = {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      }),
        //二级分类
        (this.secondCateList = []),
        (this.thiredCateList = []),
        //  value1: [seckill.begintime,seckill.endtime],
        (this.value1 = []);
    },
    //根据一级改变获取二级
    changeFirst() {
      this.seckill.second_cateid = "";
      this.seckill.goodsid = "";
      this.getSecondCate();
    },
    getSecondCate() {
      reqCateList({ pid: this.seckill.first_cateid }).then((res) => {
        this.secondCateList = res.data.list;
      });
    },
    //点击二级菜单计算三级
    changSecond() {
      this.seckill.goodsid = "";
      this.getThiredCate();
    },
    getThiredCate() {
      reqGoodsList({
        fid: this.seckill.first_cateid,
        sid: this.seckill.second_cateid,
      }).then((res) => {
        this.thiredCateList = res.data.list;
      });
    },
    //时间点击确认改变
    add() {
      this.seckill.begintime=this.value1[0]
      this.seckill.endtime=this.value1[1]
      reqSeckillAdd(this.seckill).then((res) => {
        if (res.data.code == 200) {
          successalert(res.data.msg);
          this.cancel();
          this.empty();
          this.reqSeckillList();
        }
      });
    },
    getOne(id) {
      reqSeckillOne({ id: id }).then((res) => {
        if (res.data.code == 200) {
          this.seckill = res.data.list;
          this.seckill.id = id;
          this.getSecondCate();
          this.getThiredCate();
          this.$set(this.value1,0,Number(this.seckill.begintime))
          this.$set(this.value1,1,Number(this.seckill.endtime))
        }
      });
    },
    update() {
      reqSeckillUpdate(this.seckill).then((res) => {
        if (res.data.code == 200) {
          successalert(res.data.msg);
          this.cancel();
          this.empty()
          this.reqSeckillList();
        }
      });
    },
  },
  mounted() {
    this.reqCateL();
  },
};
</script>

<style>
</style>
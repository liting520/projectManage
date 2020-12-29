<template>
  <div>
    <el-dialog
      :title="info.isadd?'添加分类':'编辑分类'"
      :visible.sync="info.isshow"
      @closed="cancel"
    >
      {{goods}}
      <el-form :model="goods">
        <el-form-item
          label="一级分类"
          label-width="100px"
        >
          
          <el-select @change="changeFirstCateId" v-model="goods.first_cateid">
            <el-option
              label="--请选择--"
              :value="0"
              disabled
            ></el-option>
            <!-- 需要请求数据 -->
            <el-option v-for="item in cateList" :key="item.id" :value="item.id" :label="item.catename"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="二级分类"
          label-width="100px"
        >
          <el-select v-model="goods.second_cateid">
            <el-option
              label="--请选择--"
              :value="0"
              disabled
            ></el-option>
            <!-- 需要请求数据 -->
<el-option v-for="item in secondCateList" :key="item.id" :value="item.id" :label="item.catename"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="商品名称"
          label-width="100px"
        >
          <el-input
            v-model="goods.goodsname"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="价格"
          label-width="100px"
        >
          <el-input
            v-model="goods.price"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="市场价格"
          label-width="100px"
        >
          <el-input
            v-model="goods.market_price"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="图片"
          label-width="100px"
        >
          <!-- 原生js的上传文件 -->

        </el-form-item>
        <el-form-item
          label="商品规格"
          label-width="100px"
        >
          <el-select v-model="goods.specsid">
            <el-option
              label="--请选择--"
              :value="0"
              disabled
            ></el-option>
            <!-- 需要请求数据 -->
<el-option v-for="item in specsList" :key="item.id" :value="item.id" :label="item.specsname"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="规格属性"
          label-width="100px"
        >
          <el-select
            v-model="goods.specsattr"
            multiple
          >
            <el-option
              label="--请选择--"
              :value="0"
              disabled
            ></el-option>
            <!-- 需要请求数据 -->

          </el-select>
        </el-form-item>
        <el-form-item
          label="是否新品"
          label-width="100px"
        >
          <el-radio
            v-model="goods.isnew"
            :label="1"
          >是</el-radio>
          <el-radio
            v-model="goods.isnew"
            :label="2"
          >否</el-radio>
        </el-form-item>
        <el-form-item
          label="是否热卖"
          label-width="100px"
        >
          <el-radio
            v-model="goods.ishot"
            :label="1"
          >是</el-radio>
          <el-radio
            v-model="goods.ishot"
            :label="2"
          >否</el-radio>
        </el-form-item>
        <el-form-item
          label="状态"
          label-width="100px"
        >
          <el-switch
            v-model="goods.status"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
        <el-form-item
          label="商品描述"
          label-width="100px"
        >

        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="cancel">取 消</el-button>
        <el-button
          type="primary"
          @click="add"
          v-if="info.isadd"
        >添 加</el-button>
        <el-button
          v-else
          type="primary"
          @click="update"
        >修 改</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import {mapActions,mapGetters} from "vuex"
import {reqCateList} from "../../../utils/http"
export default {
  props: ["info"],
  data() {
    return {
      //图片地址
      imgUrl: "",
      goods: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1,
      },
      secondCateList:[],

    };
  },
  computed: {
    ...mapGetters({
      cateList:"cate/list",
      specsList:"specs/list"
    }),
  },
  methods: {
    ...mapActions({
      reqCateL:"cate/reqList",
      reqSpecsL:"specs/reqList"
    }),
    //根据一级分类，计算出二级分类
    changeFirstCateId(){
      this.goods.second_cateid=""
      reqCateList({pid:this.goods.first_cateid}).then(res=>{
        if(res.data.code==200){
          this.secondCateList=res.data.list
        }
      })
    }
  },

  mounted() {
    if (this.cateList.length === 0) {
      this.reqCateL();
    }
    this.reqSpecsL(true)
  },
};
</script>

<style scoped>
.my-uploade {
  width: 100px;
  height: 100px;
  border: 1px dashed #999;
  position: relative;
}
.my-uploade .plus {
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  font-size: 40px;
  color: #666;
}
.my-uploade .inp {
  width: 100px;
  height: 100px;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  cursor: pointer;
}
.my-uploade .img {
  width: 100px;
  height: 100px;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
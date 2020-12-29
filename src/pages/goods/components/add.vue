<template>
  <div>
    <el-dialog :title="info.isadd?'添加商品':'编辑商品'" :visible.sync="info.isshow"
    @closed="cancel"
    @opened="opened">
      {{goods}}
  <el-form :model="goods">
    <el-form-item label="一级分类" label-width="100px">
      <el-select @change="changeFirstid" v-model="goods.first_cateid" placeholder="请选择">
        <el-option label="请选择" disabled value></el-option>
        <el-option v-for="item in cateList" :key="item.id" :label="item.catename" :value="item.id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="二级分类" label-width="100px">
      <el-select v-model="goods.second_cateid">
        <el-option label="请选择"  disabled value></el-option>
        <el-option v-for="item in secondCateList" :key="item.id" :label="item.catename" :value="item.id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="商品名称" label-width="100px">
     <el-input v-model="goods.goodsname"  autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="价格" label-width="100px">
     <el-input v-model="goods.price" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="市场价格" label-width="100px">
     <el-input v-model="goods.market_price" autocomplete="off"></el-input>
    </el-form-item>
     <el-form-item
          label="图片"
          label-width="100px"
        >
          <!-- 原生js的上传文件 -->
          <div class="my-uploade">
            <div class="plus">+</div>
            <img
              class="img"
              :src="imgUrl"
              alt=""
              v-if="imgUrl"
            >
            <input
            v-if="info.isshow"
              class="inp"
              type="file"
              @change="changeImg"
            >
          </div>
        </el-form-item>
    <el-form-item label="商品规格" label-width="100px">
       <el-select v-model="goods.specsid" @change="secondSpecsid">
        <el-option label="请选择" disabled value></el-option>
        <el-option v-for="item in specsList" :key="item.id" :label="item.specsname" :value="item.id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="规格属性" label-width="100px">
       <el-select v-model="goods.specsattr" multiple>
        <el-option label="请选择" disabled  value></el-option>
        <el-option v-for="item in secondSpecsList" :key="item" :label="item" :value="item"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="是否新品" label-width="100px">
      <el-radio v-model="goods.isnew" :label="1">是</el-radio>
      <el-radio v-model="goods.isnew" :label="2">否</el-radio>
    </el-form-item>
    <el-form-item label="是否热卖" label-width="100px">
      <el-radio v-model="goods.ishot" :label="1">是</el-radio>
      <el-radio v-model="goods.ishot" :label="2">否</el-radio>
    </el-form-item>

    <el-form-item label="状态" label-width="100px">
      <el-switch
    v-model="goods.status"
    :active-value="1"
    :inactive-value="2">
      </el-switch>
    </el-form-item>

    <el-form-item label="商品描述" label-width="100px">
          <!-- 富文本编辑器 -->
          <div id="editor" v-if="info.isshow"></div>
        </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer" >
    <el-button @click="cancel">取 消</el-button>
    <el-button type="primary" v-if="!this.info.isadd" @click="update">修 改</el-button>
    <el-button type="primary" v-else @click="add">添 加</el-button>
  </div>
</el-dialog>
  </div>
</template>

<script>
import E from "wangeditor"
import {reqCateList,reqGoodsAdd,reqGoodsOne,reqGoodsUpdate} from "../../../utils/http"
import {successalert,erroralert} from "../../../utils/alert"
import {mapActions,mapGetters} from "vuex"
export default {
  props:["info"],
  data(){
return {
  imgUrl:"",
  goods:{
    first_cateid:"",
    second_cateid:"",
    goodsname:"",
    price:"",
    market_price:"",
    img:null,
    description:"",
    specsid:"",
    specsattr:[],
    isnew:1,
    ishot:1,
    status:1
  },
  secondCateList:[],
  secondSpecsList:[]
}
  },
computed:{
  ...mapGetters({
    cateList:"cate/list",
    specsList:"specs/list",
  })
},
methods:{
  ...mapActions({
reqCateL:"cate/reqList",
reqSpecsL:"specs/reqList",
reqGoodsL:"goods/reqList",
    reqTotal: "goods/reqTotal"
  }),
  //点击取消
  cancel(){
     if (!this.info.isadd) {
        this.empty();
      }
    this.info.isshow=false
  },
  //清空数据
  empty(){
    this.imgUrl="",
      this.goods={
        first_cateid:"",
        second_cateid:"",
        goodsname:"",
        price:"",
        market_price:"",
        img:null,
        description:"",
        specsid:"",
        specsattr:[],
        isnew:1,
        ishot:1,
        status:1
      },
      this.secondCateList=[],
      this.secondSpecsList=[]
  },
  //js文件上传
    changeImg(e){
      let file=e.target.files[0]
      //将文件生成一个url地址
      this.imgUrl=URL.createObjectURL(file);
      this.goods.img=file
    },
  //点击一级分类计算二级分类
  changeFirstid(){
    this.goods.second_cateid=""
    this.getSecondCate()
  },
  //获取二级分类
  getSecondCate(){
    reqCateList({pid:this.goods.first_cateid}).then(res=>{
      this.secondCateList=res.data.list
    })
  },
   //点击商品规格计算商品属性
  secondSpecsid(){
    this.goods.specsattr=[]
    this.getSecondSpecsid()
  },
  getSecondSpecsid(){
    let obj=this.specsList.find(item=>item.id==this.goods.specsid)
    this.secondSpecsList=obj?obj.attrs:[]
  },
      //封装的验证
   checkProps(){
      return new Promise((resolve,reject)=>{
        if(this.goods.first_cateid===""){
          erroralert("一级分类不能为空")
          return
        }
        if (this.goods.second_cateid === "") {
          erroralert("二级分类不能为空");
          return;
        }
        if (this.goods.goodsname === "") {
          erroralert("商品名称不能为空");
          return;
        }

        if (this.goods.price === "") {
          erroralert("商品价格不能为空");
          return;
        }

        if (this.goods.market_price === "") {
          erroralert("商品市场价格不能为空");
          return;
        }

        if (!this.goods.img) {
          erroralert("请上传图片");
          return;
        }
        if (this.goods.specsid === "") {
          erroralert("商品规格不能为空");
          return;
        }

        if (this.goods.specsattr.length === 0) {
          erroralert("请选择规格属性");
          return;
        }
        if (this.editor.txt.html() == "") {
          erroralert("请输入商品描述");
          return;
        }
        resolve()
      })
    },
  //点击添加
  add(){
   this.checkProps().then(()=>{
      //取出富文本编辑器的内容，赋值给goods
    this.goods.description=this.editor.txt.html()
      //由于后端要的是specsattr是数组字符串，前端需要的是数组，所以要拷贝
      //但是由于有对象（img）所以不能使用json。parse(json.stringify())拷贝，需要使用。。。
      let data={
        ...this.goods,
        specsattr:JSON.stringify(this.goods.specsattr)
      }
      reqGoodsAdd(data).then(res=>{
        successalert(res.data.msg)
        this.cancel()
        this.empty()
        this.reqGoodsL()
        this.reqTotal()
      })
   })
  },
   //创建富文本编辑器
    opened() {
      //创建编辑器
      this.editor = new E("#editor");
      this.editor.create();
      //赋值
      this.editor.txt.html(this.goods.description);
    },
    //点击编辑获取一条数据
    getOne(id){
      reqGoodsOne({ id: id }).then(res => {
        if (res.data.code == 200) {
          this.goods = res.data.list;
          //重新获取二级分类的list
          this.getSecondCate();
          //图片
          this.imgUrl = this.$pre + this.goods.img;
          //规格属性展示list
          this.getSecondSpecsid();
          //规格属性选中的list
          this.goods.specsattr = JSON.parse(this.goods.specsattr);
          //补id
          this.goods.id = id;
          //将goods.desctiption赋值给富文本编辑器
          if (this.editor) {
            this.editor.txt.html(this.goods.description);
          }
        }
      });
    },
    //点击了修改
    update(){
      this.checkProps().then(()=>{
        this.goods.description=this.editor.txt.html()
      let data={
        ...this.goods,
        specsattr:JSON.stringify(this.goods.specsattr)
      }
      reqGoodsUpdate(data).then(res=>{
        if(res.data.code==200){
            this.cancel();
            this.empty();
            successalert(res.data.msg);
            this.reqGoodsL();
        }
      })
      })
    },

   

},
mounted(){
 if (this.cateList.length === 0) {
      this.reqCateL();
    }
  this.reqSpecsL(true)

}
}
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
<template>
  <div>
    <el-dialog
      :title="info.isadd?'添加分类':'编辑分类'"
      :visible.sync="info.isshow" @closed="cancel"
    >
      {{cate}}
      <el-form :model="cate">
        <el-form-item
          label="上级分类"
          label-width="100px"
        >
          <el-select v-model="cate.pid">
            <el-option
              label="顶级分类"
              :value="0"
            ></el-option>
            <!-- 需要请求数据 -->
            <el-option v-for="item in list" :key="item.id" :value="item.id" :label="item.catename"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="分类名称"
          label-width="100px"
        >
          <el-input
            v-model="cate.catename"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="图片"
          label-width="100px"
          v-if="cate.pid!==0"
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
        <el-form-item
          label="状态"
          label-width="100px"
        >
          <el-switch
            v-model="cate.status"
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
import {erroralert,successalert} from "../../../utils/alert"
import {reqCateAdd,reqCateOne,reqCateUpdate} from "../../../utils/http"
import {mapActions,mapGetters} from "vuex"
import path from "path"
export default {
  props: ["info"],
  data(){
    return {
      //图片地址
      imgUrl:"",
      cate:{
        pid:"",
        catename:"",
        img:null,
        status:1
      }
    }
  },
  methods: {
     ...mapActions({
    "reqList":"cate/reqList"
  }),
    //点击取消
    cancel() {
      if(!this.info.isadd){
        this.empty()
      }
      this.info.isshow = false;
    },
    empty(){
  this.imgUrl="",
      this.cate={
        pid:"",
        catename:"",
        img:null,
        status:1
      }
    },
    //js文件上传
    changeImg(e){
      let file=e.target.files[0]
      //文件大小验证
      if(file.size>2*1024*1024){
        erroralert("文件大小不能超过2M")
        return
      }
      //后缀名
      let extname=path.extname(file.name)
      let arr=[".png",".gif",".jpg",".jpeg"]
      if(!arr.some(item=>item===extname)){
        erroralert("请上传图片")
        return
      }
      //将文件生成一个url地址
      this.imgUrl=URL.createObjectURL(file);
      this.cate.img=file
      console.log(e)
    },
    add(){
      reqCateAdd(this.cate).then(res=>{
       if(res.data.code==200){
         successalert(res.data.msg)
         this.empty()
         this.cancel()
         this.reqList()
       }
      })
    },
    getOne(id){
      reqCateOne({id:id}).then(res=>{
        if(res.data.code==200){
          this.cate=res.data.list
          this.cate.id=id
           this.imgUrl=this.$pre+this.cate.img
        }
      })
    },
    update(){
      reqCateUpdate(this.cate).then(res=>{
        if(res.data.code==200){
          successalert(res.data.msg)
          this.cancel()
          this.empty()
          this.reqList()
        }
      })
    }
  },
  computed:{
...mapGetters({
  "list":"cate/list"
})
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
<template>
  <div>
    <el-dialog
      :title="info.isadd?'添加轮播图':'编辑轮播图'"
      :visible.sync="info.isshow"
      @closed="cancel"
    >
      <el-form :model="banner">
        <el-form-item
          label="轮播图名称"
          label-width="100px"
        >
          <el-input
            v-model="banner.title"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="图片"
          label-width="100px"
        >
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="changeImg"
          >
            <img
              v-if="imgUrl"
              :src="imgUrl"
              class="avatar"
            >
            <i
              v-else
              class="el-icon-plus avatar-uploader-icon"
            ></i>
          </el-upload>
        </el-form-item>
        <el-form-item
          label="状态"
          label-width="100px"
        >
          <el-switch
            v-model="banner.status"
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
import { reqBannerAdd , reqBannerOne,reqBannerUpdate} from "../../../utils/http";
import { successalert } from "../../../utils/alert";
export default {
  props: ["info"],
  data() {
    return {
      imgUrl:"",
      banner: {
        title: "",
        img: null,
        status: 1,
      },
    };
  },
  methods: {
    empty(){
      this.imgUrl="",
      this.banner= {
        title: "",
        img: null,
        status: 1,
      }
    },
    cancel() {
      if(!this.info.isadd){
        this.empty()
      }
      this.info.isshow = false;
    },
    add() {
      reqBannerAdd(this.banner).then((res) => {
        if (res.data.code == 200) {
          successalert(res.data.msg);
          this.empty()
          this.cancel()
          this.$emit("init")
        }
      });
    },
    changeImg(e) {
      console.log(e);
      let file = e.raw;
      //将文件生产一个url地址
      this.imgUrl = URL.createObjectURL(file);
      this.banner.img = file;
    },
    //请求一条数据
    getOne(id){
      reqBannerOne({id:id}).then(res=>{
        if(res.data.code==200){
          this.banner=res.data.list
          this.banner.id=id
          this.imgUrl=this.$pre+this.banner.img

        }
      })
    },
    //点击修改
    update(){
      reqBannerUpdate(this.banner).then(res=>{
        if(res.data.code==200){
          successalert(res.data.msg)
          this.cancel()
          this.empty()
          this.$emit("init")
        }
      })
    }
  },
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
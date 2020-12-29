<template>
  <div>  
      <!-- -->
    <el-dialog
      :title="info.isadd?'添加管理员':'编辑管理员'" :visible.sync="info.isshow" @closed="cancel"
    > 
      <el-form :model="manage">
          <el-form-item
          label="所属角色"
          label-width="100px"
        >
        <!--   @change="changePid"-->
          <el-select v-model="manage.roleid"
          >
            <el-option
              :value="0"
              label="请选择"
              disabled
            ></el-option>
            <!-- 需要一段数据 -->
      <el-option v-for="item in rlist" :key="item.id" :value="item.id" :label="item.rolename"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="用户名"
          label-width="100px"
        >
          <el-input
         v-model="manage.username"
           
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          label-width="100px"
        >
          <el-input
         v-model="manage.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
       
        
       
          <!-- v-if="manage.type==1" -->
        <el-form-item
          label="状态"
          label-width="100px"
        > 
          <el-switch
        v-model="manage.status"
           
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
     
        <el-button  @click="cancel">取 消</el-button>
        <!--  -->
          <!--  -->
        <el-button
          type="primary"
          @click="add" v-if="info.isadd"
        >添 加</el-button>
         <!---->
        <el-button type="primary"  @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import {reqManageAdd} from "../../../utils/http"
import {successalert} from "../../../utils/alert"
import { reqRoleList,reqManageInfo,reqManageUpdate} from "../../../utils/http";
export default {
props:["info"],
data(){
return {
  rlist:[],
    manage:{
        roleid:0,
        username:"",
        password:"",
        status:1
    }
}
},
methods:{
   roleinit() {
      reqRoleList().then((res) => {
        if (res.data.code == 200) {
          this.rlist = res.data.list;
        }
      });
    },
  empty(){
    this.manage={
      uid:0,
       roleid:0,
        username:"",
        password:"",
        status:1
    }
  },
    cancel(){
         if (!this.info.isshow) {
        this.empty();
      }
      this.info.isshow = false;
    },
    add(){
        reqManageAdd(this.manage).then(res=>{
            if(res.data.code==200){
              successalert(res.data.msg)
                this.cancel()
                this.empty()
                this.$emit("init")
            }
        })
    },
    getOne(uid){
      reqManageInfo({uid:uid}).then(res=>{
        if(res.data.code==200){
          this.manage=res.data.list
          this.manage.password=""
        }
      })
    },
    //修改更新
    update(){
      reqManageUpdate(this.manage).then(res=>{
        if(res.data.code==200){
          successalert(res.data.msg)
          this.cancel()
          this.empty()
          this.$emit("init")
        }
      })
    }
},
mounted(){
  this.roleinit()
}
};
</script>

<style>
</style>
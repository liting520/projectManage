<template>
  <div>
      <el-dialog title="编辑会员" :visible.sync="info.isshow">
  <el-form :model="member">
    <el-form-item label="手机号码" label-width="100px">
      <el-input v-model="member.phone" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="昵称" label-width="100px">
      <el-input v-model="member.nickname" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" label-width="100px">
      <el-input v-model="member.password" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="状态" label-width="100px">
         <el-switch
    v-model="member.status"
    :active-value="1"
    :inactive-value="2">
  </el-switch>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="cancel">取 消</el-button>
    <el-button type="primary" @click="update">修 改</el-button>
  </div>
</el-dialog>
  </div>
</template>

<script>
import {reqMemberOne,reqMemberUpdate} from "../../../utils/http"
import {successalert,erroralert} from "../../../utils/alert"

export default {
props:["info"],
data(){
    return {
        member:{
            uid:"",
            nickname:"",
            phone:"",
            password:"",
            status:1
        }
    }
},
methods:{
    empty(){
        this.member={
            uid:"",
            nickname:"",
            phone:"",
            password:"",
            status:1
        }
    },
    getOne(uid){
        reqMemberOne({uid:uid}).then(res=>{
            this.member=res.data.list
            this.member.password=""
        })
    },
    update(){
      if(!this.member.password){
        erroralert("密码不能为空")
        return 
      }
        reqMemberUpdate(this.member).then(res=>{
            if(res.data.code==200){
                successalert(res.data.msg)
                this.empty()
                this.cancel()
                this.$emit("init")
            }
        })
    },
    cancel(){
        this.info.isshow=false
    }
}
}
</script>

<style>

</style>
<template>
  <div>
      <el-button type="primary" @click="willadd">添加</el-button>


      <v-list :rlist="rlist" @rolelist="rolelist" @edit="edit($event)"></v-list>


      <v-add :info="info" @rolelist="rolelist"  :list="list" ref="add"></v-add>


  </div>
</template>

<script>
import vList from "./components/list"
import vAdd from "./components/add"
import {reqMenulist , reqRoleList , reqRoleGet} from "../../utils/http"
import { successalert } from '../../utils/alert'
export default {
components:{
  vList,
  vAdd
},
data(){
  return {
    info:{
      isshow:false,
      isadd:true
    },
    list:[],
    rlist:[]
  }
},
methods:{
  willadd(){
    this.info.isshow=true
    this.info.isadd=true
  },
  init(){
    reqMenulist().then(res=>{
      // console.log(res)
      if (res.data.code == 200) {
          this.list = res.data.list;
        }
    })
  },
  rolelist(){
    reqRoleList().then(res=>{
    this.rlist=res.data.list
  })
  },
  edit(id){
    this.info.isshow=true
    this.info.isadd=false
    this.$refs.add.getOneRole(id)
  }
},
mounted(){
  this.init()
  this.rolelist()
}
}
</script>

<style>

</style>
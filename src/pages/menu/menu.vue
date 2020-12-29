<template>
  <div>
      <el-button type="primary" @click="add" >添加</el-button>

      <v-list :list="list" @edit="edit($event)" @init="init"> </v-list>

      <v-add :info="info" @init="init" ref="add" :list="list" ></v-add>
  </div> 
</template>

<script>
import vList from "./components/list"
import vAdd from "./components/add"
import {reqMenulist} from "../../utils/http"
export default {
  data(){
return {
  info:{
    isshow:false,
    isadd:true
  },
  list:[]
}
  },
components:{
    vList,
    vAdd
},
methods:{
  add(){
    this.info.isshow=true
    this.info.isadd=true

  }, 
  init(){
    reqMenulist().then(res=>{
      if (res.data.code == 200) {
          this.list = res.data.list;
        }
    })
  },
  edit(id){
    this.info.isshow=true
    this.info.isadd=false
    this.$refs.add.getOne(id)
  }
},
mounted(){
  this.init()
}
}
</script>

<style>

</style>
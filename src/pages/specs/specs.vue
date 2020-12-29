<template>
  <div>
      <el-button type="primary" @click="willadd">添加</el-button>

      <v-list @edit="edit($event)"></v-list>
      <v-add :info="info" ref="add"></v-add>

      <el-pagination
  background
  layout="prev, pager, next"
  :total="total"
  @current-change="changePage"
  :page-size="size">
</el-pagination>
  </div>
</template>
 
<script> 
import vList from "./components/list"
import vAdd from "./components/add"
import {mapActions,mapGetters} from "vuex"
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
    }
  }
},
methods:{
  ...mapActions({
  reqTotal:"specs/reqTotal",
  changePage:"specs/changePage",
  reqList:"specs/reqList"
  }),
 willadd(){
   this.info.isshow=true
   this.info.isadd=true
 },
 edit(id){
   this.info.isshow=true
   this.info.isadd=false
   this.$refs.add.getOne(id)
 }
},
computed:{
  ...mapGetters({
    total:"specs/total",
    size:"specs/size"
  })
},
mounted(){
  this.reqTotal()
  this.reqList()
}
}
</script>

<style>

</style>
<template>
  <div>
      <el-button type="primary" @click="willadd">添加</el-button>


      <!-- list -->
      <v-list @edit="edit($event)"></v-list>



      <!-- add -->
      <v-add :info="info" ref="add"></v-add>


      
  </div>
</template>

<script>
import vList from "./components/list"
import vAdd from "./components/add"
import {mapActions,mapGetters} from "vuex"
import {reqBannerList} from "../../utils/http"
export default {
components:{
  vList,
  vAdd
},
computed:{
...mapGetters({
  list:"banner/list"
})
},
data(){
  return {
    info:{
      isshow:false,
      isadd:true
    },
    list:[]
  }
},
methods:{
  ...mapActions({
reqList:"reqList"
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
mounted(){
this.reqList()
}
}
</script>

<style>

</style>
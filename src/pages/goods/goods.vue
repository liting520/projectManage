<template>
  <div>
      <el-button type="primary" @click="willadd">添加</el-button>

      <!-- 分类列表 -->
      <v-list @edit="edit($event)"></v-list>


      <!-- 添加弹窗 -->
      <v-add :info="info"  ref="add"></v-add>

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
    },
 
  }
},
methods:{
  ...mapActions({
  
  }),
  willadd(){
    this.info.isshow=true
    this.info.isadd=true
  },

},
computed:{
...mapGetters({

}) 
},
mounted(){

}
}
</script>

<style>

</style>
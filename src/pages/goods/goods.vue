<template>
  <div>
    <el-button type="primary" @click="willadd">添加</el-button>
    <v-list @edit="edit($event)"></v-list>
    <v-add :info="info" ref="add"></v-add>
  </div>
</template>

<script>
import {mapActions,mapGetters} from "vuex"
import vList from "./components/list"
import vAdd from "./components/add"
export default {
data(){
return {
  info:{
    isshow:false,
    isadd:true
  }
}
},
  components:{
    vList,
    vAdd
  },
computed:{
  ...mapGetters({

  })
},
methods:{
  ...mapActions({
    
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
}
}
</script>

<style>

</style>
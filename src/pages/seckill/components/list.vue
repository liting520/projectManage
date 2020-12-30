<template>
  <div>
      <el-table
    :data="seckillList"
    border
    >
    <el-table-column
      prop="title"
      label="活动名称"
     >
    </el-table-column>
    
    <el-table-column
      prop="status"
      label="状态">
      <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status===1">启用</el-button>
      <el-button type="info" v-else>禁用</el-button>
      </template>
    </el-table-column>
    <el-table-column
      label="操作">
      <template slot-scope="scope" >
          <el-button type="primary"   @click="edit(scope.row.id)">编辑</el-button>
          <el-button type="danger"   @click="del(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
import {reqSeckillDel} from "../../../utils/http"
import {mapGetters,mapActions} from "vuex"
import {successalert} from "../../../utils/alert"
export default {
    computed:{
...mapGetters({
  seckillList:"seckill/list"
})
    },
methods:{
  ...mapActions({
    reqSeckillList:"seckill/reqList"
  }),
   del(id){
     this.$confirm("你确定要删除吗?", "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          reqSeckillDel({ id: id }).then((res) => {
            if (res.data.code === 200) {
              successalert(res.data.msg);
              this.reqSeckillList()
            }
          });
        })
        .catch(() => {});
    },
    edit(id){
      this.$emit("edit",id)
    }
},
mounted(){
  this.reqSeckillList()
}
}
</script>

<style>

</style>
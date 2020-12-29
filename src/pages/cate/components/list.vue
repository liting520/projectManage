<template>
  <div>
    <el-table
    :data="list"
    style="width: 100%" 
    row-key="id"
    border
    :tree-props="{children: 'children'}">
    <el-table-column
      prop="id"
      label="分类编号"
      width="180">
    </el-table-column>
    <el-table-column
      prop="catename"
      label="分类名称"
      width="180">
    </el-table-column>
    <el-table-column
      label="图片" sortable width="180">
      <template slot-scope="scope">
        <img class="img" v-if="scope.row.img!=='null'" :src="$pre+scope.row.img" alt="" >
      </template>
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
     <template slot-scope="scope">
        <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
      <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
     </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
import {reqCateDel} from "../../../utils/http"
import {successalert} from "../../../utils/alert"
import {mapActions,mapGetters} from "vuex"
export default {

methods:{
   ...mapActions({
    "reqList":"cate/reqList"
  }),
  del(id) {
        this.$confirm('你确定要删除吗?', '提示', {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          reqCateDel({id:id}).then(res=>{
            successalert(res.data.msg)
           this.reqList()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      edit(id){
        this.$emit("edit",id)
      }
},
computed:{
...mapGetters({
  "list":"cate/list"
})
},
}
</script>

<style scoped>
.img{
  width:80px;
  height: 80px;
}
</style>
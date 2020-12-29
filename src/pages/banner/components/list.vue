<template>
  <div>
      <el-table
    :data="list"
    border
    >
    <el-table-column
      prop="id"
      label="编号"
     >
    </el-table-column>
    <el-table-column
      prop="title"
      label="轮播图标题"
     >
    </el-table-column>
    <el-table-column
      label="图片">
      <template slot-scope="scope">
        <img class="img" :src="$pre+scope.row.img" alt="">
      </template>
    </el-table-column>
    <el-table-column
      prop="status"
      label="状态">
      <template slot-scope="scope">
        <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
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
import {successalert} from "../../../utils/alert"
import {reqBannerDel} from "../../../utils/http"
export default {
props:["list"],
methods:{
  del(id){
     this.$confirm('你确定要删除?', '提示', {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
         reqBannerDel({id:id}).then(res=>{
           if(res.data.code==200){
             successalert(res.data.msg)
             this.$emit("init")
           }
         })
        }).catch(() => {});
  },
  edit(id){
    this.$emit("edit",id)
  }
}
}
</script>

<style scoped>
.img{
  width: 80px;
  height: 80px;
}
</style>
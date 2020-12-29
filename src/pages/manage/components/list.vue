<template>
  <div>
    <template>
      <el-table
      :data="list"
      row-key="id"
        border
        style="width: 100%"
      > 
        <el-table-column
         prop="id"
          label="用户编号"
          width="180"
        >
        </el-table-column>
        <el-table-column
        prop="username"
          label="用户名"
          width="180"
        >
        </el-table-column>
        <el-table-column
        prop="rolename"
          label="所属角色"
          width="180"
        >
        </el-table-column>
        <el-table-column  prop="status" label="状态">
          <template slot-scope="scope">
            <el-button type="primary" v-if="scope.row.status===1">启用</el-button>
            <el-button v-else type="info">禁用</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <!-- -->
          <template slot-scope="scope">

            <!-- -->
            <el-button type="primary" @click="edit(scope.row.uid)">编辑</el-button>
            <!--" -->
            <el-button type="danger" @click="del(scope.row.uid)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
     
    </template>

  </div>
</template>

<script>
import {reqManageDel} from "../../../utils/http"
import {successalert} from "../../../utils/alert"
export default {
  props:["list"],
  data(){
return {

}
  },
  methods:{
   del(uid){
     this.$confirm("你确定要删除吗?", "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          reqManageDel({ uid: uid }).then((res) => {
            if (res.data.code === 200) {
              successalert(res.data.msg);
              this.$emit("init")
            }
            
          });
        })
        .catch(() => {});
    },
  edit(uid){
    this.$emit("edit" ,uid)
  }
  },
  mounted() {
    
  },
};
</script>

<style>
</style>
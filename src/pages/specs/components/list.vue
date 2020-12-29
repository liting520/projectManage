<template>
  <div>
    <el-table
      :data="list"
      border
      style="width: 100%"
    >
      <el-table-column
        prop="id"
        label="规格编号"
      >
      </el-table-column>
      <el-table-column
        prop="specsname"
        label="规格名称" 
      >
      </el-table-column>
      <el-table-column
        prop="attrs"
        label="规格属性"
      >
        <template slot-scope="scope">
          <el-tag
            type="warning"
            v-for="(item,index) in scope.row.attrs"
            :key="index"
          >{{item}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
      >
      
          <template slot-scope="scope">
            <el-button type="primary" v-if="scope.row.status===1">启用</el-button>
            <el-button type="info" v-else>禁用</el-button>
          </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column> 
    </el-table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import {reqSpecsDel} from "../../../utils/http"
import {successalert} from "../../../utils/alert"
 export default {
  computed: {
    ...mapGetters({
      list: "specs/list",
    }),
  },
  methods: {
    ...mapActions({
      reqList: "specs/reqList",
    }),
    del(id){
      this.$confirm('你确定要删除?', '提示', {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
         reqSpecsDel({id:id}).then(res=>{
           if(res.data.code==200){
             successalert(res.data.msg)
             this.reqList()
           }
         })
        }).catch(() => {});
    },
    edit(id){
      this.$emit("edit",id)
    }
  },
  mounted() {
    this.reqList();
  },
};
</script>
 
<style>
</style>
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
      label="商品编号"
     >
    </el-table-column>
    <el-table-column
      prop="catename"
      label="商品价格"
     >
    </el-table-column>
    <el-table-column
      prop="catename"
      label="市场价格"
     >
    </el-table-column>
    <el-table-column
      label="图片" sortable>
      <template slot-scope="scope">
        <img class="img" v-if="scope.row.img!=='null'" :src="$pre+scope.row.img" alt="" >
      </template>
    </el-table-column>
    <el-table-column
      prop="status"
      label="是否新品">
      <template slot-scope="scope">
        <el-button type="primary" v-if="scope.row.status===1">是</el-button>
      <el-button type="danger" v-else>否</el-button>
      </template>
    </el-table-column>
    <el-table-column
      prop="status"
      label="是否热卖">
      <template slot-scope="scope">
        <el-button type="primary" v-if="scope.row.status===1">是</el-button>
      <el-button type="danger" v-else>否</el-button>
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
      label="操作"
      width="180">
     <template slot-scope="scope">
        <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
      <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
     </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
import {mapActions,mapGetters} from "vuex"
export default {

methods:{
   ...mapActions({
   
  }),
 
},
computed:{
...mapGetters({
 
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
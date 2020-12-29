<template>
  <div>
    <el-dialog
      :title="info.isadd?'添加规格':'编辑规格'"
      :visible.sync="info.isshow"
      @closed="cancel"
    >
      {{specs}}
      <el-form :model="specs">
        <el-form-item
          label="规格名称"
          label-width="100px"
        >
          <el-input
            v-model="specs.specsname"
            class="line-ipt"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="规格属性"
          label-width="100px"
          v-for="(item,index) in attrsArr"
          :key='index'
        >
          <div class="line">
            <el-input
              v-model="item.value"
              class="line-ipt"
            ></el-input>
            <el-button
              type="primary"
              class="line-btn"
              v-if="index==0"
              @click="addAttrs"
            >新增规格属性</el-button>
            <el-button
              type="danger"
              class="line-btn"
              v-else
              @click="delAttrs(index)"
            > 删除</el-button>
          </div>
        </el-form-item>
        <el-form-item
          label="状态"
          label-width="100px"
        >
          <el-switch
            v-model="specs.status"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="cancel">取 消</el-button>
        <el-button @click="add" v-if="info.isadd">添 加</el-button>
        <el-button type="primary" v-else @click="update">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import {reqSpecsAdd,reqSpecsOne,reqSpecsUpdate} from "../../../utils/http"
import {successalert} from "../../../utils/alert"
import {mapActions} from "vuex"
export default {
  props: ["info"],
  computed: {


  },
  data() {
    return {
      specs:{
        specsname:"",
        attrs:"[]",
        status:1
      },
      attrsArr:[
        {value:""}
      ]
    }
  },
  methods: {
    ...mapActions({
      reqList:"specs/reqList"
    }),
    empty(){
    this.specs={
        specsname:"",
        attrs:"[]",
        status:1
      },
      this.attrsArr=[
        {value:""}
      ]
    },
    cancel(){
      if(!this.info.isadd){
        this.empty()
      }
      this.info.isshow=false
    },
   addAttrs(){
     this.attrsArr.push({value:""})
   },
   delAttrs(index){
     this.attrsArr.splice(index,1)
   },
   add(){
     this.specs.attrs=JSON.stringify(this.attrsArr.map(item=>item.value))
     reqSpecsAdd(this.specs).then(res=>{
       if(res.data.code==200){
         successalert(res.data.msg)
         this.cancel()
         this.empty()
         this.reqList()
       }
     })
   },
   getOne(id){
     reqSpecsOne({id:id}).then(res=>{
       this.specs=res.data.list[0]
       this.specs.attrs=JSON.parse(this.specs.attrs)
       this.attrsArr=this.specs.attrs.map(item=>({value:item}))
     })
  },
update(){
  this.specs.attrs=JSON.stringify(this.attrsArr.map(item=>item.value))
reqSpecsUpdate(this.specs).then(res=>{
  if(res.data.code==200){
    successalert(res.data.msg)
    this.empty()
    this.cancel()
    this.reqList()
  }
})
}
  },
  mounted() {

  }
};
</script>

<style scoped>
.line {
  display: flex;
}
.line-btn {
  width: auto;
}
.line-ipt {
  flex: 1;
}
</style>
<template>
  <div>

    <el-dialog
       :title="info.isadd?'添加角色':'编辑角色'"
      :visible.sync="info.isshow"
      @closed="cancel"
    >
      <el-form :model="role">
        <el-form-item
          label="角色名称"
          label-width="100px"
        >
          <el-input
            v-model="role.rolename"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="角色权限"
          label-width="100px"
        >
          <el-tree
            v-model="role.menus"
            :data="list"
            node-key="id"
            ref="tree"
            :props="defaultProps"
            show-checkbox
          ></el-tree>
        </el-form-item>

        <el-form-item
          label="状态"
          label-width="100px"
        >
          <el-switch
            v-model="role.status"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
        {{role}}
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="cancel">取 消</el-button>
        <el-button  @click="add"  v-if="info.isadd">添 加</el-button>
       <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { successalert } from '../../../utils/alert';
import { reqRoleAdd, reqRoleGet , reqRoleUpdate} from "../../../utils/http";
import {mapGetters,mapActions} from "vuex"
export default {
  props: ["info", "list"],
  computed:{
    ...mapGetters({
      userInfo:"userInfo"
    })
  },
  data() {
    return {
      role: {
        rolename: "",
        menus: "",
        status: 1,
      },
      defaultProps: {
        children: "children",
        label: "title",
      },

      value: "100",
    };
  },
  methods: {
    ...mapActions({
      changeUser:"changeUser"
    }),
    empty(){
      this.role={
        rolename: "",
        menus: "",
        status: 1,
      }
    },
    cancel() {
      if(!this.info.isadd){
        this.empty()
      }
      this.info.isshow = false;
    },
    add() {
      this.role.menus=JSON.stringify(this.$refs.tree.getCheckedKeys());
      reqRoleAdd(this.role).then(res=>{
        if(res.data.code==200){
          successalert(res.data.msg)
          if(this.role.id==this.userInfo.roleid){
            this.changeUser({})
            this.$router.push("/login")
            return 
          }
          this.cancel()
          this.empty()
          this.$refs.tree.setCheckedKeys([])
          this.$emit("rolelist")
        }
      })
      },
    getOneRole(id){
      reqRoleGet({id:id}).then(res=>{
if(res.data.code==200){
          this.role=res.data.list
          this.role.id=id
          this.$refs.tree.setCheckedKeys(JSON.parse(this.role.menus));

        }
      })
    },
    update(){
       this.role.menus=JSON.stringify(this.$refs.tree.getCheckedKeys());
      reqRoleUpdate(this.role).then(res=>{
if(res.data.code==200){
          successalert(res.data.msg)
           this.$refs.tree.setCheckedKeys([])
          this.cancel()
          this.empty()
          this.$emit("rolelist")
        }
      })
    }
  },
};
</script>

<style scoped>
.colum {
  display: flex;
  flex-direction: column;
}
</style>
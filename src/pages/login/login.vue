<template>
  <div class="bigbox">
    <div class="con">
      <h3>登录</h3>
      <div class="ipt">
        <el-input
          v-model="user.username"
          placeholder="请输入用户名"
        ></el-input>
      </div>
      <div class="ipt"> 
        <el-input
          v-model="user.password"
          placeholder="请输入密码"
        ></el-input>
      </div>
      <div class="ipt">
     <el-button type="primary" class="btn" @click="login">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {reqManageLogin,reqManageList} from "../../utils/http"
import {mapActions,mapGetters} from "vuex"
export default {
  data() {
    return {
      input: "",
      user:{
        username:"",
        password:""
      }
    };
  },
  computed:{
    ...mapGetters({
      userInfo:"userInfo"
    })
  },
  methods:{
    ...mapActions({
      changeUser:"changeUser"
    }),
    login(){
      reqManageLogin(this.user).then(res=>{
        if(res.data.code==200){
          this.changeUser(res.data.list)
          this.$router.push("/")
        }
      })
    },
    getManageList(){
      reqManageList({page}).then(res=>{

      })
    }
  }
};
</script>

<style scoped>
.bigbox {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to right, #553544, #433a52, #303d60);
}
.con {
  width: 400px;
  height: 300px;
  background-color: #fff;
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 30px;
  padding: 30px;
  text-align: center;
}
.ipt{
  margin-top: 30px;
}
.btn{
  width: 100%;
}
</style>
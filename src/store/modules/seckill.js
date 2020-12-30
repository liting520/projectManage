import { reqSeckillList } from "../../utils/http"

let state={
    list:[]
}
let getters={
  list(state){
      return state.list
  }
}
let mutations={
    //改变list
    changeList(state,arr){
        state.list=arr
    }
}
let actions={
    //请求数据
    reqList(context){
        reqSeckillList({istree:true}).then(res=>{
            if(res.data.code==200){
                context.commit("changeList",res.data.list)
            }
        })
    }
}

export default {
    state,mutations,actions,getters,namespaced:true
}
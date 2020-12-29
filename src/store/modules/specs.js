import {reqSpecsList,reqSpecsCount} from "../../utils/http"

let state={
list:[],
total:0,
page:1,
size:2
}
let getters={
  list(state){
      return state.list
  },
  total(state){
      return state.total
  },
  size(state){
      return state.size
  }
} 

let mutations={
    //改变list
    changeList(state,arr){
        state.list=arr
    },
    //改变total
    changeTotal(state,arr){
        state.total=arr
    },
    
    changePage(state,num){
        state.page=num
    }
}  
let actions={
  reqList(context,bool){
      //商品规格是要分页的，是不要分页的。所以多给一个参数，bool
      let params=bool?{}:{page:context.state.page,size:context.state.size}
      reqSpecsList(params).then(res=>{
          if(res.data.code==200){
              if(res.data.list.length===0&&context.state.page>1){
                  context.commit("changePage",context.state.page-1)
                  context.dispatch("reqList")
                  return 
              }
              let list=res.data.list
              list.forEach(item=>item.attrs=JSON.parse(item.attrs))
              context.commit("changeList",list)
          }
      })
  },
  reqTotal(context){
      reqSpecsCount().then(res=>{
          if(res.data.code==200){
              context.commit("changeTotal" , res.data.list[0].total)
          }
      })
  },
  //修改页码
  changePage(context,num){
      //修改页码
      context.commit("changePage",num)
      //重新请求list
      context.dispatch("reqList")
  }
}

export default {
    state,mutations,actions,getters,namespaced:true
}
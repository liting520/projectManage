import axios from "axios"
import qs from "qs"
import Vue from "vue"
import { erroralert } from "./alert"
//开发环境使用 8080
let baseUrl = "/api"
Vue.prototype.$pre = "http://localhost:3000"

//生产环境使用 打包
// let baseUrl=""
// Vue.prototype.$pre=""

//设置请求头
axios.interceptors.request.use(config=>{
    if(config.url!==baseUrl+"/api/userlogin"){
        config.headers.authorization=store.state.userInfo.token
    }
    return config
})


//响应拦截
axios.interceptors.response.use(res => {

    //18.统一处理失败
    if (res.data.code !== 200) {
        erroralert(res.data.msg)
    }
    //统一处理list是null的情况
    if (!res.data.list) {
        res.data.list = []
    }
    if(res.data.msg==="登录已过期或访问权限受限"){
        //清除用户登录的信息 userInfo
        store.dispatch("changeUser",{})
        //跳到登录页面
        router.push("/login")
    }
    console.group("本次请求地址是：" + res.config.url)
    console.log(res);
    console.groupEnd()
    return res
})

// post带有文件，参数转换
function dataToFormData(cate) {
    let data = new FormData()
    for (let i in cate) {
        data.append(i, cate[i])
    }
    return data
}

/************菜单管理 start**************************/
//7.添加
export const reqMenuAdd = (user) => {
    return axios({
        url: baseUrl + "/api/menuadd",
        method: "post",
        data: qs.stringify(user)
    })
}


//19.列表
export let reqMenulist = () => {
    return axios({
        url: baseUrl + "/api/menulist",
        params: {
            istree: true
        }
    })
}

//30.删除
export let reqMenuDel = (obj) => {
    return axios({
        url: baseUrl + "/api/menudelete",
        method: "post",
        data: qs.stringify(obj)
    })
}

//38.一条数据
export let reqMenuDetail = (obj) => {
    return axios({
        url: baseUrl + "/api/menuinfo",
        params: obj
    })
}

//39.修改接口
export let reqMenuUpdate = (user) => {
    return axios({
        url: baseUrl + "/api/menuedit",
        method: "post",
        data: qs.stringify(user)
    })
}
/************菜单管理 end**************************/



/************角色管理 start**************************/

// 角色添加
export let reqRoleAdd = (role) => {
    return axios({
        url: baseUrl + "/api/roleadd",
        method: "post",
        data: qs.stringify(role)
    })
}

// 角色列表
export let reqRoleList = () => {
    return axios({
        url: baseUrl + "/api/rolelist",
        method: "get"
    })
}


// 角色删除
export let reqRoleDel = (id) => {
    return axios({
        url: baseUrl + "/api/roledelete",
        method: "post",
        data: qs.stringify(id)
    })
}


// 角色获取
export let reqRoleGet = (id) => {
    return axios({
        url: baseUrl + "/api/roleinfo",
        method: "get",
        params: id
    })
}

// 角色修改
export let reqRoleUpdate = (id) => {
    return axios({
        url: baseUrl + "/api/roleedit",
        method: "post",
        data: qs.stringify(id)

    })
}


/************角色管理 end**************************/



/************管理员管理 start**************************/

//管理员添加
export let reqManageAdd = (user) => {
    return axios({
        url: baseUrl + "/api/useradd",
        method: "post",
        data: qs.stringify(user)
    })
}

// 管理员总数
export let reqManage = () => {
    return axios({
        url: baseUrl + "/api/usercount",
        method: "get"
    })
}


//管理员列表
export let reqManageList = (obj) => {
    return axios({
        url: baseUrl + "/api/userlist",
        method: "get",
        params: obj
    })
}



// 管理员删除
export let reqManageDel = (uid) => {
    return axios({
        url: baseUrl + "/api/userdelete",
        method: "post",
        data: qs.stringify(uid)
    })
}

//管理员修改
export let reqManageUpdate = (uid) => {
    return axios({
        url: baseUrl + "/api/useredit",
        method: "post",
        data: qs.stringify(uid)
    })
}

//获取一条管理员的信息
export let reqManageInfo = (uid) => {
    return axios({
        url: baseUrl + "/api/userinfo",
        method: "get",
        params: uid
    })
}

//管理员登录
export let reqManageLogin = (user) => {
    return axios({
        url: baseUrl + "/api/userlogin",
        method: "post",
        data: qs.stringify(user)
    })
}

/************管理员管理 end**************************/


/************商品分类管理 start**************************/


//商品分类添加
export let reqCateAdd = (cate) => {
    return axios({
        url: baseUrl + "/api/cateadd",
        method: "post",
        data: dataToFormData(cate)
    })
}
//商品分类列表
export let reqCateList = (obj) => {
    return axios({
        url: baseUrl + "/api/catelist",
        method: "get",
        params: obj
    })
}

//商品删除
export let reqCateDel=(id)=>{
return axios({
    url:baseUrl+"/api/catedelete",
    method:"post",
    data:qs.stringify(id)
})
}

// 商品修改
export let reqCateUpdate=(cate)=>{
    return axios({
        url:baseUrl+"/api/cateedit",
        method:"post",
        data:dataToFormData(cate)
    })
}

//商品获取一条
export let reqCateOne=(id)=>{
    return axios({
        url:baseUrl+"/api/cateinfo",
        method:"get",
        params:id
    })
}

/************商品分类管理 end**************************/


/************轮播图管理 start**************************/

//轮播图添加
export let reqBannerAdd=(banner)=>{
    return axios({
        url:baseUrl+"/api/banneradd",
        method:"post",
        data:dataToFormData(banner)
    })
}


// 轮播图列表
export let reqBannerList=()=>{
    return axios({
        url:baseUrl+"/api/bannerlist",
        method:"get",
    })
}

// 获取一条轮播图
export let reqBannerOne=(id)=>{
    return axios({
        url:baseUrl+"/api/bannerinfo",
        method:"get",
        params:id
    })
}

// 修改轮播图
export let reqBannerUpdate=(banner)=>{
    return axios({
        url:baseUrl+"/api/banneredit",
        method:"post",
        data:dataToFormData(banner)
    })
}

//轮播图删除
export let reqBannerDel=(id)=>{
    return axios({
        url:baseUrl+"/api/bannerdelete",
        method:"post",
        data:qs.stringify(id)
    })
}

/************轮播图管理 end**************************/
/***********会员管理 start**************************/

//会员列表
export let reqMemberList=()=>{
    return axios({
        url:baseUrl+"/api/memberlist",
        method:"get"
    })
}

//会员获取一条
export let reqMemberOne=(uid)=>{
    return axios({
        url:baseUrl+"/api/memberinfo",
        method:"get",
        params:uid
    })
}

//会员修改
export let reqMemberUpdate=(member)=>{
return axios({
    url:baseUrl+"/api/memberedit",
    method:"post",
    data:member
})
}


/***********会员管理 end**************************/


/************商品规格管理 start**************************/


//商品分类添加
export let reqSpecsAdd = (specs) => {
    return axios({
        url: baseUrl + "/api/specsadd",
        method: "post",
        data:qs.stringify(specs)
    })
}
//商品分类列表
export let reqSpecsList = (obj) => {
    return axios({
        url: baseUrl + "/api/specslist",
        method: "get",
        params: obj
    })
}

//商品删除
export let reqSpecsDel=(id)=>{
return axios({
    url:baseUrl+"/api/specsdelete",
    method:"post",
    data:qs.stringify(id)
})
}

// 商品修改
export let reqSpecsUpdate=(specs)=>{
    return axios({
        url:baseUrl+"/api/specsedit",
        method:"post",
        data:qs.stringify(specs)
    })
}

//商品获取一条
export let reqSpecsOne=(id)=>{
    return axios({
        url:baseUrl+"/api/specsinfo",
        method:"get",
        params:id
    })
}

//获取商品规格总数
export let reqSpecsCount=()=>{
    return axios({
        url:baseUrl+"/api/specscount",
        method:"get"
    })
}
/************商品规格管理 end**************************/



/************商品管理 start**************************/

//添加
export let reqGoodsAdd=(goods)=>{
return axios({
    url:baseUrl+"/api/goodsadd",
    method:"post",
    data:dataToFormData(goods)
})
}
//总数
export let reqGoodsCount=()=>{
return axios({
    url:baseUrl+"/api/goodscount",
    method:"get"
})
}

//list
export let reqGoodsList=(obj)=>{
    return axios({
        url:baseUrl+"/api/goodslist",
        method:"get",
        params:obj
    })
}
//获取一条
export let reqGoodsOne=(id)=>{
    return axios({
        url:baseUrl+"/api/goodsinfo",
        method:"get",
        params:id
    })
}
//修改
export let reqGoodsUpdate=(goods)=>{
    return axios({
        url:baseUrl+"/api/goodsedit",
        method:"post",
        data:dataToFormData(goods)
    })
}

//删除
export let reqGoodsDel=(id)=>{
    return axios({
        url:baseUrl+"/api/goodsdelete",
        method:"post",
        data:id
    })
}



/************商品管理 end**************************/
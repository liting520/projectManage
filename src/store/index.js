import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

let state={}
let mutations={}
let actions={}
let getters={}
import cate from "./modules/cate"
import specs from "./modules/specs"
import goods from "./modules/goods"
export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    modules:{
        cate,
        specs,
        goods
    }
})
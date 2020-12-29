<template>
  <div>
    <el-button
      type="primary"
      @click="willadd"
    >添加</el-button>

    <v-list
      :list="list"
      :total="total"
      @init="init"
      @edit=edit($event)
    ></v-list>

    <v-add
      :info="info"
      @init="init"
      ref="add"
    ></v-add>

    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="pageSize"
      @current-change="changePage"
    >
    </el-pagination>
  </div>
</template>

<script>
import vList from "./components/list";
import vAdd from "./components/add";
import { reqRoleList, reqManage, reqManageList } from "../../utils/http";

export default {
  components: {
    vList,
    vAdd,
  },
  data() {
    return {
      info: {
        isshow: false,
        isadd: true,
      },
      total: 0,
      list: [],
      pageSize: 2,
      page: 1,
    };
  },
  methods: {
    willadd() {
      this.info.isshow = true;
      this.info.isadd=true
    },

    //请求总数
    getCount() {
      reqManage().then((res) => {
        this.total = res.data.list[0].total;
      });
    },
    //获取管理员列表
    getManageList() {
      reqManageList({ page: this.page, size: this.pageSize }).then((res) => {
        if (res.data.code == 200) {
          if(res.data.list.length==0&&this.page>1){
            this.page--
            this.getManageList()
            return 
          }
          this.list = res.data.list;
        }
      });
    },
    // 编辑
    edit(uid) {
      this.info.isshow = true;
      this.info.isadd = false;
      this.$refs.add.getOne(uid);
    },

    // 改变当前页码数
    changePage(e) {
      this.page=e
      this.getManageList()
    },

    init() {
      this.getManageList();
    },
  },
  mounted() {
    //总数
    this.getCount(), this.getManageList();
  },
};
</script>

<style>
</style>
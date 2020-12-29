<template>
  <div>
    <v-list
      @edit="edit($event)"
      :list="list"
    ></v-list>

    <v-edit
      :info="info"
      ref="edit"
      @init="init"
    ></v-edit>
  </div>
</template>

<script>
import vEdit from "./components/edit";
import vList from "./components/list";
import { reqMemberList } from "../../utils/http";
export default {
  data() {
    return {
      info: {
        isshow: false,
      },
      list: [],
    };
  },
  components: {
    vEdit,
    vList,
  },
  methods: {
    edit(uid) {
      this.info.isshow = true;
      this.$refs.edit.getOne(uid)
    },
    init() {
      reqMemberList().then((res) => {
        if (res.data.code == 200) {
          this.list = res.data.list;
        }
      });
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style>
</style>
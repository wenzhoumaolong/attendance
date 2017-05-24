<template>
  <el-menu :unique-opened='true' mode="vertical" theme="dark" :default-active="$route.path">
    <template v-for="item in permissionRouters" v-if="!item.hidden">
      <el-submenu :index="item.name" v-if="!item.noDropdown">
        <template slot="title">
          <icon class="icon" :name="item.icon"></icon>
          {{item.name}}
        </template>
        <router-link v-for="child in item.children" :key="child.path" v-if="!child.hidden" class="title-link"
                     :to="item.path+'/'+child.path">
          <el-menu-item :index="item.path+'/'+child.path">
            {{child.name}}
          </el-menu-item>
        </router-link>
      </el-submenu>
      <router-link v-if="item.noDropdown&&item.children.length>0" :to="item.path+'/'+item.children[0].path">
        <el-menu-item :index="item.path+'/'+item.children[0].path">
          <icon class="icon" :name="item.icon"></icon>
          {{item.children[0].name}}
        </el-menu-item>
      </router-link>
    </template>
  </el-menu>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    name: 'Sidebar',
    computed: {
      ...mapGetters([
        'permissionRouters'
      ])
    }
  }
</script>

<style lang="less" scoped>
  .el-menu {
    min-height: 100%;
  }

  .icon {
    margin-right: 10px;
  }
</style>

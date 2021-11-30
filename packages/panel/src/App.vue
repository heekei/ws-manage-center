<template>
  <div>

    <md-app id="app">
      <md-app-toolbar class="md-primary">
        <md-button class="md-icon-button" @click="toggleMenu" v-if="!menuVisible">
          <md-icon>menu</md-icon>
        </md-button>
        <span class="md-title">{{pageTitle()}}</span>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible" md-persistent="full">
        <md-toolbar class="md-transparent" md-elevation="0">
          <span>Rankup控制面板</span>
          <div class="md-toolbar-section-end">
            <md-button class="md-icon-button md-dense" @click="toggleMenu">
              <md-icon>keyboard_arrow_left</md-icon>
            </md-button>
          </div>
        </md-toolbar>

        <md-list>
            <md-list-item href="/#/" ><span class="md-list-item-text">首页</span></md-list-item>
            <md-list-item href="/#/keyword" ><span class="md-list-item-text">关键字配置</span></md-list-item>
            <md-list-item href="/#/about"><span class="md-list-item-text">关于</span></md-list-item>
        </md-list>
      </md-app-drawer>

      <md-app-content>
        <router-view />
      </md-app-content>
    </md-app>
  </div>
</template>
<script>
export default {
  name: 'App',
  data() {
    return {
      menuVisible: false,
    };
  },
  methods: {
    toggleMenu() {
      this.menuVisible = !this.menuVisible;
    },
    pageTitle() {
      return this.$route.meta.title;
    },
  },
};
</script>

<style lang="less">
// .md-list {
//     width: 320px;
//     max-width: 100%;
//     display: inline-block;
//     vertical-align: top;
//     border: 1px solid rgba(#000, .12);
//   }
body {
  margin: 0;
  padding: 0;
}
#app {
  position: relative;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  // color: #2c3e50;
  height: 100vh;
}
.md-drawer{
  width: 200px;
}
</style>

<template>
  <div>
    <md-button class="md-raised md-primary" @click="addSite">添加</md-button>
    <md-button class="md-raised md-primary" @click="printCode">生成key.json</md-button>
    <md-field>
      <label>站点名称</label>
      <md-input v-model="siteName"></md-input>
    </md-field>
    <md-field>
      <label>域名</label>
      <md-input v-model="domain"></md-input>
    </md-field>
    <md-field>
      <label>关键字</label>
      <md-input v-model="keyword"></md-input>
    </md-field>
    <md-field>
      <label>次数</label>
      <md-input v-model="times"></md-input>
    </md-field>
    <md-table v-model="sites" md-card @md-selected="onSelect">
      <md-table-toolbar>
        <h1 class="md-title">站点</h1>
      </md-table-toolbar>
      <md-table-toolbar slot="md-table-alternate-header" slot-scope="{ count }">
        <div class="md-toolbar-section-start">{{ count+'个站点被选中' }}</div>
        <div class="md-toolbar-section-end">
          <md-button class="md-icon-button" @click="removeSite">
            <md-icon>delete</md-icon>
          </md-button>
        </div>
      </md-table-toolbar>
      <md-table-row slot="md-table-row" slot-scope="{ item }"
        md-selectable="multiple" >
        <md-table-cell md-label="站点名称" md-sort-by="siteName">
            <md-field :class="{'md-invalid':!item.siteName}">
              <md-input v-model="item.siteName" required></md-input>
              <span class="md-error">There is an error</span>
            </md-field>
        </md-table-cell>
        <md-table-cell md-label="域名" md-sort-by="domain">{{ item.domain }}</md-table-cell>
        <md-table-cell md-label="关键字数量" md-sort-by="keywords">
          {{ item.keywords.length +'个'}}
          <a @click="showKeywords(item)">查看详情</a>
        </md-table-cell>
      </md-table-row>
    </md-table>

    <div class="key-bg" v-if="curSite">
        <md-table class="key-ctn" v-model="curKeywords" md-card @md-selected="onSelectKeywords" md-fixed-header>
          <md-table-toolbar>
            <h1 class="md-title">{{this.curSite.domain}}</h1>
          </md-table-toolbar>
          <md-table-toolbar slot="md-table-alternate-header" slot-scope="{ count }">
            <div class="md-toolbar-section-start">{{ count+'个关键字被选中' }}</div>
            <div class="md-toolbar-section-end">
              <md-button class="md-icon-button" @click="removeKeyword">
                <md-icon>delete</md-icon>
              </md-button>
            </div>
          </md-table-toolbar>
          <md-table-row slot="md-table-row" slot-scope="{ item }"
            md-selectable="multiple" >
            <md-table-cell md-label="关键字" md-sort-by="keyword">
              <md-field :class="{'md-invalid':!item.keyword}">
                <md-input v-model="item.keyword" required></md-input>
                <span class="md-error">不能为空</span>
              </md-field>
            </md-table-cell>
            <md-table-cell md-label="次数" md-sort-by="times">
              <md-field :class="{'md-invalid':!item.times}">
                <md-input v-model="item.times" required></md-input>
                <span class="md-error">不能为空</span>
              </md-field>
            </md-table-cell>
          </md-table-row>
        </md-table>
        <md-button class="btn-close md-raised md-accent" @click="closeKeywords">关闭</md-button>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    siteName: 'zii_log',
    domain: 'h-os.online',
    keyword: 'zii',
    times: 1,
    sites: [],
    sitesHash: {},
    selected: [],
    selectedKeywords: [],
    curKeywords: [],
    curSite: null,
  }),
  methods: {
    printCode() {
      // eslint-disable-next-line no-alert
      prompt('复制输入框中的代码粘贴到key.json', JSON.stringify(this.sites, null, 2));
    },
    curSiteGet() {
      return this.curSite.domain;
    },
    showKeywords(site) {
      this.curSite = site;
      this.curKeywords = site.keywords;
    },
    closeKeywords() {
      this.curSite = null;
    },
    removeSite() {
      this.selected.forEach((item) => {
        delete this.sitesHash[item.domain];
        // alert(1);
        this.sites = Object.values(this.sitesHash);
      });
      this.selected.splice(0, this.selected.length);
    },
    removeKeyword() {
      this.selectedKeywords.forEach((item) => {
        // delete this.sitesHash[this.curSite].keywords;
        let ti = -1;
        for (let i = 0; i < this.sitesHash[this.curSite.domain].keywords.length; i++) {
          const key = this.sitesHash[this.curSite.domain].keywords[i];
          if (key.keyword === item.keyword) {
            ti = i;
            break;
          }
        }
        this.sitesHash[this.curSite.domain].keywords.splice(ti, 1);
      });
      this.selectedKeywords.splice(0, this.selectedKeywords.length);
    },
    onSelect(items) {
      this.selected = items;
    },
    onSelectKeywords(items) {
      this.selectedKeywords = items;
    },
    addSite() {
      if (this.sitesHash[this.domain]) { // 已存在网站
        // 处理关键字
        this.sitesHash[this.domain].keywords.push({
          keyword: this.keyword,
          times: this.times,
        });
      } else {
        const obj = {
          siteName: this.siteName,
          domain: this.domain,
          keywords: [
            {
              keyword: this.keyword,
              times: this.times,
            },
          ],
        };
        this.sitesHash[this.domain] = obj;
        // this.sites.push(obj);
      }
      this.sites = Object.values(this.sitesHash);
    },
  },
};
</script>

<style lang="less" scoped>
.key-bg{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  background: rgba(0, 0, 0, .8);
  display: flex;
  justify-content: center;
  align-items: center;
}
.key-ctn{
  width: 80%;
  // height: 50%;
  min-height: 50%;
  max-height: 80%;
  overflow: auto;
  border-radius: 10px;
  background: #fff;
}
.btn-close{
  position: absolute;
  bottom: 30px;
}
</style>

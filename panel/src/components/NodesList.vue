<template>
  <div class="hello">
    <md-table v-model="nodes" md-card @md-selected="onSelect">
      <md-table-toolbar>
        <h1 class="md-title">服务器节点</h1>
      </md-table-toolbar>
      <md-table-toolbar slot="md-table-alternate-header" slot-scope="{ count }">
        <div class="md-toolbar-section-start">{{ count+'个节点被选中' }}</div>
        <div class="md-toolbar-section-end">
          <md-button class="md-icon-button">
            <md-icon>delete</md-icon>
          </md-button>
        </div>
      </md-table-toolbar>
      <md-table-row slot="md-table-row" slot-scope="{ item }"
        :md-disabled="item.name.includes('Stave')"
        md-selectable="multiple" >
        <md-table-cell md-label="名称" md-sort-by="name">
            <md-field :class="{'md-invalid':!item.name}">
              <!-- <label>名称</label> -->
              <md-input v-model="item.name" required></md-input>
              <span class="md-error">There is an error</span>
            </md-field>
        </md-table-cell>
        <md-table-cell md-label="IP" md-sort-by="ip">{{ item.ip }}</md-table-cell>
        <md-table-cell md-label="端口" md-sort-by="port">{{ item.port }}</md-table-cell>
        <md-table-cell md-label="连接状态" md-sort-by="connectStatus">
          <md-icon v-if="item.connectStatus" style="color: #0baf0b;">check_circle_outline</md-icon>
          <md-icon v-else style="color: red;">highlight_off</md-icon>
          {{ item.connectStatus?'在线':'离线' }}
        </md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
export default {
  props: {
    nodes: Array,
  },
  data: () => ({
    selected: [],
  }),
  methods: {
    onSelect(items) {
      this.selected = items;
    },
    // getAlternateLabel(count) {
    //   let plural = '';

    //   if (count > 1) {
    //     plural = 's';
    //   }

    //   return `${count}个节点被选中`;
    // },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  // display: inline-block;
  // margin: 0 10px;
}
</style>

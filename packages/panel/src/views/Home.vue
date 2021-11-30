<template>
<div id="l">
  <NodesList :nodes="nodes" />
</div>
</template>
<script>
import NodesList from '@/components/NodesList.vue';

export default {
  components: {
    NodesList,
  },
  data() {
    return {
      nodes: [
        {
          name: '混拨1-正式环境',
          ip: '222.186.134.243',
          port: '20101',
          connectStatus: 1,
        },
        {
          name: '混拨2-测试环境',
          ip: 'cnc001.yunpptp.cn',
          port: '20021',
          connectStatus: 0,
        },
      ],
    };
  },
};
</script>

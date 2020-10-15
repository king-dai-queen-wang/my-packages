<template>
  <div class="hello">
<!--  若传参  :load="fetchData" 则为懒加载，若不传此参数则为直接展开-->
    <zf-tree ref="tree" :data="data" :draggable="true"
             :load="fetchData" :dropFn="dropFn">
      <!--template 为slot插槽展示的内容-->
      <template v-slot="item">
        {{item.key}}-{{item.name}}
      </template>
    </zf-tree>
    <icon icon="icon-spinner2"  @click="getData()"></icon>
  </div>
</template>

<script>
import ZfTree from "./tree/tree";
import Icon from "./icon/icon";
export default {
  name: 'HelloWorld',
  components: {Icon, ZfTree},
  props: {
    msg: String,
  },
  methods:{
    getData() {
      console.log(this.$refs.tree.getCheckNodes());
      // this.data = this.data.concat(this.data);
    },
  },
   data() {
     return {
       data: [{ key: 1, name: 'dww', children: [{
               key: 11, name: 'dww11', children: [{
                 key: 111, name: 'dww111', children: []
               }, {
                 key: 112, name: 'dww112', children: []
               },{
                 key: 113, name: 'dww113', children: []
               }]
             }
           ]
         }, {
           key:2, name: 'dww2', children: []
         }, {
         key: 3, name: 'dww3', children: []
       }],
       fetchData: (data, cb) => {
         // append假数据
         const a = () => new Promise(resolve => {
           setTimeout(() => {
             resolve({key: 44, name: 'dww44', children: [
                 {key: 441, name: 'dww441', children: []}
               ]})
           }, 3000);
         });
         const b = () => new Promise(resolve => {
           setTimeout(() => {
             resolve({key: 45, name: 'dww45', children: []})
           }, 1000);
         });
          async function f() {
            const res = [];
            res.push(await a());
            res.push(await b());
            return  res;
          }
          f().then(res => {
            cb(res);
          });
       },
       /*dropFn: (draggingNode, dropNode, dropPosition) => {
           console.log('drop', draggingNode, dropNode, dropPosition)
           if (dropPosition === 0) { // 正处于target node处
               (dropNode.children).push(draggingNode);
               console.log('处于target node 正中');
           } else if (dropPosition === -1) { // 处于target node 上层
               const parent = this.$refs.tree.getNodeParent(dropNode);
               console.log('处于target node 上层', parent);
           } else if (dropPosition === 1) { // 处于target node 下层
               const parent = this.$refs.tree.getNodeParent(dropNode);
               console.log('处于target node 下层', parent);
           }
       }*/
     }
   },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

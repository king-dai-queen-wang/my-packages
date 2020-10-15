import { getCurrentInstance, provide, reactive,watch } from 'vue';
import TreeNode from './tree-node';
import { flattenTree } from './util'
import {watchEffect} from "@vue/runtime-core";
export default {
    name: 'ZfTree', // zf-tree
    components: { // 引入Tree Node组件
        [TreeNode.name]: TreeNode
    },
    props: { // 入参格式
        data: {
            type: Array,
            default: () => []
        },
        load: {
            type: Function
        },
        draggable: {
            type: Boolean,
            default: false
        },
        dragEndFn: {
            type: Function
        },
        dropFn: {
            type: Function
        }
    },
    // @参考链接 https://blog.csdn.net/weixin_44593720/article/details/108709143
    // 紧接着就调用setup函数，从生命周期钩子的视角来看，它会在beforeCreate钩子之前被调用。
    // 如果setup返回一个对象，则对象的属性将会被合并到组件模板的渲染上下文。
    // setup也可以返回一个函数，函数中也能使用当前setup函数作用域中的响应式数据。
    // setup函数接收props作为其第一个参数，props对象是响应式的，watchEffect或watch会观察和响应props的更新。
    // 不要对props对象进行解构，那样会失去响应性。在开发过程中，props对象对用户空间代码时不可变的，用户尝试修改props时会触发警告。
    setup(props, context) {
        let data;
        watchEffect(()=>{ // 获取的是当前用户传递来的数据
            data = props.data
        });
        // 将多维数组展开成一维
        let flatMap = flattenTree(data);
        // 获取当前实例
        const instance = getCurrentInstance();
        // watch 和watchEffect 区别？
        // 参考 https://segmentfault.com/a/1190000023230027 和 https://www.cnblogs.com/cmqj/p/13704609.html
        watch(data,()=>{
            flatMap = flattenTree(data);
        });
        //reactive 数据模型转换成响应式模型
        // 参考链接 https://blog.csdn.net/huige232508/article/details/108189484
        const state = reactive({
            dropNode: null,
            dropPosition: '',// 拖拽的位置 0 表示放到里面去 作为儿子  1 作为哥哥 -1 弟弟
            dragNode: null, // 拖动的这个元素的数据
            draggingNode: null, // 拖拽的实例 
            showIndicator: false
        });

        function clearState() {
            watchEffect(() => {
                state.dropPosition = '';// 拖拽的位置 0 表示放到里面去 作为儿子  1 作为哥哥 -1 弟弟
                state.dragNode = null;// 拖动的这个元素的数据
                state.draggingNode = null; // 拖拽的实例
                state.showIndicator = false; // 隐藏指示线
            });

        }

        function renderNode(data) {
            if (data && data.length === 0) {
                return <div>暂无数据</div>
            }
            return data.map(item => <zf-tree-node data={item}></zf-tree-node>)
        }
        // 定义方法
        const methods = {
            // 获取父节点
            getNodeParent(node) {
                let parent = flatMap[node.key].parent; // 获取当前这个节点的父亲
                if (!parent) return;
                return parent;
            },
            // 获取选中节点
            getCheckNodes() {
                return Object.values(flatMap).filter(item => item.node.checked)
            },
            // 将子节点全部选中
            updateTreeDown(node, checked) {
                if (node.children) { // 有孩子在循环
                    node.children.forEach(child => {
                        child.checked = checked;
                        methods.updateTreeDown(child, checked);
                    })
                }
            },
            // 将父节点全部选中
            updateTreeUp(node, checked) {
                let parent = flatMap[node.key].parent; // 获取当前这个节点的父亲
                if (!parent) return;
                // 获取父节点  // {0:xxx,1:xxx，2：xxx}
                if (checked) {
                    parent.checked = parent.children.every(node => node.checked)
                } else { // 自己没有选中父亲就没有选中
                    parent.checked = false;
                }
                methods.updateTreeUp(parent, checked)
            },
            // 拖动开始
            dragStart(e, nodeInstance, data) {
                state.draggingNode = nodeInstance;
                state.dragNode = data;
                console.log('dragStart', nodeInstance, data)
            },
            dragEnter(e, nodeInstance, data) {
                if (state.dragNode.key === data.key) {
                    return; // 不能在自己身上操作
                }
                let overElm = nodeInstance.ctx.$el; // 经过的人
                if (state.draggingNode.ctx.$el.contains(overElm)) {// 当前拖动的人
                    return
                }
                overElm.querySelector('.zf-tree-label').classList.add('inner-focus');
            },
            dragLeave(e, nodeInstance) {
                let overElm = nodeInstance.ctx.$el; // 经过的人
                overElm.querySelector('.zf-tree-label').classList.remove('inner-focus');
            },
            // 拖动经过
            dragOver(e, nodeInstance, data) {
                if (state.dragNode.key === data.key) {
                    return; // 不能在自己身上操作
                }
                let overElm = nodeInstance.ctx.$el; // 经过的人
                if (state.draggingNode.ctx.$el.contains(overElm)) {// 当前拖动的人
                    return
                }
                // 获取当前节点中label的位置
                let targetPosition = overElm.firstElementChild.getBoundingClientRect();
                let treePosition = instance.ctx.$el.getBoundingClientRect();

                let distance = e.clientY - targetPosition.top;

                if (distance < targetPosition.height * 0.2) { // 当前的距离小于整个label的20% 偏上
                    state.dropPosition = 1;
                } else if (distance > targetPosition.height * 0.8) {
                    state.dropPosition = -1;
                } else {
                    state.dropPosition = 0;
                }

                let iconPosition = overElm.querySelector('.zf-icon').getBoundingClientRect();
                let indicatorTop = -9999;
                if (state.dropPosition === 1) {
                    indicatorTop = iconPosition.top - treePosition.top; // 当前这个线距离树的顶部位置
                } else if (state.dropPosition === -1) {
                    indicatorTop = iconPosition.bottom - treePosition.top;
                }
                // 获取当前实例 refs 里的indicator 组件
                const indicator = instance.ctx.$refs.indicator;
                indicator.style.top = indicatorTop + 'px';
                indicator.style.left = iconPosition.right - treePosition.left + 'px';
                state.showIndicator = (state.dropPosition === 1) || (state.dropPosition === -1);
                // 赋值拖放目标node
                state.dropNode = data;
                console.log('dragOver', nodeInstance, data, state.dropPosition);

            },
            // 拖动结束
            dragEnd(e, nodeInstance, data) {
                console.log('dragEnd1', {
                    dropNode: state.dropNode,
                    data,
                    dropPosition: state.dropPosition,
                    dragNode: state.dragNode,
                    draggingNode: state.draggingNode
                });
                // console.log('dragEnd2', nodeInstance, data, state.dropPosition);
            },
            drop(e, nodeInstance, data) {
                console.log('drop', e, nodeInstance, data);
                let {dropPosition, draggingNode, dropNode} = {};
                watchEffect(() => {
                    dropPosition = state.dropPosition;
                    draggingNode = state.draggingNode;
                    dropNode = state.dropNode;
                });
                if (dropPosition === 0) { // 正处于target node处
                    (dropNode.children).push(draggingNode);
                    console.log('处于target node 正中');
                } else if (dropPosition === -1) { // 处于target node 上层
                    const parent = this.getNodeParent(dropNode);
                    console.log('处于target node 上层', parent);
                } else if (dropPosition === 1) { // 处于target node 下层
                    const parent = this.getNodeParent(dropNode);
                    console.log('处于target node 下层', parent);
                }
                // props.dropFn(state.dragNode, state.dropNode, state.dropPosition);
                clearState();
            }
        };

        // provide() 和 inject() 可以实现嵌套组件之间的数据传递。
        // 这两个函数只能在 setup() 函数中使用。
        // 父级组件中使用 provide() 函数向下传递数据。
        // 子级组件中使用 inject() 获取上层传递过来的数据。
        // 不限层级
        provide('TREE_PROVIDER', {
            treeMethods: methods,
            slot: context.slots.default,
            load: props.load,
            dragEndFn: props.dragEndFn,
            draggable: props.draggable
        });
        instance.ctx.getCheckNodes = methods.getCheckNodes;


        return () => { // render函数 
            return <div class="zf-tree">
                {/* 渲染 Node Tree 组件*/}
                {renderNode(data)}
                {/* 指示线 */}
                <div class="zf-tree-indicator" ref="indicator" vShow={state.showIndicator}></div>
            </div>
        }
    }
}



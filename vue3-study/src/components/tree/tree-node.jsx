import {computed, withModifiers, inject, ref, getCurrentInstance, watchEffect} from 'vue'
export default {
    name: 'ZfTreeNode',
    props: {
        data: {
            type: Object
        }
    },
    setup(props) {
        let data;
        // props.data 渲染的每一条数据
        watchEffect(() => { // 获取的是当前用户传递来的数据
            data = props.data
        });
        // 获取父组件定义的 TREE_PROVIDER
        let { treeMethods, slot, load, draggable } = inject('TREE_PROVIDER');
        // loading 标志位，ref 定义响应式数据有点类似Observable
        const isLoaded = ref(false);
        // 是否显示箭头
        const showArrow = computed(() => {
            return (data.children && data.children.length > 0) || (load && !isLoaded.value)
        });
        // 计算节点的样式
        const classes = computed(() => [
            'zf-tree-node',
            !showArrow.value && 'zf-tree-no-expand',
            draggable && 'zf-tree-draggable'
        ]);
        // ---------------------- 方法
        const methods = {
            // 点击展开事件
            handleExpand() {
                if (data.children && data.children.length === 0) { // 点击展开时 先看下有没有孩子
                    if (load) { // 没孩子有loading 
                        data.loading = true;
                        load(data, (children) => {
                            data.children = children;
                            data.loading = false;
                            // 将响应式isLoading 设置为true
                            isLoaded.value = true;
                        })
                    }
                } else {
                    isLoaded.value = true;
                }
                data.expand = !data.expand
            },
            // 点击选中事件
            handleCheck() {
                // 将自己反选
                data.checked = !data.checked;
                // 递归选中所有子元素
                treeMethods.updateTreeDown(data, data.checked);
                // 递归选中所有父级
                treeMethods.updateTreeUp(data, data.checked);
            }
        }
        // 获取当前实例
        const instance = getCurrentInstance();
        // 定义drag Event
        const dragEvent = {
            ...(draggable?{
                draggable: true,
                onDragstart(e){
                    e.stopPropagation(); // 组件的实例中 $el
                   treeMethods.dragStart(e,instance,data)
                },
                onDragover(e){
                    e.preventDefault();
                    e.stopPropagation();
                    treeMethods.dragOver(e,instance,data)
                },
                onDragend(e){
                    e.stopPropagation();
                    treeMethods.dragEnd(e,instance,data)
                },
                onDragEnter(e){
                    e.stopPropagation();
                    treeMethods.dragEnter(e,instance,data)
                },
                onDragLeave(e){
                    e.stopPropagation();
                    treeMethods.dragLeave(e,instance,data)
                },
                onDrop(e){
                    e.stopPropagation();
                    treeMethods.drop(e, data, instance,data);
                }
            }:{})
        }
       

        return () => (
            <div class={classes.value} {...dragEvent}>
                <div class="zf-tree-label" onClick={methods.handleExpand}>
                    <icon icon="icon-circle-down"></icon>
                    {data.loading ? <icon icon="icon-spinner2"></icon> : null}
                    <input type="checkbox" checked={data.checked} onClick={withModifiers(methods.handleCheck, ['stop'])} />
                    {slot ? slot(data) : <span>{data.name}</span>}
                </div>
                <div class="zf-tree-list" vShow={data.expand}>
                    {data.children && data.children.map(child => <zf-tree-node data={child}></zf-tree-node>)}
                </div>
            </div>
        )
    }
}



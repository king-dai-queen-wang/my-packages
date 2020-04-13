// 封装栈类
export interface IStack {
  // 添加一个新元素到栈顶位置
  push: (param: any) => {};
  // 移除栈顶元素，同时返回被移除的元素
  pop: () => any;
  // 返回栈顶元素，不对栈做任何修改
  peek: () => any;
  // 如果栈里没有任何元素，则返回true，否则返false
  isEmpty: () => boolean;
  // 返回栈里元素的个数，和数组的length相似
  size: () => number;
  // 将栈结构的内容以字符串形式返回
  toString: () => {};
}
const Stack = function() {
  this.items = [];
  // 以下这种方式不推荐，因为会给每个Stack实例都会增加一个方法
  // this.push = function() {};
}

Stack.prototype.push = function(element) {
  this.items.push(element);
};

Stack.prototype.pop = function() {
  const res = this.items.pop();
  return res;
};

Stack.prototype.peek = function() {
  return this.items[this.items.length - 1];
};
Stack.prototype.isEmpty = function() {
  return this.items.length === 0;
};
Stack.prototype.size = function() {
  return this.items.length;
};
Stack.prototype.toString = function() {
  let resSting = '';
  // tslint:disable-next-line:prefer-for-of
  for (let i = 0; i < this.items.length; i++) {
    resSting += this.items[i] + '';
  }
  return resSting;
};
export {Stack};

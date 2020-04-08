import {Component, Input, OnInit} from '@angular/core';
import * as echarts from 'echarts';
import {SelectedTypeEnum} from './selected-type.enum';

let self;

@Component({
  selector: 'dww-drag-flow',
  templateUrl: './drag-flow.component.html',
  styleUrls: ['./drag-flow.component.scss']
})
export class DragFlowComponent implements OnInit {
  // 操作模式，只有addNodes有用
  @Input() operateMode: 'deleteNodes' | 'addNodes' | 'none' = 'none';
  // 选中node时候的颜色
  @Input() selectedSourceNodeColor = 'red';
  // 关系坐标
  @Input() edges: any[];
  // 节点坐标
  @Input() nodes: { id: any, name: string, value: number[], itemStyle?: { color?: string } }[];
  private lineStyle = {
    curveness: 0.1,
    color: '#9EADD6',
    // normal: {
    //   color: '#9EADD6',
    //   width: 1,
    // }
  };
  // 节点可拖动
  // 前后点击两个节点，可以对节点进行连接
  private graphicArr: any[] = [];
  // grid 偏移量
  gridOffset: 10;
  // 设置点的大小
  symbolSize = [100, 70];

  // 当0时候表示输入起点坐标，其他值输入终点坐标
  private selectedNodeStep: SelectedTypeEnum = SelectedTypeEnum.NONE;
  // 只为了tslint不报错，this.position
  position;
  // 起点index
  private selectedSourceNodeIndex: number = null;
  // 钟点index
  private selectedTargetNodeIndex: number = null;
  option;
  myChart;

  constructor() {
  }

  ngOnInit() {
    this.initOption();
    self = this;
  }

  initChart() {
    self.initGraphic();
    self.bindingEvent();
    // 窗口大小改事件
    window.addEventListener('resize', self.updatePosition.bind(self));
  }

  onChartReady(myChart: echarts.ECharts) {
    console.log('ready');
    this.myChart = myChart;
    // 在demo里，必须要加setTimeout ，否则执行 myChart.convertToPixel 会报错
    setTimeout(function() {
      self.initChart();
    }, 0);
  }

  getOption() {
    console.log(this.myChart.getOption(), this.selectedSourceNodeIndex, this.selectedTargetNodeIndex);
  }

  private initOption() {
    const edges = this.edges;
    const lineStyle = this.lineStyle;
    const links = this.edges.map(function(item, i) {
      return {
        id: `edge_${edges[i][0]}->${edges[i][1]}`,
        name: `${edges[i][0]} -> ${edges[i][1]}`,
        source: edges[i][0],
        target: edges[i][1],
        lineStyle
      };
    });

    this.option = {
      title: {
        text: '可拖动流程图'
      },
      grid: {
        left: this.gridOffset,
        right: this.gridOffset,
        top: this.gridOffset,
        bottom: this.gridOffset
      },
      tooltip: {},
      // 定义X轴
      xAxis: {
        min: 0,
        max: 1000,
        position: 'top',
        type: 'value',
        axisLine: {
          onZero: false
        },
        axisLabel: {show: false, inside: true},
        splitArea: {show: false},
        splitNumber: 10,
        scale: true,
        show: true
      },
      yAxis: {
        min: 0,
        max: 1000,
        position: 'left',
        inverse: true,
        type: 'value',
        axisLine: {
          onZero: true
        },
        axisLabel: {show: false, inside: false},
        splitArea: {show: false},
        splitNumber: 10,
        show: true
      },
      dataZoom: [
        {
          show: true,
          type: 'inside',
          filterMode: 'none',
          xAxisIndex: [0],
          startValue: -500,
          endValue: 500
        }, {
          show: true,
          type: 'inside',
          filterMode: 'none',
          yAxisIndex: [0],
          startValue: -500,
          endValue: 500
        }],
      series: [{
        // 设置id很重要
        id: 'a',
        // 设置为甘特图
        type: 'graph',
        layout: 'none',
        coordinateSystem: 'cartesian2d',
        // 设置球的大小
        symbolSize: this.symbolSize,
        symbol: 'roundRect',
        roam: true,
        focusNodeAdjacency: true,
        label: {
          show: true,
          formatter: (d, i) => {
            return this.nodes[d.dataIndex] && this.nodes[d.dataIndex].name;
          },
          color: '#000',
        },
        itemStyle: {
          borderColor: '#123456',
          borderWidth: 3,
          color: '#fff',
        },
        // 设置连线形式为箭头
        edgeSymbol: ['circle', 'arrow'],
        edgeSymbolSize: [4, 20],
        // 指定数据数组
        nodes: this.nodes,
        // 指定连线方式
        edges: links,
        cursor: 'pointer',
      }],

    };
  }
// 綁定事件
  private bindingEvent() {
    const zr = this.myChart.getZr();

    // 画布监听click，增加节点
    zr.on('click', function(params) {
      if (self.operateMode === 'addNodes') {
        const pointInPixel = [params.offsetX, params.offsetY];
        const pointInGrid = self.myChart.convertFromPixel('grid', pointInPixel);

        self.confirmDialog('确认添加吗', () => {
          if (self.myChart.containPixel('grid', pointInPixel)) {
            const id = 'E' + Math.random();
            self.nodes.push({name: id, id, value: pointInGrid});
            self.initGraphic();
            self.setNodes();
            self.clearOperateStatus();
          }
        });
        return;
      }
      if (self.operateMode !== 'addNodes' && typeof params.target === 'undefined') {
        self.clearNodeColors();
        self.selectedNodeStep = SelectedTypeEnum.NONE;
        self.selectedSourceNodeIndex = null;
        self.selectedTargetNodeIndex = null;
        return;
      }
    });
    // set鼠標yang'shi
    zr.on('mousemove', function(params) {
      zr.setCursorStyle('default');
      const pointInPixel = [params.offsetX, params.offsetY];
      if (self.myChart.containPixel('grid', pointInPixel)) {
        if (self.operateMode === 'addNodes') {
          zr.setCursorStyle('copy');
        }
      }
    });
    // 点击link事件 , 删除连线
    this.myChart.on('click', {dataType: 'edge'}, function(params) {
      if (params.dataType !== 'edge') {
        return;
      }
      self.confirmDialog('确认删除连线吗', self.deleteLine.bind(self, params), () => {
      });
      return;
    });
    // 点击node
    this.myChart.on('click', {dataType: 'node'}, function(params) {
      if (params.dataType !== 'node') {
        return;
      }
      // self.selectedNodes(params);
      self.initLinks(params);
      console.log('click nodes', params, self.selectedSourceNodeIndex, self.selectedTargetNodeIndex);
    });

    this.myChart.on('mousemove', {dataType: 'node'}, function(params) {
      // self.focusNodes(params.dataIndex);
    });

    this.myChart.on('mouseout', {dataType: 'node'}, function(params) {
      // self.unFocusNodes(params.dataIndex);
    });

    this.myChart.on('dataZoom', self.updatePosition.bind(self));

  }
// 重新定位图形元素
  private updatePosition() {
    let newPosition = echarts.util.map(this.nodes, (item, dataIndex) => {
      return {
        position: this.myChart.convertToPixel('grid', item.value),
      };
    });
    newPosition = newPosition.concat(newPosition);
    this.myChart.setOption({
      graphic: newPosition
    });
  }

// 绘制图形元素
  private initGraphic() {
    const res = [];
    this.myChart.setOption({
      graphic: echarts.util.map(this.nodes, (item, dataIndex) => {
        return this.initGraphicDeleteBtnItem(item, dataIndex);
      })
    });
    this.myChart.setOption({
      graphic: echarts.util.map(this.nodes, (item, dataIndex) => {
        return this.initGraphicDragBtnItem(item, dataIndex);
      })
    });
  }

  private initGraphicDragBtnItem(item, dataIndex) {
    return {
      id: `graphic_drag_${item.id}`,
      // 矩形
      type: 'rect',
      // 将坐标转化为像素
      position: this.myChart.convertToPixel('grid', item.value),
      shape: {
        // 拖动点的大小
        x: -1 * (this.symbolSize[0] / 2),
        y: 0,
        width: this.symbolSize[0] / 2,
        height: this.symbolSize[1] / 2
      },
      style: {
        fill: '#3FA7DC50',
        lineWidth: 2,
        borderColor: '#22faf7',
        borderWidth: 1,
      },

      // 指定虚拟圈是否可见  false 可见
      invisible: false,
      // 指定圈被拖拽（可以与不可以）
      draggable: true,
      ondrag: echarts.util.curry(this.onPointDragging, dataIndex),
      // 层级
      z: 3
    };
  }

  private initGraphicDeleteBtnItem(item, dataIndex) {
    return {
      id: `graphic_delete_${item.id}`,
      // 矩形
      type: 'image',
      // 将坐标转化为像素
      position: this.myChart.convertToPixel('grid', item.value),
      shape: {
        // 拖动点的大小
        x: -1 * (this.symbolSize[0] / 2),
        y: -1 * (this.symbolSize[1] / 2),
      },
      style: {
        image: 'https://iknowpc.bdimg.com/static/common/widget/search-box-new/img/logo-new.aff256e.png',
        fill: '#ddd',
        width: 30,
        height: 30,
        lineWidth: 2,
        borderColor: '#22faf7',
        borderWidth: 1,
      },

      // 指定虚拟圈是否可见  false 可见
      invisible: false,
      // 指定圈被拖拽（可以与不可以）
      draggable: false,
      // ondrag: echarts.util.curry(this.onPointDragging, dataIndex),
      onclick: this.deleteNode.bind(this, item, dataIndex),
      // 层级
      z: 3
    };
  }

  private setNodes() {
    this.myChart.setOption({
      series: [{
        id: 'a',
        nodes: this.nodes
      }]
    });
  }

// 图形元素拖动后， 修改节点位置
  private onPointDragging(dataIndex, dx, dy) {
    if (this.position[0] <= 0) {
      this.position[0] = (self.symbolSize[0] / 2);
    }
    if (this.position[0] >= self.myChart.getWidth()) {
      this.position[0] = self.myChart.getWidth() - (self.symbolSize[0] / 2);
    }

    if (this.position[1] <= 0) {
      this.position[1] = (self.symbolSize[1] / 2);
    }
    if (this.position[1] >= self.myChart.getHeight()) {
      this.position[1] = self.myChart.getHeight();
    }
    self.nodes[dataIndex].value = self.myChart.convertFromPixel('grid', this.position);
    // Update nodes
    self.myChart.setOption({
      series: [{
        id: 'a',
        nodes: self.nodes
      }]
    });
    self.initGraphic();

  }

// 绘制添加的连线
  private initLinks(node) {
    const {dataIndex} = node;
    for (let i = 0; i < this.nodes.length; i++) {
      if (i === dataIndex) {
        if (this.selectedNodeStep === SelectedTypeEnum.NONE) {
          this.selectedSourceNodeIndex = i;
          this.selectedNodeStep = SelectedTypeEnum.SELECTED_SOURCE;
          self.toggleNodeColor(node, self.selectedSourceNodeColor);
        } else if (this.selectedNodeStep === SelectedTypeEnum.SELECTED_SOURCE) {
          if (i === this.selectedSourceNodeIndex) {
            this.selectedSourceNodeIndex = null;
            this.selectedNodeStep = SelectedTypeEnum.NONE;
            self.clearNodeColors();
            return;
          }
          this.selectedTargetNodeIndex = i;
          if (!this.hasRelation([this.nodes[this.selectedSourceNodeIndex].id, this.nodes[this.selectedTargetNodeIndex].id])) {
            self.confirmDialog('是否建立链接', () => {
              this.edges.push([this.nodes[this.selectedSourceNodeIndex].id, this.nodes[this.selectedTargetNodeIndex].id]);
              // 当xydata值改变时linkss方法需要重新跑一变
              const xyData = this.edges;
              const linkss = this.edges.map(function(item, i) {
                return {
                  source: xyData[i][0],
                  target: xyData[i][1]
                };
              });
              // 重新载入的东西都写在这里
              this.myChart.setOption({
                series: [{
                  edges: linkss,
                  // 指定连线颜色
                  lineStyle: self.lineStyle
                }]
              });

              this.selectedNodeStep = SelectedTypeEnum.NONE;
              this.selectedTargetNodeIndex = null;
              this.selectedSourceNodeIndex = null;
              self.clearNodeColors();
            }, () => {
              this.selectedNodeStep = SelectedTypeEnum.SELECTED_SOURCE;
              this.selectedTargetNodeIndex = null;
            });
          }
          // return true;
        }
        break;
      }

    }
  }



  private selectedNodes(node) {
  }

  private toggleNodeColor(node, color) {
    self.nodes.forEach(item => {
      if (item.id === node.data.id) {
        if (item.itemStyle && item.itemStyle.color === color) {
          delete item.itemStyle;
        } else {
          item.itemStyle = {
            color
          };
        }
      }
    });
    self.myChart.setOption({
      series: [{
        nodes: self.nodes
      }]
    });
  }

  private clearNodeColors() {
    this.nodes.forEach(item => {
      delete item.itemStyle;
    });
    self.myChart.setOption({
      series: [{
        id: 'a',
        type: 'graph',
        nodes: self.nodes
      }]
    });
  }

  private focusNodes(dataIndex: number) {
    this.myChart.dispatchAction({
      type: 'focusNodeAdjacency',
      dataIndex,
    });
  }

  private unFocusNodes(dataIndex: number) {
    this.myChart.dispatchAction({
      type: 'unfocusNodeAdjacency',
      dataIndex,
    });
  }

  private deleteLine(params) {
    const a = [params.data.source, params.data.target];
    for (let i = 0; i < self.edges.length; i++) {
      if (params.data.source === self.edges[i][0] && params.data.target === self.edges[i][1]) {
        self.edges.splice(i, 1);
        // 当xydata值改变时linkss方法需要重新跑一变
        const linkss = self.edges.map(function(item, i) {
          return {
            source: self.edges[i][0],
            target: self.edges[i][1]
          };
        });
        // 重新载入的东西都写在这里
        self.myChart.setOption({
          series: [{
            edges: linkss,
          }]
        });
        // return true;
      }
    }
  }

  private deleteNode(params, deleteNodeIndex) {
    console.log('delete node', params);
    this.confirmDialog('确认删除节点吗' + params.name, () => {
      const afterDeletedLines = [];
      const afterDeleteGraphic = [];
      this.edges.forEach((item, lindexIndex) => {
        if (!item.includes(params.id)) {
          afterDeletedLines.push({
            id: `edge_${item[0]}->${item[1]}`,
            name: `${item[0]} -> ${item[1]}`,
            source: item[0],
            target: item[1],
            lineStyle: self.lineStyle
          });
        }
      });
      this.graphicArr.forEach((item, index) => {
        if (item.id !== `graphic_drag_${params.id}` && item.id !== `graphic_delete_${params.id}`) {
          afterDeleteGraphic.push(item);
        }
      });
      this.graphicArr = afterDeleteGraphic;
      this.nodes.splice(deleteNodeIndex, 1);

      this.myChart.setOption({
        series: [{
          nodes: this.nodes,
          edges: afterDeletedLines,
        }],
        graphic: [
          {
            id: `graphic_drag_${params.id}`,
            $action: 'remove',
          }, {
            id: `graphic_delete_${params.id}`,
            $action: 'remove',
          }]
      });
      this.resetNodes();
    });
  }

  private confirmDialog(confirmMsg, confirmFn?, cancelFn?) {
    const r = confirm(confirmMsg);
    if (r) {
      // tslint:disable-next-line:no-unused-expression
      confirmFn && confirmFn();
    } else {
      // tslint:disable-next-line:no-unused-expression
      cancelFn && cancelFn();
    }
  }

  addNodes() {
    this.operateMode = 'addNodes';
  }

  resetNodes() {
    this.myChart.dispatchAction({
      type: 'restore'
    });
    this.initGraphic();
  }

  private clearOperateStatus() {
    this.operateMode = 'none';
  }

  private hasRelation(relation: any[]): boolean {
    return this.edges.some((item, index) => {
      return (item[0] === relation[0] && item[1] === relation[1]);
    });
  }
}

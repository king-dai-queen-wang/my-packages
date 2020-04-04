import {Component, Input, OnInit} from '@angular/core';
import * as echarts from 'echarts';
let self;
@Component({
  selector: 'dww-drag-flow',
  templateUrl: './drag-flow.component.html',
  styleUrls: ['./drag-flow.component.scss']
})
export class DragFlowComponent implements OnInit {
  @Input() operateMode: 'deleteNodes' | 'addNodes' | 'none' = 'none';
  currentSelectedNode;
  //
// 节点可拖动
// 前后点击两个节点，可以对节点进行连接
// 点击连线，可以删除连线
// 动态添加、删除节点 ，还未完成
// 关系坐标
  xydata = [
    ['id-a', 'id-b'],
    ['id-b', 'id-c'],
    ['id-c', 'id-d']
  ];

// 节点坐标
  dataArr = [
    {
      id: 'id-a',
      name: 'A',
      value: [115, 150],
    },
    {
      id: 'id-b',
      name: 'B',
      value: [500, 10]
    },
    {
      id: 'id-c',
      name: 'C',
      value: [55, 700]
    },
    {
      id: 'id-d',
      name: 'D',
      value: [40, 40]
    },
  ];

  graphicArr = [];

  gridOffset: 10;
// 设置点的大小
  symbolSize = [100, 70];

// 当0时候表示输入起点坐标，其他值输入终点坐标
  selectedNode = 0;
  position;
// 起点
  positionSource;
// 钟点
  positionTarget;
// 设置判断点击线还是点击点
// 删除数组的索引位置
  del;
  links;
  option;
  myChart;
  constructor() { }

  ngOnInit() {
    this.initOption();
    self = this;
  }

  bindingEvent() {
    const zr = this.myChart.getZr();
    // this.myChart.on('click', function(params) {
    //   console.log(params);
    //   if (params.componentType === 'graph') {
    //     console.log('click graph', params)
    //   }
    // });

    // 点击事件 , 删除连线
    this.myChart.on('click', {dataType: 'edge'}, function (params) {
      if (params.dataType !== 'edge') {
        return;
      }
      self.confirmDialog('确认删除连线吗', self.deleteLine.bind(self, params), () => {});
      return;
    });

    this.myChart.on('click', {dataType: 'node'}, function (params) {
      if (params.dataType !== 'node') {
        return;
      }
      console.log('click nodes', params);
      self.selectedNodes(params);
      self.initLinks(params.dataIndex);
      // onclick: echarts.util.curry(this.initLinks, dataIndex),
      //   onmousemove: echarts.util.curry(this.showTooltip.bind(self), dataIndex),
      //   onmouseout: echarts.util.curry(this.hideTooltip.bind(self), dataIndex),
    });

    this.myChart.on('mousemove', {dataType: 'node'}, function (params) {
      // console.log('click nodes', params);
      self.focusNodes(params.dataIndex);
    });

    this.myChart.on('mouseout', {dataType: 'node'}, function (params) {
      // console.log('click nodes', params);
      self.unFocusNodes(params.dataIndex);
    });

    this.myChart.on('dataZoom', self.updatePosition.bind(self));

    // 画布监听click，增加节点
    zr.on('click', function (params) {
      if (typeof params.target === 'undefined') {
        // self.selectedNode = null;
      }

      if (typeof params.target !== 'undefined' || self.operateMode !== 'addNodes') {
        return;
      }
      const pointInPixel = [params.offsetX, params.offsetY];
      const pointInGrid = self.myChart.convertFromPixel('grid', pointInPixel);

      self.confirmDialog('确认添加吗', () => {
        if (self.myChart.containPixel('grid', pointInPixel)) {
          const id = 'E'+ Math.random();
          self.dataArr.push({name: id, id, value: pointInGrid});
          self.initGraphic();
          self.setNodes();
          self.clearOperateStatus();
        }
      });

    });

    zr.on('mousemove', function (params) {
      zr.setCursorStyle('default');
      const pointInPixel = [params.offsetX, params.offsetY];
      if (self.myChart.containPixel('grid', pointInPixel)) {
        if (self.operateMode === 'addNodes') {
          zr.setCursorStyle('copy');
        }
      }
    });

  }

  initOption() {
    const xydata = this.xydata;
    this.links = this.xydata.map(function(item, i) {
      return {
        id: `edge_${xydata[i][0]}->${xydata[i][1]}`,
        name: `${xydata[i][0]} -> ${xydata[i][1]}`,
        source: xydata[i][0],
        target: xydata[i][1],
        lineStyle: {normal: {}}
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
      tooltip: {
      },
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
        splitArea : {show : false},
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
        splitArea : {show : false},
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
        label: {
          show: true,
          formatter: (d, i) => {
            return this.dataArr[d.dataIndex] && this.dataArr[d.dataIndex].name;
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
        nodes: this.dataArr,
        // 指定连线方式
        edges: this.links,
        // 指定连线颜色
        lineStyle: {
          normal: {
            color: '#000'
          }
        },
      }],

    };
  }

// 重新定位图形元素
  updatePosition() {
    let newPosition = echarts.util.map(this.dataArr, (item, dataIndex) => {
      return {
        position: this.myChart.convertToPixel('grid', item.value),
      };
    });
    newPosition = newPosition.concat(newPosition);
    this.myChart.setOption({
      graphic: newPosition
    });
    // self.initGraphic();
    // self.bindingEvent();
  }

// 绘制图形元素
  initGraphic() {
    const res = [];
    // this.dataArr.map((item, dataIndex) => {
    //   res.push(this.initGraphicDragBtnItem(item, dataIndex));
    //   res.push(this.initGraphicDeleteBtnItem(item, dataIndex));
    //   return res;
    // });
    // this.graphicArr = res;

    this.myChart.setOption({
      graphic: echarts.util.map(this.dataArr, (item, dataIndex) => {
        return this.initGraphicDeleteBtnItem(item, dataIndex);
      })
    });
    this.myChart.setOption({
      graphic: echarts.util.map(this.dataArr, (item, dataIndex) => {
        return this.initGraphicDragBtnItem(item, dataIndex);
      })
    });
  }

  initGraphicDragBtnItem(item, dataIndex) {
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
        fill : '#3FA7DC50',
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
  initGraphicDeleteBtnItem(item, dataIndex) {
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
        fill : '#ddd',
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
  setNodes() {
    this.myChart.setOption({
      series: [{
        id: 'a',
        nodes: this.dataArr
      }]
    });
  }
  // showTooltip(dataIndex) {
  //   this.myChart.dispatchAction({
  //     type: 'showTip',
  //     seriesIndex: 0,
  //     dataIndex: dataIndex
  //   });
  // }

  // hideTooltip(dataIndex) {
  //   this.myChart.dispatchAction({
  //     type: 'hideTip'
  //   });
  // }
// 图形元素拖动后， 修改节点位置
  onPointDragging(dataIndex, dx, dy) {
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
    self.dataArr[dataIndex].value = self.myChart.convertFromPixel('grid', this.position);
    // Update nodes
    self.myChart.setOption({
      series: [{
        id: 'a',
        nodes: self.dataArr
      }]
    });
    self.initGraphic();

  }

// 绘制添加的连线
  initLinks = (dataIndex) => {
    for (let i = 0; i < this.dataArr.length; i++) {
      if (i === dataIndex) {
        if (this.selectedNode === 0) {
          this.positionSource = i;
          this.selectedNode = 1;
        } else {
          // if (this.selectedNode === null) {
          //   return;
          // }
          this.positionTarget = i;
          this.selectedNode = 0;
          if (!this.hasRelation([this.dataArr[this.positionSource].id, this.dataArr[this.positionTarget].id])) {
            this.xydata.push([this.dataArr[this.positionSource].id, this.dataArr[this.positionTarget].id]);
            // 当xydata值改变时linkss方法需要重新跑一变
            const xyData = this.xydata;
            const linkss = this.xydata.map(function(item, i) {
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
                lineStyle: {
                  normal: {
                    color: '#123456'
                  }
                }
              }]
            });
            // self.selectedNode = null;
            // self.positionSource = null;
            // self.positionTarget = null;
          //  清空选择的node
          }
          return true;
        }
        break;
      }

    }
  }

  onChartReady(myChart: echarts.ECharts) {
    this.myChart = myChart;
    // 在demo里，必须要加setTimeout ，否则执行 myChart.convertToPixel 会报错
    setTimeout(function() {
      self.initGraphic();
      self.bindingEvent();
      // 窗口大小改事件
      window.addEventListener('resize', self.updatePosition.bind(self));
    }, 0);
  }

  selectedNodes(node) {
    // this.myChart.dispatchAction({
    //   type: 'focusNodeAdjacency',
    //   dataIndex,
    // });
  }

  focusNodes(dataIndex: number) {
    this.myChart.dispatchAction({
      type: 'focusNodeAdjacency',
      dataIndex,
    });
  }

  unFocusNodes(dataIndex: number) {
    this.myChart.dispatchAction({
      type: 'unfocusNodeAdjacency',
      dataIndex,
    });
  }


  deleteLine(params) {
    const a = [params.data.source, params.data.target];
    for (let i = 0; i < self.xydata.length; i++) {
      if (params.data.source === self.xydata[i][0] && params.data.target === self.xydata[i][1]) {
        self.del = i;
        self.xydata.splice(self.del, 1);
        // 当xydata值改变时linkss方法需要重新跑一变
        const linkss = self.xydata.map(function(item, i) {
          return {
            source: self.xydata[i][0],
            target: self.xydata[i][1]
          };
        });
        // 重新载入的东西都写在这里
        self.myChart.setOption({
          series: [{
            edges: linkss,
          }]
        });
        return true;
      }
    }
  }

  deleteNode(params, deleteNodeIndex) {
    console.log('delete node', params);
    self.confirmDialog('确认删除节点吗' + params.name,() => {
      const afterDeletedLines = [];
      const afterDeleteGraphic = [];
      self.xydata.forEach((item, lindexIndex) => {
        if (!item.includes(params.id)) {
          afterDeletedLines.push(item);
        }
      });
      self.xydata = afterDeletedLines;

      self.graphicArr.forEach((item, index) => {
        if (item.id !== `graphic_drag_${params.id}` && item.id !== `graphic_delete_${params.id}`) {
          afterDeleteGraphic.push(item);
        }
      });
      self.graphicArr = afterDeleteGraphic;
      self.dataArr.splice(deleteNodeIndex, 1);

      self.myChart.setOption({
        graphic: [
          {
            id: `graphic_drag_${params.id}`,
            $action: 'remove',
          } , {
            id: `graphic_delete_${params.id}`,
            $action: 'remove',
          }]
      });

      self.myChart.setOption({
        series: [{
          id: 'a',
          edges: afterDeletedLines,
        }]
      });

      self.myChart.setOption({
        series: [{
          id: 'a',
          nodes: self.dataArr,
        }],
      });

      console.log('delete over', self.myChart)

      // self.initGraphic();
      // self.refreshChart();
      // self.bindingEvent();
    });
  }

  getOption() {
    console.log(this.myChart.getOption());
  }

  confirmDialog(confirmMsg, confirmFn?, cancelFn?) {
    const r = confirm(confirmMsg);
    if (r) {
      confirmFn && confirmFn();
    } else {
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
    this.bindingEvent();
  }

  clearOperateStatus() {
    this.operateMode = 'none';
  }

   private hasRelation(relation: any[]): boolean {
      return this.xydata.some((item, index) => {
        return (item[0] === relation[0] && item[1] === relation[1]);
      });
   }
}

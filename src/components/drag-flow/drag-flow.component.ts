import { Component, OnInit } from '@angular/core';
import * as echarts from 'echarts';
let self;
@Component({
  selector: 'dww-drag-flow',
  templateUrl: './drag-flow.component.html',
  styleUrls: ['./drag-flow.component.scss']
})
export class DragFlowComponent implements OnInit {

  //
// 节点可拖动
// 前后点击两个节点，可以对节点进行连接
// 点击连线，可以删除连线
// 动态添加、删除节点 ，还未完成
// 关系坐标
  xydata = [
    [0, 1],
    [1, 2],
    [2, 3]
  ];

// 节点坐标
  dataArr = [
    {
      name: 'A',
      value: [115, 150]
    },
    {
      name: 'B',
      value: [500, 10]
    },
    {
      name: 'C',
      value: [55, 700]
    },
    {
      name: 'D',
      value: [40, 40]
    },
  ];
  gridOffset: 10;
// 设置点的大小
  symbolSize = [100, 70];

// 当0时候表示输入起点坐标，其他值输入终点坐标
  position = 0;
// 起点
  positionSource;
// 钟点
  positionTarget;
// 设置判断点击线还是点击点
  ok = 1;
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
    // 点击事件 , 删除连线
    this.myChart.on('click', function(params) {
      console.log(params);
      if (params.componentType === 'series' && params.dataType === 'edge') {
        self.confirmDialog('确认删除连线吗', self.deleteLine.bind(self, params), () => {});
        return;
      }

      if (params.componentType === 'graph') {

      }
    });


    this.myChart.on('click', 'series.line', function (params) {
      console.log(params);

    });

    this.myChart.on('dataZoom', this.updatePosition);

    const zr = this.myChart.getZr();

    // 画布监听click，增加节点
    zr.on('click', function (params) {
      const pointInPixel = [params.offsetX, params.offsetY];
      const pointInGrid = self.myChart.convertFromPixel('grid', pointInPixel);

      self.confirmDialog('确认添加吗', () => {
        if (self.myChart.containPixel('grid', pointInPixel)) {
          self.dataArr.push({name: 'E'+ Math.random(), value: pointInGrid});

          self.myChart.setOption({
            series: [{
              id: 'a',
              data: echarts.util.map(self.dataArr, function(item, di) {
                return item;
              }),
            }]
          });
          self.initGraphic();
        }
      });

    });

    zr.on('mousemove', function (params) {
      const pointInPixel = [params.offsetX, params.offsetY];
      console.log(pointInPixel);
      zr.setCursorStyle(self.myChart.containPixel('grid', pointInPixel) ? 'copy' : 'default');
    });

  }

  initOption() {
    const xydata = this.xydata;
    this.links = this.xydata.map(function(item, i) {
      return {
        source: xydata[i][0],
        target: xydata[i][1]
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
        triggerOn: 'none',
        // 鼠标是否可进入提示框浮层中，默认为false，如需详情内交互，如添加链接，按钮，
        enterable: true,
        trigger: 'item',
        borderColor: '#333',
        borderWidth: 2,
        backgroundColor: '#fff',

        textStyle: {
          color: '#000'
        },
        formatter: function (params) {
          const data = params.data.value || [0, 0];
          return data[0].toFixed(2) + ', ' + data[1].toFixed(2);
        }
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
            return this.dataArr[d.dataIndex].name;
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
        data: echarts.util.map(this.dataArr, function(item, di) {
          return item;
        }),
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
  updatePosition = () => {
    this.myChart.setOption({
      graphic: echarts.util.map(this.dataArr, (item, dataIndex) => {
        return {
          position: this.myChart.convertToPixel('grid', item.value),
        };
      })
    });
  }

// 绘制图形元素
  initGraphic() {
    this.myChart.setOption({
      graphic: echarts.util.map(this.dataArr, (item, dataIndex) => {
        return {
          // 矩形
          type: 'rect',
          // 将坐标转化为像素
          position: this.myChart.convertToPixel('grid', item.value),
          shape: {
            // 拖动点的大小
            x: -1 * (this.symbolSize[0] / 2),
            y: -1 * (this.symbolSize[1] / 2),
            width: this.symbolSize[0],
            height: this.symbolSize[1]
          },
          style: {
            fill: '#3FA7DC50',
            borderColor: '#22faf7',
            borderWidth: 1,
          },

          // 指定虚拟圈是否可见  false 可见
          invisible: false,
          // 指定圈被拖拽（可以与不可以）
          draggable: true,
          ondrag: echarts.util.curry(this.onPointDragging, dataIndex),
          onclick: echarts.util.curry(this.initLinks, dataIndex),
          // onmousemove: echarts.util.curry(this.onPointDragging, dataIndex),
          onmousemove: echarts.util.curry(this.showTooltip.bind(self), dataIndex),
          onmouseout: echarts.util.curry(this.hideTooltip.bind(self), dataIndex),
          // 层级
          z: 100

        };
      })
    });
  }

  showTooltip(dataIndex) {
    this.myChart.dispatchAction({
      type: 'showTip',
      seriesIndex: 0,
      dataIndex: dataIndex
    });
  }

  hideTooltip(dataIndex) {
    this.myChart.dispatchAction({
      type: 'hideTip'
    });
  }
// 图形元素拖动后， 修改节点位置
  onPointDragging(dataIndex, dx, dy) {
    console.log(this.position);
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
    // Update data
    self.myChart.setOption({
      series: [{
        id: 'a',
        data: self.dataArr
      }]
    });

  }

// 绘制添加的连线
  initLinks = (dataIndex) => {
    for (let i = 0; i < this.dataArr.length; i++) {
      if (i === dataIndex) {
        this.ok = 0;
        if (this.position === 0) {
          this.positionSource = i;
          this.position = 1;
        } else {
          this.positionTarget = i;
          this.position = 0;
          this.xydata.push([this.positionSource, this.positionTarget]);
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
          return true;
        }
        break;
      }

    }
  }

  onChartReady = (myChart: echarts.ECharts) => {
    this.myChart = myChart;
    this.bindingEvent();
    // 在demo里，必须要加setTimeout ，否则执行 myChart.convertToPixel 会报错
    setTimeout(function() {
      self.initGraphic();
      // 窗口大小改事件
      window.addEventListener('resize', self.updatePosition);
    }, 0);
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

  deleteNode(params) {
    console.log(params);
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
}

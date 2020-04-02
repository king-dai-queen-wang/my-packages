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
      value: [15, 50]
    },
    {
      name: 'B',
      value: [-50, 10]
    },
    {
      name: 'C',
      value: [-55, -70]
    },
    {
      name: 'D',
      value: [40, -40]
    },
  ];

// 设置点的大小
  symbolSize = 70;

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
      if (params.componentType !== 'series' || params.dataType !== 'edge') {
        return;
      }

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

      },
      // 定义X轴
      xAxis: {
        min: -100,
        max: 100,
        type: 'value',
        axisLine: {
          onZero: false
        },
        show: false
      },
      yAxis: {
        min: -100,
        max: 100,
        type: 'value',
        axisLine: {
          onZero: false
        },
        show: false
      },
      series: [{
        // 设置id很重要
        id: 'a',
        // 设置为甘特图
        type: 'graph',
        layout: 'none',
        coordinateSystem: 'cartesian2d',
        // 设置球的大小
        symbolSize: this.symbolSize,

        label: {
          show: true,
          formatter: (d, i) => {
            return this.dataArr[d.dataIndex].name;
          }
        },
        itemStyle: {
          borderColor: '#22faf7',
          borderWidth: 3,
          color: '#123456',
        },
        // 设置连线形式为箭头
        edgeSymbol: ['circle', 'arrow'],
        edgeSymbolSize: [4, 10],
        // 指定数据数组
        data: echarts.util.map(this.dataArr, function(item, di) {
          return item.value;
        }),
        // 指定连线方式
        edges: this.links,
        // 指定连线颜色
        lineStyle: {
          normal: {
            color: '#22faf7'
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
  initGraphic = () => {
    this.myChart.setOption({
      graphic: echarts.util.map(this.dataArr, (item, dataIndex) => {
        return {
          // 圆形
          type: 'circle',
          // 将坐标转化为像素
          position: this.myChart.convertToPixel('grid', item.value),
          shape: {
            // 拖动点的大小
            r: this.symbolSize / 2 - 2
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
          // ondrag: echarts.util.curry(onPointDragging, dataIndex),
          onclick: echarts.util.curry(this.initLinks, dataIndex),
          onmouseup: echarts.util.curry(this.onPointDragging, dataIndex),

          // 层级
          z: 100

        };
      })
    });
  }
// 图形元素拖动后， 修改节点位置
  onPointDragging(dataIndex, dx, dy) {
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
                  color: '#22faf7'
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
    const _this = this;
    setTimeout(function() {
      _this.initGraphic();
      // 窗口大小改事件
      window.addEventListener('resize', _this.updatePosition);
    }, 0);
  }

  getOption() {
    console.log(this.myChart.getOption());
  }
}

import { Component, OnInit } from '@angular/core';
import * as echarts from 'echarts';
@Component({
  selector: 'dww-wolkflow',
  templateUrl: './wolkflow.component.html',
  styleUrls: ['./wolkflow.component.scss']
})
export class WolkflowComponent implements OnInit {
  myChart;
  option;
  line = 3;  //行：把画布上画几行信息框
  column = 4; //列：把画布上画几列信息框
  data = [
    {
    name: '节点1',
    code: 'node1',
    value: {
      interfaceNum: 0,
      kpiNum: 0,
      alarmNum: 0
    },
    x: 0.1,
    y: 0.65
  }, {
    name: '节点2',
    code: 'node2',
    value: {
      interfaceNum: 0,
      kpiNum: 0,
      alarmNum: 0
    },
    x: 0.3,
    y: 0.8
  }, {
    name: '节点3',
    code: 'node3',
    value: {
      interfaceNum: 0,
      kpiNum: 0,
      alarmNum: 0
    },
    x: 0.3,
    y: 0.5
  }, {
    name: '节点4',
    code: 'node4',
    value: {
      interfaceNum: 0,
      kpiNum: 0,
      alarmNum: 0
    },
    x: 0.5,
    y: 0.5
  }];
  links = [
    {
    source: 'node1',
    target: 'node2',
  }, {
    source: 'node1',
    target: 'node3',
  }, {
    source: 'node3',
    target: 'node4',
  }];
  constructor() { }

  ngOnInit() {
    this.initOption();
  }

  initOption() {
    const getScatterData = () => {
      let scatterData = [];

      //画布宽高
      let c_w = 600;
      let c_h = 600;
      //计算信息框的宽高
      let w = c_w / (this.column * 2);
      let h = c_h / (this.line * 2);
      for (let i = 0; i < this.data.length; i++) {
        // 把消息框分为两部分：标题和内容,内容高度为标题高度的3倍，echart是以中心画图，所以要分别计算标题和内容框的中心点位置
        scatterData.push({
          name: this.data[i].name,
          value: [this.data[i].x, (this.data[i].y * c_h + (3 / 8 * h)) / c_h],
          type: 'title',
          w: w,
          h: h / 4,
          label: {
            normal: {
              textStyle: {
                color: '#fff',
                fontWeight: 'bold',
                fontSize: 15
              }
            }
          }
        }, {
          code: this.data[i].code,
          value: [this.data[i].x, (this.data[i].y * c_h + (1 / 4 * h) - (3 / 4 * h) / 2) / c_h],
          type: 'body',
          w: w,
          h: 3 / 4 * h,
          info: this.data[i].value,
          label: {
            normal: {
              textStyle: {
                color: '#000'
              }
            }
          }
        });
      }
      return scatterData;
    }

    const getLinesData = ()  => {
      let linesData = [];
      let map = {};
      for (let i = 0; i < this.data.length; i++) {
        map[this.data[i].code] = this.data[i];
      }

      for (let i = 0; i < this.links.length; i++) {
        let source = map[this.links[i].source];
        let target = map[this.links[i].target];

        //画布宽高
        let c_w = 600;
        let c_h = 600;
        //计算信息框的宽高
        let w = c_w / (this.column * 2);
        let h = c_h / (this.line * 2);
        //计算信息框的四个边中点的位置
        source.top = {
          x: source.x,
          y: (source.y * c_h + (1 / 2 * h)) / c_h
        };
        source.right = {
          x: (source.x * c_w + (1 / 2 * w)) / c_w,
          y: source.y
        };
        source.bottom = {
          x: source.x,
          y: (source.y * c_h - (1 / 2 * h)) / c_h
        };
        source.left = {
          x: (source.x * c_w - (1 / 2 * w)) / c_w,
          y: source.y
        };

        target.top = {
          x: target.x,
          y: (target.y * c_h + (1 / 2 * h)) / c_h
        };
        target.right = {
          x: (target.x * c_w + (1 / 2 * w)) / c_w,
          y: target.y
        };
        target.bottom = {
          x: target.x,
          y: (target.y * c_h - (1 / 2 * h)) / c_h
        };
        target.left = {
          x: (target.x * c_w - (1 / 2 * w)) / c_w,
          y: target.y
        };

        //s->t：s左：t右
        if (source.right.x < target.left.x) {
          linesData.push(getLine([
            [source.right.x, source.right.y],
            [target.left.x, target.left.y]
          ]));
        }
        //t<-s：s右：t左
        else if (source.left.x > target.right.x) {
          linesData.push(getLine([
            [source.left.x, source.left.y],
            [target.right.x, target.right.y]
          ]));
        }
        //s
        //|
        //t
        else if (source.bottom.y > target.top.y) {
          linesData.push(getLine([
            [source.bottom.x, source.bottom.y],
            [target.top.x, target.top.y]
          ]));
        }
        //t
        //|
        //s
        else if (source.top.y < target.bottom.y) {
          linesData.push(getLine([
            [source.top.x, source.top.y],
            [target.bottom.x, target.bottom.y]
          ]));
        }
      }
      return linesData;
    }

    const getLine = (coords) => {
      return {
        name: '',
        type: 'lines',
        coordinateSystem: 'cartesian2d',
        symbol: ['none', 'arrow'],
        symbolSize: 10,
        zlevel: 4,
        effect: {
          show: true,
          period: 6,
          trailLength: 0.7,
          color: '#7480BC',
          symbolSize: 3
        },
        lineStyle: {
          normal: {
            color: '#9EADD6',
            width: 1,
            curveness: 0
          }
        },
        data: [{
          coords: coords
        }]
      };
    }

    const getSeries = () => {
      let series = [];
      series.push({
        type: 'scatter',
        symbol: 'rect',
        zlevel: 2,
        silent: true,
        symbolSize: function(value, params) {
          return [params.data.w, params.data.h];
        },
        itemStyle: {
          normal: {
            shadowBlur: 10,
            shadowColor: 'rgba(120, 36, 50, 0.5)',
            shadowOffsetY: 5,
            color: function(params) {
              if (params.data.type === 'title') {
                return '#007CB8';
              } else {
                return '#6DC6F2';
              }
            }
          }
        },
        label: {
          normal: {
            show: true,
            position: 'inside',
            formatter: function(params) {
              if (params.data.type === 'title') {
                return params.data.name;
              } else {
                return '核心接口数量：' + params.data.info.interfaceNum +
                  '\n监测指标数量：' + params.data.info.kpiNum +
                  '\n告警数量' + params.data.info.alarmNum;
              }

            },
            textStyle: {
              color: '#000'
            }
          }
        },
        data: getScatterData(),
      });
      return series.concat(getLinesData());
    }
    this.option = null;
    this.option = {
      backgroundColor: '#F3F3F3',
      title: [{
        text: '流程图',
        x: '5%',
        y: 0,
        textStyle: {
          color: '#333',
          fontStyle: 'normal',
          fontWeight: 'normal',
          fontFamily: 'sans-serif',
          fontSize: 14,
        }
      }],
      tooltip: {

        /*trigger: 'axis',
        axisPointer: {
            show: true,
            type: 'cross'
        }*/
      },
      grid: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      },
      xAxis: {
        type: 'value',
        splitLine: {
          show: false,
        },
        axisLabel: {
          show: false
        },
        max: 1,
        min: 0
      },
      yAxis: {
        type: 'value',
        splitLine: {
          show: false,
        },
        axisLabel: {
          show: false
        },
        max: 1,
        min: 0
      },
      series: getSeries()
    };
  }

  onChartReady(myChart: echarts.ECharts) {
    this.myChart = myChart;
  }

  getOption() {
    console.log(this.myChart.getOption());
  }
}

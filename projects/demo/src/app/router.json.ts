import {NavInterface} from '../../../../src/components/nav/nav.interface';

export const ROUTERS: NavInterface[] = [
  {
    name: '首页',
    url: '/home',
    icon: null,
    children: null,
  },
  {
    name: '我的作品',
    url: '/my-works',
    icon: null,
    children: [
      {
        name: 'list',
        url: './my-works/list',
        icon: null
      },
      {
        name: '俄罗斯方块',
        url: '/my-works/tetris',
        icon: null,
      },
      {
        name: '联机版俄罗斯方块',
        url: '/my-works/remote-tetris',
        icon: null,
      },
      {
        name: '拖拽看板',
        url: '/my-works/drag-drop-dashboard',
        icon: null,
      }]
  },
  {
    name: '组件',
    url: '/component',
    icon: null,
    children: null
  },
  {
    name: '数据结构',
    url: '/data-structure',
    icon: null,
    children: null
  },
  {
    name: 'H5练习',
    url: '/h5-practice',
    icon: null,
    children: null
  },
  {
    name: '关于我',
    url: '/about',
    icon: null,
    children: null
  }
];

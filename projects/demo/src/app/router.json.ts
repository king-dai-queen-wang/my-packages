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
    name: '关于我',
    url: '/about',
    icon: null,
    children: null
  }
];

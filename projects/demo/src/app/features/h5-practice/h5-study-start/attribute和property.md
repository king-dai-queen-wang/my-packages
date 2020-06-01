### 1.什么是attribute，什么是property？
    html标签的预定义和自定义属性都是attribute（建议自定义属性用data-*）
    js原生对象的直接属性，统称为property
### 2.什么是布尔值属性。什么是非布尔值属性
    property的属性值为非/布尔类型的 ，称之为非/布尔值属性
### 3.attribute 和 property关系
    非布尔值属性： 实时同步
    布尔值属性： property 永远都不会同步attribute，
    再没有动过property情况下，attribute会同步property
    在动过property的情况下，attribute不会同步property
### 4.用户操作的是property，浏览器认得是property
### 5.操作布尔值属性的就用property（如readonly/checked/autofocus等等），操作非布尔值属性的标签就用attribute(如class/href/id/draggable等等)
---
* width,left,top,right,bottom  默认值是auto；

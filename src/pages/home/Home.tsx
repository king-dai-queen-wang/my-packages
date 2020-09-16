import React, {ReactNode} from "react";

function Repeat(props: {children: (i: number) => ReactNode, numTimes: number}) {
    let items = [];
    for (let i: number = 0; i < props.numTimes; i++) {
        // @ts-ignore
        items.push(props.children(i));
    }
    return <div>{items}</div>;
}

function ListOfTenThings() {
    return (
        <Repeat numTimes={10}>
            {(index) => <div key={index}>This is item {index} in the list</div>}
        </Repeat>
    );
}

export class Home extends React.Component {
    // 调用子元素回调 numTimes 次，来重复生成组件
    render() {
        return <ListOfTenThings/>;
    }
}

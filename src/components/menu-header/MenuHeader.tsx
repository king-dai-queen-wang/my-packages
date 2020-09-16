import React from "react";
import {Link} from 'react-router-dom';
import {RouterModel} from "../../model/router-model/router.model";
import './MenuHeader.scss';

interface IProps {
    routers: RouterModel[]
}

function LinkItem(route: RouterModel) {
    return <Link className="link" to={route.path} >{route.name}</Link>
}
export class MenuHeader extends React.Component <IProps>{
    render() {
        return <div className="">
            {this.props.routers.map((route, index) => {
                return <LinkItem key={index} {...route}>
                    </LinkItem>

            })}
        </div>;
    }
}

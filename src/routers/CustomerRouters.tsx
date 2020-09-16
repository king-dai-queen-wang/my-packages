import React from "react";
import {routers} from './routers';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {MenuHeader} from "../components/menu-header/MenuHeader";

export class CustomerRouters extends React.Component{
    generateRoutes() {
        return (
            <Router>
                <MenuHeader routers={routers} />
                <hr/>
                <Switch>
                    {routers.map((route, index) => {
                        return <Route path={route.path} exact component={route.component} key={index}/>
                    })}
                </Switch>
            </Router>
            )
    }
    render() {
        return this.generateRoutes();
    }
}

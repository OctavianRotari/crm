import * as React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';

import './index.css';
import asyncRoute from './asyncRoute';

const Registration = asyncRoute(() => import('./scenes/Registration'));
const Dashboard = asyncRoute(() => import('./scenes/Dashboard'));
const Activity = asyncRoute(() => import('./scenes/Activity'));
const Customers = asyncRoute(() => import('./scenes/Customers'));
const Customer = asyncRoute(() => import('./scenes/Customer'));
const Products = asyncRoute(() => import('./scenes/Products'));
const Product = asyncRoute(() => import('./scenes/Product'));
const Schedule = asyncRoute(() => import('./scenes/Schedule'));

class Root extends React.Component {
    componentDidMount() {
        const jssStyles = document.getElementById('jss-server-side');
        if(jssStyles && jssStyles.parentNode) {
            jssStyles.parentNode.removeChild(jssStyles);
        }
    }

    render() {
        return (
            <HashRouter {...this.props}>
                <Switch>
                    <Route exact path="/" component={Registration}/>
                    <Route path="/dashboard" component={Dashboard}/>
                    <Route path="/activity" component={Activity}/>
                    <Route path="/customers" component={Customers}/>
                    <Route path="/customer/:id" component={Customer}/>
                    <Route path="/products" component={Products}/>
                    <Route path="/product/:id" component={Product}/>
                    <Route path="/schedule" component={Schedule}/>
                </Switch>
            </HashRouter>
        );
    }
}

export default Root;

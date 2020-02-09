import React from 'react';
import 'antd/dist/antd.css';
import ProductDashBoard from './product/ProductDashBoard';
import { Link, Route, Switch } from 'react-router-dom';

function ShoppingCart(props) {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">DashBoard</Link>
          </li>
          <li>
            <Link to="/category">Category</Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route path="/category">category</Route>
        <Route path="/">
          <ProductDashBoard />
        </Route>
      </Switch>
    </div>
  );
}

export default ShoppingCart;

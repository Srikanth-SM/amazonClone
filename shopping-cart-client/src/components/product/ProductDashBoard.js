import React from 'react';
import { Card, Col, Row, Tabs, Spin } from 'antd';
import axios from 'axios';
import constants from '../../constants';

const { API_URL } = constants;

class ProductDashBoard extends React.Component {
  state = {
    products: [],
    isProductsLoading: false,
  };
  componentDidMount() {
    this.getAllProducts();
  }
  getAllProducts = () => {
    this.setState({ isProductsLoading: true });
    axios.get(`${API_URL}/product`).then((res) => {
      this.setState({
        products: res.data,
        isProductsLoading: false,
      });
    });
  };
  render() {
    const { products } = this.state;
    const { TabPane } = Tabs;
    ``;
    return (
      <Tabs tabPosition="top">
        <TabPane tab="All" key="1">
          <div style={{ background: '#ECECEC', padding: '30px' }}>
            <Row gutter={[16, 16]}>
              {products.map((product) => {
                return (
                  <Col span={4} key={product._id}>
                    <Card title={product.productName} bordered={false}>
                      <div>{product.product}</div>
                      <div>Price:{product.price} INR</div>
                      <div>{product.imageurl}</div>
                    </Card>
                  </Col>
                );
              })}
              google
              {this.state.isProductsLoading && (
                <Spin style={{ padding: '0 50% ' }} />
              )}
            </Row>
          </div>
        </TabPane>
      </Tabs>
    );
  }
}

export default ProductDashBoard;

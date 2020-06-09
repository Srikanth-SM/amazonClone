import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ShoppingCart from './components';
class App extends React.Component {
  // constructor(props) {}
  render() {
    return (
      <Router>
        <ShoppingCart />
      </Router>
    );
  }
}

export default App;

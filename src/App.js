import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from "./components/navbar";
import ShoppingList from "./pages/shoppingList";
import CreateItem from "./components/createItem";

function App() {
  return (
      <Router>
        <div className="container">
          <Navbar />
          <br />
          <Route path="/" exact component={ShoppingList} />
          <Route path="/create" component={CreateItem} />
        </div>
      </Router>
  );
}

export default App;

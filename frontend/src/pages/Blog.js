import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import BlogPage from './BlogPage'; // Import the new BlogPage component

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/blog" component={BlogPage} /> {/* Add this route */}
          {/* Add more routes for other pages */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;

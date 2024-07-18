import React from 'react';
import { Link } from 'react-router-dom';

class BlogPage extends React.Component {
  render() {
    return (
      <div className="blog-page">
        <h1>Blog Page</h1>
        <ul>
          <li>
            <Link to="/blog/post-1">Post 1</Link>
          </li>
          <li>
            <Link to="/blog/post-2">Post 2</Link>
          </li>
          {/* Add more blog post links as needed */}
        </ul>
      </div>
    );
  }
}

export default BlogPage;

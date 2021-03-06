import React from 'react';
import { Link } from 'react-router';

import './Add.css';

export const Add = (props) => (
  <Link to="/add" className="watcher-add">
    <div className="watcher-add-cross">
      <svg className="watcher-add-cross-svg" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet"><g><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" ></path></g></svg>
    </div>
  </Link>
);

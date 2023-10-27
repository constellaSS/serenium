import React from 'react';
import './post.css';
const Post = ({ rectangles }) => {
    return (
        <div>
            <div className="rectangles-container">
                {rectangles}
            </div>
        </div>
    );
};


export default Post;
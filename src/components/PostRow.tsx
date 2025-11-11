import React, { useState, useEffect, useRef } from 'react';
import './PostRow.css';
import { ChevronDown, ChevronUp, Newspaper, Megaphone } from "lucide-react";
import { SquarePen, Trash2 } from "lucide-react";

interface Post {
  id: number;
  thumbnail: string;
  title: string;
  description: string;
  type: 'News' | 'Announcement';
  sharingTime: string;
    sharingDate: string;
  status: 'Active' | 'Inactive';
  publishStatus: string;
  author: string;
}

interface PostRowProps {
  post: Post;
  onEdit?: (post: Post) => void;
  onPublishStatusChange?: (postId: number, newStatus: string) => void;
  onDelete?: (post: Post) => void;
}

const PostRow: React.FC<PostRowProps> = ({ post, onEdit, onPublishStatusChange, onDelete }) => {
  const [showPublishMenu, setShowPublishMenu] = useState(false);
  const publishMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (publishMenuRef.current && !publishMenuRef.current.contains(event.target as Node)) {
        setShowPublishMenu(false);
      }
    };

    if (showPublishMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showPublishMenu]);

  return (
    <div className="post-row">
      <div className="post-content">
        <img src={post.thumbnail} alt={post.title} className="post-thumbnail" />
        <div className="post-text">
          <div className="post-title">{post.title}</div>
          <div className="post-description">{post.description}</div>
        </div>
      </div>

      <div className="table-col type-col">
        <span className={`type-badge ${post.type.toLowerCase()}`}>
        
          {post.type}
        </span>
      </div>

      <div className="table-col time-col">
        <div className="time-text">
          <div className="date">{post.sharingDate}</div>
          <div className="time">{post.sharingTime}</div>
        </div>
      </div>

      <div className="table-col status-col">
        <div className="status-indicator">
          <span className={`status-dot ${post.status.toLowerCase()}`}></span>
          <span>{post.status}</span>
        </div>
      </div>

      <div className="table-col publish-col">
        <div className="publish-dropdown-wrapper" ref={publishMenuRef}>
          <button
            className="publish-dropdown"
            onClick={() => setShowPublishMenu(!showPublishMenu)}
          >
            <span className={`publish-dot ${post.publishStatus.toLowerCase()}`}></span>
            <span className="publish-text">{post.publishStatus}</span>
            <span className="dropdown-caret">{showPublishMenu ? <ChevronUp size={16} /> : <ChevronDown size={16} />}</span>
          </button>
          {showPublishMenu && (
            <div className="publish-menu">
              <button 
                className="publish-option publish-option-publish"
                onClick={() => {
                  if (onPublishStatusChange) {
                    onPublishStatusChange(post.id, 'Publish');
                  }
                  setShowPublishMenu(false);
                }}
              >
                <span className="publish-dot publish"></span>
                <span className="publish-text">Publish</span>
              </button>
              <button 
                className="publish-option publish-option-draft"
                onClick={() => {
                  if (onPublishStatusChange) {
                    onPublishStatusChange(post.id, 'Draft');
                  }
                  setShowPublishMenu(false);
                }}
              >
                <span className="publish-dot draft"></span>
                <span className="publish-text">Draft</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="table-col author-col">
        <span className="author-text">{post.author}</span>
      </div>

      <div className="table-col actions-col">
        <div className="action-buttons">
          <button 
            className="action-icon edit-icon" 
            title="Edit"
            onClick={() => onEdit && onEdit(post)}
          >
          <SquarePen size={16} strokeWidth={2.5} />
          </button>
          <button
            className="action-icon delete-icon"
            title="Delete"
            onClick={() => onDelete && onDelete(post)}
          >
            <Trash2 size={16} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostRow;


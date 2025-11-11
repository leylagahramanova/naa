import React, { useState, useEffect, useRef, useMemo } from 'react';
import PostRow from './PostRow';
import PostModal from './PostModal';
import './NewsAnnouncements.css';
import './PostRow.css';
import { ChevronDown, ChevronUp,StickyNote } from "lucide-react";
import search from "../img/search.png";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getPosts, createPost, updatePost, deletePost } from '../api/posts';
interface Post {
  id: number;
  thumbnail: string;
  title: string;
  description: string;
  type: 'News' | 'Announcement';
  sharingDate: string;
  sharingTime: string;
  status: 'Active' | 'Inactive';
  publishStatus: string;
  author: string;
}

const NewsAnnouncements: React.FC = () => {
  const [postFilter, setPostFilter] = useState('All Posts');
  const [statusFilter, setStatusFilter] = useState('Active');
  const [searchQuery, setSearchQuery] = useState('');

  // initialPosts now comes from a separate data module

  const [showPostFilter, setShowPostFilter] = useState(false);
  const [showStatusFilter, setShowStatusFilter] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [postToDelete, setPostToDelete] = useState<Post | null>(null);
  const queryClient = useQueryClient();
  const { data: postsList = [] } = useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: getPosts
  });
  const createMutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['posts'] })
  });
  const updateMutation = useMutation({
    mutationFn: updatePost,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['posts'] })
  });
  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['posts'] })
  });
  const postFilterRef = useRef<HTMLDivElement>(null);
  const statusFilterRef = useRef<HTMLDivElement>(null);

  // Filter posts based on selected filters and search query
  const filteredPosts = useMemo(() => {
    return postsList.filter(post => {
      // Filter by post type
      if (postFilter !== 'All Posts') {
        if (postFilter === 'News' && post.type !== 'News') return false;
        if (postFilter === 'Announcements' && post.type !== 'Announcement') return false;
      }

      // Filter by status
      if (statusFilter !== 'All Status') {
        if (statusFilter === 'Active' && post.status !== 'Active') return false;
        if (statusFilter === 'Inactive' && post.status !== 'Inactive') return false;
      }

      // Filter by search query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesTitle = post.title.toLowerCase().includes(query);
        const matchesDescription = post.description.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDescription) return false;
      }

      return true;
    });
  }, [postsList, postFilter, statusFilter, searchQuery]);

  // Pagination derived values
  const totalPages = useMemo(() => {
    const pages = Math.ceil(filteredPosts.length / itemsPerPage);
    return pages > 0 ? pages : 1;
  }, [filteredPosts.length, itemsPerPage]);

  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredPosts.slice(start, end);
  }, [filteredPosts, currentPage, itemsPerPage]);

  // Clamp page when filters or page size change
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
    if (currentPage < 1) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  const pages = useMemo(() => Array.from({ length: totalPages }, (_, i) => i + 1), [totalPages]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (postFilterRef.current && !postFilterRef.current.contains(event.target as Node)) {
        setShowPostFilter(false);
      }
      if (statusFilterRef.current && !statusFilterRef.current.contains(event.target as Node)) {
        setShowStatusFilter(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="news-announcements">
      <div className="na-header">
        <div className="na-title-section">
          <h1 className="na-title">News & Announcements</h1>
          <p className="na-count">{filteredPosts.length} Posts</p>
        </div>
        <button className="na-add-button" onClick={() => {
          setEditingPost(null);
          setIsModalOpen(true);
        }}>
          <span className="add-icon">+</span>
          <span>Add News or Announcement</span>
        </button>
      </div>

      <div className="na-filters">
        <div className="filter-group">
          <div className="filter-dropdown-wrapper" ref={postFilterRef}>
            <button
              className="filter-dropdown"
              onClick={() => {
                setShowPostFilter(!showPostFilter);
                setShowStatusFilter(false);
              }}
            >
              {postFilter}
              <span className="dropdown-caret">{showPostFilter ? <ChevronUp size={16} /> : <ChevronDown size={16} />}</span>
            </button>
            {showPostFilter && (
              <div className="filter-menu">
                <button
                  className={`filter-option ${postFilter === 'All Posts' ? 'selected' : ''}`}
                  onClick={() => {
                    setPostFilter('All Posts');
                    setShowPostFilter(false);
                  }}
                >
                  All Posts
                </button>
                <button
                  className={`filter-option ${postFilter === 'News' ? 'selected' : ''}`}
                  onClick={() => {
                    setPostFilter('News');
                    setShowPostFilter(false);
                  }}
                >
                  News
                </button>
                <button
                  className={`filter-option ${postFilter === 'Announcements' ? 'selected' : ''}`}
                  onClick={() => {
                    setPostFilter('Announcements');
                    setShowPostFilter(false);
                  }}
                >
                  Announcements
                </button>
              </div>
            )}
          </div>

          <div className="filter-dropdown-wrapper" ref={statusFilterRef}>
            <button
              className="filter-dropdown"
              onClick={() => {
                setShowStatusFilter(!showStatusFilter);
                setShowPostFilter(false);
              }}
            >
              {statusFilter === 'Active' ? (
                <>
                  <span className="status-dot active"></span> Active
                </>
              ) : statusFilter === 'Inactive' ? (
                <>
                  <span className="status-dot inactive"></span> Inactive
                </>
              ) : (
                'All Status'
              )}
              <span className="dropdown-caret">{showStatusFilter ? <ChevronUp size={16} /> : <ChevronDown size={16} />}</span>
            </button>
            {showStatusFilter && (
              <div className="filter-menu">
                <button
                  className={`filter-option ${statusFilter === 'All Status' ? 'selected' : ''}`}
                  onClick={() => {
                    setStatusFilter('All Status');
                    setShowStatusFilter(false);
                  }}
                >
                  All Status
                </button>
                <button
                  className={`filter-option ${statusFilter === 'Active' ? 'selected' : ''}`}
                  onClick={() => {
                    setStatusFilter('Active');
                    setShowStatusFilter(false);
                  }}
                >
                  <span className="status-dot active"></span> Active
                </button>
                <button
                  className={`filter-option ${statusFilter === 'Inactive' ? 'selected' : ''}`}
                  onClick={() => {
                    setStatusFilter('Inactive');
                    setShowStatusFilter(false);
                  }}
                >
                  <span className="status-dot inactive"></span> Inactive
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="search-bar">
          <span className="search-icon"><img src={search} alt="" /></span>
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="na-table">
        <div className="table-header">
          
          <div className="table-col post-col"><span>Post</span>
            <span><StickyNote /></span>
          </div>
          <div className="table-col type-col">Type</div>
          <div className="table-col time-col">Sharing time</div>
          <div className="table-col status-col">Status</div>
          <div className="table-col publish-col">Publish Status</div>
          <div className="table-col author-col">Author</div>
          <div className="table-col actions-col">Actions</div>
        </div>

        <div className="table-body">
          {paginatedPosts.map((post) => (
            <PostRow
              key={post.id}
              post={post}
              onEdit={(post) => {
                setEditingPost(post);
                setIsModalOpen(true);
              }}
              onPublishStatusChange={(postId, newStatus) => {
                updateMutation.mutate({ id: postId, publishStatus: newStatus });
              }}
              onDelete={(post) => setPostToDelete(post)}
            />
          ))}
        </div>
      </div>

      <div className="na-pagination">
        <div className="pagination-controls">
          <button
            className="pagination-arrow"
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            ‹
          </button>
          {pages.map((page) => (
            <button
              key={page}
              className={`pagination-page ${currentPage === page ? 'active' : ''}`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
          <button
            className="pagination-arrow"
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
          >
            ›
          </button>
        </div>
        <div className="items-per-page">
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="items-select"
          >
            <option value={6}>6 / Page</option>
            <option value={10}>10 / Page</option>
            <option value={20}>20 / Page</option>
            <option value={50}>50 / Page</option>
          </select>
        </div>
      </div>

      <PostModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingPost(null);
        }}
        onSave={(postData) => {
          if (editingPost) {
            updateMutation.mutate({
              id: editingPost.id,
              title: postData.title,
              description: postData.description,
              type: postData.type,
              thumbnail: postData.thumbnail,
              status: postData.status,
              publishStatus: postData.publishStatus
            });
          } else {
            createMutation.mutate({
              title: postData.title,
              description: postData.description,
              type: postData.type,
              thumbnail: postData.thumbnail,
              status: postData.status,
              publishStatus: postData.publishStatus
            });
          }
        }}
        post={editingPost}
      />
      {postToDelete && (
        <div className="modal-overlay delete" onClick={() => setPostToDelete(null)}>
          <div className="delete-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close delete-close" onClick={() => setPostToDelete(null)}>×</button>
            <div className="delete-icon-wrapper">
              <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
                <circle cx="32" cy="32" r="30" fill="#ffeaea" />
                <path d="M26 28l.8 15h10.4l.8-15M24 28h16M28 28v-3a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v3" stroke="#E53935" strokeWidth="2.6" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <h3 className="delete-title">Delete Post</h3>
            <p className="delete-text">
              Are you sure you want to delete the post - <span>{postToDelete.title}</span>?
            </p>
            <div className="delete-actions">
              <button className="btn-cancel delete-cancel" onClick={() => setPostToDelete(null)}>No</button>
              <button
                className="btn-save delete-confirm"
                onClick={() => {
                  if (postToDelete) {
                    deleteMutation.mutate(postToDelete.id);
                    setPostToDelete(null);
                  }
                }}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsAnnouncements;

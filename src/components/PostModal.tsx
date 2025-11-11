import React, { useState, useEffect, useMemo } from 'react';
import './PostModal.css';
import az from "../img/az.png";
import en from "../img/en.png";
import upload from "../img/upload.png";
import success from "../img/success.png";
interface Post {
  id?: number;
  thumbnail: string;
  title: string;
  description: string;
  type: 'News' | 'Announcement';
  sharingDate?: string;
  sharingTime?: string;
  status: 'Active' | 'Inactive';
  publishStatus: string;
  author?: string;
}

interface PostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (post: Post) => void;
  post?: Post | null;
}

const PostModal: React.FC<PostModalProps> = ({ isOpen, onClose, onSave, post }) => {
  const [formData, setFormData] = useState<Post>({
    thumbnail: '',
    title: '',
    description: '',
    type: 'News',
    status: 'Active',
    publishStatus: 'Publish',
  });
  const [slug, setSlug] = useState<string>('');
  const [step, setStep] = useState<number>(1);
  const [lang, setLang] = useState<'AZ' | 'EN'>('AZ');
  const [coverPreview, setCoverPreview] = useState<string>('');
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const editorRef = React.useRef<HTMLDivElement>(null);
  const [category, setCategory] = useState<'' | 'News' | 'Announcement'>('');

  useEffect(() => {
    if (post) {
      setFormData(post);
      setCoverPreview(post.thumbnail || '');
      setCategory(post.type);
    } else {
      setFormData({
        thumbnail: '',
        title: '',
        description: '',
        type: 'News',
        status: 'Active',
        publishStatus: 'Publish',
      });
      setCoverPreview('');
      setCategory('');
    }
    setSlug('');
    setStep(1);
    setGalleryPreviews([]);
    setShowSuccess(false);
  }, [post, isOpen]);

  const canGoNext = useMemo(() => {
    return formData.title.trim().length > 0 && !!category;
  }, [formData.title, category]);

  const handleCoverUpload = (file: File | null) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setCoverPreview(url);
    setFormData({ ...formData, thumbnail: url });
  };

  const handleGalleryUpload = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const urls: string[] = [];
    Array.from(files).forEach((f) => {
      urls.push(URL.createObjectURL(f));
    });
    setGalleryPreviews([...galleryPreviews, ...urls]);
  };
  const removeGalleryAt = (index: number) => {
    setGalleryPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...formData, type: (category || 'News') as 'News' | 'Announcement' });
    setShowSuccess(true);
  };

  const focusEditor = () => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  const exec = (command: string, value?: string) => {
    focusEditor();
    // execCommand is deprecated but fine for a lightweight mock editor
    try {
      document.execCommand(command, false, value);
    } catch {
      // ignore
    }
    if (editorRef.current) {
      setFormData({ ...formData, description: editorRef.current.innerHTML });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
                      <button className="modal-close" onClick={onClose}>×</button>
          <div className="header-top">
            <div className="lang-toggle">
              <button
                type="button"
                className={`lang-pill ${lang === 'AZ' ? 'active' : ''}`}
                onClick={() => setLang('AZ')}
              >
                <img src={az} alt="" /> AZ
              </button>
              <button
                type="button"
                className={`lang-pill ${lang === 'EN' ? 'active' : ''}`}
                onClick={() => setLang('EN')}
              >
                <img src={en} alt="" />EN
              </button>
            </div>
          

          </div>
          <div className='modal-top'>
               <h2 className="modal-title">Create News / Announcement</h2>
              <div className="step-indicator">{step}/2</div>
          </div>
       
          <div className="progress-steps">
            <div className={`progress-segment ${step === 1 ? 'active' : ''}`} />
            <div className={`progress-segment ${step === 2 ? 'active' : ''}`} />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          {step === 1 && (
            <>
              <div className="two-col">
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    id="title"
                    placeholder="Enter title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="slug">Slug</label>
                  <div className="slug-input">
                    <span>naa.edu.az/</span>
                    <input
                      type="text"
                      id="slug"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label>Category</label>
                <div className="pill-toggle">
                  <button
                    type="button"
                    className={`pill ${category === 'News' ? 'selected' : ''}`}
                    onClick={() => setCategory('News')}
                  >
                    <span className="pill-icon" aria-hidden="true">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M4 5h12a2 2 0 0 1 2 2v12H6a2 2 0 0 1-2-2V5z" stroke="currentColor" strokeWidth="1.6" />
                        <path d="M8 9h8M8 13h8M8 17h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                      </svg>
                    </span>
                    <span>News</span>
                  </button>
                  <button
                    type="button"
                    className={`pill ${category === 'Announcement' ? 'selected' : ''}`}
                    onClick={() => setCategory('Announcement')}
                  >
                    <span className="pill-icon" aria-hidden="true">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M4 11h4l8-5v14l-8-5H4v-4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                        <path d="M4 19v-2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                      </svg>
                    </span>
                    <span>Announcement</span>
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label>Cover Image</label>
                <div className={`upload-tile ${coverPreview ? 'has-image' : ''}`}>
                  {coverPreview ? (
                    <img src={coverPreview} alt="Cover" />
                  ) : (
                    <span className="upload-label">
                      <img src={upload} alt="" />
                      Upload Cover Image
                    </span>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleCoverUpload(e.target.files ? e.target.files[0] : null)}
                  />
                </div>
              </div>

              <div className="form-group" id='html-content'>
                <label> <p><b>HTML Content</b></p>
                <p id='p'>Use the toolbar to format your text with bold, italic, headers, lists, and more.</p>
                </label>

                <div className="editor">
                  <div className="toolbar">
                    <button type="button" className="tool-btn bold" onClick={() => exec('bold')}>B</button>
                    <button type="button" className="tool-btn italic" onClick={() => exec('italic')}>I</button>
                    <button type="button" className="tool-btn underline" onClick={() => exec('underline')}>U</button>
                    <span className="tool-sep"></span>
                    <button type="button" className="tool-btn h1" onClick={() => exec('formatBlock', 'H1')}>H1</button>
                    <button type="button" className="tool-btn h2" onClick={() => exec('formatBlock', 'H2')}>H2</button>
                    <button type="button" className="tool-btn h3" onClick={() => exec('formatBlock', 'H3')}>H3</button>
                    <button type="button" className="tool-btn para" onClick={() => exec('formatBlock', 'P')}>P</button>
                    <span className="tool-sep"></span>
                    <button type="button" className="tool-btn align-left" aria-label="Align left" onClick={() => exec('justifyLeft')}></button>
                    <button type="button" className="tool-btn align-center" aria-label="Align center" onClick={() => exec('justifyCenter')}></button>
                    <button type="button" className="tool-btn align-right" aria-label="Align right" onClick={() => exec('justifyRight')}></button>
                    <span className="tool-sep"></span>
                    <button type="button" className="tool-btn ul" aria-label="Bullet list" onClick={() => exec('insertUnorderedList')}></button>
                    <button type="button" className="tool-btn ol" aria-label="Numbered list" onClick={() => exec('insertOrderedList')}></button>
                    <span className="tool-sep"></span>
                    <button
                      type="button"
                      className="tool-btn link"
                      aria-label="Link"
                      onClick={() => {
                        const url = window.prompt('Enter URL');
                        if (url) exec('createLink', url);
                      }}
                    >
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path d="M10.59 13.41a1.996 1.996 0 0 0 2.82 0l3.59-3.59a2 2 0 1 0-2.83-2.83l-1.17 1.17" stroke="currentColor" strokeWidth="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M13.41 10.59a1.996 1.996 0 0 0-2.82 0l-3.59 3.59a2 2 0 1 0 2.83 2.83l1.17-1.17" stroke="currentColor" strokeWidth="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </button>
                    <button
                      type="button"
                      className="tool-btn eraser"
                      aria-label="Clear"
                      onClick={() => {
                        exec('removeFormat');
                        exec('formatBlock', 'P');
                      }}
                    >
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path d="M3.5 14.5 11 7a2.828 2.828 0 0 1 4 0l3 3a2.828 2.828 0 0 1 0 4l-5.5 5.5H4.75a1.25 1.25 0 0 1-1.25-1.25V16z" stroke="currentColor" strokeWidth="1.8" stroke-linejoin="round"/>
                        <path d="M9 20h9.5" stroke="currentColor" strokeWidth="1.8" stroke-linecap="round"/>
                      </svg>
                    </button>
                  </div>
                  <div
                    className="editor-area"
                    contentEditable
                    ref={editorRef}
                    onInput={(e) => setFormData({ ...formData, description: (e.currentTarget as HTMLDivElement).innerHTML })}
                    dangerouslySetInnerHTML={{ __html: formData.description }}
                  />
                </div>
              </div>

              <div className="modal-actions spaced">
            
                <button
                  type="button"
                  className="btn-save"
                  onClick={() => setStep(2)}
                  disabled={!canGoNext}
                >
                  Next
                </button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="gallery-header">
                <div className="stepper second">2/2</div>
                <h3>Gallery Images</h3>
                <p>JPG/PNG, multiple allowed</p>
              </div>
              <div className="gallery-dropzone">
                <div className="upload-zone">
                  <span className="upload-label">
                    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M12 16V6" stroke="currentColor" strokeWidth="1.8" stroke-linecap="round"/>
                      <path d="M8 10l4-4 4 4" stroke="currentColor" strokeWidth="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M4 18h16" stroke="currentColor" strokeWidth="1.8" stroke-linecap="round"/>
                    </svg>
                    Upload an image
                  </span>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleGalleryUpload(e.target.files)}
                  />
                </div>
             
              </div>
   {galleryPreviews.length > 0 && (
                  <div className="gallery-previews">
                    {galleryPreviews.map((url, idx) => (
                      <div className="preview-item" key={idx}>
                        <button
                          type="button"
                          className="delete-badge"
                          aria-label="Remove image"
                          onClick={() => removeGalleryAt(idx)}
                        >
                          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <circle cx="12" cy="12" r="10" fill="white" />
                            <path d="M9 9l.6 8h4.8l.6-8M8 9h8M10 9V7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2" stroke="#E53935" strokeWidth="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                        </button>
                        <img
                          src={url}
                          alt={`Gallery ${idx}`}
                          onClick={() => removeGalleryAt(idx)}
                        />
                      </div>
                    ))}
                  </div>
                )}
              <div className="modal-actions spaced">
                <button type="button" className="btn-cancel" onClick={() => setStep(1)}>
                Cancel
                </button>
                <button type="submit" className="submit " >
                  Submit
                </button>
              </div>
            </>
          )}
        </form>
      </div>

      {showSuccess && (
        <div className="success-overlay" onClick={() => { setShowSuccess(false); onClose(); }}>
          <div className="success-card" onClick={(e) => e.stopPropagation()}>
            <div className="success-icon"><img src={success} alt="" /></div>
            <h3>Added Successfully!</h3>
            <p>Your news added successfully</p>
            <button className="btn-save" onClick={() => { setShowSuccess(false); onClose(); }}>
              Ok
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostModal;


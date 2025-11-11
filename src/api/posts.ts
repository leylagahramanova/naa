import { initialPosts } from '../data/posts';

export type PostType = 'News' | 'Announcement';
export type PostStatus = 'Active' | 'Inactive';

export interface Post {
  id: number;
  thumbnail: string;
  title: string;
  description: string;
  type: PostType;
  sharingDate: string;
  sharingTime: string;
  status: PostStatus;
  publishStatus: string;
  author: string;
}

export interface CreatePostPayload {
  title: string;
  description: string;
  type: PostType;
  thumbnail: string;
  status: PostStatus;
  publishStatus: string;
}

export interface UpdatePostPayload extends Partial<CreatePostPayload> {
  id: number;
}

// Local storage persistence
const STORAGE_KEY = 'postsDb';
function loadFromStorage(): Post[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [...initialPosts];
    const parsed = JSON.parse(raw) as Post[];
    return Array.isArray(parsed) ? parsed : [...initialPosts];
  } catch {
    return [...initialPosts];
  }
}
function saveToStorage(posts: Post[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  } catch {
    // ignore quota or serialization errors in mock layer
  }
}

// In-memory mock DB hydrated from storage
let postsDb: Post[] = loadFromStorage();

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

const parseDateTime = (post: Post): number => {
  try {
    const [monthStr, dayStr, yearStr] = post.sharingDate.split('/');
    const [timePart, periodRaw] = post.sharingTime.split(' ');
    const [hourStr, minuteStr] = timePart.split(':');
    const month = Number(monthStr) - 1;
    const day = Number(dayStr);
    const year = Number(yearStr);
    let hour = Number(hourStr);
    const minute = Number(minuteStr);
    const period = periodRaw ? periodRaw.toUpperCase() : '';
    if (period === 'PM' && hour < 12) {
      hour += 12;
    } else if (period === 'AM' && hour === 12) {
      hour = 0;
    }
    if (Number.isNaN(year) || Number.isNaN(month) || Number.isNaN(day) || Number.isNaN(hour) || Number.isNaN(minute)) {
      return Number.MIN_SAFE_INTEGER;
    }
    return new Date(year, month, day, hour, minute).getTime();
  } catch {
    return Number.MIN_SAFE_INTEGER;
  }
};

export async function getPosts(): Promise<Post[]> {
  await delay(150);
  // return newest first (by id) and copy to emulate network serialization
  return postsDb
    .slice()
    .sort((a, b) => {
      const bTime = parseDateTime(b);
      const aTime = parseDateTime(a);
      if (bTime === aTime) {
        return b.id - a.id;
      }
      return bTime - aTime;
    })
    .map(p => ({ ...p }));
}

export async function createPost(payload: CreatePostPayload): Promise<Post> {
  await delay(150);
  const now = new Date();
  const newPost: Post = {
    id: Math.max(0, ...postsDb.map(p => p.id)) + 1,
    title: payload.title,
    description: payload.description,
    type: payload.type,
    thumbnail: payload.thumbnail,
    status: payload.status,
    publishStatus: payload.publishStatus,
    author: 'snovurzlu',
    sharingDate: now.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }),
    sharingTime: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
  };
  postsDb.push(newPost);
  saveToStorage(postsDb);
  return { ...newPost };
}

export async function updatePost(payload: UpdatePostPayload): Promise<Post> {
  await delay(150);
  const idx = postsDb.findIndex(p => p.id === payload.id);
  if (idx === -1) {
    throw new Error('Post not found');
  }
  const updated = { ...postsDb[idx], ...payload };
  postsDb[idx] = updated as Post;
  saveToStorage(postsDb);
  return { ...updated };
}

export async function deletePost(id: number): Promise<void> {
  await delay(150);
  postsDb = postsDb.filter(p => p.id !== id);
  saveToStorage(postsDb);
}



import post1 from '../posts/post1.png';
import post2 from '../posts/post2.png';
import post3 from '../posts/post3.png';
import post4 from '../posts/post4.png';
import post5 from '../posts/post5.png';
import post6 from '../posts/post6.png';

export interface PostData {
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

export const initialPosts: PostData[] = [
  {
    id: 1,
    thumbnail: post1,
    title: 'Milli Aviasiya Akademiyasının təşkilatçılığı ilə',
    description: 'Milli Aviasiya Akademiyasının təşkilatçılığı ilə hayata keçirilən',
    type: 'News',
    sharingDate: '06/11/2025',
    sharingTime: '10:19 AM',
    status: 'Active',
    publishStatus: 'Publish',
    author: 'snovruzlu'
  },
  {
    id: 2,
    thumbnail: post2,
    title: 'Yeni təlim proqramı haqqında məlumat',
    description: 'Akademiyada yeni təlim proqramı təqdim olunub',
    type: 'Announcement',
    sharingDate: '05/11/2025',
    sharingTime: '14:30 PM',
    status: 'Active',
    publishStatus: 'Publish',
    author: 'snovruzlu'
  },
  {
    id: 3,
    thumbnail: post3,
    title: 'Təhsil sistemində yeniliklər',
    description: 'Təhsil sistemində aparılan yeniliklər haqqında',
    type: 'News',
    sharingDate: '04/11/2025',
    sharingTime: '09:15 AM',
    status: 'Active',
    publishStatus: 'Publish',
    author: 'snovruzlu'
  },
  {
    id: 4,
    thumbnail: post4,
    title: 'Tədbir elanı',
    description: 'Gələcək həftə tədbir elanı haqqında məlumat',
    type: 'Announcement',
    sharingDate: '03/11/2025',
    sharingTime: '16:45 PM',
    status: 'Active',
    publishStatus: 'Publish',
    author: 'snovruzlu'
  },
  {
    id: 5,
    thumbnail: post5,
    title: 'Məzunların görüşü',
    description: 'Məzunların görüşü haqqında məlumat',
    type: 'News',
    sharingDate: '02/11/2025',
    sharingTime: '11:20 AM',
    status: 'Active',
    publishStatus: 'Draft',
    author: 'snovruzlu'
  },
  {
    id: 6,
    thumbnail: post6,
    title: 'Yeni kursların açılışı',
    description: 'Yeni kursların açılışı haqqında məlumat',
    type: 'Announcement',
    sharingDate: '01/11/2025',
    sharingTime: '13:00 PM',
    status: 'Active',
    publishStatus: 'Publish',
    author: 'snovruzlu'
  },
  {
    id: 7,
    thumbnail: post1,
    title: 'Milli Aviasiya Akademiyasının təşkilatçılığı ilə',
    description: 'Milli Aviasiya Akademiyasının təşkilatçılığı ilə hayata keçirilən',
    type: 'News',
    sharingDate: '06/11/2025',
    sharingTime: '10:19 AM',
    status: 'Inactive',
    publishStatus: 'Publish',
    author: 'snovruzlu'
  },
  {
    id: 8,
    thumbnail: post2,
    title: 'Yeni təlim proqramı haqqında məlumat',
    description: 'Akademiyada yeni təlim proqramı təqdim olunub',
    type: 'Announcement',
    sharingDate: '05/11/2025',
    sharingTime: '14:30 PM',
    status: 'Inactive',
    publishStatus: 'Publish',
    author: 'snovruzlu'
  },
  {
    id: 9,
    thumbnail: post3,
    title: 'Təhsil sistemində yeniliklər',
    description: 'Təhsil sistemində aparılan yeniliklər haqqında',
    type: 'News',
    sharingDate: '04/11/2025',
    sharingTime: '09:15 AM',
    status: 'Inactive',
    publishStatus: 'Publish',
    author: 'snovruzlu'
  },
  {
    id: 10,
    thumbnail: post4,
    title: 'Tədbir elanı',
    description: 'Gələcək həftə tədbir elanı haqqında məlumat',
    type: 'Announcement',
    sharingDate: '03/11/2025',
    sharingTime: '16:45 PM',
    status: 'Inactive',
    publishStatus: 'Publish',
    author: 'snovruzlu'
  },
{
    id: 11,
    thumbnail: post1,
    title: 'Milli Aviasiya Akademiyasının təşkilatçılığı ilə',
    description: 'Milli Aviasiya Akademiyasının təşkilatçılığı ilə hayata keçirilən',
    type: 'News',
    sharingDate: '06/11/2025',
    sharingTime: '10:19 AM',
    status: 'Active',
    publishStatus: 'Publish',
    author: 'snovruzlu'
  },
  {
    id: 12,
    thumbnail: post2,
    title: 'Yeni təlim proqramı haqqında məlumat',
    description: 'Akademiyada yeni təlim proqramı təqdim olunub',
    type: 'Announcement',
    sharingDate: '05/11/2025',
    sharingTime: '14:30 PM',
    status: 'Active',
    publishStatus: 'Publish',
    author: 'snovruzlu'
  },
  {
    id: 13,
    thumbnail: post3,
    title: 'Təhsil sistemində yeniliklər',
    description: 'Təhsil sistemində aparılan yeniliklər haqqında',
    type: 'News',
    sharingDate: '04/11/2025',
    sharingTime: '09:15 AM',
    status: 'Active',
    publishStatus: 'Publish',
    author: 'snovruzlu'
  },
  {
    id: 14,
    thumbnail: post4,
    title: 'Tədbir elanı',
    description: 'Gələcək həftə tədbir elanı haqqında məlumat',
    type: 'Announcement',
    sharingDate: '03/11/2025',
    sharingTime: '16:45 PM',
    status: 'Active',
    publishStatus: 'Publish',
    author: 'snovruzlu'
  },
  {
    id: 15,
    thumbnail: post5,
    title: 'Məzunların görüşü',
    description: 'Məzunların görüşü haqqında məlumat',
    type: 'News',
    sharingDate: '02/11/2025',
    sharingTime: '11:20 AM',
    status: 'Active',
    publishStatus: 'Draft',
    author: 'snovruzlu'
  },
  {
    id: 16,
    thumbnail: post6,
    title: 'Yeni kursların açılışı',
    description: 'Yeni kursların açılışı haqqında məlumat',
    type: 'Announcement',
    sharingDate: '01/11/2025',
    sharingTime: '13:00 PM',
    status: 'Active',
    publishStatus: 'Publish',
    author: 'snovruzlu'
  },
  {
    id: 17,
    thumbnail: post1,
    title: 'Milli Aviasiya Akademiyasının təşkilatçılığı ilə',
    description: 'Milli Aviasiya Akademiyasının təşkilatçılığı ilə hayata keçirilən',
    type: 'News',
    sharingDate: '06/11/2025',
    sharingTime: '10:19 AM',
    status: 'Inactive',
    publishStatus: 'Publish',
    author: 'snovruzlu'
  },
  {
    id: 18,
    thumbnail: post2,
    title: 'Yeni təlim proqramı haqqında məlumat',
    description: 'Akademiyada yeni təlim proqramı təqdim olunub',
    type: 'Announcement',
    sharingDate: '05/11/2025',
    sharingTime: '14:30 PM',
    status: 'Inactive',
    publishStatus: 'Publish',
    author: 'snovruzlu'
  },
  {
    id: 19,
    thumbnail: post3,
    title: 'Təhsil sistemində yeniliklər',
    description: 'Təhsil sistemində aparılan yeniliklər haqqında',
    type: 'News',
    sharingDate: '04/11/2025',
    sharingTime: '09:15 AM',
    status: 'Inactive',
    publishStatus: 'Publish',
    author: 'snovruzlu'
  },
  {
    id: 20,
    thumbnail: post4,
    title: 'Tədbir elanı',
    description: 'Gələcək həftə tədbir elanı haqqında məlumat',
    type: 'Announcement',
    sharingDate: '03/11/2025',
    sharingTime: '16:45 PM',
    status: 'Inactive',
    publishStatus: 'Publish',
    author: 'snovruzlu'
  },
  {
    id: 21,
    thumbnail: post1,
    title: 'Milli Aviasiya Akademiyasının təşkilatçılığı ilə',
    description: 'Milli Aviasiya Akademiyasının təşkilatçılığı ilə hayata keçirilən',
    type: 'News',
    sharingDate: '06/11/2025',
    sharingTime: '10:19 AM',
    status: 'Active',
    publishStatus: 'Publish',
    author: 'snovruzlu'
  },
  {
    id: 22,
    thumbnail: post2,
    title: 'Yeni təlim proqramı haqqında məlumat',
    description: 'Akademiyada yeni təlim proqramı təqdim olunub',
    type: 'Announcement',
    sharingDate: '05/11/2025',
    sharingTime: '14:30 PM',
    status: 'Active',
    publishStatus: 'Publish',
    author: 'snovruzlu'
  },
  {
    id: 23,
    thumbnail: post3,
    title: 'Təhsil sistemində yeniliklər',
    description: 'Təhsil sistemində aparılan yeniliklər haqqında',
    type: 'News',
    sharingDate: '04/11/2025',
    sharingTime: '09:15 AM',
    status: 'Active',
    publishStatus: 'Publish',
    author: 'snovruzlu'
  },
  {
    id: 24,
    thumbnail: post4,
    title: 'Tədbir elanı',
    description: 'Gələcək həftə tədbir elanı haqqında məlumat',
    type: 'Announcement',
    sharingDate: '03/11/2025',
    sharingTime: '16:45 PM',
    status: 'Active',
    publishStatus: 'Publish',
    author: 'snovruzlu'
  },
  {
    id: 25,
    thumbnail: post5,
    title: 'Məzunların görüşü',
    description: 'Məzunların görüşü haqqında məlumat',
    type: 'News',
    sharingDate: '02/11/2025',
    sharingTime: '11:20 AM',
    status: 'Active',
    publishStatus: 'Draft',
    author: 'snovruzlu'
  },
  {
    id: 26,
    thumbnail: post6,
    title: 'Yeni kursların açılışı',
    description: 'Yeni kursların açılışı haqqında məlumat',
    type: 'Announcement',
    sharingDate: '01/11/2025',
    sharingTime: '13:00 PM',
    status: 'Active',
    publishStatus: 'Publish',
    author: 'snovruzlu'
  },
  {
    id: 27,
    thumbnail: post1,
    title: 'Milli Aviasiya Akademiyasının təşkilatçılığı ilə',
    description: 'Milli Aviasiya Akademiyasının təşkilatçılığı ilə hayata keçirilən',
    type: 'News',
    sharingDate: '06/11/2025',
    sharingTime: '10:19 AM',
    status: 'Inactive',
    publishStatus: 'Publish',
    author: 'snovruzlu'
  },
  {
    id: 28,
    thumbnail: post2,
    title: 'Yeni təlim proqramı haqqında məlumat',
    description: 'Akademiyada yeni təlim proqramı təqdim olunub',
    type: 'Announcement',
    sharingDate: '05/11/2025',
    sharingTime: '14:30 PM',
    status: 'Inactive',
    publishStatus: 'Publish',
    author: 'snovruzlu'
  },
  {
    id: 29,
    thumbnail: post3,
    title: 'Təhsil sistemində yeniliklər',
    description: 'Təhsil sistemində aparılan yeniliklər haqqında',
    type: 'News',
    sharingDate: '04/11/2025',
    sharingTime: '09:15 AM',
    status: 'Inactive',
    publishStatus: 'Publish',
    author: 'snovruzlu'
  },
  {
    id: 30,
    thumbnail: post4,
    title: 'Tədbir elanı',
    description: 'Gələcək həftə tədbir elanı haqqında məlumat',
    type: 'Announcement',
    sharingDate: '03/11/2025',
    sharingTime: '16:45 PM',
    status: 'Inactive',
    publishStatus: 'Publish',
    author: 'snovruzlu'
  },
];



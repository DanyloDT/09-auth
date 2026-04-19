import { Metadata } from 'next';

import Image from 'next/image';
import css from './ProfilePage.module.css';
import Link from 'next/link';

import { getMeServer } from '@/lib/api/serverApi';

export const metadata: Metadata = {
  title: 'Profile | NoteHub',
  description: 'View and manage your profile information on NoteHub.',
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: 'Profile | NoteHub',
    description: 'View and manage your profile information on NoteHub.',
    url: '/profile',
    siteName: 'NoteHub',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub Profile Page',
      },
    ],
    type: 'website',
  },
};

const Profile = async () => {
  const user = await getMeServer();
  const avatarSrc =
    user?.avatar && user.avatar.trim() !== ''
      ? user.avatar
      : '/default-avatar.jpg';

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={avatarSrc}
            alt={user?.username ? `${user.username} avatar` : 'User avatar'}
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user?.username ?? 'User'}</p>
          <p>Email: {user?.email ?? 'Email not provided'}</p>
        </div>
      </div>
    </main>
  );
};

export default Profile;

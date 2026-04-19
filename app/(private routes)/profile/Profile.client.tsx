'use client';

import Image from 'next/image';
import css from './ProfilePage.module.css';
import Link from 'next/link';
import { useAuthStore } from '@/lib/store/authStore';

export const ProfileClients = () => {
  const user = useAuthStore((state) => state.user);

  const avatarSrc =
    user?.avatar && user.avatar.trim() !== ''
      ? user.avatar
      : '/public/default-avatar.jpg';

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

export default ProfileClients;

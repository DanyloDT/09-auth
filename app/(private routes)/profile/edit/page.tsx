'use client';

import { useEffect, useState } from 'react';
import { getMe, updateMe } from '@/lib/api/clientApi';
import { User } from '@/types/user';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import Image from 'next/image';
import css from './EditProfilePage.module.css';

const EditProfilePage = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await getMe();
        setUserData(res);
        setUser(res);
      } catch (error) {
        console.error('Failed to load profile', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMe();
  }, [setUser]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUserData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSaveUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userData) return;

    try {
      setIsSaving(true);

      const updatedUser = await updateMe({
        username: userData.username,
      });

      setUser(updatedUser);
      router.replace('/profile');
    } catch (error) {
      console.error('Failed to update profile', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const avatarSrc =
    userData?.avatar && userData.avatar.trim() !== ''
      ? userData.avatar
      : '/default-avatar.jpg';

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={avatarSrc}
          alt={
            userData?.username ? `${userData.username} avatar` : 'User avatar'
          }
          width={120}
          height={120}
          className={css.avatar}
        />

        <form className={css.profileInfo} onSubmit={handleSaveUser}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              name="username"
              type="text"
              value={userData?.username ?? '-'}
              className={css.input}
              onChange={handleInputChange}
            />
          </div>

          <p>Email: {userData?.email ?? '-'}</p>

          <div className={css.actions}>
            <button
              type="submit"
              className={css.saveButton}
              disabled={!userData || isSaving}
            >
              {isSaving ? 'Saving...' : 'Save'}
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default EditProfilePage;

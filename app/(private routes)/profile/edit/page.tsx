'use client';

import { useEffect, useState } from 'react';
import { getMe, updateMe } from '@/lib/api/clientApi';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import Image from 'next/image';
import css from './EditProfilePage.module.css';

const EditProfilePage = () => {
  const router = useRouter();
  const [username, setUsername] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const { user } = useAuthStore();
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await getMe();
        setUser(res);
        setUsername(res.username ?? '');
      } catch (error) {
        console.error('Failed to load profile', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMe();
  }, [setUser]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleSaveUser = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();

    const trimmedUsername = username.trim();

    if (!trimmedUsername) return;

    try {
      setIsSaving(true);

      const updatedUser = await updateMe({ username: trimmedUsername });

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
    user?.avatar && user.avatar.trim() !== ''
      ? user.avatar
      : '/default-avatar.jpg';

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={avatarSrc}
          alt={user?.username ? `${user.username} avatar` : 'User avatar'}
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
              value={username}
              className={css.input}
              onChange={handleInputChange}
            />
          </div>

          <p>Email: {user?.email ?? '-'}</p>

          <div className={css.actions}>
            <button
              type="submit"
              className={css.saveButton}
              disabled={!username.trim() || isSaving}
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

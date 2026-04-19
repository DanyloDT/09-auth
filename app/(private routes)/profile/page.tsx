import { Metadata } from 'next';

import { ProfileClients } from './Profile.client';

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

const Profile = () => {
  return <ProfileClients />;
};

export default Profile;

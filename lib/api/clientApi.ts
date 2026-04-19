import type { Note } from '@/types/note';
import type { User } from '@/types/user';
import { nextServer } from './api';

interface FetchNotesParams {
  page: number;
  perPage?: number;
  search?: string;
  tag?: string;
}

interface FetchNoteResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  params: FetchNotesParams,
): Promise<FetchNoteResponse> => {
  const { data } = await nextServer.get<FetchNoteResponse>('/notes', {
    params,
  });

  return data;
};

export const createNote = async (
  params: Pick<Note, 'title' | 'content' | 'tag'>,
): Promise<Note> => {
  const { data } = await nextServer.post<Note>('/notes', params);
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await nextServer.get<Note>(`/notes/${id}`);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await nextServer.delete<Note>(`/notes/${id}`);
  return data;
};

export type RegisterRequest = {
  email: string;
  password: string;
  username: string;
};

export const register = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>('/auth/register', data);
  return res.data;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export const login = async (data: LoginRequest) => {
  const res = await nextServer.post<User>('/auth/login', data);
  return res.data;
};
export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout');
};

type CheckSessionRequest = {
  success: boolean;
};

export const checkSession = async () => {
  const res = await nextServer.get<CheckSessionRequest>('/auth/session');

  return res.data.success;
};

export const getMe = async (): Promise<User> => {
  const { data } = await nextServer.get<User>('/users/me');

  return data;
};

export const updateMe = async ({
  username,
}: {
  username: string;
}): Promise<User> => {
  const { data } = await nextServer.patch<User>('/users/me', { username });

  return data;
};

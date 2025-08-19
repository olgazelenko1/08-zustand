import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { NewNoteData } from '../../types/note';

type initialDraft = {
  draft: NewNoteData;
  setDraft: (note: NewNoteData) => void;
  clearDraft: () => void;
};
export const initialDraft = {
  title: '',
  content: '',
  tag: '',
};

type Draft = typeof initialDraft;

type NoteStore = {
  draft: Draft;
  setDraft: (note: Partial<Draft>) => void;
  clearDraft: () => void;
};

export const useNoteStore = create<NoteStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) =>
        set((state) => ({
          draft: { ...state.draft, ...note },
        })),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: 'note-draft',
      partialize: (state: NoteStore) => ({ draft: state.draft }),
    }
  )
);

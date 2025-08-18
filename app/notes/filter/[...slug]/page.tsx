import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import type { FetchNotesResponse } from "@/lib/api";
import { Metadata } from "next";

interface NotesPageProps {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: NotesPageProps): Promise<Metadata> {
  const { slug } = await params;
  const filterName = slug.join(", ");

  return {
    title: `Notes - ${filterName}`,
    description: `A list of notes filtered by: ${filterName}`,
    openGraph: {
      title: `Notes - ${filterName}`,
      description: `A list of notes filtered by: ${filterName}`,
      url: 'https://08-zustand-wheat.vercel.app/notes/filter/' + slug.join('/'),
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: 'Notes Open Graph Image',
        },
      ],
    },

  };
}

export default async function NotesByTags({ params }: NotesPageProps) {
  const { slug } = await params;

  const page = 1;
  const perPage = 12;
  const search = "";
  const tag = slug[0] === "all" ? undefined : slug[0];

  const initialData: FetchNotesResponse = await fetchNotes(page, perPage, search, tag);

  return <NotesClient initialData={initialData} tag={tag || "All"} />;
}


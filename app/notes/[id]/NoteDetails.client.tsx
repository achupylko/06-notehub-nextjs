'use client';

import { Note } from '@/types/note';
import { getNoteById } from '@/lib/api';
import { useParams } from 'next/navigation';

import css from './NoteDetails.module.css';
import { useQuery } from '@tanstack/react-query';
import Loader from '@/components/Loader/Loader';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';

export default function NoteDetailsClient() {
  const { id } = useParams<Note>();

  const {
    data: note,
    isSuccess,
    isFetching,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => getNoteById(id),
    refetchOnMount: false,
  });

  if (!note) {
    return;
  }

  const formattedDate = note.updatedAt
    ? `Updated at: ${note.updatedAt}`
    : `Created at: ${note.createdAt}`;

  return (
    <div>
      <div className={css.container}>
        {(isLoading || isFetching) && <Loader />}

        {isError && <ErrorMessage message={(error as Error).message} />}

        {isSuccess && (
          <div className={css.item}>
            <div className={css.header}>
              <h2>{note.title}</h2>
            </div>
            <p className={css.tag}>{note.tag}</p>
            <p className={css.content}>{note.content}</p>
            <p className={css.date}>{formattedDate}</p>
          </div>
        )}
      </div>
    </div>
  );
}

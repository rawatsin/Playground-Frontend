"use client";

import { useEffect, useState } from "react";

type Comment = {
  _id: string;
  name: string;
  email: string;
  movie_id: string;
  text: string;
  date: string;
};

const Page = () => {
  const [comm, setComm] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/comments")
      .then((res) => res.json())
      .then((data: Comment[]) => {
        console.log(data);
        setComm(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white text-sm font-mono text-neutral-400 dark:bg-[#0a0a0a] dark:text-neutral-500">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-6 py-12 text-neutral-900 transition-colors dark:bg-[#0a0a0a] dark:text-neutral-100 md:px-12">
      <div className="mx-auto max-w-3xl space-y-4">
        {comm.map((comment) => (
          <div
            key={comment._id}
            className="rounded-lg border border-neutral-200/80 bg-neutral-50/40 p-5 transition hover:border-neutral-300 dark:border-neutral-800/80 dark:bg-neutral-900/30 dark:hover:border-neutral-700"
          >
            <p className="font-medium text-neutral-900 dark:text-neutral-100">
              {comment.name}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
              {comment.text}
            </p>
            <p className="mt-3 text-xs font-mono text-neutral-400 dark:text-neutral-500">
              {comment.date}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Comment = {
  _id: string;
  name: string;
  email: string;
  movie_id: string;
  text: string;
  date: string;
};

type PaginationInfo = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

type ApiResponse = {
  data: Comment[];
  pagination: PaginationInfo;
};

const Page = () => {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5);
  const [comm, setComm] = useState<Comment[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchComments = async (pageNum: number, limitNum: number) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `http://localhost:5000/api/comments?page=${pageNum}&limit=${limitNum}`
      );

      if (!res.ok) {
        throw new Error(`Failed to fetch comments (Status: ${res.status})`);
      }

      const responseData: ApiResponse = await res.json();
      setComm(responseData.data || []);
      setPagination(responseData.pagination || null);
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while fetching comments."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments(page, limit);
  }, [page, limit]);

  const handlePageChange = (newPage: number) => {
    if (pagination && newPage >= 1 && newPage <= pagination.totalPages) {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return isNaN(d.getTime())
        ? dateStr
        : d.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="min-h-screen bg-white px-6 py-12 text-neutral-900 transition-colors dark:bg-[#0a0a0a] dark:text-neutral-100 md:px-12">
      <div className="mx-auto max-w-3xl">
        {/* Header with Navigation */}
        <div className="mb-8 flex items-center justify-between border-b border-neutral-200/80 pb-6 dark:border-neutral-800/80">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
              Pagination
            </h1>
            <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
              Server-side pagination with MongoDB limit & skip.
            </p>
          </div>
          <Link
            href="/"
            className="rounded-lg border border-neutral-200/80 bg-neutral-50/50 px-3 py-1.5 text-xs font-mono text-neutral-600 transition hover:bg-neutral-100 hover:text-neutral-900 dark:border-neutral-800/80 dark:bg-neutral-900/40 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
          >
            ← Home
          </Link>
        </div>

        {/* Loading State (Initial) */}
        {loading && comm.length === 0 && !error && (
          <div className="flex min-h-[300px] items-center justify-center rounded-lg border border-neutral-200/80 bg-neutral-50/20 text-sm font-mono text-neutral-400 dark:border-neutral-800/80 dark:bg-neutral-900/20 dark:text-neutral-500">
            Loading comments...
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="rounded-lg border border-red-200/80 bg-red-50/40 p-6 text-center dark:border-red-900/50 dark:bg-red-950/20">
            <p className="text-sm font-medium text-red-600 dark:text-red-400">
              {error}
            </p>
            <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
              Make sure the backend server is running on port 5000.
            </p>
            <button
              onClick={() => fetchComments(page, limit)}
              className="mt-4 rounded-lg border border-neutral-300 bg-white px-4 py-1.5 text-xs font-mono text-neutral-800 transition hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800"
            >
              Retry
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && comm.length === 0 && (
          <div className="rounded-lg border border-neutral-200/80 bg-neutral-50/40 p-12 text-center text-sm font-mono text-neutral-500 dark:border-neutral-800/80 dark:bg-neutral-900/30 dark:text-neutral-400">
            No comments found.
          </div>
        )}

        {/* Comments List */}
        {!error && comm.length > 0 && (
          <div className="space-y-4">
            <div
              className={`space-y-4 transition-opacity duration-150 ${
                loading ? "opacity-50 pointer-events-none" : "opacity-100"
              }`}
            >
              {comm.map((comment) => (
                <div
                  key={comment._id}
                  className="rounded-lg border border-neutral-200/80 bg-neutral-50/40 p-5 transition hover:border-neutral-300 dark:border-neutral-800/80 dark:bg-neutral-900/30 dark:hover:border-neutral-700"
                >
                  <div className="flex items-start justify-between gap-4">
                    <p className="font-medium text-neutral-900 dark:text-neutral-100">
                      {comment.name}
                    </p>
                    <p className="shrink-0 text-xs font-mono text-neutral-400 dark:text-neutral-500">
                      {formatDate(comment.date)}
                    </p>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                    {comment.text}
                  </p>
                  {comment.email && (
                    <p className="mt-3 text-xs font-mono text-neutral-400/80 dark:text-neutral-500/80">
                      {comment.email}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {pagination && (
              <div className="mt-8 flex flex-col gap-4 border-t border-neutral-200/80 pt-6 dark:border-neutral-800/80 sm:flex-row sm:items-center sm:justify-between">
                {/* Information / Total */}
                <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
                  Showing {(pagination.page - 1) * pagination.limit + 1}–
                  {Math.min(
                    pagination.page * pagination.limit,
                    pagination.total
                  )}{" "}
                  of {pagination.total.toLocaleString()} comments
                </div>

                {/* Controls (Limit selector + Previous/Next) */}
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400 font-mono">
                    <label htmlFor="limit-select">Limit:</label>
                    <select
                      id="limit-select"
                      value={limit}
                      onChange={(e) => handleLimitChange(Number(e.target.value))}
                      disabled={loading}
                      className="rounded border border-neutral-200 bg-neutral-50 px-2 py-1 text-xs font-mono text-neutral-800 focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200"
                    >
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={20}>20</option>
                      <option value={50}>50</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handlePageChange(page - 1)}
                      disabled={page <= 1 || loading}
                      className="rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-mono text-neutral-700 transition hover:bg-neutral-100 disabled:opacity-40 disabled:pointer-events-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800"
                    >
                      Previous
                    </button>

                    <span className="text-xs font-mono text-neutral-600 dark:text-neutral-400 px-1">
                      {page} / {pagination.totalPages}
                    </span>

                    <button
                      onClick={() => handlePageChange(page + 1)}
                      disabled={page >= pagination.totalPages || loading}
                      className="rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-mono text-neutral-700 transition hover:bg-neutral-100 disabled:opacity-40 disabled:pointer-events-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;

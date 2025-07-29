"use client";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="container mx-auto py-8 text-center">
      <h2 className="text-2xl font-semibold text-red-600">Something went wrong!</h2>
      <p className="mt-4">{error.message}</p>
      <button
        onClick={reset}
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        Try Again
      </button>
    </div>
  );
}
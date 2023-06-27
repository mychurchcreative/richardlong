export default function CustomErrorBoundary({ error }: { error?: unknown }) {
  return (
    <main className="grid min-h-screen place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
          Unknown Error
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600 dark:text-indigo-300">
          {/* {error ? error.toString() : "Oops! Something went wrong."} */}
          Oops! Something went wrong.
        </p>
      </div>
    </main>
  );
}

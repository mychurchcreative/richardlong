// import React from 'react';

// import { Button } from './button';

export function ExitPreview() {
  return (
    <div className="pointer-events-none fixed inset-0 flex h-screen w-screen items-end justify-center">
      <form
        className="pointer-events-auto absolute bottom-0 right-0 z-[9999]"
        action="/resource/preview"
        method="POST"
      >
        <button
          className="m-4 rounded-full bg-black p-4 px-6 text-sm font-bold text-white shadow-md"
          type="submit"
          // theme="primary"
        >
          Exit Preview
        </button>
      </form>
    </div>
  );
}

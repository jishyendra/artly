"use client";
import { type UrlValues } from "@/lib/validation/post";

type UrlListProps = {
  urls: UrlValues[];
  removeUrl: (index: number) => void;
};

export default function UrlList({ urls, removeUrl }: Readonly<UrlListProps>) {
  return (
    <div className="">
      {urls.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <div className="flex flex-grow gap-2 p-2">
            <span>{item.source}</span>
            <span>{item.url}</span>
          </div>
          <button
            type="button"
            onClick={() => {
              removeUrl(index);
            }}
            className="inline-flex items-center rounded-full border border-transparent p-1 text-red-600 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}

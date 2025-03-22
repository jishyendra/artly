import { cn } from "@/lib/utils";
export default function PostControls({ className }: { className?: string }) {
  return (
    <div className={cn("flex w-full justify-around gap-2", className)}>
      <button>Like</button>
      <button>Comment</button>
      <button>Share</button>
      <button>Appreciate</button>
    </div>
  );
}

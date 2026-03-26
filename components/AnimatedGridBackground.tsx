import { cn } from "@/lib/utils";

export function AnimatedGridBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 min-h-dvh w-full overflow-hidden"
      aria-hidden
    >
      <div
        className={cn(
          "absolute inset-0",
          "bg-size-[12px_12px]",
          "bg-[radial-gradient(#d4d4d4_1px,transparent_1px)]",
          "dark:bg-[radial-gradient(#404040_1px,transparent_1px)]",
        )}
      />
      <div
        className={cn(
          "absolute inset-0 bg-background",
          "mask-[radial-gradient(ellipse_at_center,transparent_20%,black)]",
        )}
      />
    </div>
  );
}

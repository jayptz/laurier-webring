import { cn } from "@/lib/utils";

export function AnimatedGridBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 min-h-dvh w-full overflow-hidden"
      aria-hidden
    >
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:12px_12px]",
          "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
          "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]",
        )}
      />
      <div
        className={cn(
          "absolute inset-0 bg-background",
          "[mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]",
        )}
      />
    </div>
  );
}

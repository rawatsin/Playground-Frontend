import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-neutral-200/60 bg-white/80 backdrop-blur-md dark:border-neutral-900 dark:bg-black/80">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4 md:px-8">
        <span className="text-sm font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          playground
        </span>
        <ThemeToggle />
      </div>
    </header>
  );
}
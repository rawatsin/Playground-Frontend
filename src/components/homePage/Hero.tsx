export default function Hero() {
  return (
    <section className="px-6 pt-16 pb-12 md:px-8 md:pt-24 md:pb-16">
      <div className="mx-auto max-w-4xl">
        <p className="text-xs font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
          Things worth figuring out.
        </p>

        <h1 className="mt-4 text-3xl font-medium tracking-tight text-neutral-900 sm:text-5xl md:text-6xl dark:text-neutral-100">
          A playground for learning by building.
        </h1>

        <p className="mt-6 text-base sm:text-lg leading-relaxed text-neutral-600 dark:text-neutral-400">
          Protocols. Patterns. Performance.
          <br />
          Frontend. Backend. Infrastructure.
        </p>

        <div className="mt-10 border-l border-neutral-200 pl-4 space-y-1 text-base text-neutral-600 sm:text-lg dark:border-neutral-800 dark:text-neutral-400">
          <p>Some things I know.</p>
          <p>Some things I don&apos;t.</p>
          <p className="font-medium text-neutral-900 dark:text-neutral-100">
            This is where I find out.
          </p>
        </div>
      </div>
    </section>
  );
}
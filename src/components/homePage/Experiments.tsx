import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface Experiment {
  number: string;
  title: string;
  description: string;
  href: string;
  ready: boolean;
}

const experiments: Experiment[] = [
  {
    number: "01",
    title: "Pagination",
    description: "Moving through large datasets, one page at a time.",
    href: "/pagination",
    ready: true,
  },
  {
    number: "02",
    title: "WebSockets",
    description: "Keeping a connection alive and making it useful.",
    href: "/websockets",
    ready: true,
  },
  {
    number: "03",
    title: "Rate Limiting",
    description: "Deciding how much is too much.",
    href: "/rate-limiting",
    ready: false,
  },
  {
    number: "04",
    title: "Caching",
    description: "Doing less work by remembering more.",
    href: "/caching",
    ready: false,
  },
];

export default function Experiments() {
  return (
    <section className="px-6 pb-24 md:px-8">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-6 text-xs font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
          Experiments
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          {experiments.map((experiment) => {
            const cardContent = (
              <div
                className={`group flex h-full flex-col justify-between rounded-lg border p-5 transition ${
                  experiment.ready
                    ? "border-neutral-200/80 bg-neutral-50/40 hover:border-neutral-400 hover:bg-neutral-50 dark:border-neutral-800/80 dark:bg-neutral-900/30 dark:hover:border-neutral-600 dark:hover:bg-neutral-900/60"
                    : "border-neutral-200/50 bg-neutral-50/20 opacity-60 dark:border-neutral-800/40 dark:bg-neutral-900/10"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-neutral-400 dark:text-neutral-500">
                    <span>{experiment.number}</span>
                    {experiment.ready ? (
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-neutral-900 dark:group-hover:text-neutral-100" />
                    ) : (
                      <span className="text-[11px] font-sans">soon</span>
                    )}
                  </div>

                  <h3 className="mt-3 text-base font-medium text-neutral-900 dark:text-neutral-100">
                    {experiment.title}
                  </h3>

                  <p className="mt-1.5 text-sm text-neutral-500 dark:text-neutral-400">
                    {experiment.description}
                  </p>
                </div>
              </div>
            );

            return experiment.ready ? (
              <Link
                key={experiment.number}
                href={experiment.href}
                className="block"
              >
                {cardContent}
              </Link>
            ) : (
              <div key={experiment.number} className="block cursor-not-allowed">
                {cardContent}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
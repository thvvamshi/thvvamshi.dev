import { motion } from "framer-motion";
import { ArrowUpRight, Github, Layers3, Star, Users } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { AnimatedSection } from "../components/AnimatedSection";
import { Container } from "../components/Container";
import { SectionHeader } from "../components/SectionHeader";
import { github } from "../data/github";

type GitHubLanguage = {
  name: string;
  count: number;
  share: number;
};

type GitHubActivityCell = {
  date: string;
  count: number;
  intensity: number;
};

type GitHubSummary = {
  repositories: number;
  stars: number;
  forks: number;
  followers: number;
  following: number;
  languages: GitHubLanguage[];
};

type GitHubYearGraph = {
  total: number;
  currentStreak: number;
  longestStreak: number;
  months: string[];
  weeks: GitHubActivityCell[][];
};

type GitHubRepo = {
  language: string | null;
  stargazers_count: number | null;
  forks_count: number | null;
  created_at: string | null;
  pushed_at: string | null;
  updated_at: string | null;
};

type GitHubCache = {
  updatedAt: number;
  summary: GitHubSummary;
  graph: GitHubYearGraph;
};

const cacheKey = `github-summary:v9:${github.username}`;
const monthNames = Array.from({ length: 12 }, (_, index) =>
  new Date(Date.UTC(2024, index, 1)).toLocaleString("en-US", { month: "short", timeZone: "UTC" }),
);

const fallbackSummary: GitHubSummary = {
  repositories: 0,
  stars: 0,
  forks: 0,
  followers: 0,
  following: 0,
  languages: [],
};

const emptyGraph = (): GitHubYearGraph => ({
  total: 0,
  currentStreak: 0,
  longestStreak: 0,
  months: monthNames,
  weeks: Array.from({ length: 12 }, (_, monthIndex) =>
    Array.from({ length: 7 }, (_, dayIndex) => ({
      date: `placeholder-${monthIndex}-${dayIndex}`,
      count: 0,
      intensity: 0,
    })),
  ),
});

const normalizeSummary = (summary: Partial<GitHubSummary> | null | undefined): GitHubSummary => ({
  repositories: summary?.repositories ?? 0,
  stars: summary?.stars ?? 0,
  forks: summary?.forks ?? 0,
  followers: summary?.followers ?? 0,
  following: summary?.following ?? 0,
  languages: Array.isArray(summary?.languages) ? summary.languages : [],
});

const normalizeGraph = (graph: Partial<GitHubYearGraph> | null | undefined): GitHubYearGraph => ({
  total: graph?.total ?? 0,
  currentStreak: graph?.currentStreak ?? 0,
  longestStreak: graph?.longestStreak ?? 0,
  months: Array.isArray(graph?.months) && graph.months.length ? graph.months : emptyGraph().months,
  weeks: Array.isArray(graph?.weeks) && graph.weeks.length ? graph.weeks : emptyGraph().weeks,
});

const getValidDateKey = (value: string | null | undefined) => {
  if (!value) return null;

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;

  return date.toISOString().slice(0, 10);
};

const buildGraph = (repos: GitHubRepo[]): GitHubYearGraph => {
  const countsByDate = new Map<string, number>();

  for (const repo of repos) {
    const dateKeys = [repo.created_at, repo.pushed_at, repo.updated_at]
      .map(getValidDateKey)
      .filter((value): value is string => Boolean(value));

    for (const dayKey of dateKeys) {
      countsByDate.set(dayKey, (countsByDate.get(dayKey) ?? 0) + 1);
    }
  }

  const entries = Array.from(countsByDate.entries()).sort(([left], [right]) => left.localeCompare(right));
  const uniqueDays = entries.map(([dateKey]) => dateKey);
  const total = entries.reduce((sum, [, count]) => sum + count, 0);

  let currentStreak = uniqueDays.length ? 1 : 0;
  for (let index = uniqueDays.length - 1; index > 0; index -= 1) {
    const currentDate = new Date(`${uniqueDays[index]}T00:00:00Z`);
    const previousDateCandidate = new Date(`${uniqueDays[index - 1]}T00:00:00Z`);
    const diffDays = Math.round(
      (currentDate.getTime() - previousDateCandidate.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (diffDays === 1) {
      currentStreak += 1;
      continue;
    }

    break;
  }

  let longestStreak = 0;
  let streak = 0;
  let previousDate: Date | null = null;
  for (const [dateKey] of entries) {
    const date = new Date(`${dateKey}T00:00:00Z`);
    if (previousDate) {
      const diffDays = Math.round((date.getTime() - previousDate.getTime()) / (1000 * 60 * 60 * 24));
      streak = diffDays === 1 ? streak + 1 : 1;
    } else {
      streak = 1;
    }
    longestStreak = Math.max(longestStreak, streak);
    previousDate = date;
  }

  const monthBuckets = Array.from({ length: 12 }, () =>
    Array.from({ length: 7 }, (_, dayIndex) => ({
      date: `placeholder-${dayIndex}`,
      count: 0,
      intensity: 0,
    })),
  );

  for (const [dateKey, count] of entries) {
    const date = new Date(`${dateKey}T00:00:00Z`);
    const monthIndex = date.getUTCMonth();
    const weekday = date.getUTCDay();
    const bucket = monthBuckets[monthIndex][weekday];
    bucket.date = dateKey;
    bucket.count += count;
  }

  for (const month of monthBuckets) {
    for (const cell of month) {
      cell.intensity = cell.count === 0 ? 0 : cell.count < 2 ? 1 : cell.count < 4 ? 2 : cell.count < 8 ? 3 : 4;
    }
  }

  return {
    total,
    currentStreak,
    longestStreak,
    months: monthNames,
    weeks: monthBuckets,
  };
};

function StatTile({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: number;
  icon: typeof Github;
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-white/[0.03] p-4 backdrop-blur-xl transition hover:border-zinc-700 hover:bg-white/[0.05]">
      <div className="mb-5 flex items-center justify-between">
        <span className="text-[0.64rem] font-medium uppercase tracking-[0.16em] text-zinc-500">
          {label}
        </span>
        <Icon size={14} className="text-zinc-500" />
      </div>
      <p className="text-2xl font-semibold tracking-tight text-zinc-50">{value}</p>
    </div>
  );
}

export function GitHubActivitySection() {
  const [summary, setSummary] = useState<GitHubSummary>(fallbackSummary);
  const [graph, setGraph] = useState<GitHubYearGraph>(emptyGraph());
  const [loaded, setLoaded] = useState(false);
  const [source, setSource] = useState<"live" | "cached" | "fallback">("fallback");

  useEffect(() => {
    let active = true;
    const controller = new AbortController();

    try {
      const rawCache = window.localStorage.getItem(cacheKey);
      if (rawCache) {
        const cached = JSON.parse(rawCache) as Partial<GitHubCache>;
        if (cached.summary) {
          setSummary(normalizeSummary(cached.summary));
          setGraph(normalizeGraph(cached.graph));
          setSource("cached");
          setLoaded(true);
        }
      }
    } catch {
      // Ignore cache read issues.
    }

    const load = async () => {
      try {
        const [userResponse, reposResponse] = await Promise.all([
          fetch(github.apiUserUrl, {
            headers: { Accept: "application/vnd.github+json" },
            signal: controller.signal,
          }),
          fetch(github.apiReposUrl, {
            headers: { Accept: "application/vnd.github+json" },
            signal: controller.signal,
          }),
        ]);

        if (!userResponse.ok || !reposResponse.ok) {
          throw new Error("Unable to load GitHub data");
        }

        const user = (await userResponse.json()) as {
          public_repos?: number;
          followers?: number;
          following?: number;
        };
        const repos = (await reposResponse.json()) as GitHubRepo[];

        const languageCounts = new Map<string, number>();
        let stars = 0;
        let forks = 0;

        for (const repo of repos) {
          stars += repo.stargazers_count ?? 0;
          forks += repo.forks_count ?? 0;

          if (repo.language) {
            languageCounts.set(repo.language, (languageCounts.get(repo.language) ?? 0) + 1);
          }
        }

        const nextSummary = normalizeSummary({
          repositories: user.public_repos ?? repos.length,
          stars,
          forks,
          followers: user.followers ?? 0,
          following: user.following ?? 0,
          languages: Array.from(languageCounts.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([name, count]) => ({
              name,
              count,
              share: repos.length ? Math.round((count / repos.length) * 100) : 0,
            })),
        });

        const nextGraph = buildGraph(repos);

        if (active) {
          setSummary(nextSummary);
          setGraph(nextGraph);
          setSource("live");
          setLoaded(true);

          try {
            const cached: GitHubCache = {
              updatedAt: Date.now(),
              summary: nextSummary,
              graph: nextGraph,
            };
            window.localStorage.setItem(cacheKey, JSON.stringify(cached));
          } catch {
            // Ignore write issues.
          }
        }
      } catch {
        if (active) {
          setSummary(fallbackSummary);
          setGraph(emptyGraph());
          setSource("fallback");
          setLoaded(true);
        }
      }
    };

    load();

    return () => {
      active = false;
      controller.abort();
    };
  }, []);

  const statTiles = useMemo(
    () => [
      { label: "Repositories", value: summary.repositories, icon: Github },
      { label: "Stars", value: summary.stars, icon: Star },
      { label: "Followers", value: summary.followers, icon: Users },
      { label: "Forks", value: summary.forks, icon: Layers3 },
    ],
    [summary.forks, summary.followers, summary.repositories, summary.stars],
  );

  const activityTone = ["#151515", "#134e4a", "#166534", "#22c55e", "#86efac"] as const;

  return (
    <AnimatedSection id="github" className="border-y border-white/[0.06] bg-white/[0.012]">
      <Container>
        <SectionHeader eyebrow="GitHub" title="Stats" />

        <div className="grid gap-4 xl:grid-cols-2">
          <motion.article
            className="rounded-2xl border border-zinc-800/90 bg-zinc-950/55 p-5 backdrop-blur-xl"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45 }}
          >
            <div className="mb-5 flex items-center justify-between border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                <Github size={15} className="text-zinc-400" />
                <span className="text-[0.65rem] font-medium uppercase tracking-[0.16em] text-zinc-500">
                  GitHub stats
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded-full border border-zinc-800 bg-black/20 px-2.5 py-1 text-[0.6rem] font-medium uppercase tracking-[0.12em] text-zinc-500">
                  {source}
                </span>
                <a
                  className="focus-ring inline-flex items-center gap-1 rounded-full border border-zinc-800 bg-black/20 px-2.5 py-1 text-[0.65rem] font-medium uppercase tracking-[0.12em] text-zinc-400 transition hover:border-zinc-700 hover:text-zinc-50"
                  href={github.profileUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Profile
                  <ArrowUpRight size={12} />
                </a>
              </div>
            </div>

            <div className={`grid grid-cols-2 gap-3 ${loaded ? "" : "animate-pulse"}`}>
              {statTiles.map((tile) => (
                <StatTile key={tile.label} label={tile.label} value={tile.value} icon={tile.icon} />
              ))}
            </div>

            <div className="mt-4 rounded-2xl border border-zinc-800 bg-black/20 p-4">
              <div className="mb-3 flex items-center justify-between border-b border-zinc-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-white/80" />
                <span className="text-[0.65rem] font-medium uppercase tracking-[0.16em] text-zinc-500">
                  All-time streak
                </span>
                </div>
                <ArrowUpRight size={14} className="text-zinc-600" />
              </div>

              <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(9rem,0.8fr)_minmax(0,1fr)]">
                <div className="flex flex-col items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-950/70 px-4 py-5 text-center">
                  <p className="text-2xl font-semibold tracking-tight text-zinc-50">{graph.total}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.12em] text-zinc-400">Total</p>
                </div>

                <div className="flex flex-col items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-950/70 px-4 py-5 text-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full border-[4px] border-amber-400">
                    <p className="text-2xl font-semibold leading-none text-zinc-50">{graph.currentStreak}</p>
                  </div>
                  <p className="mt-3 text-sm font-medium text-amber-300">Current Streak</p>
                </div>

                <div className="flex flex-col items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-950/70 px-4 py-5 text-center">
                  <p className="text-2xl font-semibold tracking-tight text-zinc-50">{graph.longestStreak}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.12em] text-zinc-400">Longest</p>
                </div>
              </div>
            </div>
          </motion.article>

          <motion.article
            className="rounded-2xl border border-zinc-800/90 bg-zinc-950/55 p-5 backdrop-blur-xl"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: 0.05 }}
          >
            <div className="mb-5 flex items-center justify-between border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-white/80" />
                <span className="text-[0.65rem] font-medium uppercase tracking-[0.16em] text-zinc-500">
                  Top languages
                </span>
              </div>
              <span className="text-[0.65rem] font-medium uppercase tracking-[0.12em] text-zinc-500">
                {github.username}
              </span>
            </div>

            <div className={`space-y-3 ${loaded ? "" : "animate-pulse"}`}>
              {summary.languages.length ? (
                summary.languages.map((language) => (
                  <div
                    key={language.name}
                    className="rounded-2xl border border-zinc-800 bg-black/20 p-4 transition hover:border-zinc-700 hover:bg-white/[0.04]"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-medium text-zinc-200">{language.name}</span>
                      <span className="text-[0.65rem] font-medium uppercase tracking-[0.12em] text-zinc-500">
                        {language.count}
                      </span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-zinc-800">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-white via-white/80 to-zinc-400"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${Math.max(language.share, 8)}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div className="grid gap-3 sm:grid-cols-2">
                  {["React", "TypeScript", "Node.js", "MongoDB"].map((item) => (
                    <div key={item} className="rounded-2xl border border-zinc-800 bg-black/20 p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm font-medium text-zinc-200">{item}</span>
                        <span className="text-[0.65rem] font-medium uppercase tracking-[0.12em] text-zinc-500">
                          0
                        </span>
                      </div>
                      <div className="h-1.5 rounded-full bg-zinc-800" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.article>
        </div>

        <div className="mt-4">
          <motion.article
            className="rounded-2xl border border-zinc-800/90 bg-zinc-950/55 p-5 backdrop-blur-xl"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: 0.1 }}
          >
            <div className="mb-5 flex items-center justify-between border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-white/80" />
                <span className="text-[0.65rem] font-medium uppercase tracking-[0.16em] text-zinc-500">
                  All years graph
                </span>
              </div>
              <span className="text-[0.65rem] font-medium uppercase tracking-[0.12em] text-zinc-500">
                all time
              </span>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-black/20 p-4">
              <div
                className="mb-3 grid gap-[2px] text-[0.6rem] font-medium uppercase tracking-[0.12em] text-zinc-500"
                style={{ gridTemplateColumns: "repeat(12, minmax(0, 1fr))" }}
              >
                {graph.months.map((month) => (
                  <span key={month} className="text-center">
                    {month}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-[2.5rem_1fr] gap-3">
                <div className="flex flex-col justify-between py-1 text-[0.6rem] font-medium uppercase tracking-[0.12em] text-zinc-500">
                  <span>Mon</span>
                  <span>Wed</span>
                  <span>Fri</span>
                </div>

                <div
                  className="grid gap-[2px]"
                  style={{
                    aspectRatio: "53 / 7",
                    gridTemplateColumns: "repeat(53, minmax(0, 1fr))",
                    gridTemplateRows: "repeat(7, minmax(0, 1fr))",
                  }}
                >
                  {graph.weeks.flatMap((week) =>
                    week.map((cell) => (
                      <div
                        key={cell.date}
                        className="rounded-[3px] border border-black/30 transition hover:scale-110"
                        style={{ backgroundColor: activityTone[cell.intensity] }}
                        title={`${cell.date} - ${cell.count} update${cell.count === 1 ? "" : "s"}`}
                      />
                    )),
                  )}
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between text-[0.6rem] font-medium uppercase tracking-[0.14em] text-zinc-500">
                <span>Less</span>
                <div className="flex items-center gap-1">
                  {activityTone.map((tone) => (
                    <span
                      key={tone}
                      className="h-2.5 w-2.5 rounded-sm border border-zinc-800/60"
                      style={{ backgroundColor: tone }}
                    />
                  ))}
                </div>
                <span>More</span>
              </div>
            </div>
          </motion.article>
        </div>
      </Container>
    </AnimatedSection>
  );
}

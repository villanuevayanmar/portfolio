import { cookies } from "next/headers";
import Link from "next/link";
import { getAdminClient } from "@/lib/supabase/server";
import AdminLoginForm from "./AdminLoginForm";
import LogoutButton from "./LogoutButton";

export const dynamic = "force-dynamic";

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
        {label}
      </p>
      <p className="mt-2 text-3xl font-extrabold text-slate-900 dark:text-white">
        {value}
      </p>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
        {title}
      </h3>
      <div className="mt-4">{children}</div>
    </div>
  );
}

export default async function AdminPage() {
  const expected = process.env.ADMIN_PASSWORD ?? "";
  const authed =
    expected !== "" && cookies().get("admin_auth")?.value === expected;

  if (!authed) {
    return (
      <div className="container max-w-md py-24">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand">
          Admin
        </p>
        <h1 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
          Analytics dashboard
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Enter the admin password to view visitor statistics and messages.
        </p>
        <AdminLoginForm />
      </div>
    );
  }

  const db = getAdminClient();

  const [viewsRes, messagesRes, recentRes, topRes, recentMsgRes] =
    await Promise.all([
      db.from("page_views").select("*", { count: "exact", head: true }),
      db.from("contact_messages").select("*", { count: "exact", head: true }),
      db
        .from("page_views")
        .select("path,country,created_at")
        .order("created_at", { ascending: false })
        .limit(10),
      db
        .from("page_views")
        .select("path")
        .order("created_at", { ascending: false })
        .limit(500),
      db
        .from("contact_messages")
        .select("name,email,subject,created_at")
        .order("created_at", { ascending: false })
        .limit(10),
    ]);

  const counts: Record<string, number> = {};
  ((topRes.data ?? []) as { path: string }[]).forEach((r) => {
    counts[r.path] = (counts[r.path] ?? 0) + 1;
  });
  const topPages = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);

  const recent = (recentRes.data ?? []) as {
    path: string;
    country: string | null;
    created_at: string;
  }[];
  const recentMsg = (recentMsgRes.data ?? []) as {
    name: string;
    email: string;
    subject: string | null;
    created_at: string;
  }[];

  return (
    <div className="container py-16">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-brand">
            Admin
          </p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Dashboard
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            View site
          </Link>
          <LogoutButton />
        </div>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <StatCard label="Total page views" value={viewsRes.count ?? 0} />
        <StatCard label="Contact messages" value={messagesRes.count ?? 0} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Panel title="Top pages">
          {topPages.length ? (
            <ul className="space-y-2">
              {topPages.map(([path, n]) => (
                <li
                  key={path}
                  className="flex items-center justify-between text-sm text-slate-700 dark:text-slate-300"
                >
                  <span className="truncate">{path}</span>
                  <span className="font-semibold">{n}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-slate-500 dark:text-slate-400">
              No data yet.
            </p>
          )}
        </Panel>

        <Panel title="Recent views">
          {recent.length ? (
            <ul className="space-y-2">
              {recent.map((r, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between text-sm text-slate-700 dark:text-slate-300"
                >
                  <span className="truncate">
                    {r.path}
                    {r.country ? (
                      <span className="ml-2 text-xs text-slate-400">
                        {r.country}
                      </span>
                    ) : null}
                  </span>
                  <span className="text-xs text-slate-400">
                    {new Date(r.created_at).toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-slate-500 dark:text-slate-400">
              No data yet.
            </p>
          )}
        </Panel>
      </div>

      <div className="mt-6">
        <Panel title="Recent messages">
          {recentMsg.length ? (
            <ul className="divide-y divide-slate-200 dark:divide-slate-800">
              {recentMsg.map((m, i) => (
                <li key={i} className="py-3 text-sm">
                  <p className="font-semibold text-slate-800 dark:text-slate-200">
                    {m.name}{" "}
                    <span className="font-normal text-slate-400">
                      ({m.email})
                    </span>
                  </p>
                  {m.subject ? (
                    <p className="text-slate-600 dark:text-slate-400">
                      {m.subject}
                    </p>
                  ) : null}
                  <p className="mt-0.5 text-xs text-slate-400">
                    {new Date(m.created_at).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-slate-500 dark:text-slate-400">
              No messages yet.
            </p>
          )}
        </Panel>
      </div>
    </div>
  );
}

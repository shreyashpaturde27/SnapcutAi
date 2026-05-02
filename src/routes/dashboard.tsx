import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState, useCallback } from "react";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth";
import { Logo } from "@/components/site/Logo";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import {
  processBackgroundRemoval,
  validateFile,
  UPLOAD_LIMITS,
  type ProcessedImage,
} from "@/lib/services/backgroundRemoval";
import { useUploadStore } from "@/lib/uploadStore";
import {
  Upload, ImageIcon, Download, Sparkles, LogOut, Trash2, History,
  Zap, CreditCard,
} from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — SnapCut AI" },
      { name: "description", content: "Your SnapCut AI workspace, history, and credit usage." },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const { user, isAuthenticated, isLoading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) navigate({ to: "/login" });
  }, [isLoading, isAuthenticated, navigate]);

  if (isLoading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Skeleton className="h-10 w-40" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <DashHeader onSignOut={signOut} userName={user.name} />
      <div className="mx-auto max-w-6xl px-4 py-8">
        <StatGrid />
        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
          <UploadWorkspace />
          <HistoryPanel />
        </div>
      </div>
    </div>
  );
}

function DashHeader({ onSignOut, userName }: { onSignOut: () => void; userName: string }) {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 glass">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Logo />
        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-xs text-muted-foreground">Signed in as</p>
            <p className="text-sm font-medium leading-tight">{userName}</p>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link to="/">Home</Link>
          </Button>
          <Button variant="ghost" size="sm" onClick={onSignOut} aria-label="Sign out">
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}

function StatGrid() {
  const { user } = useAuth();
  const { history } = useUploadStore();
  if (!user) return null;
  const used = user.dailyQuota - user.creditsRemaining;
  const pct = Math.round((used / user.dailyQuota) * 100);

  const stats = [
    { icon: Zap, label: "Plan", value: user.plan === "pro" ? "Pro" : "Free" },
    { icon: Sparkles, label: "Credits left today", value: `${user.creditsRemaining}/${user.dailyQuota}` },
    { icon: History, label: "Total cuts", value: history.length },
    { icon: CreditCard, label: "Billing", value: user.plan === "pro" ? "Active" : "—" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold">Welcome back, {user.name.split(" ")[0]} 👋</h1>
          <p className="text-sm text-muted-foreground">Drop an image below to get started.</p>
        </div>
        <Badge className="bg-gradient-brand-soft border-border/60">
          <Sparkles className="mr-1 h-3 w-3" /> Beta
        </Badge>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} className="glass p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-brand-soft border border-border/60">
                <s.icon className="h-4 w-4 text-secondary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <p className="text-base font-semibold leading-tight">{s.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="glass p-4">
        <div className="flex items-center justify-between text-sm">
          <p className="text-muted-foreground">Daily usage</p>
          <p className="font-medium">{used} / {user.dailyQuota}</p>
        </div>
        <Progress value={pct} className="mt-2 h-2" />
      </Card>
    </div>
  );
}

function UploadWorkspace() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setDragging] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<ProcessedImage | null>(null);
  const addUpload = useUploadStore((s) => s.addUpload);

  const startProcessing = useCallback(
    async (file: File) => {
      const error = validateFile(file);
      if (error) {
        toast.error(error);
        return;
      }
      setProcessing(true);
      setResult(null);
      setProgress(8);

      const tick = setInterval(() => {
        setProgress((p) => (p < 88 ? p + 6 : p));
      }, 120);

      try {
        const processed = await processBackgroundRemoval(file);
        setProgress(100);
        setResult(processed);
        addUpload(processed);
        toast.success("Background removed!");
      } catch {
        toast.error("Processing failed. Try again.");
      } finally {
        clearInterval(tick);
        setProcessing(false);
      }
    },
    [addUpload],
  );

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) void startProcessing(file);
  }

  return (
    <Card className="glass p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Upload workspace</h2>
        <p className="text-xs text-muted-foreground">JPG · PNG · WEBP · max 10 MB</p>
      </div>

      {!result && !processing && (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          className={`mt-4 flex w-full flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-16 text-center transition-all ${
            isDragging
              ? "border-primary bg-gradient-brand-soft shadow-glow"
              : "border-border/60 hover:border-primary/60 hover:bg-card/40"
          }`}
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-brand shadow-glow">
            <Upload className="h-6 w-6 text-primary-foreground" />
          </div>
          <p className="mt-4 text-base font-semibold">Drop your image here</p>
          <p className="mt-1 text-sm text-muted-foreground">or click to browse</p>
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            accept={UPLOAD_LIMITS.acceptedTypes.join(",")}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) void startProcessing(file);
              e.target.value = "";
            }}
          />
        </button>
      )}

      {processing && (
        <div className="mt-4 rounded-xl border border-border/60 bg-card/40 p-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-brand shadow-glow">
            <Sparkles className="h-6 w-6 animate-pulse text-primary-foreground" />
          </div>
          <p className="mt-4 font-medium">Cutting background…</p>
          <p className="mt-1 text-sm text-muted-foreground">Usually under 5 seconds</p>
          <Progress value={progress} className="mx-auto mt-5 h-2 max-w-sm" />
        </div>
      )}

      {result && !processing && (
        <ResultView result={result} onReset={() => setResult(null)} />
      )}
    </Card>
  );
}

function ResultView({
  result,
  onReset,
}: {
  result: ProcessedImage;
  onReset: () => void;
}) {
  return (
    <div className="mt-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <CompareTile label="Original" src={result.originalUrl} />
        <CompareTile label="Transparent" src={result.resultUrl} transparent />
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="text-sm">
          <p className="font-medium">{result.fileName}</p>
          <p className="text-xs text-muted-foreground">
            {(result.sizeBytes / 1024 / 1024).toFixed(2)} MB
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onReset}>Cut another</Button>
          <Button
            asChild
            className="bg-gradient-brand text-primary-foreground shadow-glow hover:opacity-95"
          >
            <a href={result.resultUrl} download={`snapcut-${result.fileName}`}>
              <Download className="mr-1.5 h-4 w-4" />
              Download
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}

function CompareTile({
  label,
  src,
  transparent = false,
}: {
  label: string;
  src: string;
  transparent?: boolean;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-border/60">
      <div className="flex items-center justify-between border-b border-border/60 bg-card/60 px-3 py-1.5">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
        <ImageIcon className="h-3.5 w-3.5 text-muted-foreground" />
      </div>
      <div
        className="flex aspect-[4/3] items-center justify-center"
        style={
          transparent
            ? {
                backgroundImage:
                  "linear-gradient(45deg, oklch(0.22 0.03 265) 25%, transparent 25%), linear-gradient(-45deg, oklch(0.22 0.03 265) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, oklch(0.22 0.03 265) 75%), linear-gradient(-45deg, transparent 75%, oklch(0.22 0.03 265) 75%)",
                backgroundSize: "16px 16px",
                backgroundPosition: "0 0, 0 8px, 8px -8px, -8px 0",
              }
            : undefined
        }
      >
        <img src={src} alt={label} className="max-h-full max-w-full object-contain" />
      </div>
    </div>
  );
}

function HistoryPanel() {
  const { history, clear } = useUploadStore();

  return (
    <Card className="glass p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold">Recent</h3>
        {history.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clear}
            className="text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="mr-1 h-3.5 w-3.5" /> Clear
          </Button>
        )}
      </div>
      {history.length === 0 ? (
        <div className="mt-6 rounded-lg border border-dashed border-border/60 p-6 text-center text-sm text-muted-foreground">
          Your processed images will appear here.
        </div>
      ) : (
        <ul className="mt-4 space-y-2">
          {history.map((h) => (
            <li
              key={h.id}
              className="flex items-center gap-3 rounded-lg border border-border/60 bg-card/40 p-2"
            >
              <div className="h-12 w-12 shrink-0 overflow-hidden rounded-md bg-muted">
                <img src={h.resultUrl} alt={h.fileName} className="h-full w-full object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{h.fileName}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(h.createdAt).toLocaleString()}
                </p>
              </div>
              <Button asChild variant="ghost" size="icon" aria-label="Download">
                <a href={h.resultUrl} download={`snapcut-${h.fileName}`}>
                  <Download className="h-4 w-4" />
                </a>
              </Button>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}

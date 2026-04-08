import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { WorkspaceBuilder } from "@/components/workspace/workspace-builder";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="flex-1 px-3 py-3 md:px-5 md:py-4">
        <main className="mx-auto w-full max-w-[1440px] space-y-3">
          <header className="flex items-end justify-between gap-4 px-1 md:px-2 mb-4">
            <div className="space-y-0.5">
              <Image
                src="/logo.png"
                alt="monis.rent"
                width={120}
                height={24}
                className="h-5 w-auto dark:invert"
                priority
              />
            </div>
            <p className="hidden text-sm text-muted-foreground md:block">Pick, preview, rent.</p>
          </header>
          <WorkspaceBuilder />
        </main>
      </div>

      <footer className="mt-auto">
        <Separator />
        <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <p>&copy; {new Date().getFullYear()} monis.rent</p>
          <div className="flex gap-4">
            <a href="#" className="transition-colors hover:text-foreground">
              Terms
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Support
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

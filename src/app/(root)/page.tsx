import { RootHeader } from "@/components/layouts/root-header";

const RootPage = () => {
  return (
    <div className="relative flex min-h-dvh flex-col">
      <RootHeader />
      <main className="flex-1 relative">
        <div className="h-dvh bg-muted-foreground"></div>
      </main>
    </div>
  );
};

export default RootPage;

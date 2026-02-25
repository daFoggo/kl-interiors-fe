import { RootHeader } from "@/components/layouts/root-header";

const RootPage = () => {
  return (
    <div className="relative flex min-h-dvh flex-col">
      <RootHeader />
      <main className="flex-1 relative z-10 bg-muted-foreground"></main>
    </div>
  );
};

export default RootPage;

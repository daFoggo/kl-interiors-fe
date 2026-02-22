import { RootHeader } from "./components/root-header.";

const RootPage = () => {
  return (
    <div className="relative flex min-h-dvh flex-col">
      <RootHeader />
      <main className="flex-1 relative z-10"></main>
    </div>
  );
};

export default RootPage;

"use client";

import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { AuthBlock } from "@/features/auth";

const AuthPage = () => {
  return (
    <main className="relative md:h-screen md:overflow-hidden lg:grid lg:grid-cols-2">
      <div className="relative hidden h-full flex-col border-r p-16 lg:flex bg-muted">
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-background" />

        <div className="z-10 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-xl">
              &ldquo;This Platform has helped me to save time and serve my
              clients faster than ever before.&rdquo;
            </p>
            <footer className="font-mono font-semibold text-sm">
              ~ Ali Hassan
            </footer>
          </blockquote>
        </div>
      </div>
      <div className="relative flex min-h-screen flex-col justify-center px-8 lg:px-16 overflow-y-auto py-12">
        <Button asChild className="absolute top-6 left-6" variant="ghost">
          <Link href="/">
            <ChevronLeftIcon data-icon="inline-start" />
            Trang chủ
          </Link>
        </Button>

        <AuthBlock />
      </div>
    </main>
  );
};

export default AuthPage;

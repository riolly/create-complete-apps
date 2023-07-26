import { Suspense } from "react";
import Link from "next/link";
import { currentUser, SignOutButton } from "@clerk/nextjs";

import { CreatePostForm, PostList } from "./posts";

export default function HomePage() {
  return (
    <main className="flex h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container mt-12 flex flex-col items-center justify-center gap-4 px-4 py-8">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Create <span className="text-pink-400">T3</span> Turbo
        </h1>
        <AuthShowcase />

        <CreatePostForm />
        <Suspense fallback={<span>Loading...</span>}>
          <PostList />
        </Suspense>
      </div>
    </main>
  );
}

async function AuthShowcase() {
  const user = await currentUser();

  if (!user) {
    return (
      <Link
        href="/sign-in"
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
      >
        Sign in
      </Link>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        <span>Logged in as {user.firstName}</span>
      </p>

      <SignOutButton>
        <button className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20">
          Sign out
        </button>
      </SignOutButton>
    </div>
  );
}

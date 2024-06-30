"use client";

import Link from "next/link";
export default function Home() {
  return (
    <main className="">
      <section>
        <div
          className="hero min-h-screen"
          style={{
            backgroundImage: "url(/gradebook-bg.png)",
          }}
        >
          <div className="hero-overlay bg-opacity-80"></div>
          <div className="hero-content text-neutral-content text-center">
            <div className="max-w-md">
              <h1 className="mb-5 text-5xl font-black text-white">GradeBook</h1>
              <p className="mb-5 text-white">
                Gradebook is a revolutionary AI-powered application designed to
                streamline the educational experience for teachers, students,
                and administrators.
              </p>
              <Link href={"/login"} className="btn btn-primary">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

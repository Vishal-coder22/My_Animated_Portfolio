"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Eyebrow from "@/components/ui/Eyebrow";
import TextReveal from "@/components/ui/TextReveal";
import { ArrowLeft as ArrowLeftIcon } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center px-4">
      <SectionWrapper className="py-24 sm:py-32 lg:py-40">
        <div className="text-center space-y-8">
          <Eyebrow>404</Eyebrow>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.02em]">
            Page Not Found
          </h1>

          <p className="text-lg text-text-secondary max-w-md mx-auto">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been
            moved or doesn&apos;t exist.
          </p>

          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-3.5 font-medium text-sm tracking-wide rounded-full bg-accent text-bg hover:shadow-[0_0_30px_rgba(245,158,11,0.3)] transition-all duration-300"
          >
            <ArrowLeftIcon size={16} />
            <span>Back to Home</span>
          </Link>
        </div>
      </SectionWrapper>
    </div>
  );
}
import Link from "next/link";

import { Icons } from "@/components/shared/icons";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export async function HeroLanding() {
  const headingClassName = 'font-urban text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-[66px]';
  const socialMediaList = ['Youtube', 'Tiktok', 'Reddit', 'Twitter', 'Instagram']
  return (
    <section className="space-y-6 py-12 sm:py-20 lg:py-20">
      <div className="container flex max-w-5xl flex-col items-center gap-5 text-center">
        {/* <Link
          href="https://twitter.com/miickasmt/status/1719892161095745801"
          className={cn(
            buttonVariants({ variant: "outline", size: "sm", rounded: "full" }),
            "px-4",
          )}
          target="_blank"
        >
          <span className="mr-3">🎉</span> Introducing on{" "}
          <Icons.twitter className="ml-2 size-3.5" />
        </Link> */}
        <h1 className={headingClassName}>
          Post amazing videos on
          <div className={cn("rw-wrapper")}>
            <div className="rw-words font-extrabold">
              {socialMediaList.map(sm => <span className="text-gradient_indigo-purple">{sm}</span>)}
            </div>
          </div>
        </h1>
        <p
          className="max-w-2xl text-balance pt-20 leading-normal text-muted-foreground sm:text-xl sm:leading-8"
          style={{ animationDelay: "0.35s", animationFillMode: "forwards" }}
        >
          Publish quality videos with zero video creation skills. Choose a topic and videopilot will do the rest.
        </p>

        <div
          className="flex justify-center space-x-2 md:space-x-4"
          style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
        >
          <Link
            href="/pricing"
            prefetch={true}
            className={cn(
              buttonVariants({ size: "lg", rounded: "full" }),
              "gap-2",
            )}
          >
            <span>Try for free</span>
            <Icons.arrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

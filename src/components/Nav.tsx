"use client";

import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import ThemeToggle from "./theme-toggle";

export default function Nav() {

    const [menuState, setMenuState] = useState(false);

    return (
        <div className="bg-background/50 sticky top-0 z-50 divide-y backdrop-blur-sm xl:divide-none">
            <header data-astro-transition-persist="astro-l7r54iwe-1">
                <div className="relative mx-auto flex max-w-4xl flex-wrap items-center gap-4 p-4 ">
                    <div className="flex items-center gap-2">
                        <a href="/" target="_self" className="transition-colors duration-300 ease-in-out flex shrink-0 items-center 
                        gap-2">
                            <span className="border border-border px-1 mx-2 bg-foreground text-background font-serif text-2xl">SF</span>
                            <span className="font-serif text-[24px] md:hidden">Superfounder</span>
                        </a>
                    </div>
                    <a href="/" target="_self" className="transition-colors duration-300 ease-in-out absolute left-1/2 hidden 
                        -translate-x-1/2 font-serif text-[32px] md:block">
                        Superfounder
                    </a>
                    <div className="ml-auto flex items-center gap-2 md:gap-4">
                        <nav className="hidden items-center gap-4 text-sm sm:gap-6 md:flex">
                            <a
                                href="/vc"
                                target="_self"
                                className="inline-block duration-300 ease-in-out text-muted-foreground hover:text-foreground/80 capitalize transition-colors"
                            >
                                For VC's
                            </a>
                            <a
                                href="/jobs"
                                target="_self"
                                className="inline-block duration-300 ease-in-out text-muted-foreground hover:text-foreground/80 capitalize transition-colors"
                            >
                                For Job seekers
                            </a>
                        </nav>
                        <MenuIcon className="size-9 border border-border p-2 md:hidden block"
                            onClick={() => setMenuState(!menuState)} 
                        />
                        <ThemeToggle />
                    </div>
                </div>
            </header>
            <div
                className={`fixed top-[70px] inset-x-0 transform-gpu z-[100] bg-background grid duration-300 
					transition-all md:hidden ${menuState ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                data-state={menuState ? "active" : "inactive"}
            >
                <div className={`px-5 min-h-0 overflow-y-auto max-h-[230vh] divide-y border-b-4
          [mask-image:linear-gradient(to_top,transparent,white_10px)] transition-all duration-300 
          z-50
          ${menuState ? 'visible py-5' : 'invisible py-0'}`}>
                    <Link
                        className="group flex items-center gap-2.5 first:pt-0 last:pb-0 py-4"
                        href="/vc"
                        onClick={() => setMenuState(false)}
                    >
                        For VC's
                    </Link>
                    <Link
                        className="group flex items-center gap-2.5 first:pt-0 last:pb-0 py-4"
                        href="/jobs"
                        onClick={() => setMenuState(false)}
                    >
                        For Job seekers
                    </Link>
                </div>
            </div>
        </div>
    );
}
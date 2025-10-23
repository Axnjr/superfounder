"use client";

import { ArrowRight, ArrowUp } from "lucide-react";
import Image from "next/image";
import ThemeToggle from "@/components/theme-toggle";

export default function Home() {
  return (
    <div className="flex h-fit flex-col">
      <main className="grow">
        
        <div className="mx-auto flex grow flex-col gap-y-6 px-4 overflow-x-hidden">
          
          <section className="grid *:col-start-1 *:row-start-1 relative mx-auto max-h-[calc(100dvh-68px-1rem)] 
          min-h-[calc(100dvh-68px-1rem)] max-w-[calc(100vw-2rem)] w-full items-center p-4 sm:p-12
          border border-border bg-background">
            
            <div className="flex w-full flex-col justify-between h-full py-8 sm:py-16">
              
              <div>
                <div className="animate-intro mb-4 text-muted-foreground justify-center flex flex-col sm:flex-row 
                sm:justify-start sm:items-center font-medium">
                  <span className="inline-flex items-center gap-2 justify-center sm:justify-start">
                    <Image src="/ycomb.png" width={20} height={20} alt="ycomb" className="size-4" /> 
                    To be Backed by YC
                  </span>
                  <div className="mx-auto sm:inline-block sm:mx-2 w-1/2 h-px sm:!size-1.5 rounded-full bg-border sm:bg-muted-foreground my-2 sm:my-0" />
                  <span className="inline-flex justify-center sm:justify-start">By & for #BusyFounders</span>
                </div>
                <div className="z-10 flex flex-col w-full ">
                  <h1 className="animate-intro [animation-delay:150ms] text-center sm:text-left  
                  text-5xl lg:text-6xl 
                  sm:max-w-xl xl:max-w-3xl tracking-tighter font-serif font-[800]">
                    {/* Real security for your application in <em className="font-fancier">hours</em>, not weeks */}
                    {/* Your AI Associate for all your start-up needs, from hiring, pitching to marketting */}
                    Your AI co-founder for everything except building product
                  </h1>
                  <h2 className="animate-intro [animation-delay:300ms] text-center sm:text-left text-lg lg:text-xl 
                  xl:text-2xl mt-2 font-medium">
                    {/* Crafted for busy founders by busy founders. */}
                    AI Associate in your startup journey.
                  </h2>
                </div>
                
              </div>
              <div className="self-end max-w-xl xl:max-w-3xl mt-12">
                
                <div className="animate-intro [animation-delay:500ms] text-sm lg:text-xl max-w-lg mb-8">
                  From pitching investors, designing, marketing, managing your inbox, scheduling 
                  meetings, building websites, to hiring, everything you need to run your start-up.
                </div>
                <div className="animate-intro [animation-delay:650ms] flex">
                  <div
                    className="min-w-full md:min-w-sm lg:min-w-xl"
                  >
                    <button
                      data-slot="button"
                      className="inline-flex items-center gap-2 whitespace-nowrap font-medium transition-all 
                      disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none 
                      [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 
                      focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border 
                      border-border bg-background hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 
                      has-[>svg]:px-3 w-full shadow-[0_0_24px] shadow-primary/10 justify-between h-auto !px-4 py-2 cursor-pointer text-xl group
                      "
                    > 
                      <input type="text" placeholder="Intrested? Join early access list" 
                      className="outline-none h-full w-full text-foreground placeholder:text-foreground"/>
                      <ArrowRight onClick={() => {
                        
                      }} className="h-full  size-6"/>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>

  );
}


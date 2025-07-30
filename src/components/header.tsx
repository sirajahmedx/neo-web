"use client";

import { Moon, Sun, Check } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const themeOptions = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System" },
];

export function Header() {
  const { setTheme, theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <header className="fixed top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-gradient-to-r from-background to-muted backdrop-blur supports-[backdrop-filter]:bg-background/60 max-w-6xl mx-auto">
      <h1
        className="text-2xl font-bold tracking-tight hover:text-primary transition-colors hover:scale-105 duration-300 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary"
        tabIndex={0}
        aria-label="Echo Home"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        }}
      >
        Echo
      </h1>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            aria-label="Toggle theme"
            className="focus-visible:ring-2 focus-visible:ring-primary relative"
          >
            <span className="sr-only">Toggle theme</span>
            {mounted && currentTheme === "dark" ? (
              <Moon className="h-5 w-5 transition-all" />
            ) : (
              <Sun className="h-5 w-5 transition-all" />
            )}
            {mounted && (
              <span className="absolute -bottom-5 text-xs text-muted-foreground capitalize">
                {currentTheme}
              </span>
            )}
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" aria-label="Theme selection menu">
          {themeOptions.map((opt) => {
            const selected = theme === opt.value;
            return (
              <DropdownMenuItem
                key={opt.value}
                onClick={() => setTheme(opt.value)}
                role="menuitemradio"
                aria-checked={selected}
                className={`flex items-center gap-2 capitalize ${
                  selected ? "font-semibold text-primary" : ""
                }`}
              >
                {selected && <Check className="h-4 w-4 text-primary" />}
                {opt.label}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}

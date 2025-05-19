"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sun, Moon, Menu, X } from "lucide-react";
import Link from "next/link";
import { useTheme } from "@/hooks/use-theme";

const Header: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");
  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl">AppName</span>
          </Link>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a
              href="/features"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Features
            </a>
            <a
              href="/pricing"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Pricing
            </a>
            <a
              href="/about"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              About
            </a>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background"
            aria-label="Toggle theme"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={theme}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.15 }}
              >
                {theme === "dark" ? (
                  <Moon className="h-4 w-4" />
                ) : (
                  <Sun className="h-4 w-4" />
                )}
              </motion.div>
            </AnimatePresence>
          </button>

          <button
            className="flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background md:hidden"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>

          {/* Desktop buttons */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="/login"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Login
            </a>
            <a
              href="/signup"
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Sign Up
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden border-t border-border"
          >
            <div className="container flex flex-col space-y-3 p-4">
              <a
                href="/features"
                className="flex h-10 items-center rounded-md px-4 text-sm font-medium hover:bg-accent"
                onClick={() => setIsOpen(false)}
              >
                Features
              </a>
              <a
                href="/pricing"
                className="flex h-10 items-center rounded-md px-4 text-sm font-medium hover:bg-accent"
                onClick={() => setIsOpen(false)}
              >
                Pricing
              </a>
              <a
                href="/about"
                className="flex h-10 items-center rounded-md px-4 text-sm font-medium hover:bg-accent"
                onClick={() => setIsOpen(false)}
              >
                About
              </a>
              <div className="my-2 h-px w-full bg-border" />
              <a
                href="/login"
                className="flex h-10 items-center rounded-md px-4 text-sm font-medium hover:bg-accent"
                onClick={() => setIsOpen(false)}
              >
                Login
              </a>
              <a
                href="/signup"
                className="flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                onClick={() => setIsOpen(false)}
              >
                Sign Up
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;

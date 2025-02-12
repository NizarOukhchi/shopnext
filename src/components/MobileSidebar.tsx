"use client";

import { Bell, Search, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { Logo } from "./ui/logo";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { ModeToggle } from "./ModeToggle";
import { UsersLists } from "./UsersLists";
import { Preloaded } from "convex/react";
import { api } from "../../convex/_generated/api";
import { CreateListPopover } from "./CreateListPopover";

interface MobileSidebarProps {
  preloadedLists: Preloaded<typeof api.lists.getLists>;
}

export function MobileSidebar({ preloadedLists }: MobileSidebarProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setOpen(!open)}
        className="z-20"
      >
        <Menu size={24} />
      </Button>
      <AnimatePresence mode="wait" initial={false}>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className={cn(
              "absolute top-0 left-0 bottom-0 right-0 z-20 bg-background",
              open ? "block" : "hidden"
            )}
          >
            <div className="flex w-full justify-between items-center p-4">
              <div className="flex items-center gap-2">
                <Logo size={24} />
              </div>
              <div className="flex items-center">
                <Button variant="ghost" size="icon">
                  <Search size={24} />
                </Button>
                <Button variant="ghost" size="icon">
                  <Bell size={24} />
                </Button>
                <ModeToggle />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setOpen(false)}
                >
                  <X size={24} />
                </Button>
              </div>
            </div>
            <nav className="space-y-2 p-4">
              <CreateListPopover />
              <UsersLists preloadedLists={preloadedLists} />
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

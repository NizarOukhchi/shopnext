"use client";
import useClickOutside from "@/hooks/useClickOutside";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { ArrowLeftIcon, PlusCircleIcon } from "lucide-react";
import { useRef, useState, useEffect, useId, useActionState } from "react";
import { Button } from "./ui/button";
import { createList } from "@/app/lists/[_id]/actions";
import { TextShimmer } from "./ui/text-shimmer";
import { useRouter } from "next/navigation";

const TRANSITION = {
  type: "spring",
  bounce: 0.05,
  duration: 0.3,
};

const initialState = {
  message: "",
  listId: undefined,
};

export default function CreateListPopover() {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(createList, initialState);
  const uniqueId = useId();
  const formContainerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState<null | string>(null);
  const wasPending = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const openMenu = () => {
    setIsOpen(true);
  };

  const closeMenu = () => {
    setIsOpen(false);
    setText(null);
  };

  useClickOutside(formContainerRef as React.RefObject<HTMLElement>, () => {
    closeMenu();
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (wasPending.current && !pending) {
      // Mutation has completed
      closeMenu();

      router.push(`/lists/${state.listId}`);
    }
    wasPending.current = pending;
  }, [pending, router, state.listId]);

  return (
    <MotionConfig transition={TRANSITION}>
      <div className="relative flex items-center z-10">
        <motion.button
          key="button"
          layoutId={`popover-${uniqueId}`}
          className="relative inline-flex text-foreground px-3 py-2 rounded-md text-md font-semibold"
          style={{
            borderRadius: 8,
          }}
          onClick={openMenu}
        >
          <motion.span
            className="flex gap-2 items-center"
            layoutId={`popover-label-${uniqueId}`}
          >
            <PlusCircleIcon size={20} />
            Create a new list
          </motion.span>
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={formContainerRef}
              layoutId={`popover-${uniqueId}`}
              className="absolute h-[120px] w-[250px] overflow-hidden bg-white outline-none shadow-1"
              style={{
                borderRadius: 8,
              }}
            >
              <form
                autoComplete="off"
                className="flex h-full flex-col"
                action={formAction}
              >
                <motion.span
                  layoutId={`popover-label-${uniqueId}`}
                  onClick={() => inputRef.current?.focus()}
                  aria-hidden="true"
                  style={{
                    opacity: text ? 0 : 1,
                  }}
                  className="absolute left-4 top-[18px] select-none text-base text-zinc-500 dark:text-zinc-400 cursor-text"
                >
                  Create a new list
                </motion.span>
                <input
                  ref={inputRef}
                  name="name"
                  type="text"
                  autoComplete="off"
                  className="h-full w-full rounded-md bg-transparent px-4 py-3 text-base outline-none"
                  autoFocus
                  required
                  onChange={(e) => setText(e.target.value)}
                />
                <div key="close" className="flex justify-between px-4 py-3">
                  <button
                    type="button"
                    className="flex items-center"
                    onClick={closeMenu}
                    aria-label="Close popover"
                  >
                    <ArrowLeftIcon
                      size={16}
                      className="text-zinc-900 dark:text-zinc-100"
                    />
                  </button>

                  <Button
                    className="relative ml-1 flex shrink-0 scale-100 select-none appearance-none items-center justify-center px-2 transition-colors active:scale-[0.98]"
                    type="submit"
                    aria-label="Submit note"
                    disabled={pending}
                  >
                    {!pending && <span className="text-sm">Submit</span>}
                    {pending && (
                      <TextShimmer className="text-sm" duration={1}>
                        Creating list...
                      </TextShimmer>
                    )}
                  </Button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}

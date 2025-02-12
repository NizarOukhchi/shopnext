"use client";
import useClickOutside from "@/hooks/useClickOutside";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { ArrowLeftIcon } from "lucide-react";
import { useRef, useState, useEffect, useId, useActionState } from "react";
import { Button } from "./ui/button";
import { deleteList } from "@/app/lists/[_id]/actions";
import { TextShimmer } from "./ui/text-shimmer";
import { useRouter } from "next/navigation";
const TRANSITION = {
  type: "spring",
  bounce: 0.05,
  duration: 0.3,
};

const initialState = {
  message: "",
  nextList: undefined,
};

type DeleteListPopoverProps = {
  listId: string;
};

export function DeleteListPopover({ listId }: DeleteListPopoverProps) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(deleteList, initialState);
  const uniqueId = useId();
  const formContainerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const wasPending = useRef(false);

  const openMenu = () => {
    setIsOpen(true);
  };

  const closeMenu = () => {
    setIsOpen(false);
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
      closeMenu();
      console.log("state.nextList", state);
      if (state.nextList) {
        router.push(`/lists/${state.nextList._id}`);
      } else {
        router.push("/lists");
      }
    }
    wasPending.current = pending;
  }, [pending, router, state, state.nextList]);

  return (
    <MotionConfig transition={TRANSITION}>
      <div className="relative flex items-center z-10">
        <motion.button
          key="button"
          layoutId={`popover-${uniqueId}`}
          className="relative inline-flex text-foreground px-3 py-2 text-sm font-medium"
          onClick={openMenu}
        >
          Move to trash
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={formContainerRef}
              layoutId={`popover-${uniqueId}`}
              className="absolute w-[250px] overflow-hidden bg-white outline-none shadow-1"
              style={{
                borderRadius: 8,
              }}
            >
              <form
                autoComplete="off"
                className="flex h-full flex-col"
                action={formAction}
              >
                <div className="flex justify-between px-4 py-3">
                  Are you sure you want to delete this list, you will loose all
                  the products in it?
                </div>
                <input
                  type="text"
                  name="listId"
                  className="hidden"
                  readOnly
                  defaultValue={listId}
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
                    {!pending && (
                      <span className="text-sm">Yes, I&apos;m sure</span>
                    )}
                    {pending && (
                      <TextShimmer className="text-sm" duration={1}>
                        Deleting list...
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

"use client";
import useClickOutside from "@/hooks/useClickOutside";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { ArrowLeftIcon, ShoppingCartIcon } from "lucide-react";
import { useRef, useState, useEffect, useId, useActionState } from "react";
import { Button } from "./ui/button";
import { Magnetic } from "./ui/magnetic";
import { TextShimmer } from "./ui/text-shimmer";
import { useParams } from "next/navigation";
import { Id } from "../../convex/_generated/dataModel";
import { createProduct } from "@/app/lists/[_id]/actions";

const TRANSITION = {
  type: "spring",
  bounce: 0.05,
  duration: 0.3,
};

const initialState = {
  message: "",
  productId: undefined,
};

export function CreateProductPopover() {
  const params = useParams();
  const listId = params._id as Id<"lists">;
  const [state, formAction, pending] = useActionState(
    createProduct,
    initialState
  );

  const uniqueId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const formContainerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState("");
  const wasPending = useRef(false);

  const openMenu = () => {
    setIsOpen(true);
  };

  const closeMenu = () => {
    setIsOpen(false);
    setUrl("");
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
    }
    wasPending.current = pending;
  }, [pending, state.productId]);

  return (
    <MotionConfig transition={TRANSITION}>
      <div className="relative flex items-centerz-10">
        <motion.button
          ref={buttonRef}
          key="button"
          layoutId={`popover-${uniqueId}`}
          className="relative inline-flex bg-primary text-white px-3 py-2 rounded-md text-md font-semibold"
          style={{
            borderRadius: 8,
          }}
          onClick={openMenu}
        >
          <Magnetic
            intensity={0.1}
            springOptions={{ bounce: 0.1 }}
            actionArea="global"
            range={200}
          >
            <motion.span
              className="flex items-center"
              layoutId={`popover-label-${uniqueId}`}
            >
              <ShoppingCartIcon size={20} />
            </motion.span>
          </Magnetic>
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={formContainerRef}
              layoutId={`popover-${uniqueId}`}
              className="absolute h-[120px] w-[450px] right-0 overflow-hidden bg-white outline-none shadow-1 z-10"
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
                  onClick={() => formContainerRef.current?.focus()}
                  aria-hidden="true"
                  style={{
                    opacity: url ? 0 : 1,
                  }}
                  className="absolute left-4 top-[18px] select-none text-base text-zinc-500 dark:text-zinc-400 cursor-text"
                >
                  Enter product URL
                </motion.span>
                <input
                  name="url"
                  type="url"
                  value={url}
                  className="h-full w-full rounded-md bg-transparent px-4 py-3 text-base outline-none"
                  autoFocus
                  required
                  onChange={(e) => setUrl(e.target.value)}
                />
                <input type="hidden" name="listId" value={listId} />
                <div className="flex justify-between px-4 py-3">
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
                    className="relative ml-1"
                    type="submit"
                    disabled={pending}
                  >
                    {!pending && <span className="text-sm">Add Product</span>}
                    {pending && (
                      <TextShimmer className="text-sm" duration={1}>
                        Adding product...
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

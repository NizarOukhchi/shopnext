"use client";
import { cn } from "@/lib/utils";
import { AnimatePresence, Transition, motion } from "motion/react";
import {
  Children,
  cloneElement,
  ReactElement,
  useEffect,
  useState,
  useId,
  ReactNode,
} from "react";

type AnimatedBackgroundProps = {
  children:
    | ReactElement<{ "data-id": string }>[]
    | ReactElement<{ "data-id": string }>
    | ReactNode;
  defaultValue?: string;
  onValueChange?: (newActiveId: string | null) => void;
  className?: string;
  transition?: Transition;
  enableHover?: boolean;
  childrenClassName?: string;
  titleClassName?: string;
};

export function AnimatedBackground({
  children,
  defaultValue,
  onValueChange,
  className,
  transition,
  enableHover = false,
  childrenClassName,
  titleClassName,
}: AnimatedBackgroundProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const uniqueId = useId();

  const handleSetActiveId = (id: string | null, isTitle?: boolean) => {
    if (!isTitle) {
      setActiveId(id);

      if (onValueChange) {
        onValueChange(id);
      }
    }
  };

  useEffect(() => {
    if (defaultValue !== undefined) {
      setActiveId(defaultValue);
    }
  }, [defaultValue]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return Children.map(children, (child: any, index) => {
    const id = child.props["data-id"];
    const isTitle = child.props["data-is-title"];
    const interactionProps = enableHover
      ? {
          onMouseEnter: () => handleSetActiveId(id),
          onMouseLeave: () => handleSetActiveId(null),
        }
      : {
          onClick: () => handleSetActiveId(id, isTitle),
        };

    return cloneElement(
      child,
      {
        key: index,
        className: cn("relative inline-flex", child.props.className),
        "aria-selected": activeId === id,
        "data-checked": activeId === id ? "true" : "false",
        ...interactionProps,
      },
      <>
        <AnimatePresence initial={false}>
          {activeId === id && (
            <motion.div
              layoutId={`background-${uniqueId}`}
              className={cn("absolute inset-0", className)}
              transition={transition}
              initial={{ opacity: defaultValue ? 1 : 0 }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
            />
          )}
        </AnimatePresence>
        <span
          className={cn(
            "z-10 w-full",
            isTitle ? titleClassName : childrenClassName
          )}
        >
          {child.props.children}
        </span>
      </>
    );
  });
}

import { twMerge } from "tailwind-merge";

export const classNames = (...classes: (string | boolean | undefined)[]) =>
  twMerge(classes.filter(Boolean).join(" "));

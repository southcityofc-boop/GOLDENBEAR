
import React from "react"; import clsx from "@/lib/clsx";
export function Button({ variant="default", size="md", className="", ...props }: any){
  const base="inline-flex items-center justify-center rounded-2xl font-medium transition active:scale-[0.99]";
  const variants:any={ default:"bg-slate-900 text-white hover:bg-slate-800", outline:"border border-slate-300 hover:bg-slate-50", secondary:"bg-slate-100 hover:bg-slate-200", ghost:"hover:bg-slate-100" };
  const sizes:any={ sm:"h-8 px-3 text-sm", md:"h-10 px-4 text-sm", lg:"h-11 px-5 text-base", icon:"h-10 w-10" };
  return <button className={clsx(base, variants[variant], sizes[size], className)} {...props} />;
}


import React from "react"; import clsx from "@/lib/clsx";
export function Input(props:any){ return <input {...props} className={clsx("h-11 w-full rounded-2xl border px-3 outline-none focus:ring-2 focus:ring-slate-300", props.className)} />; }

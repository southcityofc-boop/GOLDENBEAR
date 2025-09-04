
import React from "react"; export function Card({ children, className="" }: any){ return <div className={`rounded-3xl border bg-white shadow-sm ${className}`}>{children}</div>; }
export const CardHeader=({children,className=""}:any)=><div className={`p-6 ${className}`}>{children}</div>;
export const CardContent=({children,className=""}:any)=><div className={`p-6 pt-0 ${className}`}>{children}</div>;
export const CardFooter=({children,className=""}:any)=><div className={`px-6 pb-6 ${className}`}>{children}</div>;
export const CardTitle=({children,className=""}:any)=><h3 className={`text-lg font-semibold ${className}`}>{children}</h3>;
export const CardDescription=({children,className=""}:any)=><p className={`text-sm text-slate-600 ${className}`}>{children}</p>;

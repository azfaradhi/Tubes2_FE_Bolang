"use client";
import dynamic from "next/dynamic";

const TreeRecipe = dynamic(() => import("@/Tree/TreeRecipe"), { ssr: false });

export default function TreeClientWrapper() {
  return <TreeRecipe />;
}

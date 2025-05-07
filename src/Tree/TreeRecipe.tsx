"use client";
import Tree from "react-d3-tree";
import recipeData from "@/data/recipe.json";

export default function TreeRecipe() {
  return (
    <div style={{ width: "100%", height: "500px" }}>
      <Tree data={recipeData} orientation="vertical" 
      translate={{x:300, y:40}}
      // draggable = {false}
      />
    </div>
  );
}

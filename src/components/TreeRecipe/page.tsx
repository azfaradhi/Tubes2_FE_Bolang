"use client";
import Tree, { RawNodeDatum } from "react-d3-tree";
import { useState } from "react";
import imageList from "@/data/images.json";
import treee from "@/data/recipe.json";

type ElementImage = {
  name: string;
  image_url: string;
}

export default function TreeRecipe({ treeData }: { treeData: RawNodeDatum | null }) {

  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = treee.length;

  const nextPage = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const findImageByName = (name: string): string | undefined => {
    const item = imageList.find((el) => el.name === name);
    return item?.image_url;
  };


  const renderCustomNode = ({ nodeDatum }: { nodeDatum: any }) => {
    const imageSrc = findImageByName(nodeDatum.name);
    console.log("ImageSrc:", imageSrc)

    return (
      <foreignObject width={150} height={150} x={-75} y={-75}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background: "#fff",
            borderRadius: "8px",
            padding: "4px",
            boxSizing: "border-box",
          }}
        >
          {imageSrc && (
            <img
              src={imageSrc}
              alt={nodeDatum.name}
              width={50}
              height={50}
              style={{
                marginBottom: "4px",
                objectFit: "contain",
                display: "block",
                border: "1px solid #ccc",
              }}
              crossOrigin="anonymous"
            />
          )}
          <div style={{ fontSize: "12px", textAlign: "center" }}>
            {nodeDatum.name}
          </div>
        </div>
      </foreignObject>
    );
  };

  return (
    <div className="flex flex-col w-full max-h-screen">
      <div className="bg-[#EBD1A9] w-full max-h-screen flex flex-col items-center">
        <div className="w-full h-[500px] flex justify-center items-center p-4 ">
            <Tree
              data={treee[currentPage]}
              orientation="vertical"
              translate={{ x: 300, y: 40 }}
            />
        </div>
      </div>
      <div className="flex gap-4 mt-4 justify-center w-full">
          <button
        onClick={prevPage}
        disabled={currentPage === 0}
        className="px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50"
          >
        
          </button>
          <span className="text-sm mt-2">{currentPage + 1} / {totalPages}</span>
          <button
        onClick={nextPage}
        disabled={currentPage === totalPages - 1}
        className="px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50"
          >
          </button>
        </div>
      </div>
  );
}
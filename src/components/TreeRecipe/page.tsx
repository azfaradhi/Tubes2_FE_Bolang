"use client";
import Tree, { RawNodeDatum } from "react-d3-tree";
import { useState } from "react";
import imageList from "@/data/images.json";
import basic from "@/data/basic.json";


export default function TreeRecipe({treeData}: {treeData: RawNodeDatum[] | null }) {

  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = treeData?.length || 0;

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


  const renderCustomNode = ({ nodeDatum }: { nodeDatum: RawNodeDatum }) => {
    const imageSrc = findImageByName(nodeDatum.name);
    const link = `/Elements/${nodeDatum.name.replace(/ /g, '_')}.png`;

    return (
      <foreignObject width={120} height={120} x={-60} >
        <div className={`flex flex-col items-center rounded-lg p-2 box-border border-2 border-black ${basic.includes(nodeDatum.name) ? 'bg-green-500' : 'bg-white'}`}>
          {imageSrc && (
            <img
              src={link}
              alt={nodeDatum.name}
              width={50}
              height={50}
              className="mb-2 object-contain"
              crossOrigin="anonymous"
            />
          )}
          <a href={imageSrc} target="_blank" rel="noopener noreferrer" className="text-xs text-black text-center">{nodeDatum.name}</a>
        </div>
      </foreignObject>
    );
  };


  return (
    <div className="flex flex-col w-full h-full">
      <div className="bg-[#EBD1A9] w-full h-full flex flex-col items-center">
        <div className="w-full h-full flex justify-center items-center">
          <Tree
            data={treeData?.[currentPage] || { name: '', children: [] }}
            orientation="vertical"
            translate={{ x: 300, y: 40 }}
            renderCustomNodeElement={renderCustomNode}
            nodeSize={{ x: 200, y: 200 }}
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
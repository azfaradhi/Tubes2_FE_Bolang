'use client';

import ParameterBar from "@/components/ParameterBar/page";
import ResultBar from "@/components/ResultBar/page";
import TreeRecipe from "@/Tree/TreeRecipe";
import { useState } from "react";

type inputData = {
  element: string;
  algorithm: string;
  method: string;
  count: string;
}

export default function Home() {
  const [selected, setSelected] = useState<inputData | null>(null);
  const [isParameter, setIsParameter] = useState<boolean>(true);
  const [isResult, setIsResult] = useState<boolean>(false);


  const handleParameterSelect = (data: inputData) => {
    console.log("Allselect:", data);
    setSelected(data);
    setIsParameter(false);
    setIsResult(true);
  };

  const handleResultSelect = () => {
    setIsParameter(true);
    setIsResult(false);
  }

  return (
    // <main className="flex flex-col items-center p-24 gap-4">
    //   <h1 className="text-4xl font-bold">Little Alchemy 2 Recipe Finder</h1>
    //   <ParameterBar onSelect={handleElementSelect} />
    //   {selected && <p className="mt-4">You selected: <strong>{selected}</strong></p>}
    // </main>
    <div className="flex flex-col py-10 h-screen ">
      {/* judul dan subjudul */}
      <div>
        <h1 className="font-bold text-center font-serif text-[48px] text-[#F2EAD3]">Alchemy Finder</h1>
        <p className="font-semibold text-center font-serif text-[20px] text-[#F2EAD3]">Explore elements and their combination</p>
      </div>
    
      {isParameter && (
        <div className="w-1/5 mx-10 mt-2">
        <ParameterBar onSelect={handleParameterSelect} />
        </div>
      )}
      {isResult &&(
        <div className="flex flex-row mt-5 mr-10">
          <div className="w-1/6 mx-10 mt-2">
            <ResultBar onSelect={handleResultSelect} />
          </div>
          <div className="bg-[#EBD1A9] w-full">
            <TreeRecipe />

          </div>
          
        </div>
        
      )
        
      }


      {/* <div className="flex justify-center mx-20 w-full"> 
        <h1 className="text-4xl font-bold">Little Alchemy 2 Recipe Finder</h1>
        {selected && <p className="mt-4">You selected: <strong>{selected}</strong></p>}
      </div> */}
    </div>
  );
}

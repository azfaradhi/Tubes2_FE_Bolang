'use client';
import ParameterBar from "@/components/ParameterBar/page";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { useEffect } from "react";
import Image from "next/image";
import { inputData } from "@/types/types";


export default function Home() {
  const router = useRouter();
  const [selectedData, setSelectedData] = useState<inputData | null>(null);
  const [isParameter, setIsParameter] = useState<boolean>(true);
  const [isResult, setIsResult] = useState<boolean>(false);


  useEffect(() => {
    if (isResult && selectedData) {
      const queryParams = new URLSearchParams({
        element: selectedData.element,
        algorithm: selectedData.algorithm,
        count: selectedData.count.toString(),
        liveUpdate: selectedData.liveUpdate.toString(),
        delay: selectedData.delay.toString()
      }).toString();

      router.push(`/result?${queryParams}`);
    }
  }, [isResult, selectedData, router]);

  const handleParameterSelect = (data: inputData) => {
    console.log('Selected Data:', data);
    setSelectedData(data);
    setIsParameter(false);
    setIsResult(true);
  };


  return (
    <div className="flex flex-col py-10 min-h-screen px-4 sm:px-6 lg:px-12">
      <div className="text-center space-y-2">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <img src="/alchemy-logo.png" width={30} alt="Alchemy Logo" />
          <h1 className="font-bold font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F2EAD3]">Alchemy Finder</h1>
        </div>
        <p className="font-semibold font-serif text-lg sm:text-xl text-[#F2EAD3]">
          Explore elements and their combination
        </p>
      </div>

      <div className="flex flex-col lg:flex-row justify-center items-center gap-6 mt-10 w-full">
        {isParameter && (
          <div className="w-full sm:w-3/4 lg:w-1/4 max-w-sm mx-auto">
            <ParameterBar onSelect={handleParameterSelect} />
          </div>
        )}

        {isParameter && (
          <div className="w-full lg:w-1/2 border-2 p-6 rounded-xl text-white font-serif space-y-6 max-w-3xl">
            <h2 className="text-xl font-bold text-center">About</h2>

            <p className="text-justify">
              <strong>Alchemy Finder</strong> is an open-source visualization tool for exploring combinations of elements using BFS/DFS/BID (Bidirectional) algorithms. Multiple recipe methods are used, and the number of recipes must be specified. It is designed for educational purposes, creative exploration, and experimentation.
            </p>

            <p className="text-justify">
              This software is released under an open license. Feel free to use, modify, and distribute it with proper attribution.
            </p>

            <div className="border-t border-white opacity-50" />

            <div className="space-y-2">
              <h3 className="font-semibold">Resources</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  <a href="https://github.com/azfaradhi/Tubes2_FE_Bolang" className="underline hover:text-gray-200" target="_blank" rel="noopener noreferrer">Frontend Repository</a>,
                  <a href="https://github.com/Ferdin-Arsenic/Tubes2_BE_Bolang" className="underline hover:text-gray-200" target="_blank" rel="noopener noreferrer"> Backend Repository</a>
                </li>
                <li>
                  <a href="https://www.youtube.com/watch?v=Iq1JeTXSvfU" className="underline hover:text-gray-200" target="_blank" rel="noopener noreferrer">YouTube Demo</a>
                </li>
                <li>
                  Created by
                  <a href="https://github.com/azfaradhi" className="underline hover:text-gray-200" target="_blank" rel="noopener noreferrer"> azfaradhi</a>,
                  <a href="https://github.com/grwna" className="underline hover:text-gray-200" target="_blank" rel="noopener noreferrer"> grwna</a>, and
                  <a href="https://github.com/Ferdin-Arsenic" className="underline hover:text-gray-200" target="_blank" rel="noopener noreferrer"> Ferdin-Arsenic</a>
                </li>
              </ul>
            </div>
          </div>
        )}

        {isParameter && (
          <div className="w-full sm:w-3/4 lg:w-1/4 bg-[#D09D48] rounded-[16px] px-6 py-8 text-white font-serif text-sm text-center max-w-sm">
            <p className="mb-6 text-lg text-[#4E3625] font-bold">
              Access the game here:
            </p>
            <a href="https://littlealchemy2.com/" target="_blank" rel="noopener noreferrer" className="underline text-[#4E3625] hover:text-black">
              https://littlealchemy2.com/
            </a>
            <img src="/image.png" alt="Little Alchemy" className="mt-4 mx-auto w-40 h-auto" />
          </div>
        )}
      </div>
    </div>


  );
}

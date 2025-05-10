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
        count: selectedData.count
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
    <div className="flex flex-col py-10 h-screen ">
      <div>
        <h1 className="font-bold text-center font-serif text-[48px] text-[#F2EAD3]">Alchemy Finder</h1>
        <p className="font-semibold text-center font-serif text-[20px] text-[#F2EAD3]">Explore elements and their combination</p>
      </div>

      <div className="flex flex-row justify-center mt-10 items-center">
        {isParameter && (
          <div className="mx-10 w-1/4">
            <ParameterBar onSelect={handleParameterSelect} />
          </div>
        )}
        {isParameter && (
          <div className="w-1/2 border-2 p-6 rounded-xl text-white font-serif space-y-6">
            <h2 className="text-xl font-bold text-center">About</h2>

            <p className="text-justify">
              <strong>Alchemy Finder</strong> is an open-source visualization tool for exploring combinations of elements using BFS/DFS/BID(Bidirectional) algorithms. Multiplie recipe method is used here, and is required to input the number of recipe. It is designed for educational purposes, creative exploration, and experimentation.
            </p>

            <p className="text-justify">
              This software is released under an open license. You are free to use, modify, and distribute it for any purpose — academic, personal, or commercial — with proper attribution.
            </p>

            <div className="border-t border-white opacity-50"></div>

            <div className="space-y-2">
              <h3 className="font-semibold">Resources</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  <a href="https://github.com/azfaradhi/Tubes2_FE_Bolang" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-200">Frontend Repository</a>, <a href="https://github.com/Ferdin-Arsenic/Tubes2_BE_Bolang" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-200">Backend Repository</a>
                </li>
                <li>
                  <a
                    href="https://youtube.com/your-demo-video"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-gray-200"
                  >
                    YouTube Demo
                  </a>
                </li>
                <li>
                  Created by <a href="https://github.com/azfaradhi" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-200">azfaradhi</a>, <a href="https://github.com/grwna" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-200">grwna</a>, and <a href="https://github.com/Ferdin-Arsenic" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-200">Ferdin-Arsenic</a>
                </li>
              </ul>
            </div>

            <div className="border-t border-white opacity-50"></div>

            <p className="text-xs text-center italic">
              Built with 🫡 by Bolang, 2025
            </p>
          </div>
        )}
        {isParameter && (
          <div className="flex flex-col items-center bg-[#D09D48] rounded-[16px] mx-10 w-1/4 px-6 py-8 text-white font-serif text-sm">
            <p className="mb-6 text-lg text-[#4E3625] font-bold">
              Access the game here:
            </p>
            <a href="https://littlealchemy2.com/" target="_blank" rel="noopener noreferrer" className="underline text-[#4E3625] hover:text-black">https://littlealchemy2.com/</a>
            <Image src="/image.png" alt="Little Alchemy" width={200} height={200} className="mt-4" />
          </div>
        )}

      </div>
    </div>

  );
}

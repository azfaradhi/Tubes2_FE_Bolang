"use client";
import {useState} from 'react'

type resultData = {
    time: string,
    node: string,
}



export default function ResultBar({onSelect}: {}, data: resultData){
    return (
        <div className="flex flex-col items-center max-w-full  bg-[#D09D48] rounded-[16px] px-6 py-8">
            <h1 className="text-[#4E3625] text-[24px] font-serif font-bold mb-4">RESULT</h1>
            <div className='text-[#4E3625] text-[16px] font-serif font-semibold'>
                <p>Total times: 1000 ms</p>
                <p>Total nodes: 234 nodes</p>
            </div>

    
    
  
  
            <div className="w-full mt-10">
                <button 
                onClick={() => onSelect()}

                className="w-full py-2 bg-[#A4752A] text-white rounded-2xl shadow-md hover:bg-[#8B5B2A] transition duration-200">
                Back
                </button>
            </div>
        </div>
    );
}
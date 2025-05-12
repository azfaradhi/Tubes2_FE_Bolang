'use client';
import { useState } from 'react';
import recipeData from "@/data/images.json";
import { inputData } from "@/types/types";

export default function ParameterBar({ onSelect }: { onSelect: (value: inputData) => void }) {
  const recipeNames: string[] = recipeData.map(recipe => recipe.name);
  const [filtered, setFiltered] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [element, setElement] = useState('');
  const [algoritm, setAlgorithm] = useState('');
  const [count, setCount] = useState(0);
  const [liveUpdate, setLiveUpdate] = useState(false);
  const [delayInput, setDelayInput] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setElement(value);
    if (value === '') {
      setFiltered([]);
      setShowDropdown(false);
    }
    else {
      const matches = recipeNames.filter(el =>
        el.toLowerCase().includes(value.toLowerCase())
      );
      setFiltered(matches);
      setShowDropdown(true);
    }
  };

  const handleSelect = (value: string) => {
    setElement(value);
    setShowDropdown(false);
  };

  const handleApply = () => {
    if (element === '' || algoritm === '' || count <= 0) {
      alert('Your input is not valid');
      return;
    }
    console.log("Delay: ", delayInput);

    onSelect({
      element: element,
      algorithm: algoritm,
      count: count,
      liveUpdate: liveUpdate,
      delay: delayInput
    });
  }



  return (
    <div className="flex flex-col items-center bg-[#D09D48] rounded-[16px] px-6 py-8">
      <h1 className="text-[#4E3625] text-[24px] font-serif font-bold mb-2 ">SEARCH</h1>

      {/* Search Bar */}
      <div className="relative w-full">
        <p className='text-[#4E3625] text-[16px] font-serif font-semibold mb-2'>Elements:</p>
        <input
          type="text"
          placeholder="Search Element"
          className="w-full py-1 rounded-2xl bg-[#F2EAD3] text-[#333333] placeholder-[#666666] text-center shadow-md focus:outline-none focus:ring-2 focus:ring-[#A4752A] transition"
          value={element}
          onChange={handleChange}
        />

        {showDropdown && filtered.length > 0 && (
          <ul className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-md max-h-60 overflow-y-auto z-10">
            {filtered.map((item, idx) => (
              <li
                key={idx}
                className="px-4 py-2 hover:bg-[#F2EAD3] text-[#4E3625] cursor-pointer"
                onClick={() => handleSelect(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Algorithm Dropdown */}
      <div className="w-full mt-4">
        <p className='text-[#4E3625] text-[16px] font-serif font-semibold mb-2'>Algorithm:</p>
        <div className="flex justify-between gap-2">
          <button
            className={`flex-1 py-1 rounded-2xl ${algoritm === 'BFS'
              ? 'bg-[#A4752A] text-white'
              : 'bg-[#F2EAD3] text-[#333333]'
              } shadow-md hover:bg-[#A4752A] hover:text-white transition`}
            onClick={() => setAlgorithm('BFS')}
          >
            BFS
          </button>
          <button
            className={`flex-1 py-1 rounded-2xl ${algoritm === 'DFS'
              ? 'bg-[#A4752A] text-white'
              : 'bg-[#F2EAD3] text-[#333333]'
              } shadow-md hover:bg-[#A4752A] hover:text-white transition`}
            onClick={() => setAlgorithm('DFS')}
          >
            DFS
          </button>
          <button
            className={`flex-1 py-1 rounded-2xl ${algoritm === 'BID'
              ? 'bg-[#A4752A] text-white'
              : 'bg-[#F2EAD3] text-[#333333]'
              } shadow-md hover:bg-[#A4752A] hover:text-white transition`}
            onClick={() => setAlgorithm('BID')}
          >
            BID
          </button>
        </div>
      </div>

      {/* Count
      <div className="w-full mt-4">
        <p className='text-[#4E3625] text-[16px] font-serif font-semibold mb-2'>Recipe Parameter: </p>
        <select
          value={count}
          className="w-full py-1 rounded-2xl bg-[#F2EAD3] text-[#333333] placeholder-[#666666] text-center shadow-md focus:outline-none focus:ring-2 focus:ring-[#A4752A] transition"
          onChange={(e) => setCount(e.target.value.toString())}
        >
          <option value="0">Select a number</option>
          {Array.from({ length: 100 }, (_, i) => i + 1).map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div> */}
      <div className="w-full mt-4">
        <p className='text-[#4E3625] text-[16px] font-serif font-semibold mb-2'>Count:</p>
        <input
          type="number"
          placeholder="Count"
          className="w-full py-1 rounded-2xl bg-[#F2EAD3] text-[#333333] placeholder-[#666666] text-center shadow-md focus:outline-none focus:ring-2 focus:ring-[#A4752A] transition"
          onChange={(e) => setCount(Number(e.target.value))}
        />
      </div>



      {/* Algorithm Dropdown */}
      <div className="w-full mt-4">
        <p className='text-[#4E3625] text-[16px] font-serif font-semibold mb-2'>Live Update?</p>
        <div className="flex justify-between gap-2">
          <button
            className={`flex-1 py-1 rounded-2xl ${liveUpdate === true
              ? 'bg-[#A4752A] text-white'
              : 'bg-[#F2EAD3] text-[#333333]'
              } shadow-md hover:bg-[#A4752A] hover:text-white transition`}
            onClick={() => setLiveUpdate(true)}
          >
            Yes
          </button>
          <button
            className={`flex-1 py-1 rounded-2xl ${liveUpdate === false
              ? 'bg-[#A4752A] text-white'
              : 'bg-[#F2EAD3] text-[#333333]'
              } shadow-md hover:bg-[#A4752A] hover:text-white transition`}
            onClick={() => setLiveUpdate(false)}
          >
            No
          </button>
        </div>
      </div>

      {liveUpdate && (
      <div className="w-full mt-4">
        <p className='text-[#4E3625] text-[16px] font-serif font-semibold mb-2'>Delay (ms):</p>
        <input
          type="number"
          placeholder="Delay"
          className="w-full py-1 rounded-2xl bg-[#F2EAD3] text-[#333333] placeholder-[#666666] text-center shadow-md focus:outline-none focus:ring-2 focus:ring-[#A4752A] transition"
          onChange={(e) => setDelayInput(Number(e.target.value))}
        />
      </div>
      )}

      {/* apply button */}
      <div className="w-full mt-4">
        <button
          onClick={handleApply}
          className="w-full py-2 bg-[#A4752A] text-white rounded-2xl shadow-md hover:bg-[#8B5B2A] transition duration-200">
          Apply
        </button>
      </div>
    </div>
  );

}

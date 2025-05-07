'use client';
import { useState } from 'react';
import recipeData from "@/data/elements.json";

type inputData = {
  element: string;
  algorithm: string;
  method: string;
  count: string;
}

export default function ParameterBar({ onSelect }: { onSelect: (value: inputData) => void }) {
  const [filtered, setFiltered] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [element, setElement] = useState('');
  const [algoritm, setAlgorithm] = useState('');
  const [method, setMethod] = useState('');
  const [count, setCount] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setElement(value);
    if (value === '') {
      setFiltered([]);
      setShowDropdown(false);
    } 
    else {
      const matches = recipeData.filter(el =>
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
    console.log('Element: ', element);
    console.log('Algorithm: ', algoritm);
    console.log('Method: ', method);
    console.log('Count: ', count);
    if (element === '' || algoritm === '' || method === '') {
      alert('Please fill in all fields.');
      return;
    }
    onSelect({
      element: element,
      algorithm: algoritm,
      method,
      count
    });
  };

  return (
    <div className="flex flex-col items-center max-w-full  bg-[#D09D48] rounded-[16px] px-6 py-8">
      <h1 className="text-[#4E3625] text-[24px] font-serif font-bold mb-4">SEARCH</h1>
  
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
          <select
            name="Algorithm"
            className="w-full py-1 rounded-2xl bg-[#F2EAD3] text-[#333333] placeholder-[#666666] text-center shadow-md focus:outline-none focus:ring-2 focus:ring-[#A4752A] transition"
            onChange={(e) => setAlgorithm(e.target.value)}
          >
            <option value="" disabled hidden>Algorithm</option>
            <option value="BFS">BFS</option>
            <option value="DFS">DFS</option>
            <option value="BID">Bidirectional</option>
          </select>
      </div>
  

      {/* methode Dropdown */}
      <div className="w-full mt-4">
        <p className='text-[#4E3625] text-[16px] font-serif font-semibold mb-2'>Method:</p>
          <select
            name="Method"
            className="w-full py-1 rounded-2xl bg-[#F2EAD3] text-[#333333] placeholder-[#666666] text-center shadow-md focus:outline-none focus:ring-2 focus:ring-[#A4752A] transition"
            onChange={(e) => setMethod(e.target.value)}
          >
            <option value="" disabled hidden>Method</option>
            <option value="ShortestPath">Shortest Path</option>
            <option value="MultiplieRecipe">Multiplie Recipe</option>
          </select>
      </div>

      {/* Count */}
      {method === "MultiplieRecipe" && (
        <div className="w-full mt-4">
          <p className='text-[#4E3625] text-[16px] font-serif font-semibold mb-2'>Recipe Parameter: </p>
            <select
              name="Method"
              className="w-full py-1 rounded-2xl bg-[#F2EAD3] text-[#333333] placeholder-[#666666] text-center shadow-md focus:outline-none focus:ring-2 focus:ring-[#A4752A] transition"
              onChange={(e) => setCount(e.target.value)}
            >
              <option value="" disabled hidden>Method</option>
              {Array.from({ length: 100 }, (_, i) => i + 1).map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
        </div>
      )}

    {/* apply button */}
      <div className="w-full mt-20">
        <button 
          onClick={handleApply}

          className="w-full py-2 bg-[#A4752A] text-white rounded-2xl shadow-md hover:bg-[#8B5B2A] transition duration-200">
          Apply
        </button>
      </div>
    </div>
  );
  
}

"use client";
import { useState } from 'react';
import ResultBar from '@/components/ResultBar/page';
import TreeRecipe from '@/components/TreeRecipe/page';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { RawNodeDatum } from 'react-d3-tree';
import { inputData } from '@/types/types';

type ResultData = {
    time: string,
    node: string,
}



export default function ({}: {}) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [isComeBack, setIsComeBack] = useState(false);
    const [treeData, setTreeData] = useState<RawNodeDatum | null>(null);;


    useEffect(() => {
        if (isComeBack) {
            router.push('/');
        }
    })

    useEffect(() => {
        const fetchTree = async () => {
            const result = await fetch('http://localhost:8080/data');
            const data = await result.json();
            setTreeData(data);
            setIsLoading(false);
        };

        fetchTree();
    }, []);


    useEffect(() => {
        if (isComeBack) {
            router.push('/');
        }
    }, [isComeBack, router]);

    const handleSelect = () => {
        setIsComeBack(true);

    }

    const resultInfo: ResultData = { time: "10", node: "10" }

    return (
        <div className="flex flex-col py-6 h-screen ">
            {isLoading && (
                <div className="flex justify-center items-center h-full">
                    <p className="text-[#F2EAD3] text-[24px] font-serif">Loading...</p>
                </div>
            )}
            <div className='flex flex-row mx-8 mt-8'>
                <ResultBar resultInfo={resultInfo} onSelect={handleSelect} />
                <TreeRecipe treeData={treeData} />

            </div>
        </div>
    );
}
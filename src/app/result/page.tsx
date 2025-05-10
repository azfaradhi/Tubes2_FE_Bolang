"use client";
import { useState, useEffect, useRef } from 'react';
import ResultBar from '@/components/ResultBar/page';
import TreeRecipe from '@/components/TreeRecipe/page';
import { useRouter } from 'next/navigation';
import { RawNodeDatum } from 'react-d3-tree';

type ResultData = {
    time: string,
    node: string,
}

export default function ResultPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [isComeBack, setIsComeBack] = useState(false);
    const [treeData, setTreeData] = useState<RawNodeDatum[] | null>(null);
    const [resultInfo, setResultInfo] = useState<ResultData>({ time: "0", node: "0" });
    const [params, setParams] = useState({
        element: '',
        algorithm: '',
        count: ''
    });

    const [wsStatus, setWsStatus] = useState("Waiting for connection...");
    const socketRef = useRef<WebSocket | null>(null);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const element = urlParams.get('element') || '';
        const algorithm = urlParams.get('algorithm') || '';
        const count = urlParams.get('count') || '';

        setParams({ element, algorithm, count });
        console.log('Query Params:', { element, algorithm, count });
    }, []);

    useEffect(() => {
        if (!params.element || !params.algorithm || !params.count) {
            console.log('Missing parameters, not connecting to WebSocket');
            return;
        }

        console.log('Connecting to WebSocket with parameters:');
        console.log('Element: ', params.element);
        console.log('Algorithm: ', params.algorithm);
        console.log('Count: ', params.count);
        
        if (socketRef.current && (socketRef.current.readyState === WebSocket.OPEN || 
            socketRef.current.readyState === WebSocket.CONNECTING)) {
            socketRef.current.close();
        }
        
        try {
            const socket = new WebSocket('ws://localhost:8080/ws');
            socketRef.current = socket;
            setWsStatus("Connecting...");

            socket.onopen = () => {
                console.log("WebSocket connected");
                setWsStatus("Connected, sending data...");
                
                const data = {
                    algorithm: params.algorithm,
                    target: params.element,
                    maxRecipes: params.count,
                };
                
                console.log("Sending data to server:", data);
                socket.send(JSON.stringify(data));
            };

            socket.onmessage = (event) => {
                try {
                    console.log("Received message size:", event.data.length);
                    if (event.data.length > 1000) {
                        console.log("Data preview:", event.data.substring(0, 100) + "...");
                    } else {
                        console.log("Full data:", event.data);
                    }
                    
                    const data = JSON.parse(event.data);
                    
                    if (data.status) {
                        setWsStatus(`Status: ${data.status} - ${data.message || ''}`);
                    }
                    
                    if (data.treeData) {
                        console.log("Tree data received!");
                        
                        const treeCopy = JSON.parse(JSON.stringify(data.treeData));
                        console.log("Setting tree data:", treeCopy);
                        setTreeData(treeCopy);
                        
                        setIsLoading(false);
                    }
                    
                    if (data.resultInfo) {
                        console.log("Result info received:", data.resultInfo);
                        setResultInfo(data.resultInfo);
                    }
                    
                    if (data.status === "Completed") {
                        console.log("Processing completed");
                        setIsLoading(false);
                    }
                    
                    if (data.error) {
                        console.error("Server error:", data.error);
                        setWsStatus(`Error: ${data.error}`);
                        setIsLoading(false);
                    }
                } catch (error) {
                    console.error("Error parsing WebSocket message:", error);
                    setWsStatus("Error parsing server message");
                }
            };

            socket.onerror = (error) => {
                console.error("WebSocket error:", error);
                setWsStatus("WebSocket error occurred");
                setIsLoading(false);
            };

            socket.onclose = (event) => {
                console.log(`WebSocket connection closed: ${event.code} ${event.reason}`);
                setWsStatus(`Connection closed: ${event.code} ${event.reason || ''}`);
                
                if (isLoading) {
                    setIsLoading(false);
                }
            };
        } catch (err) {
            console.error("Failed to create WebSocket:", err);
            setWsStatus("Failed to create WebSocket connection");
            setIsLoading(false);
        }

        return () => {
            if (socketRef.current && (socketRef.current.readyState === WebSocket.OPEN || 
                socketRef.current.readyState === WebSocket.CONNECTING)) {
                socketRef.current.close();
            }
        };
    }, [params]);

    useEffect(() => {
        if (isComeBack) {
            router.push('/');
        }
    }, [isComeBack, router]);

    const handleSelect = () => {
        setIsComeBack(true);
    }

    return (
        <div className="flex flex-col py-6 h-screen">
            {isLoading ? (
                <div className="flex flex-col justify-center items-center h-full">
                    <p className="text-[#F2EAD3] text-[24px] font-serif">Loading...</p>
                    <p className="text-[#F2EAD3] text-[16px] mt-2">{wsStatus}</p>
                </div>
            ) : (
                <div className='flex flex-col mx-8 mt-8'>
                    <div className="flex justify-between mb-4">
                        <div className="text-xs text-gray-400">
                            WebSocket Status: <span className={wsStatus.includes("Completed") ? "text-green-400" : "text-yellow-400"}>{wsStatus}</span>
                        </div>
                    </div>
                    
                    <div className="flex flex-row">
                        <ResultBar resultInfo={resultInfo} onSelect={handleSelect} />
                        {Array.isArray(treeData) && treeData.length > 0 ? (
                            <TreeRecipe treeData={treeData} />
                        ) : (
                            <div className="flex justify-center items-center w-full">
                                <p className="text-[#F2EAD3]">No tree data received yet</p>
                                <button 
                                    className="ml-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                    onClick={() => console.log("Current tree data:", treeData)}
                                >
                                    Debug Data
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
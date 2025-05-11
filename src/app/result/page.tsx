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
                    
                    if (data.duration){
                        setResultInfo({ time: data.duration.toString(), node: "0" })
                    }
                    if (data.status) {
                        setWsStatus(`Status: ${data.status} - ${data.message || ''}`);
                    }
                    
                    if (data.treeData) {
                        console.log("Tree data received!");
                        console.log("Tree data:", data.treeData);
                        
                        const treeCopy = JSON.parse(JSON.stringify(data.treeData));
                        setTreeData(treeCopy);
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
        <div className="flex flex-col py-6 h-screen ">
            <div className="flex flex-col mx-8 mt-8 h-screen">
                <div className="flex justify-between mb-4">
                    <div className="text-xs text-gray-400">
                        Server Status: <span className={wsStatus.includes("Completed") ? "text-green-400" : "text-yellow-400"}>{wsStatus}</span>
                    </div>
                </div>
                
                <div className="flex flex-row h-full">
                    {!isLoading && (
                        <ResultBar resultInfo={resultInfo} onSelect={handleSelect} />
                    )}
                    
                    {Array.isArray(treeData) && treeData.length > 0 ? (
                        <div className="w-full">
                            {isLoading && (
                                <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white px-3 py-1 rounded-md z-10">
                                    Processing...
                                </div>
                            )}
                            <TreeRecipe treeData={treeData} toFind={params.element} />
                        </div>
                    ) : (
                        <div className="flex justify-center items-center w-full">
                            <p className="text-[#F2EAD3]">Loading...</p>
                        </div>
                    )}
                </div>
                
            </div>
        </div>
    );
}
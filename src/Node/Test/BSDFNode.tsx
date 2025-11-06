import {Handle, Position, useNodesData, useReactFlow} from "@xyflow/react";
import {useCallback, useEffect, useState} from "react";

export default function BSDFNode({id}: { id: string }) {

    const {updateNodeData} = useReactFlow();
    const nodeData = useNodesData(id);
    // 1. 初始化本地 state，保证 input 可控
    const [color, setColor] = useState('#000000');
    // 2. 当节点数据变化时，同步到本地 state（首次渲染也会同步）
    useEffect(() => {
        if (nodeData?.data?.value) {
            setColor(nodeData.data.value as string);
        }
    }, [nodeData?.data?.value]);

    // 3. input 修改时，同时更新本地 state 和节点数据
    const onChange = useCallback((evt) => {
        const newColor = evt.target.value as string;
        setColor(newColor); // 更新 input 框
        updateNodeData(id, {value: newColor}); // 更新 React Flow 节点数据
    }, [updateNodeData, id]);

    return (
        <div className="relative w-45 bg-white border border-gray-200 rounded-xl shadow-md font-sans overflow-visible">
            {/* 顶部标题栏 */}
            <div
                className="bg-green-500 text-white text-sm font-semibold px-3 py-1.5 flex justify-between items-center rounded-t-xl">
                <span>BSDF</span>
            </div>

            {/* 输出 Handle 一行 */}
            <div className="flex mb-1 mt-1 justify-center items-center px-3 py-2 relative">
                <span className="text-gray-700 text-[10px] absolute right-1/10">BSDF</span>
                <Handle
                    type="source"
                    id='o-bsdf'
                    position={Position.Right}
                    className="!bg-green-500 !w-3 !h-3 rounded-full absolute right-[-7px] top-1/2 shadow-sm"
                />
            </div>

            {/* 参数部分 */}
            <div className="divide-y divide-gray-100 text-[10px]">
                {/* 基础色 */}
                <div className="flex items-center justify-between px-3 py-2 relative">
                    <Handle
                        type="target"
                        id='i-base-color'
                        position={Position.Left}
                        className="!bg-green-500 !w-3 !h-3 rounded-full absolute left-[-7px] top-1/2 shadow-sm"
                    />
                    <span className="text-gray-700">基础色</span>
                    <input
                        type="color"
                        onChange={onChange}
                        value={color as string}
                        onMouseDown={(e) => e.stopPropagation()}
                        className="border border-gray-300 rounded cursor-pointer"
                    />
                </div>

                {/* 粗糙度 */}
                <div className="flex items-center justify-between px-3 py-2 relative">
                    <Handle
                        type="target"
                        id='i-roughness'
                        position={Position.Left}
                        className="!bg-green-500 !w-3 !h-3 rounded-full absolute left-[-7px] top-1/2 shadow-sm"
                    />
                    <span className="text-gray-700">粗糙度</span>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        defaultValue="0.5"
                        className="w-20 accent-green-500"
                    />
                </div>

                {/* 折射率 IOR */}
                <div className="flex items-center justify-between px-3 py-2 relative">
                    <Handle
                        type="target"
                        id='i-ior'
                        position={Position.Left}
                        className="!bg-green-500 !w-3 !h-3 rounded-full absolute left-[-7px] top-1/2 shadow-sm"
                    />
                    <span className="text-gray-700">折射率</span>
                    <input
                        defaultValue="1.45"
                        className="w-16 text-right border border-gray-300 rounded px-1 py-0.5"
                    />
                </div>
            </div>

        </div>
    );
}

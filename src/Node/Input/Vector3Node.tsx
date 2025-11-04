import { Handle, Position } from "@xyflow/react";

export default function Vector3Node() {
    return (
        <div className="relative w-30 bg-white border border-gray-200 rounded-xl shadow-md font-sans overflow-visible">
            {/* 顶部标题栏 */}
            <div className="bg-purple-500 text-white text-sm font-semibold px-3 py-1.5 flex justify-between items-center rounded-t-xl">
                <span>Vector3</span>
            </div>

            {/* 输出 Handle 一行 */}
            <div className="flex mb-1 mt-1 justify-center items-center px-3 py-2 relative">
                <span className="text-gray-700 text-[10px] absolute right-1/10" >Vector3</span>
                <Handle
                    type="source"
                    id='o-vector3'
                    position={Position.Right}
                    className="!bg-purple-500 !w-3 !h-3 rounded-full absolute right-[-7px] top-1/2 shadow-sm"
                />
            </div>

            {/* 参数部分 */}
            <div className="divide-y divide-gray-100 text-[10px]">
                <div className="flex items-center justify-between px-3 py-2 relative">
                    <span className="text-gray-700">X</span>
                    <input
                        defaultValue="0"
                        className="w-16 text-right border border-gray-300 rounded px-1 py-0.5"
                    />
                </div>

                <div className="flex items-center justify-between px-3 py-2 relative">
                    <span className="text-gray-700">Y</span>
                    <input
                        defaultValue="0"
                        className="w-16 text-right border border-gray-300 rounded px-1 py-0.5"
                    />
                </div>

                <div className="flex items-center justify-between px-3 py-2 relative">
                    <span className="text-gray-700">Z</span>
                    <input
                        defaultValue="0"
                        className="w-16 text-right border border-gray-300 rounded px-1 py-0.5"
                    />
                </div>
            </div>

        </div>
    );
}

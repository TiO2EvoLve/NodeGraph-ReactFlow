import { Handle, Position } from "@xyflow/react";

export default function Vector3Node() {
    return (
        <div className="relative w-45 bg-white border border-gray-200 rounded-xl shadow-md font-sans overflow-visible">
            {/* 顶部标题栏 */}
            <div className="bg-green-500 text-white text-sm font-semibold px-3 py-1.5 flex justify-between items-center rounded-t-xl">
                <span>Vector3</span>
            </div>

            {/* 输出 Handle 一行 */}
            <div className="flex mb-1 mt-1 justify-center items-center px-3 py-2 relative">
                <span className="text-gray-700 text-[10px] absolute right-1/10" >Vector3</span>
                <input
                    defaultValue="0"
                    className="w-16 text-right border border-gray-300 rounded px-1 py-0.5"
                />
            </div>

            {/* 参数部分 */}
            <div className="divide-y divide-gray-100 text-[10px]">
                <div className="flex items-center justify-between px-3 py-2 relative">
                    <span className="text-gray-700">X</span>
                    <input
                        type="color"
                        className="w-10 h-5 border border-gray-300 rounded cursor-pointer"
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

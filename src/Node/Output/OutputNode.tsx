import { Handle, Position } from "@xyflow/react";

export default function OutputNode() {
    return (
        <div className="relative w-30 bg-white border border-gray-200 rounded-xl shadow-md font-sans overflow-visible">
            {/* 顶部标题栏 */}
            <div className="bg-blue-500 text-white text-sm font-semibold px-3 py-1.5 flex justify-between items-center rounded-t-xl">
                <span>Output</span>
            </div>

            {/* 输出 Handle 一行 */}
            <div className="flex mb-1 mt-1 justify-center items-center px-3 py-2 relative">
                <span className="text-gray-700 text-[10px] absolute left-1/10" >输出</span>
                <Handle
                    type="target"
                    id='i-output'
                    position={Position.Left}
                    className="!bg-blue-500 !w-3 !h-3 rounded-full absolute right-[-7px] top-1/2 shadow-sm"
                />
            </div>

        </div>
    );
}

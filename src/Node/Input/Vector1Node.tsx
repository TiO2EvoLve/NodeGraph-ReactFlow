import { Handle, Position } from "@xyflow/react";
import NodeHeader from "../BaseNode/NodeHeader";
import OutputHandle from "../BaseNode/OutputHandle";

export default function Vector3Node() {
    return (
        <div className="relative w-30 bg-white border-gray-200 rounded-xl shadow-md font-sans">
            {/*顶部标题栏*/}
            <NodeHeader title="Vector1" className="bg-orange-500"/>
            {/* 输出 Handle 一行 */}
            <OutputHandle id="o-vector1" tip="Vector1" className="!bg-orange-500"/>
            {/* 参数部分 */}
            <div className="divide-y divide-gray-100 text-[10px]" >
                <div className="flex items-center justify-between px-3 py-2 relative">
                    <span className="text-gray-700">X</span>
                    <input
                        defaultValue="0"
                        className="w-16 text-right border border-gray-300 rounded px-1 py-0.5"
                    />
                </div>
            </div>

        </div>
    );
}

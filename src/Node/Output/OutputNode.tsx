import {Handle, Position, useNodeConnections, useNodesData} from "@xyflow/react";
import {useEffect} from "react";
import NodeHeader from "../BaseNode/NodeHeader";
import InputHandle from "../BaseNode/InputHandle";

export default function OutputNode() {

    // 找出这个节点左侧输入口的连接
    const connections = useNodeConnections({
        handleType: "target",
    });
    // 拿到连接的源节点数据（即前一个节点）
    const sourceNodeData = useNodesData(connections?.[0]?.source);

    return (
        <div className="relative w-30 bg-white border-gray-200 rounded-xl shadow-md font-sans">
            {/* 顶部标题栏 */}
            <NodeHeader title="Output" className="bg-blue-500"/>
            {/* 输入 Handle 一行 */}
            <div className="flex mb-1 mt-1 justify-center items-center px-3 py-2 relative">
                <span className="text-gray-700 text-[10px] absolute left-1/10" >输出</span>
                {/*输入接口*/}
                <InputHandle id="i-output" className="!bg-blue-500"/>
            </div>
            <div className='mx-auto w-20 h-20'
                  style={{
                      background: `${sourceNodeData?.data?.value}`,
                  }}>
            </div>
        </div>
    );
}

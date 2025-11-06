import {Handle, Position, useNodeConnections, useNodesData} from "@xyflow/react";
import {useEffect} from "react";

export default function OutputNode() {

    // 找出这个节点左侧输入口的连接
    const connections = useNodeConnections({
        handleType: "target",
    });

    // 拿到连接的源节点数据（即前一个节点）
    const sourceNodeData = useNodesData(connections?.[0]?.source);
    useEffect(() => {
        console.log('OutputNode color:', sourceNodeData?.data?.value);
    }, [sourceNodeData?.data?.value]);
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
            <div  className='m-2 bg-black w-20 h-20'
                  style={{
                      background: `${sourceNodeData?.data?.value}`,
                  }}>
            </div>
        </div>
    );
}

import {Handle, Position} from "@xyflow/react";

interface InputHandleProps {
    id: string;
    className?: string;
}
// 节点顶部标题栏组件
export default function InputHandle({ id,className = ""}: InputHandleProps) {
    return (
        <Handle
            type="target"
            id={id}
            position={Position.Left}
            className={`!bg-green-500 !w-3 !h-3 rounded-full absolute left-[-7px] top-1/2 shadow-sm ${className}`}
        />
    );
}
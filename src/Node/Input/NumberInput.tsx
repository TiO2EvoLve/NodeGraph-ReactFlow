import { useCallback, useState } from 'react';
import { Handle, Position, useReactFlow } from '@xyflow/react';

function NumberInput({ id, data }) {
    const { updateNodeData } = useReactFlow();
    const [value, setValue] = useState(data.value ?? 0);

    const onChange = useCallback((e) => {
        const v = Number(e.target.value);
        setValue(v);
        updateNodeData(id, { value: v }); // 通知 React Flow 更新这个节点的数据
    }, []);

    return (
        <div className="p-2 border rounded bg-white">
            <div>输入数字:</div>
            <input
                type="number"
                value={value}
                onChange={onChange}
                className="nodrag border px-1"
            />
            <Handle type="source" position={Position.Right}/>
        </div>
    );
}

export default NumberInput;

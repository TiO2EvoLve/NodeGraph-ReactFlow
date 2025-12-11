import {
    EdgeToolbar,
    getBezierPath,
    BaseEdge,
    EdgeProps,
    useReactFlow,
} from '@xyflow/react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircleXmark} from "@fortawesome/free-regular-svg-icons";

export function EdgeWithButton(props: EdgeProps) {
    const [edgePath, centerX, centerY] = getBezierPath(props);
    const {deleteElements, getEdges} = useReactFlow();
    const deleteEdge = () => {
        const edge = getEdges().find((e) => e.id === props.id);
        if (edge) deleteElements({edges: [edge]});
    };
    return (
        <>
            <BaseEdge id={props.id} path={edgePath}  style={{
                stroke: '#777',
                strokeWidth: 1,
            }}/>
            <EdgeToolbar edgeId={props.id} x={centerX} y={centerY} isVisible>
               <span
                   onClick={deleteEdge}
                   className="bg-white w-4 h-4 flex items-center justify-center rounded-full cursor-pointer"
               >
                <FontAwesomeIcon
                     icon={faCircleXmark}
                     className="text-red-500 "
                     size="1x"
                />
                </span>
            </EdgeToolbar>
        </>
    );
}

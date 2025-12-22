import { KonvaEventObject } from "konva/lib/Node";
import { useCallback } from "react";

const useMoveMino = () => {
    return useCallback(
        (e: KonvaEventObject<DragEvent>) => {
            e.cancelBubble = true;
            e.target.scale({ x: 1, y: 1 });
        }, []
    );
}

export default useMoveMino;
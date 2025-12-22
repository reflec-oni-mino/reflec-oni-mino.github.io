import React, { useCallback } from 'react';
import { MinoData, PuzzleData } from "../puzzle/const";
import { KonvaEventObject } from 'konva/lib/Node';
import { Group, Line } from 'react-konva';
import Cell from './Cell';
import usePickupMino from '../hooks/usePickupMino';
import useDropMino from '../hooks/useDropMino';
import { Frame } from './common';
import useMoveMino from '../hooks/useMoveMino';

type InventoryMinoProp = {
    index: number,
    mino: MinoData,
    homePos: {x: number, y: number},
    scale: {x: number, y: number},
    setPuzzleData: React.Dispatch<React.SetStateAction<PuzzleData>>,
    draggingMinoIndex: number | undefined
};

// const InventoryMino = ({ index, homePos, scale, puzzle_data, setPuzzleData, draggingMinoIndex }: InventoryMinoProp): JSX.Element => {
const InventoryMino = ({ index, mino, homePos, scale, setPuzzleData, draggingMinoIndex }: InventoryMinoProp): JSX.Element => {
    const onDragStart = usePickupMino(index, setPuzzleData, draggingMinoIndex)
    const onDragMove = useMoveMino();
    const onDragEnd = useDropMino(index, setPuzzleData, draggingMinoIndex, homePos, scale);
    return (
        <Group
            draggable
            onDragStart={onDragStart}
            onDragMove={onDragMove}
            onDragEnd={onDragEnd}
            x={homePos.x}
            y={homePos.y}
            offset={{ x: 25, y: 25 }}
            scale={scale}
            visible={mino.pos === undefined}
        >
            <Line
                points={mino.vertex}
                fill={"#c2c8cc"}
                closed={true}
                stroke={"#414958"}
                strokeWidth={4}
                lineJoin={"round"}
            />
            <Cell data={mino.cell[0]} color={undefined} rect_visible={true} />
            <Cell data={mino.cell[1]} color={undefined} rect_visible={true} />
            <Cell data={mino.cell[2]} color={undefined} rect_visible={true} />
        </Group>
    );
}

export default React.memo(InventoryMino);
// export default InventoryMino;
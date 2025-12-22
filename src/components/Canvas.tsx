import React, { useState } from 'react';
import { Stage, Layer, Group } from 'react-konva';
import { PuzzleData } from '../puzzle/const';
import Laser from './Laser';
import BoardMino from './BoardMino';
import Board from './Board';
import InventoryMino from './InventoryMino';
import OverlayMino from './OverlayMino';
import StartPoint from "./StartPoint";
import EndPoint from "./EndPoint";
import Inventory from './Inventory';
import { Frame } from './common';
import usePickupMino from '../hooks/usePickupMino';
import useDropMino from '../hooks/useDropMino';
import useMoveMino from '../hooks/useMoveMino';

type CanvasProp = {
    width: number,
    height: number,
    puzzle_data: PuzzleData,
    setPuzzleData: React.Dispatch<React.SetStateAction<PuzzleData>>,
    draggingMinoIndex: number | undefined,
    timer_enabled: boolean
};

const Canvas = ({ width, height, puzzle_data, setPuzzleData, draggingMinoIndex, timer_enabled }: CanvasProp) => {
    // ミノ数
    const minoCount = puzzle_data[1].length;
    
    // PC利用か
    const isLandscape = width > height;

    // インベントリのFrame 　PC:スマホ
    const inventoryFrame: Frame = isLandscape ? {x: -33, y: 303, width: 651.9, height: 150} : {x: -33, y: 296, width: 316, height: 79};

    // スロットのFrame配列
    const slotCount = minoCount >= 1 ? minoCount : 1;
    const marginRatio = 0.079; //ここ難しい　ミノ数の変化を見て変えたい
    const totalMargin = slotCount >= 2 ? inventoryFrame.width * marginRatio : 0;
    const margin = slotCount >= 2 ? totalMargin / (slotCount - 1) : 0;
    const slotWidth = (inventoryFrame.width - totalMargin) / slotCount
    const inventorySlotFrames: Frame[] = []
    for (let i = 0; i < minoCount; i++) {
        inventorySlotFrames.push({
            x: (slotWidth + margin) * i,
            y: 0,
            width: slotWidth, 
            height: inventoryFrame.height
        })
    }
    const baseScale = isLandscape ? 0.8 : 0.45;
    const scaleModifier = Math.min(4 / puzzle_data[1].length, 1);
    const scale = isLandscape ? {x: baseScale * scaleModifier, y: baseScale * scaleModifier} : {x: baseScale * scaleModifier, y: baseScale * scaleModifier};
    const minoHomePositions = inventorySlotFrames.map((inventorySlotFrame, index) => ({
        // (スロットの左上絶対座標) - (ミノ座標とミノ中心の差分) + (スロット座標とスロット中心との差分)
        x:
            (inventoryFrame.x + inventorySlotFrame.x)
            - (puzzle_data[1][index].cell[0].x + puzzle_data[1][index].cell[1].x + puzzle_data[1][index].cell[2].x) * 25 * scale.x
            + inventorySlotFrame.width / 2,
    
        y:
            (inventoryFrame.y + inventorySlotFrame.y)
            - (puzzle_data[1][index].cell[0].y + puzzle_data[1][index].cell[1].y + puzzle_data[1][index].cell[2].y) * 25 * scale.y
            + inventorySlotFrame.height / 2,
    }));
    
    return (
        <Stage
            width={656}
            height={490.4}
        >
            <Layer
                offset={{ x: -35, y: -35 }}
            >
                <Board
                    children={
                        <Group visible={timer_enabled}
                        >
                            <StartPoint pos={puzzle_data[2][0].start} color={{ fill: "#14b3ff", stroke: "#0099ff" }} />
                            <StartPoint pos={puzzle_data[2][1].start} color={{ fill: "#fe9f56", stroke: "#ff801e" }} />
                            <EndPoint pos={puzzle_data[2][0].end} laser_data={puzzle_data[2]} />
                            <EndPoint pos={puzzle_data[2][1].end} laser_data={puzzle_data[2]} />
                        </Group>
                    }
                />
                <Inventory
                    x={inventoryFrame.x}
                    y={inventoryFrame.y}
                    slotFrames={inventorySlotFrames}
                />
                <Group visible={timer_enabled}>
                    {Array.from({ length: minoCount }).map((_, i) => (
                        <BoardMino
                            key={`b${i}`}
                            index={i}
                            puzzle_data={puzzle_data}
                            draggingMinoIndex={draggingMinoIndex}
                        />
                    ))}

                    <Laser index={0} laser_data={puzzle_data[2]} />
                    <Laser index={1} laser_data={puzzle_data[2]} />

                    {Array.from({ length: minoCount }).map((_, i) => (
                        <OverlayMino
                            key={`o${i}`}
                            index={i}
                            puzzle_data={puzzle_data}
                            setPuzzleData={setPuzzleData}
                            draggingMinoIndex={draggingMinoIndex}
                        />
                    ))}
                </Group>
                <Group visible={timer_enabled}>
                    {Array.from({ length: minoCount }).map((_, i) => (
                        <InventoryMino
                            key={`il${i}`}
                            index={i}
                            mino={puzzle_data[1][i]}
                            homePos={minoHomePositions[i]}
                            scale={scale}
                            setPuzzleData={setPuzzleData}
                            draggingMinoIndex={draggingMinoIndex}
                        />
                    ))}
                </Group>
            </Layer>
            <Layer
                name={"board_picked"}
                offset={{ x: -35, y: -35 }}
            />
        </Stage>
    );
}


export default React.memo(Canvas);
// export default Canvas;

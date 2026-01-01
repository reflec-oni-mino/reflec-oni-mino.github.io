import { Mode } from "../puzzle/const"

export type Frame = {
    x: number,
    y: number,
    width: number,
    height: number
}

export type SaveData = {
    mode: Mode,
    date: Date
    time: number
}
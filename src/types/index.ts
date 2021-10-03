export type dataType = {
    id: string
    row: number
    x: number
    y:number
    sort: string
    date: number
}

export type RowDataType = {
    id: string | number
    row: number
    x: number
}

export type CoordinatesType = {
    width?: number
    windowWidth?: number
    currentAbscissa?: number
    height?: number
    windowHeight?: number
    currentOrdinate?: number
}

export type ActionType = {
    type: string
    data?: dataType[]
    windowSizes?: CoordinatesType
    currentPosition?: CoordinatesType
    mouseInMap?: boolean
    zoom?: number
    isWarningVisible?: boolean
    selectedCells?: string[]
    error?: string
};
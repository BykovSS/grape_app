export type dataType = {
    id: string
    active: boolean
    row: number
    col: number
    sort: string
    date: number
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
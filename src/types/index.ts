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
    fetchedData?: {data: string[], guide: GuideType[]}
    windowSizes?: CoordinatesType
    currentPosition?: CoordinatesType
    mouseInMap?: boolean
    zoom?: number
    selectedCells?: string[]
    fetchError?: string
    saveError?: string
};

export type GuideType = {
    id: string
    label: string
    html: string
    type: string
}
export type dataType = {
    id: string
    row: number
    x: number
    y:number
    sort: string
    year: number
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
    fetchedData?: {data: string[], guide: GuideType[]}
    windowSizes?: CoordinatesType
    currentPosition?: CoordinatesType
    mouseInMap?: boolean
    zoom?: number
    selectedCells?: string[]
    fetchError?: string
    saveError?: string
    id?: string
    label?: string
    guide?: GuideType
    year?: number
    sort?: string
};

export type GuideType = {
    id: string
    label: string
    type: string
}
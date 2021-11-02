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
    row?: number
    x?: number
    y?: number
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
    fetchedData?: {data: string, guide: string}
    windowSizes?: CoordinatesType
    currentPosition?: CoordinatesType
    mouseInMap?: boolean
    zoom?: number
    selectedCells?: string[]
    id?: string
    label?: string
    guide?: GuideType
    year?: number
    sort?: string
    status?: boolean
    login?: string
    password?: string
    errorWindowData?: ErrorWindowDataType
};

export type GuideType = {
    id: string
    label: string
    type: string
}

export type ErrorWindowDataType = {
    showModalWindow?: boolean
    title?: string
    description?: string
}
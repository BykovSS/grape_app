export type dataType = {
    id: string
    row: number
    x: number
    y:number
    sort: string
    year: number | string
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
    fetchedDataInfo?: EntityType[]
    fetchedData?: string
    windowSizes?: CoordinatesType
    currentPosition?: CoordinatesType
    mouseInMap?: boolean
    zoom?: number
    selectedCells?: string[]
    id?: string
    label?: string
    value?: string
    guide?: EntityType
    year?: number
    sort?: string
    status?: boolean
    login?: string
    password?: string
    errorWindowData?: ErrorWindowDataType
    info?: EntityType
    index?: number
};

export type EntityType = {
    id: string
    label: string
    type?: string
    value?: string
}

export type ErrorWindowDataType = {
    showModalWindow?: boolean
    title?: string
    description?: string
}
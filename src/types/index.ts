export type dataType = {
    id: string
    active: boolean
    row: number
    col: number
    sort: string
    date: number
}

export type ActionType = {
    type: string
    data?: dataType[]
    zoom?: number
    length?: number
    error?: string
};
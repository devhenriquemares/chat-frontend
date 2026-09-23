export interface ApiError {
    status: number,
    code: string,
    message: string,
    errors: FieldError[],
    timestamp: Date
}

export interface FieldError {
    field: string,
    error: string
}
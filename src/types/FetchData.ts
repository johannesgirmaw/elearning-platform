
export interface FetchData<T> {
    next: {cursor:""},
    previous: {cursor:""},
    results: T[]
    count: number;
}
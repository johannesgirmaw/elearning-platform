export interface FetchedApi<T> {
	total_balance: number;
    results: T[]
    count: number
    next: {cursor: string}
    previous: {cursor: string}
}
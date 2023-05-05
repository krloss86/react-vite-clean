export interface IAdapter<T> {
    adapt(external:unknown): T
}

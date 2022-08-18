export interface IService<T> {
  login(): Promise<T>
}

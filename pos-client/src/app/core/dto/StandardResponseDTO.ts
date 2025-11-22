export interface StandardResponseDTO<T>{
  code:number,
  message:string,
  data: T
}

import {ItemDTO} from "./ItemDTO";
import {CustomerDTO} from "./CustomerDTO";

export interface OrderDTO {
  orderId: string;
  date:string;
  nett:number;
  customer:CustomerDTO | string;
  items:Array<ItemDTO>;
}

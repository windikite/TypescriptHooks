import Item from "../models/Item.model";

type ShoppingCartActions = 
    | {type: 'ADD_ITEM'; payload: Item}
    | {type: 'REMOVE_ITEM'; payload: number};

export default ShoppingCartActions
import ShoppingCartState from "../models/ShoppingCart.model";
import ShoppingCartActions from "./ShoppingCartActions";

const shoppingCartReducer = (state: ShoppingCartState, action: ShoppingCartActions): ShoppingCartState => {
    switch (action.type) {
        case 'ADD_ITEM':
            return {...state, items: [...state.items, action.payload]}
        case 'REMOVE_ITEM':
            return {...state, items: state.items.filter(item => item.id !== action.payload)}
        default:
            return state;
    }
}

export default shoppingCartReducer
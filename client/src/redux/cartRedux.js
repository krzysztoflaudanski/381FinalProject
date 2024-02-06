

export const getCart = ({ cart }) => cart;

const createActionName = actionName => `app/cart/${actionName}`;

const ADD_TO_CART = createActionName('ADD_TO_CART');
const SAVE_CART_TO_LOCAL_STORAGE = createActionName('SAVE_CART_TO_LOCAL_STORAGE');
const REMOVE_FROM_CART = createActionName('REMOVE_FROM_CART');
const UPDATE_CART_ITEM = createActionName('UPDATE_CART_ITEM');

export const addToCart = (product) => {
    return {
        type: ADD_TO_CART,
        payload: product,
    };
};

export const saveCartToLocalStorage = (cart) => {
    return {
        type: SAVE_CART_TO_LOCAL_STORAGE,
        payload: cart,
    };
};

export const removeFromCart = (productId) => ({
    type: REMOVE_FROM_CART,
    payload: productId,
});

export const updateCartItem = (productId, quantity, comment) => ({
    type: UPDATE_CART_ITEM,
    payload: { productId, quantity, comment },
});

const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart')) || [];

const cartReducer = (statePart = cartFromLocalStorage, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            // Sprawdzamy, czy produkt o danym ID już istnieje w koszyku
            const existingProduct = statePart.find(item => item.id === action.payload.id);

            if (existingProduct) {
                // Jeśli istnieje, zwiększamy ilość
                return statePart.map(item =>
                    item.id === action.payload.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                // Jeśli nie istnieje, dodajemy nowy produkt
                return [...statePart, { ...action.payload, quantity: 1 }];
            }
        case SAVE_CART_TO_LOCAL_STORAGE:
            localStorage.setItem('cart', JSON.stringify(action.payload));
            return statePart;
        case REMOVE_FROM_CART:
            return statePart.filter((product) => product.id !== action.payload);
        case UPDATE_CART_ITEM:
            return statePart.map((product) =>
                product.id === action.payload.productId
                    ? { ...product, quantity: action.payload.quantity, comment: action.payload.comment }
                    : product
            );
        default:
            return statePart;
    }
};


export default cartReducer;
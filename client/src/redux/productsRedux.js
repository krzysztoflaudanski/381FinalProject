import axios from 'axios';
import { API_URL } from "../config";

export const getAllProducts = ({ products }) => products;
export const getProductById = ({ products }, id) => products.find(product => product._id === id)

const createActionName = actionName => `app/products/${actionName}`;
const UPDATE_PRODUCT = createActionName('UPDATE_PRODUCT');
const ADD_PRODUCT = createActionName('ADD_PRODUCT');
const EDIT_PRODUCT = createActionName('EDIT_PRODUCT')
const REMOVE_PRODUCT = createActionName('REMOVE_PRODUCT');

export const updateProduct = payload => ({ type: UPDATE_PRODUCT, payload });
export const addProduct = payload => ({ type: ADD_PRODUCT, payload });
export const editProduct = payload => ({ type: EDIT_PRODUCT, payload });
export const removeProduct = payload => ({ type: REMOVE_PRODUCT, payload });

export const fetchAllProducts = () => {
    return async dispatch => {
        try {
          let res = await axios.get(`${API_URL}/products`);
          dispatch(updateProduct(res.data));
        } catch(e) {
          console.log(e);
        }
      };
};

const productsReducer = (statePart = [], action) => {
    switch (action.type) {
        case UPDATE_PRODUCT:
            return [...action.payload];
        case ADD_PRODUCT:
            return [...statePart, { ...action.payload }];
        case EDIT_PRODUCT:
            return statePart.map(product => (product._id === action.payload._id ? { ...product, ...action.payload } : product));
        case REMOVE_PRODUCT:
            return [...statePart.filter(product => product._id !== action.payload)];
        default:
            return statePart;
    };
};
export default productsReducer;
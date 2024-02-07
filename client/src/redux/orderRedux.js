import axios from 'axios';
import { API_URL } from "../config";

export const getAllOrders = ({ orders }) => orders
export const getOrderById = ({ orders }, id) => orders.find(order => order.id === id)

const createActionName = actionName => `app/orders/${actionName}`;

const UPDATE_ORDERS = createActionName('UPDATE_ORDERS');
const ADD_ORDER = createActionName('ADD_ORDER');

export const updateOrders = payload => ({ type: UPDATE_ORDERS, payload });
export const addOrder = payload => ({ type: ADD_ORDER, payload });

export const fetchAllOrders = () => {
    return async dispatch => {
        try {
            let res = await axios.get(`${API_URL}/orders`);
            dispatch(updateOrders(res.data));
        } catch (e) {
            console.log(e);
        }
    };
};

const ordersReducer = (statePart = [], action) => {
    switch (action.type) {
        case UPDATE_ORDERS:
            return [...action.payload];
        case ADD_ORDER:
            return [...statePart, { ...action.payload }];
        default:
            return statePart;
    };
};

export default ordersReducer;
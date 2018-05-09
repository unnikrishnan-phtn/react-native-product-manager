import {
    GET_PRODUCTS,
    GET_PRODUCTS_FAILURE,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCT,
    GET_PRODUCT_SUCCESS,
    GET_PRODUCT_FAILURE,
    ADD_PRODUCT,
    ADD_PRODUCT_SUCCESS,
    ADD_PRODUCT_FAILURE
} from "../actionTypes/product";

export default (prevState={products:[],isLoading:false,product:{}}, action) => {
    console.log(prevState);
    switch (action.type) {
        case GET_PRODUCTS:
            return { ...prevState,
                isLoading: true
            }
        case GET_PRODUCTS_SUCCESS:
            return { ...prevState,
                isLoading: false,
                products: action.products
            }
        case GET_PRODUCT:
            return { ...prevState,
                isLoading: true
            }
        case GET_PRODUCT_SUCCESS:
            return { ...prevState,
                isLoading: false,
                product: action.product
            }
        case ADD_PRODUCT:
            return { ...prevState,
                isLoading: true,
                product: action.product
            }
        case ADD_PRODUCT_SUCCESS:
            return { ...prevState,
                isLoading: false,
                product: action.product
            }
        case GET_PRODUCTS_FAILURE:
        case GET_PRODUCT_FAILURE:
        case ADD_PRODUCT_FAILURE:
            return { ...prevState,
                isLoading: false,
                error: action.error
            }
        default:
            return prevState;

    }
}
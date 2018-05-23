import {
    put,
    takeLatest
} from "redux-saga/effects";
import * as actionCreators from "../actionCreators/product"
import {
    GET_PRODUCTS, ADD_PRODUCT, GET_PRODUCT
} from "../actionTypes/product";

let URI = "http://192.168.1.34:4000";

function* getProducts(action) {
    try {
        let products = yield fetch(`${URI}/products?_page=${action.page}&_limit=${action.limit}`).then(r => r.json());
        yield put(actionCreators.getProductsSuccess(products))
    } catch (error) {
        yield put(actionCreators.getProductsFailure(error))
    }
}

function* getProduct(action) {
    try {
        console.log(`${URI}/products/${action.id}`);
        let product = yield fetch(`${URI}/products/${action.id}`).then(r => r.json());
    
        yield put(actionCreators.getProductSuccess(product))
    } catch (error) {
        console.log(error)
        yield put(actionCreators.getProductFailure(error))
    }
}

function* addProduct(action) {
    try {

        let product = yield fetch(`${URI}/products`, {
            body: JSON.stringify(action.product),
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
        }).then(r => r.json());
        yield put(actionCreators.addProductSuccess(product))
    } catch (error) {
        yield put(actionCreators.addProductFailure(error))
    }
}

export function* productWatchers() {
    yield takeLatest(GET_PRODUCTS, getProducts)
    yield takeLatest(GET_PRODUCT, getProduct)
    yield takeLatest(ADD_PRODUCT, addProduct)

}
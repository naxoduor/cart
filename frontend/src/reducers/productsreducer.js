import {
    FETCH_CATALOGUE_PRODUCTS, FETCH_CATALOGUE_PRODUCTS_AS_ADMIN, FETCH_PRODUCTS_BY_DEPARTMENT,
    FETCH_PRODUCTS_BY_CATEGORY, FETCH_CATEGORY_PAGE_PRODUCTS, FETCH_DEPARTMENT_PAGE_PRODUCTS,
    FETCH_CATEGORY_PAGINATION_PRODUCTS, FETCH_DEPARTMENT_PAGINATION_PRODUCTS,
    FETCH_SEARCH_PRODUCTS
} from '../action/types';

const initialState = {
    products: [],
    item: {}
};

const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CATALOGUE_PRODUCTS:
            return {
                ...state,
                products: action.payload
            }

        case FETCH_PRODUCTS_BY_DEPARTMENT:
            return {
                ...state,
                products: action.payload
            }

        case FETCH_PRODUCTS_BY_CATEGORY:
            return {
                ...state,
                products: action.payload
            }

        case FETCH_DEPARTMENT_PAGE_PRODUCTS:
            return {
                ...state,
                products: action.payload
            }

        case FETCH_CATEGORY_PAGE_PRODUCTS:
            return {
                ...state,
                products: action.payload
            }
        case FETCH_CATEGORY_PAGINATION_PRODUCTS:
            return {
                ...state,
                products: action.payload
            }
        case FETCH_DEPARTMENT_PAGINATION_PRODUCTS:
            return {
                ...state,
                products: action.payload
            }

        case FETCH_SEARCH_PRODUCTS:
            return {
                ...state,
                products: action.payload
            }

        case FETCH_CATALOGUE_PRODUCTS_AS_ADMIN:
            return {
                ...state,
                products:  action.payload
            }




        default: return state;
    }
}

export default productsReducer
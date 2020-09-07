/*
PRODUCT
    SELECT
    FETCH
    ADD
    EDIT
    REMOVE

PRODUCT INGREDIENTS
    ADD
    REMOVE
    TOGGLE_DEFAULT

PRODUCT ADDITIONAL
    ADD
    REMOVE
    TOGGLE_DEFAULT
*/

// PRODUCT FETCH
export const PRODUCTS_FETCH_STARTED = 'PRODUCTS_FETCH_STARTED';
export const PRODUCTS_FETCH_COMPLETED = 'PRODUCTS_FETCH_COMPLETED';
export const PRODUCTS_FETCH_FAILED = 'PRODUCTS_FETCH_FAILED';

// PRODUCT ADD
export const PRODUCT_ADD_STARTED = 'PRODUCT_ADD_STARTED';
export const PRODUCT_ADD_COMPLETED = 'PRODUCT_ADD_COMPLETED';
export const PRODUCT_ADD_FAILED = 'PRODUCT_ADD_FAILED';

// PRODUCT EDIT
export const PRODUCT_EDIT_STARTED = 'PRODUCT_EDIT_STARTED';
export const PRODUCT_EDIT_COMPLETED = 'PRODUCT_EDIT_COMPLETED';
export const PRODUCT_EDIT_FAILED = 'PRODUCT_EDIT_FAILED';

// PRODUCT REMOVE
export const PRODUCT_REMOVE_STARTED = 'PRODUCT_REMOVE_STARTED';
export const PRODUCT_REMOVE_COMPLETED = 'PRODUCT_REMOVE_COMPLETED';
export const PRODUCT_REMOVE_FAILED = 'PRODUCT_REMOVE_FAILED';

// PRODUCT SELECT
export const PRODUCT_SELECTED = 'PRODUCT_SELECTED';
export const PRODUCT_DESELECTED = 'PRODUCT_DESELECTED';

// PRODUCT IN ORDER
export const PRODUCT_ADD_TO_ORDER = 'PRODUCT_ADD_TO_ORDER';
export const PRODUCT_DELETE_TO_ORDER = 'PRODUCT_DELETE_TO_ORDER';

// PRODUCT INGREDIENTS
export const PRODUCT_INGREDIENT_ADDED = 'PRODUCT_INGREDIENT_ADDED';
export const PRODUCT_INGREDIENT_REMOVED = 'PRODUCT_INGREDIENT_REMOVED';
export const PRODUCT_INGREDIENT_TOGGLED_DEFAULT = 'PRODUCT_INGREDIENT_TOGGLED_DEFAULT';

// PRODUCT ADDITIONALS
export const PRODUCT_ADDITIONAL_ADDED = 'PRODUCT_ADDITIONAL_ADDED';
export const PRODUCT_ADDITIONAL_REMOVED = 'PRODUCT_ADDITIONAL_REMOVED';
export const PRODUCT_ADDITIONAL_TOGGLED_DEFAULT = 'PRODUCT_ADDITIONAL_TOGGLED_DEFAULT';

export const PRODUCT_SEARCH_STARTED = 'PRODUCT_SEARCH_STARTED';
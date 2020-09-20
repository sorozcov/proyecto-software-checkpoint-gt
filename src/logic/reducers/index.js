import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import branches, * as branchSelectors from './branches';
import categories, * as categoriesSelectors from './categories';
import loggedUser, * as loggedUserSelectors from './loggedUser';
import orders, * as ordersSelectors from './orders';
import products, * as productsSelectors from './products';
import users, * as usersSelectors from './users';
import _ from 'lodash'


const reducer = combineReducers({
    loggedUser,
    categories,
    users,
    products,
    branches,
    orders,
    form: formReducer,
});


export default reducer;

//Logged User
export const getLoggedUser = state => loggedUserSelectors.getLoggedUser(state.loggedUser);
export const getIsAdminMode = state => loggedUserSelectors.getIsAdminMode(state.loggedUser);
export const isLoggedUser = state => loggedUserSelectors.isLoggedUser(state.loggedUser);
export const getLoggedUserType = state => loggedUserSelectors.getLoggedUserType(state.loggedUser);


//Categories 
export const getCategory = (state, id) => categoriesSelectors.getCategory(state.categories, id);
export const getCategories = state => categoriesSelectors.getCategories(state.categories);
export const getCategorySelected = state => categoriesSelectors.getCategorySelected(state.categories);
export const isFetchingCategories = state => categoriesSelectors.isFetchingCategories(state.categories);
export const isCreatingCategory = state => categoriesSelectors.isCreatingCategory(state.categories);
export const isRemovingCategory = state => categoriesSelectors.isRemovingCategory(state.categories);
export const isEditingCategory = state => categoriesSelectors.isEditingCategory(state.categories);
export const getError = state => categoriesSelectors.getError(state.categories);

//BranchOffice global selectors
export const getBranch = (state, id) => branchSelectors.getBranch(state.branches, id);
export const getBranches = state => branchSelectors.getBranches(state.branches);
export const isFetchingBranches = state => branchSelectors.isFetchingBranches(state.branches);
export const getBranchesError = state => branchSelectors.getBranchesError(state.branches);
export const getSelectedBranch = state => branchSelectors.getSelectedBranch(state.branches);
export const isAddingBranches = state => branchSelectors.isAddingBranches(state.branches);
export const isEditingBranches = state => branchSelectors.isEditingBranches(state.branches);
export const isRemovingBranches = state => branchSelectors.isRemovingBranches(state.branches);
export const getViewedBranch = state => branchSelectors.getViewedBranch(state.branches);
export const branchHasUsers = (branchId, state) => usersSelectors.getUsers(state.users).some(user => user.restaurantId == branchId);

//Users
export const getUser = (state, id) => usersSelectors.getUser(state.users, id);
export const getUsers = state => usersSelectors.getUsers(state.users);
export const getSelectedUser = state => usersSelectors.getSelectedUser(state.users);
export const isFetchingUsers = state => usersSelectors.isFetchingUsers(state.users);
export const isAddingUsers = state => usersSelectors.isAddingUsers(state.users);
export const isEditingUsers = state => usersSelectors.isEditingUsers(state.users);
export const isRemovingUsers = state => usersSelectors.isRemovingUsers(state.users);
export const getUsersError = state => usersSelectors.getUsersError(state.users);
export const getAddStatus = state => usersSelectors.getAddStatus(state.users);

//Orders
export const getOrder = (state, id) => ordersSelectors.getOrder(state.orders, id);
export const getOrders = state => ordersSelectors.getOrders(state.orders);
export const getOrdersByDate = state => ordersSelectors.getOrders(state.orders).sort((o1, o2) => o1.date < o2.date);;
export const getOrdersByTable = state => {
    let orders = getOrdersByDate(state);
    let ordersByTables = _.chain(orders).groupBy('table').map((value, key) => ({ title: `Mesa ${key}`, data: value, tableNumber: key })).value().sort((table1, table2) => table1.tableNumber > table2.tableNumber)

    return ordersByTables;
};
export const getSelectedOrder = state => ordersSelectors.getSelectedOrder(state.orders);

export const getSelectedOrderProducts = state => ordersSelectors.getSelectedOrderProducts(state.orders);

export const getSelectedOrderProductsByCategory = state => {
    let products = ordersSelectors.getSelectedOrderProducts(state.orders);
    let categories = getCategories(state);
    return categories.map(category => {
        return {
            title: category.categoryName,
            data: products.filter(product => product.categoryId === category.categoryId)
        }
    }).filter(category => category.data.length !== 0)
};

export const isFetchingOrders = state => ordersSelectors.isFetchingOrders(state.orders);
export const isAddingOrders = state => ordersSelectors.isAddingOrders(state.orders);
export const isEditingOrders = state => ordersSelectors.isEditingOrders(state.orders);
export const isRemovingOrders = state => ordersSelectors.isRemovingOrders(state.orders);
export const getOrdersError = state => ordersSelectors.getOrdersError(state.orders);

//Products
export const getProduct = (state, id) => productsSelectors.getProduct(state.products, id);
export const getProducts = state => productsSelectors.getProducts(state.products);
export const getSelectedProduct = state => productsSelectors.getSelectedProduct(state.products);
export const getSelectedProductIngredients = state => productsSelectors.getSelectedProductIngredients(state.products);
export const getSelectedProductAdditionals = state => productsSelectors.getSelectedProductAdditionals(state.products);
export const isFetchingProducts = state => productsSelectors.isFetchingProducts(state.products);
export const isAddingProducts = state => productsSelectors.isAddingProducts(state.products);
export const isEditingProducts = state => productsSelectors.isEditingProducts(state.products);
export const isRemovingProducts = state => productsSelectors.isRemovingProducts(state.products);
export const getProductsError = state => productsSelectors.getProductsError(state.products);

export const getProductsByCategory = state => {
    let categories = getCategories(state);
    let products = getProducts(state);
    let allCategories = categories.map(category => {
        return {
            title: category.categoryName,
            data: products.filter(product => product.categoryId === category.categoryId)
        }
    })
    return allCategories.filter(cat => cat.data.length > 0)
};
export const getSearchTextProduct = state => productsSelectors.getSearchTextProduct(state.products);

export const getProductsByCategoryActive = state => {

    let categories = getCategories(state);
    let products = getProducts(state).filter(product => product.status == true);
    // let products = getProducts(state).filter(product=>product.status==true && (product.productName.search(searchText)>-1 || searchText==""));
    let allCategories = categories.map(category => {
        return {
            title: category.categoryName,
            data: products.filter(product => product.categoryId === category.categoryId)
        }
    })

    let filteredSearchProducts = allCategories

    let searchText = getSearchTextProduct(state)
    allCategories.forEach((category, index) => {
        if (category.title.toLowerCase().search(searchText.toLowerCase()) == -1 && searchText != "") {
            filteredSearchProducts[index].data = category.data.filter(prod => prod.productName.toLowerCase().search(searchText.toLowerCase()) > -1 || searchText == "")
        } else {
            filteredSearchProducts[index].data = category.data;
        }
    });
    filteredSearchProducts = filteredSearchProducts.filter(cat => cat.data.length > 0)
    return filteredSearchProducts
};
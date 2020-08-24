import React from 'react';

import configureStore from 'redux-mock-store';
import ProductsList from '../../../src/components/products/ProductsList';
import {Provider} from 'react-redux';
import {render, cleanup, fireEvent} from 'react-native-testing-library';
import ProductListItem from '../../../src/components/products/ProductListItem';


afterEach(cleanup);

describe('<ProductsList />', () => {
    //Mock Store configurar store
    const mockStore = configureStore([]);
    it('has 1 child', () => {
        //Creamos nuestro store con datos falseados
        const store = mockStore({
            "branches":  {
              "branchSelected": null,
              "branchViewed": null,
              "byId":  {},
              "error": null,
              "isAdding": false,
              "isEditing": false,
              "isFetching": false,
              "isRemoving": false,
              "order":  [],
            },
            "categories":  {
              "byId":  {
                "9NVXW4whK3m4YsE1MP8E":  {
                  "categoryId": "9NVXW4whK3m4YsE1MP8E",
                  "categoryName": "N4",
                  "dateModified": 1598059624144,
                },
                "F3IyvbjPoshLb4bW9597":  {
                  "categoryId": "F3IyvbjPoshLb4bW9597",
                  "categoryName": "Complementos",
                  "dateModified": 1590197443111,
                },
                "hCp287RyFkx3OjDcUPHm":  {
                  "categoryId": "hCp287RyFkx3OjDcUPHm",
                  "categoryName": "Alitas",
                  "dateModified": 1590197479347,
                },
                "hQSCp4TUCN8V1fFL8Go5":  {
                  "categoryId": "hQSCp4TUCN8V1fFL8Go5",
                  "categoryName": "Hamburguesas ",
                  "dateModified": 1590557313262,
                },
                "hTupAum62U4qhbANbkl3":  {
                  "categoryId": "hTupAum62U4qhbANbkl3",
                  "categoryName": "Bebidas",
                  "dateModified": 1590136076095,
                },
                "iOIooUgDBK2FWbsOJsTS":  {
                  "categoryId": "iOIooUgDBK2FWbsOJsTS",
                  "categoryName": "Postres",
                  "dateModified": 1590557275515,
                },
              },
              "categorySelected": null,
              "error": null,
              "isCreating": false,
              "isEditing": false,
              "isFetching": false,
              "isRemoving": false,
              "order":  [
                "9NVXW4whK3m4YsE1MP8E",
                "F3IyvbjPoshLb4bW9597",
                "hCp287RyFkx3OjDcUPHm",
                "hQSCp4TUCN8V1fFL8Go5",
                "hTupAum62U4qhbANbkl3",
                "iOIooUgDBK2FWbsOJsTS",
              ],
            },
            "form":  {},
            "loggedUser":  {
              "dateModified": 1598058249129,
              "email": "oro18282@uvg.edu.gt",
              "image": "bmEycHlJgTUPW3BH9eR6tGIep1b2",
              "lastName": "Orozco",
              "name": "Silvio 2",
              "restaurantId": "142lVoWbMFW3FDEQyigU",
              "restaurantName": "Checkpoint z16",
              "uid": "bmEycHlJgTUPW3BH9eR6tGIep1b2",
              "userTypeId": "1",
              "userTypeName": "Administrador",
            },
            "orders":  {
              "byId":  {},
              "error": null,
              "isAdding": false,
              "isEditing": false,
              "isFetching": false,
              "isRemoving": false,
              "order":  [],
              "orderSelected": null,
              "selectedOrderProducts":  [],
            },
            "products":  {
              "byId":  {
                "Nog45uJNqONzwQprYdto":  {
                  "category":  {
                    "categoryId": "hTupAum62U4qhbANbkl3",
                    "categoryName": "Bebidas",
                    "dateModified": 1590136076095,
                  },
                  "categoryId": "hTupAum62U4qhbANbkl3",
                  "dateModified": 1597380603908,
                  "description": "1",
                  "image": "Nog45uJNqONzwQprYdto",
                  "price": "10",
                  "productId": "Nog45uJNqONzwQprYdto",
                  "productName": "Agua",
                  "status": true,
                },
                "VdfDCVkZZSuAOrJYE1C2":  {
                  "category":  {
                    "categoryId": "F3IyvbjPoshLb4bW9597",
                    "categoryName": "Complementos",
                    "dateModified": 1590197443111,
                  },
                  "categoryId": "F3IyvbjPoshLb4bW9597",
                  "dateModified": 1597380769590,
                  "description": "Para compartir",
                  "image": "VdfDCVkZZSuAOrJYE1C2",
                  "price": "15",
                  "productId": "VdfDCVkZZSuAOrJYE1C2",
                  "productName": "Aros de cebolla",
                  "status": true,
                },
                "jfi1ICvecBFY7Qb0kequ":  {
                  "additionals":  [
                     {
                      "cost": "5.00",
                      "default": false,
                      "name": "Salsa",
                    },
                  ],
                  "category":  {
                    "categoryId": "hQSCp4TUCN8V1fFL8Go5",
                    "categoryName": "Hamburguesas ",
                    "dateModified": 1590557313262,
                  },
                  "categoryId": "hQSCp4TUCN8V1fFL8Go5",
                  "dateModified": 1598254858046,
                  "description": "Carne y queso.",
                  "image": "jfi1ICvecBFY7Qb0kequ",
                  "ingredients":  [
                     {
                      "default": false,
                      "name": "Lechuga",
                    },
                     {
                      "default": false,
                      "name": "Tomate",
                    },
                     {
                      "default": false,
                      "name": "Queso",
                    },
                  ],
                  "price": "100.00",
                  "productId": "jfi1ICvecBFY7Qb0kequ",
                  "productName": "Cuarto de Libra",
                  "status": true,
                },
                "q4yS3hAAPu3ggTXGHfXo":  {
                  "category":  {
                    "categoryId": "iOIooUgDBK2FWbsOJsTS",
                    "categoryName": "Postres",
                    "dateModified": 1590557275515,
                  },
                  "categoryId": "iOIooUgDBK2FWbsOJsTS",
                  "dateModified": 1597380660944,
                  "description": "De chocolate",
                  "image": "q4yS3hAAPu3ggTXGHfXo",
                  "price": "20",
                  "productId": "q4yS3hAAPu3ggTXGHfXo",
                  "productName": "Pastel",
                  "status": true,
                },
                "vDUqP6yR5eBN9BLSexsd":  {
                  "category":  {
                    "categoryId": "hTupAum62U4qhbANbkl3",
                    "categoryName": "Bebidas",
                    "dateModified": 1590136076095,
                  },
                  "categoryId": "hTupAum62U4qhbANbkl3",
                  "dateModified": 1597381885535,
                  "description": "Coca",
                  "image": "vDUqP6yR5eBN9BLSexsd",
                  "price": "100.53",
                  "productId": "vDUqP6yR5eBN9BLSexsd",
                  "productName": "Coca Cola",
                  "status": true,
                },
                "vy5Xqt7YgRplsEShoXkG":  {
                  "category":  [
                    "hQSCp4TUCN8V1fFL8Go5",
                  ],
                  "categoryId": "hQSCp4TUCN8V1fFL8Go5",
                  "dateModified": 1598222321371,
                  "description": "Quesoburguesa con tomate, cebolla y pepinillos. ",
                  "image": "vy5Xqt7YgRplsEShoXkG",
                  "price": "55.00",
                  "productId": "vy5Xqt7YgRplsEShoXkG",
                  "productName": "Quesoburguesa",
                  "status": true,
                },
                "zrUBeXuhReSyBDMqsIJp":  {
                  "additionals":  [
                     {
                      "cost": "2.00",
                      "default": false,
                      "name": "H",
                    },
                  ],
                  "category":  {
                    "categoryId": "hCp287RyFkx3OjDcUPHm",
                    "categoryName": "Alitas",
                    "dateModified": 1590197479347,
                  },
                  "categoryId": "hCp287RyFkx3OjDcUPHm",
                  "dateModified": 1598253931183,
                  "description": "Pican",
                  "image": "zrUBeXuhReSyBDMqsIJp",
                  "ingredients":  [],
                  "price": "100.00",
                  "productId": "zrUBeXuhReSyBDMqsIJp",
                  "productName": "Alitas Picantes Hot",
                  "status": true,
                },
              },
              "error": null,
              "isAdding": false,
              "isEditing": false,
              "isFetching": false,
              "isRemoving": false,
              "order":  [
                "Nog45uJNqONzwQprYdto",
                "VdfDCVkZZSuAOrJYE1C2",
                "jfi1ICvecBFY7Qb0kequ",
                "q4yS3hAAPu3ggTXGHfXo",
                "vDUqP6yR5eBN9BLSexsd",
                "vy5Xqt7YgRplsEShoXkG",
                "zrUBeXuhReSyBDMqsIJp",
              ],
              "productSelected": null,
            },
            "users":  {
              "byId":  {},
              "error": null,
              "isAdding": false,
              "isEditing": false,
              "isFetching": false,
              "isRemoving": false,
              "order":  [],
              "userSelected": null,
            },
          });
        const rendered = render(
            <Provider store={store}><ProductsList /></Provider>
        );
        const productList = rendered.getByTestId('productListTotal');

        expect(productList.findAllByType(ProductListItem).length).toBe(1)
  });
});
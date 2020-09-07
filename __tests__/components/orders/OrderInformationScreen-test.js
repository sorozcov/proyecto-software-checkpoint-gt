import React from 'react';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import { render } from 'react-native-testing-library';

import OrderInformationScreen from '../../../src/components/orders/ModalOrderInformationScreen';

const mockStore = configureStore([]);
const store = mockStore({
    "orders":  {
        "byId":  {
            "DPZ80uBtKkCVn82yhmZB": {
                "date": "6 de septiembre de 2020, 16:13:13 UTC-6",
                "dateModified":  1599430439004,
                "orderId": "DPZ80uBtKkCVn82yhmZB",
                "orderName": "Juan",
                "table": "2",
                "total": 316,
            },

            "xdQnwldzs35hiXZg23Uy": {
                "products": [
                    {
                        "additinalCost": "0.00",
                        "additionalInstructions": "",
                        "additionals": [],
                        "category": {
                            "categoryId": "F3IyvbjPoshLb4bW9597",
                            "categoryName": "Entradas",
                            "dateModified": 1598839653311,
                        },
                        "categoryId": "F3IyvbjPoshLb4bW9597",
                        "description": "Papas Fritas",
                        "image": "1YjTk9kDd1QDMLa8Ggi8",
                        "index": 0,
                        "ingredients": [],
                        "productId": "1YjTk9kDd1QDMLa8Ggi8",
                        "productName": "Papas Fritas",
                        "quantity": 2,
                        "status": true,
                        "totalPrice": "50.00",
                        "unitPrice": "25.00",
                    },
                    {
                        "additinalCost": "0.00",
                        "additionals": [],
                        "category": {
                            "categoryId": "hTupAum62U4qhbANbkl3",
                            "categoryName": "Bebidas",
                            "dateModified": 1590136076095
                        },
                        "categoryId": "hTupAum62U4qhbANbkl3",
                        "description": "Pichel de 6 vasos.",
                        "image": "2XcZUS5x641A7gugOmRg",
                        "index": 1,
                        "ingredients": [
                            {
                                "default": false,
                                "name": "Te Frio",
                                "selected": true,
                            },
                            {
                                "default": false,
                                "name": "Jamaica",
                                "selected": false,
                            },
                            {
                                "default": false,
                                "name": "Horchata",
                                "selected": false,
                            },
                            {
                                "default": false,
                                "name": "Naranjada",
                                "selected": false,
                            },
                            {
                                "default": false,
                                "name": "Limonada",
                                "selected": false,
                            }
                        ],
                        "productId": "2XcZUS5x641A7gugOmRg",
                        "productName": "Pichel",
                        "quantity": 2,
                        "status": true,
                        "totalPrice": "120.00",
                        "unitPrice": "60.00"
                    }
                ]
            },
        },
        "selectedOrder": "xdQnwldzs35hiXZg23Uy",
        "error": null,
        "isAdding": false,
        "isEditing": false,
        "isFetching": false,
        "isRemoving": false,
        "order":  [
          "xdQnwldzs35hiXZg23Uy",
          "DPZ80uBtKkCVn82yhmZB",
        ],
    },
    "categories":  {
        "byId":  {
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
          "F3IyvbjPoshLb4bW9597",
          "hCp287RyFkx3OjDcUPHm",
          "hQSCp4TUCN8V1fFL8Go5",
          "hTupAum62U4qhbANbkl3",
          "iOIooUgDBK2FWbsOJsTS",
        ],
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
})

describe("Snapshot", () => {
    it('Order Information Screen snapshot', () => {
        const component = render(
            <Provider store={store}><OrderInformationScreen /></Provider>
        );
    
        let tree = component.toJSON();
    
        expect(tree).toMatchSnapshot();
    })
    
})
import React from 'react';
 
import configureStore from 'redux-mock-store';

import {Provider} from 'react-redux';
import {render, cleanup, beforeEach} from 'react-native-testing-library';
import ProductListItem from '../../../src/components/products/ProductListItem';

import * as selectors from '../../../src/logic/reducers';


afterEach(cleanup);

//Mock Store configurar store
const mockStore = configureStore([]);
//Creamos nuestro store con datos 
const store = mockStore({})
const product ={
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
  }
//Mock navigation
const navigation = { navigate: jest.fn() };



describe('<ProductsListItem />', () => {
    
    it('Product List Item renders correctly.', () => {

        const rendered = render(
            <Provider store={store}><ProductListItem style={null} key={product.productId} name={`${product.productName}`} product={product} navigation={navigation} onPress={()=>null} /></Provider>
        );
        expect(rendered.getByTestId('productName').props.children).toBe('Agua')
        
    });
    it('Product List Item renders correctly with image.', () => {

        const rendered = render(
            <Provider store={store}><ProductListItem style={null} key={product.productId} name={`${product.productName}`} product={product} navigation={navigation} onPress={()=>null} /></Provider>
        );
        expect(rendered.getAllByTestId('imageProductComponent').length).toBe(1)
        
    });
    it('Product List Item renders correctly without image.', () => {
        product.image=null;
        const rendered = render(
            <Provider store={store}><ProductListItem style={null} key={product.productId} name={`${product.productName}`} product={product} navigation={navigation} onPress={()=>null} /></Provider>
        );
        expect(rendered.getAllByTestId('noImageProductComponent').length).toBe(1)
        
    });
});

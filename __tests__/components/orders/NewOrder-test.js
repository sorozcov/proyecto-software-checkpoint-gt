import React from 'react';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import { render } from 'react-native-testing-library';

import NewOrder from '../../../src/components/orders/NewOrder';


const mockStore = configureStore([]);
const store = mockStore({
})

describe("Snapshot", () => {
    it('New Order snapshot', () => {
        const component = render(
            <Provider store={store}><NewOrder /></Provider>
        );
    
        let tree = component.toJSON();
    
        expect(tree).toMatchSnapshot();
    })
    
})

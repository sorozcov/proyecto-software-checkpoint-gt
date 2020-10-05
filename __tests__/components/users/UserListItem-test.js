import React from 'react';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import { render } from 'react-native-testing-library';

import UserListItem from '../../../src/components/users/UserListItem';


const mockStore = configureStore([]);
const store = mockStore({
})

describe("Snapshot", () => {
    beforeEach(() => {
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    it('User List Item snapshot', () => {
        const component = render(
            <Provider store={store}><UserListItem /></Provider>
        );
    
        let tree = component.toJSON();
    
        expect(tree).toMatchSnapshot();
    })
    
})

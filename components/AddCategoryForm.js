import { v4 as uuidv4 } from 'uuid';
import React, { useState } from 'react';
import { connect } from 'react-redux';

import * as actions from '../src/actions/categories';
import { View } from 'native-base';

const AddCategoryForm = ({
   onSubmit,
   isLoading, 
}) => {
    const [name] = useState('');
    return (
        <View>
            <Text>{'Crear una nueva categoría'}</Text>
            <p>
                <input
                    type="text"
                    placeholder="Nombre"
                    value={name}
                    onChange={e => changeName(e.target.value)}
                />
            </p>
        </View>
    );
};

export default connect(
    state => ({
        isLoading: false,
    }),
    dispatch => ({
        onSubmit(name) {
            dispatch(
                actions.startAddingCategory({
                    id: uuidv4(),
                    name,
                }),
            );
        },
    }),
)(AddCategoryForm);

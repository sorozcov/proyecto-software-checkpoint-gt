import React, { Component } from 'react';
import { ListItem, Left, Body, Text, Right, Button } from 'native-base';

import * as selectors from '../src/reducers';


const CategoryRow = ({ name, isConfirmed = false }) => {

    <tr>
        <td>{ name }</td>
        <td>
            {
                isConfirmed && (
                    <Button //onClick={edit}
                    >
                        {'Ver'}
                    </Button>
                )
            }
        </td>
    </tr>
}

export default connect(
    (state, { id }) => ({
        ...selectors.getCategory(state, id),
    }),
    // (dispatch, { id }) => ({

    // })
)(CategoryRow)
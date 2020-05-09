import * as types from '../types/meseros';


export const startFetchingMeseros = () => ({
    type: types.MESEROS_FETCH_STARTED,
});

export const completeFetchingMeseros = (entities, order) => ({
    type: types.MESEROS_FETCH_COMPLETED,
    payload: {
      entities,
      order,
    },
});
  
export const failFetchingMeseros = error => ({
    type: types.MESEROS_FETCH_FAILED,
    payload: {
        error,
    },
});

export const startDeletingMesero = id => ({
    type: types.MESEROS_DELETE_STARTED,
    payload: {
        id,
    },
});

export const completeDeletingMesero = () => ({
    type: types.MESEROS_DELETE_COMPLETED,
});

export const failDeletingMesero = (id, error) => ({
    type: types.MESEROS_DELETE_STARTED,
    payload: {
        id,
        error,
    },
});
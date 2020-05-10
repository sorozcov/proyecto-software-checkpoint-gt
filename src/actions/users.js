import * as types from '../types/users';


export const startFetchingUsers = () => ({
    type: types.USERS_FETCH_STARTED,
});
export const completeFetchingUsers = (entities, order) => ({
  type: types.USERS_FETCH_COMPLETED,
  payload: {
      entities,
      order,
  },
});
export const failFetchingUsers = error => ({
  type: types.USERS_FETCH_FAILED,
  payload: {
      error,
  },
});

export const startAddingUser = user => ({
  type: types.USER_ADD_STARTED,
  payload: user,
});
export const completeAddingUser = (oldId, user) => ({
  type: types.USER_ADD_COMPLETED,
  payload: {
    oldId,
    user,
  },
});
export const failAddingUser = (oldId, error) => ({
  type: types.USER_ADD_FAILED,
  payload: {
    oldId,
    error,
  },
});

export const startEditingUser = user => ({
  type: types.USER_EDIT_STARTED,
  payload: user,
});
export const completeEditingUser = (user) => ({
  type: types.USER_EDIT_COMPLETED,
  payload: user,
});
export const failEditingUser = (id, error) => ({
  type: types.USER_EDIT_FAILED,
  payload: {
    id,
    error,
  },
});

export const startRemovingUser = id => ({
  type: types.USER_REMOVE_STARTED,
  payload: {
    id,
  },
});
export const completeRemovingUser = id => ({
  type: types.USER_REMOVE_COMPLETED,
  payload: {
    id,
  },
});
export const failRemovingUser = (id, error) => ({
  type: types.USER_REMOVE_FAILED,
  payload: {
    id,
    error,
  },
});
  
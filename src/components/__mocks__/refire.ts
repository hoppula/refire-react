import { firebaseActions as actions } from "refire"
export { syncFirebase, firebaseToProps, firebaseReducer } from "refire"
export const firebaseActions = {
  ...actions,
  passwordLogin: jest.fn((email, password) => {
    return (dispatch, getState) => {
      return Promise.resolve()
    }
  }),
  createUser: jest.fn((email, password) => {
    return (dispatch, getState) => {
      return Promise.resolve()
    }
  }),
  resetPassword: jest.fn((email) => {
    return (dispatch, getState) => {
      return Promise.resolve()
    }
  }),
  write: jest.fn((method, path, value, ownProps) => {
    return (dispatch, getState) => {
      return Promise.resolve()
    }
  }),
  clearWriteErrors: jest.fn((path) => {
    return (dispatch, getState) => {
      return Promise.resolve()
    }
  }),
}

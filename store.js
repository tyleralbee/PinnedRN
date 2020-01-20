import { connect } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware
} from "react-navigation-redux-helpers";

import AppNavigator from "./navigation/AppNavigator";
import appReducer from "./reducers";

// Note: createReactNavigationReduxMiddleware must be run before reduxifyNavigator

const navMiddleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.nav
);

const middleware = [thunk];

export const store = createStore(appReducer, applyMiddleware(...middleware));

// const mapStateToProps = state => ({
//   state: state.nav
// });

// export const AppNavigatorWithNavigationState = connect(mapStateToProps)(
//   reduxifyNavigator(AppNavigator, "root")
// );

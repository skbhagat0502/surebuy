import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  newModelReducer,
  modelDetailsReducer,
  modelReducer,
  modelsReducer,
} from "./reducer/modelReducer";

import {
  newBrandReducer,
  brandReducer,
  brandsReducer,
  brandDetailsReducer,
} from "./reducer/brandReducer";

import {
  newVariantReducer,
  variantReducer,
  variantsReducer,
} from "./reducer/variantReducer";

import {
  allUsersReducer,
  forgotPasswordReducer,
  userDetailsReducer,
  userReducer,
  profileReducer,
} from "./reducer/userReducer";

import {
  allOrdersReducer,
  myOrdersReducer,
  newOrderReducer,
  orderDetailsReducer,
  orderReducer,
} from "./reducer/orderReducer";

import {
  cutsReducer,
  newCutReducer,
  cutReducer,
  cutDetailsReducer,
} from "./reducer/cutReducer";

import {
  allBanerReducer,
  newBanerReducer,
  banerReducer,
} from "./reducer/banerReducer";
const reducer = combineReducers({
  models: modelsReducer,
  modelDetails: modelDetailsReducer,
  newModel: newModelReducer,
  model: modelReducer,
  brands: brandsReducer,
  brandDetails: brandDetailsReducer,
  newBrand: newBrandReducer,
  brand: brandReducer,
  variants: variantsReducer,
  newVariant: newVariantReducer,
  variant: variantReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailsReducer,
  allOrders: allOrdersReducer,
  order: orderReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  allCuts: cutsReducer,
  newCut: newCutReducer,
  cut: cutReducer,
  cutDetails: cutDetailsReducer,
  baner: banerReducer,
  newBaner: newBanerReducer,
  allBaners: allBanerReducer,
});

const middleware = [thunk];

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

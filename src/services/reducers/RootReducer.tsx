import { combineReducers } from '@reduxjs/toolkit';
import ConstructorReducer from '../slices/ConstructorSlice';
import FeedSlice from '../slices/FeedSlice';
import UserSlice from '../slices/UserSlice';
import OrderSlice from '../slices/OrderSlice';
import IngredientsSlice from '../slices/IngredientsSlice';

const RootReducer = combineReducers({
  constructorData: ConstructorReducer,
  feed: FeedSlice,
  user: UserSlice,
  order: OrderSlice,
  ingredients: IngredientsSlice
});

export default RootReducer;

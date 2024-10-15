import { combineReducers } from '@reduxjs/toolkit';
import ConstructorSlice from '../slices/ConstructorSlice';
import FeedSlice from '../slices/FeedSlice';
import UserSlice from '../slices/UserSlice';
import OrderSlice from '../slices/OrderSlice';
import IngredientsSlice from '../slices/IngredientsSlice';

const RootReducer = combineReducers({
  constructorData: ConstructorSlice,
  feed: FeedSlice,
  user: UserSlice,
  order: OrderSlice,
  ingredients: IngredientsSlice
});

export default RootReducer;

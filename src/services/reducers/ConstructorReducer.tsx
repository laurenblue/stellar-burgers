import { createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '@utils-types'; // Assuming this is defined somewhere

export interface ConstructorState {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
}

const initialState: ConstructorState = {
  bun: null,
  ingredients: []
};

const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addBun(state, action) {
      state.bun = action.payload;
    },
    addIngredient(state, action) {
      state.ingredients.push(action.payload);
    },
    removeIngredient(state, action) {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient._id !== action.payload._id
      );
    },
    clearConstructor(state) {
      state.bun = null;
      state.ingredients = [];
    }
  }
});

export const { addBun, addIngredient, removeIngredient, clearConstructor } =
  constructorSlice.actions;
export default constructorSlice.reducer;

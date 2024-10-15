import IngredientsSlice from '../slices/IngredientsSlice';
import ingredientsSlice, { getIngredients } from '../slices/IngredientsSlice';
import { TIngredient } from '@utils-types';

const initialState = {
  ingredients: [] as TIngredient[],
  loading: false,
  error: null
};

describe('ingredientsSlice reducer', () => {
  it('должен вернуть начальное состояние', () => {
    const newState = ingredientsSlice(undefined, { type: '' });
    expect(newState).toEqual(initialState);
  });

  it('должен установить loading в true при getIngredients.pending', () => {
    const action = { type: getIngredients.pending.type };
    const newState = IngredientsSlice(initialState, action);
    expect(newState.loading).toBe(true);
    expect(newState.error).toBeNull();
  });

  it('должен установить ingredients и сбросить loading при getIngredients.fulfilled', () => {
    const mockIngredients = [
      { _id: 'test-id', name: 'test-ingredient', type: 'main', price: 100 }
    ] as TIngredient[];
    const action = {
      type: getIngredients.fulfilled.type,
      payload: mockIngredients
    };
    const newState = ingredientsSlice(initialState, action);
    expect(newState.loading).toBe(false);
    expect(newState.ingredients).toEqual(mockIngredients);
    expect(newState.error).toBeNull();
  });

  it('должен установить error и сбросить loading при getIngredients.rejected', () => {
    const action = {
      type: getIngredients.rejected.type,
      error: { message: 'Error occurred' }
    };
    const newState = ingredientsSlice(initialState, action);
    expect(newState.loading).toBe(false);
    expect(newState.error).toBe('Error occurred');
  });
});

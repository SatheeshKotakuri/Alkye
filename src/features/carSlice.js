import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCars = createAsyncThunk('cars/fetchCars', async () => {
  const res = await fetch('https://alkye-test-422384984803.us-central1.run.app/myapp/list/');
  console.log(res)
  return await res.json();
});

const carSlice = createSlice({
  name: 'car',
  initialState: {
    items: [],
    selectedCar: null,
    status: 'idle',
  },
  reducers: {
    selectCar: (state, action) => {
      state.selectedCar = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchCars.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { selectCar } = carSlice.actions;
export default carSlice.reducer;

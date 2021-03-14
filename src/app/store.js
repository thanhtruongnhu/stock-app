import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import tickerReducer from '../features/tickerSlice';
import balanceReducer from '../features/balanceSlice';

export default configureStore({
	reducer: {
		user: userReducer,
		ticker: tickerReducer,
		balance: balanceReducer,
	},
});

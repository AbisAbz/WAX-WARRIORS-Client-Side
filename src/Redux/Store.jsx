
import userReducer from '../Redux/UserSlice'
import propertyReducer from '../Redux/PropertySlice'
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit";

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, userReducer);
const persistedPropertyReducer = persistReducer(persistConfig, propertyReducer);

const store = configureStore({
  reducer: {
    user: persistedReducer,
    owner: persistedPropertyReducer
  },
});

const persistor = persistStore(store);

export { store, persistor };

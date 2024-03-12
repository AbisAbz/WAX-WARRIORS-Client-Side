import userReducer from '../Redux/UserSlice'
import propertyOwnerReducer from '../Redux/PropertySlice'
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit";

const userPersistConfig = {
  key: 'user',
  storage,
};

const propertyOwnerPersistConfig = {
  key: 'propertyOwner',
  storage,
};

const persistedUserReducer = persistReducer(userPersistConfig, userReducer);
const persistedPropertyOwnerReducer = persistReducer(propertyOwnerPersistConfig, propertyOwnerReducer);

const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    owner: persistedPropertyOwnerReducer
  },
});

const persistor = persistStore(store);

export { store, persistor };

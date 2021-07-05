import { Provider } from 'react-redux';
import { store } from '../domain/store';
import React from "react";

export const StoreProvider = ({ children }) => {
    return <Provider store={store}>{children}</Provider>;
};
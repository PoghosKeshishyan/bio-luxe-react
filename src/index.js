import React from 'react';
import ReactDOM from 'react-dom/client';
import { SearchProvider } from './contexts/SearchContext';
import { HeartProvider } from './contexts/HeartContext';
import { CartProvider } from './contexts/CartContext';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <SearchProvider>
        <CartProvider>
            <HeartProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </HeartProvider>
        </CartProvider>
    </SearchProvider>
);
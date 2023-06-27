import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isCartOpen: false,
    cart: [{
        count: 2,
        name: 'Floral Embroidered Kimono',
        id: '123413r',
        attributes: {
            price: 20,
            name: 'Floral Embroidered Kimono',
            shortDescription: 'Embrace bohemian elegance with this floral embroidered kimono.',
            longDescription: 'Elevate your outfit with the Floral Embroidered Kimono. This lightweight and flowy kimono features intricate floral embroidery that adds a touch of femininity and bohemian flair. The loose fit and open-front design make it a versatile layering piece for any season. Whether you wear it over a dress or pair it with jeans, this kimono will instantly enhance your look.',
            category: 'toprated',
            image: '#',
        },
    }],
    items: [],
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setItems: (state, action) => {
            state.items = action.payload;
        },
        addToCart: (state, action) => {
            state.cart = [...state.cart, action.payload];
        },
        removeFromCart: (state, action) => {
            state.cart = state.cart.filter((item) => item.id !== action.payload.id);
        },
        increaseCount: (state, action) => {
            state.cart = state.cart.map((item) => {
                if (item.id === action.payload.id) {
                    item.count++;
                }

                return item;
            });
        },
        decreaseCount: (state, action) => {
            state.cart = state.cart.map((item) => {
                if (item.id === action.payload.id && item.count > 1) {
                    item.count--;
                }

                return item;
            });
        },
        setIsCartOpen: (state) => {
            state.isCartOpen = !state.isCartOpen;
        }
    },
});

export const {
    setItems,
    addToCart,
    removeFromCart,
    increaseCount,
    decreaseCount,
    setIsCartOpen,
} = cartSlice.actions;

export default cartSlice.reducer;
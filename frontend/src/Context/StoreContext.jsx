import { createContext, useEffect, useState } from "react";
import axios from 'axios';



export const StoreContext = createContext(null);


const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});
    const url = "http://localhost:5001"
    const [token, setToken] = useState("")
    const [food_list, setFoodList] = useState([])


    const addToCart = async (itemId) => {
    const token = localStorage.getItem("token");

            // If token not present → block adding to cart
    if (!token) {
        alert("Please login to add items to cart");
             // optional: redirect to login page
             // navigate("/login");
        return;
    }
            //  Update cart state (frontend)
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] ? prev[itemId] + 1 : 1}));

             // Update cart in backend
    try {
        await axios.post(
            url + "/api/cart/add",
            { itemId },
            { headers: { token } }
        );
    } catch (error) {
        console.error("Error adding item to cart", error);
    }
};


    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))

        if (token) {
            await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } })
        } else {

        }

    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item)
                totalAmount += itemInfo.price * cartItems[item];
            }

        }
        return totalAmount;
    }

    const fetchFoodList = async () => {
            const response = await axios.get(url + "/api/food/list");
            setFoodList(response.data.data);
    }



    const loadCartData = async (token) => {
        try {
            const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
            setCartItems(response.data.cartData || {});
        } catch (error) {
            console.error("Failed to load cart data", err);
        }
    };



    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));  // <-- Add this
            }
        }

        loadData()

    }, [])

    // useEffect(
    //     ()=>{
    //         console.log(cartItems);
    //     },[cartItems]
    // )


    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken

    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )

}
export default StoreContextProvider
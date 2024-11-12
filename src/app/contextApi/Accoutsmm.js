"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useParams, usePathname,useRouter } from "next/navigation";
// import Cart from "../cart/page";
var jwt = require("jsonwebtoken");

const AppContext = createContext();
export function AppWrapper({ children }) {
  const param = useParams();
  const Pathname = usePathname();
  const router = useRouter();
  const [cart, setCart] = useState(false);
  const [shoppingCart, setShoppingCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [search, setSearch] = useState(false);
  const [showdiv, setShowdiv] = useState(false);
  const [logging, setLogging] = useState(false);
  const [showOpt, setShowOpt] = useState(false);
  const [select, setSelect] = useState('');
  const [wishlist, setWishlist] = useState([]);
  const [jwttoken, setJwttoken] = useState(false);
  // const [wishlist, setWishlist] = useState(() => {
  //       // Load wishlist from local storage
  //       if (typeof window !== 'undefined') {
  //           const storedWishlist = localStorage.getItem('wishlist');
  //           return storedWishlist ? JSON.parse(storedWishlist) : [];
  //       }
  //       return [];
  //   });



  // useEffect(() => {
  //   // Load wishlist from local storage after the component mounts
  //   if (typeof window !== "undefined") {
  //     const storedWishlist = localStorage.getItem("wishlist");
  //     if (storedWishlist) {
  //       setWishlist(JSON.parse(storedWishlist));
  //     }
  //   }
  // }, []); 

  // Check if localStorage is available
  const is = typeof window !== "undefined" ? window.localStorage : null;

  useEffect(() => {
    try {
      // Load cart from localStorage
      if (is && is.getItem("shoppingCart")) {
        const cart = JSON.parse(is.getItem("shoppingCart"));
        setShoppingCart(cart);
      }

      // Load subtotal from localStorage
      if (is && is.getItem("subtotal")) {
        const savedSubtotal = JSON.parse(is.getItem("subtotal"));
        setSubtotal(savedSubtotal);
      }
     if (typeof window !== "undefined") {
       const storedWishlist = localStorage.getItem("wishlist");
       if (storedWishlist) {
         setWishlist(JSON.parse(storedWishlist));
       }
     }


    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
      ClearCart(); // Clear the cart if there's an error
    }
  }, []);

  function Logout() {
    setLogging(true);
    setTimeout(() => {
      localStorage.removeItem("token");
      setLogging(false);
      setJwttoken(false);
      router.push("/login");
    }, 3000);
  }

   useEffect(() => {

     const checkTokenAndLogout = () => {
       const token = localStorage.getItem("token");
      //  console.log("Current Token:", token);

       if (token) {
         const decoded = jwt.decode(token);
         const isExpired = decoded.exp * 1000 < Date.now();

         if (isExpired) {
           console.log("Token expired. Logging out...");
           localStorage.removeItem("token");
           Logout();
         }
       }
     };

     checkTokenAndLogout();
   }, [param,Pathname]);

  const saveCartToLocalStorage = (cart) => {
    localStorage.setItem("shoppingCart", JSON.stringify(cart));
  };
 
  const saveWishListToLocalStorage = (wishlist) => {
   localStorage.setItem("wishlist", JSON.stringify(wishlist));
 };

  const addToWishlist = (item) => {
    setWishlist((prev) => {
      const newWishlist = [...prev, item];
      // Save to local storage after updating state
     saveWishListToLocalStorage(newWishlist);
      return newWishlist;
    });
  };

   const removeFromWishlist = (itemId) => {
     setWishlist((prev) => {
       const newWishlist = prev.filter((item) => item._id !== itemId);
        saveWishListToLocalStorage(newWishlist); // Save to local storage after removal
       return newWishlist;
     });
   };


   const AddTOCart = (account) => {
    console.log(account.qty);
    setShoppingCart((prev) => {
      // Find an item with the same _id and accountTypes._id
      const existingItem = prev.find(
        (v) =>
          v._id === account._id &&
          v.accountTypes?._id === account.accountTypes?._id
      );

      let updatedCart;

      if (!account.accountTypes) {
        // If the account has no accountTypes
        if (existingItem) {
          // Update quantity if it exists
          updatedCart = prev.map((item) =>
            item._id === account._id ? { ...item, qty: item.qty + 1 } : item
          );
        } else {
          // Add a new entry
          updatedCart = [...prev, { ...account, qty: account.qty }];
        }
      } else {
        // If the account has accountTypes
        if (existingItem) {
          // Update quantity if a matching account type exists
          updatedCart = prev.map((item) =>
            item._id === account._id &&
            item.accountTypes._id === account.accountTypes._id
              ? { ...item, qty: item.qty + account.qty }
              : item
          );
        } else {
          // Add a new entry for the account with a different accountTypes._id
          updatedCart = [...prev, { ...account, qty: account.qty }];
        }
      }

      // Save the updated cart to local storage
      saveCartToLocalStorage(updatedCart);
      CalculateAndSaveSubtotal(); // Update subtotal after adding an item

      return updatedCart;
    });
  };

  const RemoveFromCart = (account) => {
    setShoppingCart((prev) => {
      let updatedCart;
      if(!account.accountTypes){
       updatedCart = prev.filter((item) => item._id !== account._id);
      }else{
       updatedCart = prev.filter((item) => !(item._id === account._id && item.accountTypes._id === account.accountTypes._id));
      }
      saveCartToLocalStorage(updatedCart);
      CalculateAndSaveSubtotal(); // Update subtotal after removing an item
      return updatedCart;
    });
  };

  const DecreaseQuantity = (account) => {
      setShoppingCart((prev) => {  
        if (!account.accountTypes) {
          const item = prev.find((item) => item._id === account._id);

          if (item) {
            if (item.qty > 1) {
              const updatedCart = prev.map((item) =>
                item._id === account._id ? { ...item, qty: item.qty - 1 } : item
              );

              saveCartToLocalStorage(updatedCart);
              CalculateAndSaveSubtotal(); // Update subtotal after decreasing quantity

              return updatedCart;
            } else {
              const updatedCart = prev.filter(
                (item) => item._id !== account._id
              );
              saveCartToLocalStorage(updatedCart);
              CalculateAndSaveSubtotal(); // Update subtotal after removing item

              return updatedCart;
            }
          }
        } else {
          const item = prev.find((item) => item._id === account._id && item.accountTypes._id === account.accountTypes._id);
          if (item) {
            if (item.qty > 1) {
              const updatedCart = prev.map((item) =>
                item._id === account._id  && item.accountTypes._id === account.accountTypes._id ? { ...item, qty: item.qty - 1 } : item
              );

              saveCartToLocalStorage(updatedCart);
              CalculateAndSaveSubtotal(); // Update subtotal after decreasing quantity

              return updatedCart;
            } else {
              const updatedCart = prev.filter(
                (item) => !(item._id === account._id  && item.accountTypes._id === account.accountTypes._id)
              );
              saveCartToLocalStorage(updatedCart);
              CalculateAndSaveSubtotal(); // Update subtotal after removing item

              return updatedCart;
            }
          }
        }

      return prev; // Return previous state if item not found
    });
  };

  const CalculateAndSaveSubtotal = () => {
    setShoppingCart((prev) => {
      let subtotal = 0; // Initialize subtotal to 0

      // Iterate over each item to calculate the subtotal
      prev.forEach((item) => {
        
        subtotal += item.basePrice * item.qty; // Add each item's total price to subtotal
        console.log(subtotal)
      });

      // Save the subtotal to local storage
      localStorage.setItem("subtotal", JSON.stringify(subtotal));
       setSubtotal(subtotal)
      return prev; // Return the current shopping cart
    });
    // setShoppingCart((prev) => {
    //   let subtotal = 0;
    //   // Iterate over each item to calculate the subtotal
    //   prev.forEach((item) => {
    //     console.log("Item basePrice:", item.basePrice, "Item qty:", item.qty);
    //     const itemPrice = parseFloat(item.basePrice) || 0;
    //     const itemQty = parseInt(item.qty) || 1;

    //     subtotal += itemPrice * itemQty;
    //     console.log(subtotal);
    //   });

    //   // Save the subtotal to local storage
    //   localStorage.setItem("subtotal", JSON.stringify(subtotal));
    //   setSubtotal(subtotal);
    //   return prev;
    // });
  };

  const ClearCart = () => {
    setShoppingCart([]); // Set the shopping cart to an empty array
    localStorage.removeItem("shoppingCart"); // Remove the shopping cart from local storage
    localStorage.removeItem("subtotal"); // Optionally, remove the subtotal from local storage
    localStorage.removeItem("wishlist")
  };

  return (
    <AppContext.Provider
      value={{
        cart,
        search,
        setSearch,
        setCart,
        showdiv,
        setShowdiv,
        Logout,
        logging,
        setLogging,
        AddTOCart,
        RemoveFromCart,
        DecreaseQuantity,
        ClearCart,
        subtotal,
        shoppingCart,
        setShowOpt,
        showOpt,
        setSelect,
        select,
        removeFromWishlist,
        addToWishlist,
        wishlist,
        setWishlist,
        jwttoken,
        setJwttoken,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
export function useAppContext() {
  return useContext(AppContext);
}

import React,{useState,useEffect} from 'react'
import Header from "../components/cart/header";
import styles from "../styles/cart.module.scss";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import CartHeader from "../components/cart/cartHeader";
import Product from "../components/cart/product";
import Checkout from "../components/cart/checkout";
import PaymentMethods from "../components/cart/paymentMethods";
import Empty from "../components/cart/empty";
import { saveCart } from "../requests/user";
import { updateCart } from '../store/cartSlice';
import axios from 'axios';


const Cart = () => {
    const Router = useRouter();
    const { data: session } = useSession();
    const dispatch = useDispatch();
    const { cart } = useSelector((state) => ({...state}));
    const [shippingFee, setShippingFee] = useState(0);
    const [subtotal, setSubtotal] = useState(0);
    const [total, setTotal] = useState(0);
    const [selected, setSelected] = useState([]);

    const saveCartToDbHandler = async () => {
      if (session) {
        const res = await saveCart(selected);

        if(res.success){
          Router.push("/checkout");
        } 
      } else {
        signIn();
      }
    };

    const update=async()=>{
      try{
        const {data}=await axios.post("/api/updateCart",{
          products:cart.cartItems
        })
        console.log(data.data)
        // dispatch(updateCart(data.data))
      } catch(error){
        console.log("update Cart",error)
      } 
    }

    useEffect(()=>{
      if(cart.cartItems.length>0){
        update()
      }
    },[])

    useEffect(() => {
      setShippingFee(
        selected.reduce((a, c) => a + Number(c.shipping), 0).toFixed(2)
      );
      setSubtotal(selected.reduce((a, c) => a + c.price * c.qty, 0).toFixed(2));
      setTotal(
        (
          selected.reduce((a, c) => a + c.price * c.qty, 0) + Number(shippingFee)
        ).toFixed(2)
      );
    }, [selected]);

  return (
    <>
        <Header />
        <div className={styles.cart}>
        {cart.cartItems.length > 0 ? (
          <div className={styles.cart__container}>
            <CartHeader
              cartItems={cart.cartItems}
              selected={selected}
              setSelected={setSelected}
            />
            <div className={styles.cart__products}>
              {cart.cartItems.map((product) => (
                <Product
                  product={product}
                  key={product._uid}
                  selected={selected}
                  setSelected={setSelected}
                />
              ))}
            </div>
            <Checkout
              subtotal={subtotal}
              shippingFee={shippingFee}
              total={total}
              selected={selected}
              saveCartToDbHandler={saveCartToDbHandler}
            />
            <PaymentMethods />
          </div>
        ) : (
          <Empty />
        )}
        </div>
    </>
  )
}

export default Cart
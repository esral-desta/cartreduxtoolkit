import { useDispatch, useSelector } from 'react-redux';
import CartContainer from "./components/CartContainer";
import Navbar from "./components/Navbar";
import { calculateTotals } from './features/cart/cartSlice';
import { useEffect } from 'react';
import Modal from './components/Modal';
// import getCartItems from "./features/cart/cartSlice"

function App() {
  const { cartItems} = useSelector((store) => store.cart);
  const isOpen = useSelector(store=>store.modal.isOpen)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems]);
  useEffect(()=>{
    // dispatch(getCartItems("name"))
    console.log('ww');
  })
  return (
    <main>
      {isOpen && <Modal/>}
      <Navbar />
      <CartContainer />
    </main>
  );
}
export default App;

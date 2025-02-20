import { useContext, useState } from "react";
import { router, usePage } from "@inertiajs/react";
import { MenuContext } from '@/store/menu-context';
import PaginateLinks from '@/Components/PaginateLinks';
import Item from "../Customer/Item";
import CartItem from "./CartItem";
import Modal from '@/Components/Modal';
import { useCartContext } from '@/store/cart-context';


let modalDat = '';

export default () => {
    const propDat = usePage().props;
    const menuCtx = useContext(MenuContext);

    const { addToCart, cartItems, cartTotal, setCartItems } = useCartContext();

    const [paginationData, setPaginationData] = useState({
        current_page: propDat.menu_items.current_page,
        last_page: propDat.menu_items.last_page,
        prev_page_url: propDat.menu_items.prev_page_url,
        next_page_url: propDat.menu_items.next_page_url,
    });

    const handlePaginate = (e) => {
    const url = e ==='prev'?paginationData.prev_page_url:paginationData.next_page_url;
    router.get(url, {
        preserveScroll: true,
        replace: true,
        only: ['menu_items'],
        onSuccess: page => {
            updatePaginationData(page.props.menu_items);
        }
    });
    }
    
    const updatePaginationData = (newData) => {
        setPaginationData({
            current_page: newData.current_page,
            last_page: newData.last_page,
            prev_page_url: newData.prev_page_url,
            next_page_url: newData.next_page_url,
        });
    };

    const onAdd = ({id, name, price}) => {
        addToCart({'id': id, 'name': name, 'price': price});
    }

    const handleProceedCart = () => {
        router.post('/orders', {
            items: cartItems,
        }, {
            onSuccess: () => {
                setCartItems([]);
                alert('Order placed successfully!');
            },
            onError: err => {
                alert('An error occured when placing the order.');
            }
        });
    }

    return (
        <>
            <div className="flex-2 customer_menu">
                <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900 flex justify-center">
                    <div className="container max-w-screen-lg mx-auto">
                        <h2 className="font-semibold text-xl text-gray-50">Menu Items</h2>
                        <p className="text-gray-50 mb-6">Place your order here</p>
                        <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-2 min-h-screen">
                            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                                {menuCtx.data.menu.map(item => {
                                    return (
                                        <div key={item.id} className="bg-white rounded shadow-lg p-4">
                                            <Item itemdat={item} onAdd={() => onAdd(item)} />
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 mt-4">
                                <PaginateLinks currentPage={paginationData.current_page} lastPageCheck={paginationData.last_page} onPaginate={handlePaginate} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex-1 customer_cart">
                <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900 flex justify-center">
                        <div className="container max-w-screen-lg mx-auto">
                            <h2 className="font-semibold text-xl text-gray-50">Cart</h2>
                            <p className="text-gray-50 mb-6">Your shopping cart</p>
                            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-2 min-h-screen">
                                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1">
                                    <table className="table-fixed w-full min-h-4 text-center">
                                        <thead className="bg-gray-900 text-white">
                                            <tr>
                                                <th>Item</th>
                                                <th>Quantity</th>
                                                <th>Price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cartItems.length < 1? (
                                                <tr><td colSpan="3" className="text-center py-4">Add items from the menu</td></tr>
                                            ):
                                            cartItems.map(item => ( <CartItem key={item.id} item={item} /> ))
                                            }
                                            {cartItems.length > 0? (
                                            <tr>
                                                <td colSpan='3' className='text-right py-4 font-semibold'>Total: ${cartTotal.toFixed(2)}</td>
                                            </tr>
                                            ):''}
                                        </tbody>
                                    </table>
                                    <button onClick={handleProceedCart} className="bg-gray-900 hover:bg-gray-700 p-2 text-white">Proceed to Checkout</button>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        </>
    );
}
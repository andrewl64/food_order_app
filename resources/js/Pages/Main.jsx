import { usePage, router } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import {useState, useRef } from 'react';
import AddItem from '@/Components/Menu/AddItem';
import ViewItems from '@/Components/Menu/ViewItems';
import OpenOrders from '@/Components/Orders/OpenOrders';
import DashHome from '@/Components/Dashboard/DashHome';

import { MenuContext } from '@/store/menu-context';
import { OrderContext } from '@/store/orders-context';
import { useSidebarContext } from '@/store/sidebar-context';

export default function Main() {
    const propDat = usePage().props;
    const { activeMenu } = useSidebarContext();
    const [showModal, setShowModal] = useState(propDat.message!==null);

    const [menuPaginationData, setMenuPaginationData] = useState({
        current_page: propDat.menu_items.current_page,
        last_page: propDat.menu_items.last_page,
        prev_page_url: propDat.menu_items.prev_page_url,
        next_page_url: propDat.menu_items.next_page_url,
    });

    const [orderPaginationData, setOrderPaginationData] = useState(
        propDat.orders ? {
            current_page: propDat.orders.current_page,
            last_page: propDat.orders.last_page,
            prev_page_url: propDat.orders.prev_page_url,
            next_page_url: propDat.orders.next_page_url,
        } : {}
    );


    const viewItemsRef = useRef(null);
    const viewOrdersRef = useRef(null);

    const closeModal = () => {
        setShowModal(false);
        router.post('/clear-session-message', {}, {
            onError: (error) => {
              console.error('Error clearing session message:', error);
            }
        });
    }
    const updateMenuItems = () => {
        if (viewItemsRef.current) viewItemsRef.current.reload();
        setShowModal(true);
    }
    const updateOrders = () => {
        if (viewOrdersRef.current) viewOrdersRef.current.reload();
        setShowModal(true);
    }

    const updateMenuPaginationData = (newData) => {
        setMenuPaginationData({
            current_page: newData.current_page,
            last_page: newData.last_page,
            prev_page_url: newData.prev_page_url,
            next_page_url: newData.next_page_url,
        });
    };

    const updateOrderPaginationData = (newData) => {
        setOrderPaginationData({
            current_page: newData.current_page,
            last_page: newData.last_page,
            prev_page_url: newData.prev_page_url,
            next_page_url: newData.next_page_url,
        });
    };

    const isCustomer = propDat.auth.rolenames.length === 0;

    return (
        <div className="flex flex-1 items-stretch">
            {propDat.message && <Modal show={showModal} onClose={closeModal}>
                <p className='text-white'>{propDat.message}</p>
                <div className="mt-4">
                    <button
                    className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                    onClick={closeModal}
                    >
                    OK
                    </button>
                </div>
            </Modal>}
            <MenuContext.Provider value={{
            data: {
                menu: propDat.menu_items.data,
            }}}>
                {(!activeMenu || activeMenu === 'dashboard') && <DashHome />}
                {!isCustomer && activeMenu === 'addItems' && <AddItem updateMenuItems={updateMenuItems} />}
                {!isCustomer && activeMenu === 'viewItems' && <ViewItems ref= {viewItemsRef} paginationData={menuPaginationData} updatePaginationData={updateMenuPaginationData} updateMenuItems={updateMenuItems} />}
            </MenuContext.Provider>
            {!isCustomer && (
                <OrderContext.Provider value={{
                    data: {
                        orders: propDat.orders.data,
                    }}}>
                    {activeMenu === 'openOrders' && <OpenOrders ref={viewOrdersRef} paginationData={orderPaginationData} updatePaginationData={updateOrderPaginationData} updateOrders={updateOrders} />}
                </OrderContext.Provider>
            )}
        </div>
    );
}
import { useState, useContext, forwardRef, useImperativeHandle } from 'react';
import { router, usePage } from '@inertiajs/react';
import PaginateLinks from '@/Components/PaginateLinks';
import Modal from '@/Components/Modal';
import Order from './Order';

let modalDat = '';

const AllOrders = forwardRef(({paginationData, updatePaginationData, updateOrders}, ref) => {
    const propDat = usePage().props;
    const role = propDat.auth.rolenames;

    const [showModal, setShowModal] = useState(propDat.message!==null);

    useImperativeHandle(ref, () => ({
        reload: () => {
            router.reload({
                only: ['orders'],
                preserveScroll: true,
                onSuccess: (resp) => {
                    
                }
            });
        }
    }));

    const handlePaginate = (e) => {
        const url = e ==='prev'?paginationData.prev_page_url:paginationData.next_page_url;
        router.get(url, {
            preserveScroll: true,
            replace: true,
            only: ['orders'],
            onSuccess: page => {
                updatePaginationData(page.props.orders);
            }
        });
    }

    const processConfirm = (e) => {
        
    }
    const approveConfirm = (e) => {
        modalDat = {
            role: 'approve',
            item: e,
        };
        setShowModal(true);
    }
    const declineConfirm = (e) => {
        modalDat = {
            role: 'decline',
            id: e,
        };
        setShowModal(true);
    }

    const processOrder = (e) => {

    }

    const approveOrder = (e) => {
        router.post(`/orders/${e}`, {
            _method: 'PATCH',
            preserveScroll: true,
            only: ['orders'],
            replace: true,
            onSuccess: () => {
                modalDat = {
                    role: 'approve_success',
                };
                updateOrders();
            }
        });
    }

    const declineOrder = (e) => {
        setShowModal(false);
        router.delete(route('orders.destroy', e), {
            preserveScroll: true,
            only: ['orders'],
            replace: true,
            onSuccess: () => {
                modalDat = {
                    role: 'decline_success',
                };
                setShowModal(true);
            }
        })
    }

    const closeModal = () => {
        modalDat = {};
        setShowModal(false);
    }

    return (
        <>
            <Modal show={showModal} onClose={closeModal}>
                {modalDat.role==='approve'?
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-2">   
                        <div className="lg:col-span-2">
                            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1">
                            <p className="text-white mb-6">Are you sure?</p>
                            <div className="flex gap-4 justify-center">
                                <button className="text-gray-800 bg-gray-200 w-24 py-2 hover:bg-gray-400 rounded" onClick={approveOrder}>Yes</button>
                                <button className="text-gray-800 bg-gray-200 w-24 py-2 hover:bg-gray-400 rounded" onClick={closeModal}>No</button>
                            </div>
                            </div>
                        </div>
                    </div>
                : modalDat.role==='decline'?
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-2">   
                        <div className="lg:col-span-2">
                            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1">
                            <p className="text-white mb-6">Are you sure?</p>
                            <div className="flex gap-4 justify-center">
                                <button className="text-gray-800 bg-gray-200 w-24 py-2 hover:bg-gray-400 rounded" onClick={() =>declineOrder(modalDat.id)}>Yes</button>
                                <button className="text-gray-800 bg-gray-200 w-24 py-2 hover:bg-gray-400 rounded" onClick={closeModal}>No</button>
                            </div>
                            </div>
                        </div>
                    </div>
                : modalDat.role==='approve_success'?
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-2">   
                        <div className="lg:col-span-2">
                            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1">
                                <p className="text-white mb-6">Order approved successfully</p>
                                <button className="text-gray-800 bg-gray-200 w-24 py-2 hover:bg-gray-400 rounded mx-auto my-0" onClick={closeModal}>Ok</button>
                            </div>
                        </div>
                    </div>
                : modalDat.role==='decline_success'?
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-2">   
                        <div className="lg:col-span-2">
                            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1">
                                <p className="text-white mb-6">Order declined successfully</p>
                                <button className="text-gray-800 bg-gray-200 w-24 py-2 hover:bg-gray-400 rounded mx-auto my-0" onClick={closeModal}>Ok</button>
                            </div>
                        </div>
                    </div>
                : ''
                }
            </Modal>
            <div className="flex-1 viewItems">
                <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900 flex justify-center">
                    <div className="container max-w-screen-lg mx-auto">
                        <h2 className="font-semibold text-xl text-gray-50">Orders</h2>
                        <p className="text-gray-50 mb-6">Managed Orders</p>
                        <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-2">
                            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-2">
                                {propDat.orders.data.map(item => {
                                    return (
                                        <div key={item.id} className="bg-white rounded shadow-lg p-4">
                                            <Order
                                                itemdat={item}
                                                onProcessConfirm={role.length !== 0 ? ()=>processConfirm(item) : null}
                                                onApproveConfirm={role.length !== 0 ? ()=>approveConfirm(item) : null}
                                                onDeclineConfirm={role.length !== 0 ? declineConfirm : null}
                                            />
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
        </>
    );
});

export default AllOrders;
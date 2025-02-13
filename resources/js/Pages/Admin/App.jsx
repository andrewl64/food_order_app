import { usePage } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import {useState, useRef } from 'react';
import AddItem from '@/Components/Admin/AddItem';
import ViewItems from '@/Components/Admin/ViewItems';
import { MenuContext } from '@/store/menu-context';

export default function AdminDash() {
    const propDat = usePage().props;
    const [showModal, setShowModal] = useState(propDat.message!==null);
    const [paginationData, setPaginationData] = useState({
        current_page: propDat.menu_items.current_page,
        last_page: propDat.menu_items.last_page,
        prev_page_url: propDat.menu_items.prev_page_url,
        next_page_url: propDat.menu_items.next_page_url,
    });


    const viewItemsRef = useRef(null);

    const closeModal = () => {
        setShowModal(false);
    }
    const updateMenuItems = (dat) => {
        if (viewItemsRef.current) viewItemsRef.current.reload();
        setShowModal(true);
    }

    const updatePaginationData = (newData) => {
        setPaginationData({
            current_page: newData.current_page,
            last_page: newData.last_page,
            prev_page_url: newData.prev_page_url,
            next_page_url: newData.next_page_url,
        });
    }

    return (
            <MenuContext.Provider value={{ data: propDat.menu_items.data }}>
                <div className="flex items-stretch">
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
                    <AddItem updateMenuItems={updateMenuItems} />
                    <ViewItems ref= {viewItemsRef} paginationData={paginationData} updatePaginationData={updatePaginationData} updateMenuItems={updateMenuItems} />
                </div>
            </MenuContext.Provider>
    );
}
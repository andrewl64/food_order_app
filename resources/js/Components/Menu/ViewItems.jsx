import { useState, useContext, forwardRef, useImperativeHandle } from 'react';
import { MenuContext } from '@/store/menu-context';
import { router, usePage, useForm } from '@inertiajs/react';
import PaginateLinks from '@/Components/PaginateLinks';
import Modal from '@/Components/Modal';
import Item from './Item';

let modalDat = '';

const ViewItems = forwardRef(({paginationData, updatePaginationData, updateMenuItems}, ref) => {
    
    const propDat = usePage().props;

    const {data, setData, processing } = useForm({
        id: '',
        name: '',
        price: '',
        desc: '',
        img_name: '',
        image: null,
    });

    const menuCtx = useContext(MenuContext);

    const [showModal, setShowModal] = useState(propDat.message!==null);

    useImperativeHandle(ref, () => ({
        reload: () => {
            router.reload({
                only: ['menu_items'],
                preserveScroll: true,
                onSuccess: (resp) => {
                    menuCtx.data = resp.props.menu_items.data;
                }
            });
        }
    }));

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

    const editConfirm = (e) => {
        setData({
            id: e.id,
            name: e.name,
            price: e.price,
            desc: e.desc,
            img_name: e.img_name || '',
            image: null,
        });
        modalDat = {
            role: 'edit',
            item: e,
        };
        setShowModal(true);
    }
    const deleteConfirm = (e) => {
        modalDat = {
            role: 'del',
            id: e,
        };
        setShowModal(true);
    }
    
    const editItem = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('_method', 'PATCH');
        formData.append('name', data.name);
        formData.append('price', data.price);
        formData.append('desc', data.desc);
        if (data.image) {
            formData.append('image', data.image);
        }

        router.post(`/menu/${data.id}`, formData, {
            preserveScroll: true,
            only: ['menu_items'],
            replace: true,
            onSuccess: () => {
                closeModal();
                updateMenuItems();
                modalDat = {
                    role: 'edit_success',
                };
                setShowModal(true);
            },
            onError: (err) => {
                console.log('Error: ', err);
            },
        });
    };

    const deleteItem = (e) => {
        setShowModal(false);
        router.delete(route('menu.destroy', e), {
            preserveScroll: true,
            only: ['menu_items'],
            replace: true,
            onSuccess: () => {
                modalDat = {
                    role: 'del_success',
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
                {modalDat.role==='edit'?
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-2">   
                        <div className="lg:col-span-2">
                            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1">
                                <form className='text-left' onSubmit={editItem} encType='multipart/form-data'>
                                    <div className="md:col-span-5 mt-2">
                                        <label className='text-white' htmlFor="name">Name</label>
                                        <input required onChange={e => setData('name', e.target.value)} value={data.name} type="text" name="name" id="name" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                                    </div>
                                    <div className="md:col-span-5 mt-2">
                                        <label className='text-white' htmlFor="price">Price</label>
                                        <input required onChange={e => setData('price', e.target.value)} value={data.price} type="text" name="price" id="price" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                                    </div>
                                    <div className="md:col-span-5 mt-2">
                                    <label className='text-white' htmlFor="desc">Description</label>
                                    <textarea required onChange={e => setData('desc', e.target.value)} value={data.desc} name="desc" id="desc" className="min-h-[100px] border mt-1 rounded px-4 w-full bg-gray-50" />
                                    </div>
                                    <div className="md:col-span-5 mt-2">
                                        <label className='text-white' htmlFor="image">Image</label>
                                        <input onChange={e => {
                                            setData('image', e.target.files[0]);
                                            setData('img_name', e.target.files[0].name);
                                            }} type="file" name="image" id="image" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                                    </div>
                                    <div className="md:col-span-5 mt-2 text-right">
                                    <div className="inline-flex items-end gap-4">
                                        <button type="button" onClick={closeModal} className='bg-red-700 hover:bg-red-500 text-white font-bold py-2 px-4 rounded mt-1'>Cancel</button>
                                        <button type='submit' disabled={processing} className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded mt-1 disabled:bg-stone-800">{processing?'Submitting....':'Submit'}</button>
                                    </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                : modalDat.role==='del'?
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-2">   
                        <div className="lg:col-span-2">
                            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1">
                            <p className="text-white mb-6">Are you sure?</p>
                            <div className="flex gap-4 justify-center">
                                <button className="text-gray-800 bg-gray-200 w-24 py-2 hover:bg-gray-400 rounded" onClick={() =>deleteItem(modalDat.id)}>Yes</button>
                                <button className="text-gray-800 bg-gray-200 w-24 py-2 hover:bg-gray-400 rounded" onClick={closeModal}>No</button>
                            </div>
                            </div>
                        </div>
                    </div>
                : modalDat.role==='edit_success'?
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-2">   
                        <div className="lg:col-span-2">
                            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1">
                                <p className="text-white mb-6">Item updated successfully</p>
                                <button className="text-gray-800 bg-gray-200 w-24 py-2 hover:bg-gray-400 rounded mx-auto my-0" onClick={closeModal}>Ok</button>
                            </div>
                        </div>
                    </div>
                : modalDat.role==='del_success'?
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-2">   
                    <div className="lg:col-span-2">
                        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1">
                            <p className="text-white mb-6">Item deleted successfully</p>
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
                        <h2 className="font-semibold text-xl text-gray-50">Menu Items</h2>
                        <p className="text-gray-50 mb-6">Edit or Delete menu items</p>
                        <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-2">
                            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-4">
                                {menuCtx.data.menu.map(item => {
                                    return (
                                        <div key={item.id} className="bg-white rounded shadow-lg p-4">
                                            <Item itemdat={item} onEditConfirm={()=>editConfirm(item)} onDeleteConfirm={deleteConfirm} />
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

export default ViewItems;
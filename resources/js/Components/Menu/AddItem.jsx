import { useForm } from '@inertiajs/react';

export default ({ updateMenuItems }) => {
    const {data, setData, post, processing } = useForm({
        name: '',
        price: '',
        desc: '',
        img_name: '',
    });

    const handleAddFood = (e) => {
        e.preventDefault();
        post('/menu', {
            preserveScroll: true,
            onSuccess: () => {
                e.target.reset();
                updateMenuItems();
            }
          });
    }

    return (
        <div className="flex-1 addItems">
            <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900 flex justify-center">
                <div className="container max-w-screen-lg mx-auto">
                    <h2 className="font-semibold text-xl text-gray-50">Add New Item</h2>
                    <p className="text-gray-50 mb-6">Add new food item to menu</p>

                    <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-2">
                        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-2">   
                            <div className="lg:col-span-2">
                            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1">
                                <form onSubmit={handleAddFood} encType='multipart/form-data'>
                                    <div className="md:col-span-5">
                                        <label htmlFor="name">Name</label>
                                        <input required onChange={e => setData('name', e.target.value)} type="text" name="name" id="name" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                                    </div>
                                    <div className="md:col-span-5">
                                        <label htmlFor="price">Price</label>
                                        <input required onChange={e => setData('price', e.target.value)} type="text" name="price" id="price" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                                    </div>
                                    <div className="md:col-span-5">
                                    <label htmlFor="desc">Description</label>
                                    <textarea required onChange={e => setData('desc', e.target.value)} name="desc" id="desc" className="min-h-[100px] border mt-1 rounded px-4 w-full bg-gray-50" />
                                    </div>
                                    <div className="md:col-span-5">
                                        <label htmlFor="image">Image</label>
                                        <input required onChange={e => {
                                            setData('image', e.target.files[0]);
                                            setData('img_name', e.target.files[0].name);
                                            }} type="file" name="image" id="image" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                                    </div>
                                    <div className="md:col-span-5 text-right">
                                    <div className="inline-flex items-end">
                                        <button disabled={processing} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-1 disabled:bg-stone-800">{processing?'Submitting....':'Submit'}</button>
                                    </div>
                                    </div>
                                </form>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
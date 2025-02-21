import { ArrowPathIcon, XCircleIcon, CheckCircleIcon } from "@heroicons/react/24/solid";
import OrderItem from "./OrderItem";
import { usePage } from "@inertiajs/react";

export default ({ itemdat: item, onProcessConfirm, onApproveConfirm, onDeclineConfirm }) => {

    const propDat = usePage().props;
    return (
        <>
            <div>
                <div className="flex place-content-between my-2">
                    <h3 className="text-md font-semibold">Order no. {item.id}</h3>
                    <h3 className="text-md font-semibold">Date: {item.created_at_formatted}</h3>

                </div>
                {propDat.auth.rolenames.length !== 0 && (
                    <div className="absolute top-0 right-0 mr-[0.25rem] mt-[0.25rem]">
                        <button onClick={()=>onProcessConfirm(item.id)}>
                            <ArrowPathIcon className="w-5"/>
                        </button>
                        <button onClick={()=>onDeclineConfirm(item.id)}>
                            <XCircleIcon className="w-5" />
                        </button>
                        <button onClick={()=>onApproveConfirm(item.id)}>
                            <CheckCircleIcon className="w-5" />
                        </button>
                    </div>
                )}
                <div>
                    <table className="table-fixed w-full min-h-4 text-center">
                        <thead className="bg-gray-900 text-white">
                            <tr>
                                <th>Item</th>
                                <th>Quantity</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                        {item.order_items.length<1? (
                            <tr><td colSpan="3" className="text-center py-4">No orders available</td></tr>
                        ):
                        item.order_items.map(e => (<OrderItem key={e.id} order={e} />))}
                        <tr className="border-t border-gray-500">
                            <td><p><span className="font-semibold">Status:</span> {item.status.name}</p></td>
                            <td></td>
                            <td className='text-center py-4 font-semibold'>${item.total}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
import { useCartContext } from '@/store/cart-context';

export default ({ item }) => {

    const item_total = item.count * item.price;
    const { updateCartItem } = useCartContext();

    const handleCount = (e) => {
        updateCartItem(item, e);
    };

    return (
        <tr>
            <td className="py-4">{item.name}</td>
            <td className="flex gap-2 justify-center py-4">
                <button onClick={()=> handleCount('-')} className="hover:bg-gray-700 hover:text-white border border-gray-700 px-2">-</button>{item.count}<button onClick={()=> handleCount('+')} className="hover:bg-gray-700 hover:text-white border border-gray-700 px-2">+</button>
            </td>
            <td className="text-right py-4">${item_total}</td>
        </tr>
    );
}
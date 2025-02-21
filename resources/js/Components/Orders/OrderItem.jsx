export default ({ order }) => {
    const order_total = order.quantity * order.price;
    return (
        <tr>
            <td className="py-4">{order.menu.name}</td>
            <td className="py-4">{order.quantity}</td>
            <td className="py-4">${order_total}</td>
            
        </tr>
    );
}
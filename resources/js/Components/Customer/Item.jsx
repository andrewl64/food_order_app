export default ({ itemdat: item, onAdd }) => {
    return (
        <>
            <div className="relative">
                <img src={`/storage/menu/${item.image}`} alt={item.name} className="w-full mt-2" />
                <div className="text-center w-full">
                    <button className='bg-green-700 hover:bg-green-500 p-2 mt-2' onClick={()=>onAdd(item.id)}>Add To Cart</button>
                </div>
            </div>
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <p>{item.desc}</p>
            <p className="text-gray-500">Price: ${item.price}</p>
        </>
    );
}
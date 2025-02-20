import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link, usePage } from '@inertiajs/react';
import { ChartPieIcon, BookOpenIcon, NewspaperIcon, UserGroupIcon, ArrowDownIcon } from "@heroicons/react/24/solid";
import { useSidebarContext } from "@/store/sidebar-context";

export default () => {
    const appName = usePage().props.misc.app_name;
    const role = usePage().props.auth.rolenames;

    const { activeSidebar, toggleSidebar, setMenu } = useSidebarContext();

    return (
        <div className="w-1/6 min-h-screen p-4 bg-gray-100 dark:bg-gray-900 border-r-indigo-500 border-r-2">
            <div className="flex">
                <div className="flex shrink-0 gap-2 w-full items-center text-white justify-center pb-4">
                    <Link href="/">
                        <ApplicationLogo className="block h-9 w-xl fill-current text-gray-800 dark:text-gray-200" />
                    </Link>
                    <span className='text-lg'>{appName}</span>
                </div>
            </div>
            <div className="flex flex-col py-4 overflow-y-auto duration-500 ease-linear no-scrollbar">
                    <ul className="text-gray-300 text-xl">
                        <li className='mt-4'><button className="flex gap-2" onClick={()=>setMenu('dashboard')}><ChartPieIcon className="w-8"/><span>Dashboard</span></button></li>

                        {role.length !== 0 && (
                            <>
                                <li className='mt-4'><button className="flex gap-2" onClick={()=>toggleSidebar('menu')}><BookOpenIcon className="w-8"/><span>Menu Items</span></button>
                                    <ul className={`text-gray-300 text-lg transition-all duration-500 ease-in-out overflow-hidden ${activeSidebar === 'menu' ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                                        <li className={`${activeSidebar === 'menu' ? 'opacity-100' : 'opacity-0 transition-opacity duration-500 ease-in-out delay-300'}`}><button onClick={()=>setMenu('viewItems')}>View Items</button></li>
                                        {(role.includes('admin')||role.includes('manager'))&& <li className={`${activeSidebar === 'menu' ? 'opacity-100' : 'opacity-0 transition-opacity duration-500 ease-in-out delay-300'}`}><button onClick={()=>setMenu('addItems')}>Add Item</button></li>}
                                    </ul>
                                </li>
                                <li className='mt-4'><button className="flex gap-2" onClick={()=>toggleSidebar('orders')}><NewspaperIcon className="w-8"/><span>Orders</span></button>
                                    <ul className={`text-gray-300 text-lg transition-all duration-500 ease-in-out overflow-hidden ${activeSidebar === 'orders' ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                                        <li className={`${activeSidebar === 'orders' ? 'opacity-100' : 'opacity-0 transition-opacity duration-500 ease-in-out delay-300'}`}><button onClick={()=>setMenu('openOrders')}>Open Orders</button></li>
                                        <li className={`${activeSidebar === 'orders' ? 'opacity-100' : 'opacity-0 transition-opacity duration-500 ease-in-out delay-300'}`}><button onClick={()=>setMenu('closedOrders')}>Closed Orders</button></li>
                                    </ul>
                                </li>
                            </>
                        )}
                {role.includes('admin')&& (
                    <>
                        <li className='mt-4'><button className="flex gap-2" onClick={()=>toggleSidebar('staff')}><UserGroupIcon className="w-8"/><span>Staff</span></button></li>
                            <ul className={`text-gray-300 text-lg transition-all duration-500 ease-in-out overflow-hidden ${activeSidebar === 'staff' ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                                <li className={`${activeSidebar === 'staff' ? 'opacity-100' : 'opacity-0 transition-opacity duration-500 ease-in-out delay-300'}`}><button onClick={()=>setMenu('allStaff')}>All Staff</button></li>
                                <li className={`${activeSidebar === 'staff' ? 'opacity-100' : 'opacity-0 transition-opacity duration-500 ease-in-out delay-300'}`}><button onClick={()=>setMenu('addStaff')}>Add Staff</button></li>
                            </ul>
                    </>
                )}
                    </ul>
            </div>
        </div>
    );
}
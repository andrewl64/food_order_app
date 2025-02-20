import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Main from './Main';
import { SidebarProvider } from '@/store/sidebar-context';
import { CartProvider } from '@/store/cart-context';
import Sidebar from '@/Layouts/Sidebar';

export default function Dashboard() {
    return (
        <SidebarProvider>
            <CartProvider>
                <AuthenticatedLayout>
                    <Sidebar />
                    <Head title="Dashboard" />
                    <Main />
                </AuthenticatedLayout>
            </CartProvider>
        </SidebarProvider>
    );
}

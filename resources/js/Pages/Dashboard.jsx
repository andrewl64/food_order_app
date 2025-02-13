import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import AdminDash from './Admin/App';
import CustomerDash from './Customer/App';

export default function Dashboard() {
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <AdminDash />
            
        </AuthenticatedLayout>
    );
}

import AuthenticatedAdminLayout from '@/Layouts/AuthenticatedAdminLayout';
import { Head } from '@inertiajs/react';
import AdminDash from './Admin/App';
import CustomerDash from './Customer/App';

export default function Dashboard() {
    return (
        <AuthenticatedAdminLayout>
            <Head title="Dashboard" />
            <AdminDash />
        </AuthenticatedAdminLayout>
    );
}

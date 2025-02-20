import { useContext, useState } from "react";
import { usePage } from "@inertiajs/react";
import { MenuContext } from '@/store/menu-context';
import Modal from '@/Components/Modal';
import CustDash from '@/Components/Customer/CustDash';



export default () => {
    const propDat = usePage().props;
    const isCustomer = propDat.auth.rolenames.length === 0;
    const menuCtx = useContext(MenuContext);

    return (
        <>
        {isCustomer && (
            <CustDash />
        )}

        {!isCustomer && (
            <h2 className="text-center">Welcome Staff</h2>
        )}
        </>
    );
}
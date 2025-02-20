<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\PermissionRegistrar;
use Illuminate\Support\Facades\DB;

use App\Models\User;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        // Truncate tables related to roles and permissions
        DB::table('role_has_permissions')->delete();
        DB::table('model_has_roles')->delete();
        DB::table('model_has_permissions')->delete();
        DB::table('roles')->delete();
        DB::table('permissions')->delete();

        User::with('roles')->get()->each(function ($user) {
            $user->roles()->detach();
        });

        $role_admin = Role::create(['name' => 'admin']);
        $role_manager = Role::create(['name' => 'manager']);
        $role_cashier = Role::create(['name' => 'cashier']);

        $permission_create_menu_items = Permission::create(['name' => 'create menu items']);
        $permission_read_menu_items = Permission::create(['name' => 'read menu items']);
        $permission_update_menu_items = Permission::create(['name' => 'update menu items']);
        $permission_delete_menu_items = Permission::create(['name' => 'delete menu items']);
        $permission_restore_menu_items = Permission::create(['name' => 'restore menu items']);
        $permission_force_delete_menu_items = Permission::create(['name' => 'force delete menu items']);

        $role_manager->givePermissionTo([$permission_create_menu_items, $permission_read_menu_items, $permission_update_menu_items, $permission_delete_menu_items,$permission_restore_menu_items, $permission_force_delete_menu_items]);
        $role_cashier->givePermissionTo($permission_read_menu_items);

        User::find(1)->assignRole($role_admin);

    }
}

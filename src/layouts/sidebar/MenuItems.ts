export interface MenuItems {
  title: string;
  icon: string;
  href: string;
  roles: string[];
}

const Menuitems: MenuItems[] = [
  {
    title: 'Expenses',
    icon: 'trending-down',
    href: '/',
    roles: ['admin', 'user'],
  },
  {
    title: 'Incomes',
    icon: 'trending-up',
    href: '/incomes',
    roles: ['admin', 'user'],
  },
  {
    title: 'Categories',
    icon: 'grid',
    href: '/categories',
    roles: ['admin'],
  },
  {
    title: 'Manage Your Family',
    icon: 'users',
    href: '/manage-family',
    roles: ['admin'],
  },
];

export default Menuitems;

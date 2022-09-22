export interface MenuItems {
  title: string;
  icon: string;
  href: string;
}

const Menuitems: MenuItems[] = [
  {
    title: 'Expenses',
    icon: 'dollar-sign',
    href: '/',
  },
  {
    title: 'Categories',
    icon: 'grid',
    href: '/categories',
  },
  {
    title: 'Manage Your Family',
    icon: 'users',
    href: '/manage-family',
  },
];

export default Menuitems;

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
];

export default Menuitems;

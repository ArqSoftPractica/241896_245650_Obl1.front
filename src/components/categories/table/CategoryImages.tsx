interface CategoryImage {
  name: string;
  src: string;
}

const categoryImages: CategoryImage[] = [
  {
    name: 'Transport',
    src: '/static/images/categories/transport.jpeg',
  },
  {
    name: 'Food',
    src: '/static/images/categories/food.jpeg',
  },
  {
    name: 'Entertainment',
    src: '/static/images/categories/entertainment.jpeg',
  },
  {
    name: 'Clothing',
    src: '/static/images/categories/clothing.jpg',
  },
  {
    name: 'Health',
    src: '/static/images/categories/health.jpeg',
  },
  {
    name: 'Education',
    src: '/static/images/categories/education.jpeg',
  },
  {
    name: 'Travel',
    src: '/static/images/categories/travel.jpeg',
  },
  {
    name: 'Home',
    src: '/static/images/categories/home.jpeg',
  },
];

export const getCategoryImagePath = (name: string): string => {
  const categoryImage = categoryImages.find((category) => category.name === name);
  return categoryImage ? categoryImage.src : '';
};

export default categoryImages;

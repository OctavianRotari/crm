import Products from "../app/scenes/Products";
import Product from "../app/scenes/Product";

const routes = [
  {
    path: "/products",
    component: Products,
    layout: false,
    exact: true,
  },
  {
    path: "/product/:id",
    component: Product,
    layout: false,
    exact: true,
  },
];

export default routes;

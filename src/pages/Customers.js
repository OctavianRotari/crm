import Customers from "../app/scenes/Customers";
import Customer from "../app/scenes/Customer";

const routes = [
  {
    path: "/customers",
    component: Customers,
    layout: false,
    exact: true,
  },
  {
    path: "/customer/:id",
    component: Customer,
    layout: false,
    exact: true,
  },
];

export default routes;

// import BlogListing from "../app/components/blog";
// import BlogPost from "../app/components/blog/post";
// import DefaultLayout from "../app/components/layout";

// const routes = [
//   {
//     path: "/blog",
//     exact: true,
//     layout: DefaultLayout,
//     component: BlogListing,
//     preLoadData: async ({ api }) => {
//       return api.fetch("https://www.atyantik.com/wp-json/wp/v2/posts", { swcache: 20000 });
//     },
//   },
//   {
//     path: "/blog/:id",
//     layout: DefaultLayout,
//     component: BlogPost,
//     preLoadData: async ({match, api}) => {
//       const { params } = match;
//       return api.fetch(`https://www.atyantik.com/wp-json/wp/v2/posts/${params.id}`, { swcache: 20000 });
//     },
//   }
// ];

// export default routes;

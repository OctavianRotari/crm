// @flow
import Activity from "../app/scenes/Activity";
// import DefaultLayout from "../app/components/layout";
// import AboutSection from "../app/components/about/section";

const routes = [
  {
    path: "/activity",
    component: Activity,
    layout: false,
    exact: true,
  }
];

export default routes;

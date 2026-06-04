import {
  analytics,
  billing,
  operations,
  overview as overviewSeed,
  publicMenu,
  reservations,
  staff,
} from "../data/seed.js";
import { getKitchenBoard } from "../repositories/kitchenRepository.js";
import { getAllMenu } from "../repositories/menuRepository.js";
import { getAllOrders } from "../repositories/orderRepository.js";

export function getOverview() {
  const orders = getAllOrders();
  const menu = getAllMenu();
  const orderCount = orders.length;
  const inStock = menu.filter((item) => item.status === "In Stock").length;

  return {
    ...overviewSeed,
    stats: overviewSeed.stats.map((stat) => {
      if (stat.label === "Total orders") {
        return {
          ...stat,
          value: String(Math.max(orderCount, 318)),
          delta: orderCount > 0 ? `+${orderCount} live` : stat.delta,
        };
      }

      if (stat.label === "Daily revenue") {
        const revenue = orders.reduce((sum, order) => sum + order.total, 0);
        return {
          ...stat,
          value: revenue > 0 ? `$${revenue.toFixed(2)}` : stat.value,
        };
      }

      return stat;
    }),
    activity: [
      ...orders.slice(0, 2).map((order) => ({
        title: `New Order ${order.id}`,
        meta: `${order.fulfillment} · $${order.total.toFixed(2)}`,
        time: "just now",
        icon: "cart",
        tone: "mint",
      })),
      ...overviewSeed.activity,
    ].slice(0, 6),
    meta: { menuInStock: inStock, menuTotal: menu.length },
  };
}

export function getAnalytics() {
  return analytics;
}

export function getStaff() {
  return staff;
}

export function getBilling() {
  return billing;
}

export function getReservations() {
  return reservations;
}

export function getOperations() {
  return operations;
}

export function getPublicMenu() {
  return publicMenu;
}

export function getAppBundle() {
  return {
    overview: getOverview(),
    menu: getAllMenu(),
    operations: getOperations(),
    kitchen: getKitchenBoard(),
    analytics: getAnalytics(),
    staff: getStaff(),
    billing: getBilling(),
    reservations: getReservations(),
    publicMenu: getPublicMenu(),
    orders: getAllOrders(),
  };
}

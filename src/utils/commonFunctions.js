export const cartEvents = {
  refresh: () => document.dispatchEvent(new Event("cartUpdated")),
};

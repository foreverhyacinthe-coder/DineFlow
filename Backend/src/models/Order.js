export class Order {
  constructor(data) {
    this.id = data.id;
    this.status = data.status || "received";
    this.fulfillment = data.fulfillment || "Pickup";
    this.items = data.items || [];
    this.total = Number(data.total || 0);
    this.createdAt = data.createdAt || new Date().toISOString();
    this.userId = data.userId || null;
  }

  toJSON() {
    return { ...this };
  }
}

export class MenuItem {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.shortName = data.shortName || data.name;
    this.category = data.category || "Mains";
    this.price = Number(data.price);
    this.margin = data.margin ?? 50;
    this.orders = data.orders ?? 0;
    this.satisfaction = data.satisfaction ?? 0;
    this.rating = data.rating ?? 4.8;
    this.status = data.status || "In Stock";
    this.description = data.description || "";
    this.image = data.image || "";
    this.prepTime = data.prepTime;
    this.taxRate = data.taxRate;
  }

  toJSON() {
    return { ...this };
  }
}

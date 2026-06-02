export class User {
  constructor({
    id,
    name,
    email,
    passwordHash,
    role = "Manager",
    restaurant = "",
    createdAt = new Date().toISOString(),
  }) {
    this.id = id;
    this.name = name;
    this.email = email.toLowerCase();
    this.passwordHash = passwordHash;
    this.role = role;
    this.restaurant = restaurant;
    this.createdAt = createdAt;
  }

  toPublic() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      role: this.role,
      restaurant: this.restaurant,
      createdAt: this.createdAt,
    };
  }
}

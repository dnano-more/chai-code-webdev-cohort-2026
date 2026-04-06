# 🛍️ Instagram Thrift Creator Store – ER Diagram

This project represents the database design for a small Instagram-based thrift and handmade product store. The system is designed to scale from handling orders via DMs/WhatsApp to a structured backend.

---

## 📌 Problem Overview

The store sells:
- Thrift items (usually unique, single piece)
- Handmade products (can have multiple units)

As the business grows, it needs to:
- Manage products and inventory
- Track customer orders
- Handle payments
- Manage shipping and delivery

---

## 🧠 Design Approach

This is not treated as a basic shop system.

Key decisions:
- Products are separated from variants (size, color, condition)
- Inventory is handled at the variant level
- Orders support multiple items
- Payment and shipping are handled separately

---

## 🧱 Entities

- Customers
- Products
- Product_Variants
- Orders
- Order_Items
- Payments
- Shipping

---

## 🔗 Relationships

- One customer can place multiple orders
- One order can contain multiple items
- Each order item is linked to a product variant
- One product can have multiple variants
- One order can have a payment record (optional)
- One order can have a shipping record (optional)

---

## ⚙️ Important Design Decisions

### 1. Product vs Variant Separation
- Products store general info
- Product_Variants store:
  - size
  - color
  - condition
  - stock quantity

Thrift items:
- stock_quantity = 1
- is_unique = true

Handmade items:
- stock_quantity > 1
- is_unique = false

---

### 2. Order_Items as Junction Table
Handles many-to-many relationship between:
- Orders
- Product Variants

Also stores:
- quantity
- price at purchase

---

### 3. Flexible Order Flow
- Payment can be pending
- Shipping may not exist initially

---

## 📊 ER Diagram Links

Excalidraw:
https://excalidraw.com/#json=gSqbonQp4Ol9JZ4W4_H3-,RI_J7Je7JA1RjXM_rmjuqg

Mermaid Live:
https://mermaid.ai/live/edit#pako:eNqdVdtu4jAQ_ZXIz7RqQyg0b6iXXVTRIkpX2hVSNI2nxGpip750lwL_vg4JAeIgrTYvsed6ZnzGXpFYUCQhQXnLYCEhm3PPfjcvz7On8d302Vuvz87Eynua3ha70MtTiFGVVpWwMFlXJtFodjcu7GLBNTBeWU6mT7cvN7Pox3A6Gj7OjsPWPkYhjRg_cqlNnRChl4ALRKy9yfDn-K60UKh1iq1Wz99Hk8no8Zu1opiyT5TWrFn9qhQUH-Pai43SIkMZMepNHvY6pSXjC48togQ4TdHR_E5AK8jziJvsFaWjfzNpGnHIXE-gVKJSezkFjZpl6MUS7ZJGoEvlZt7sXAN9LgU1sT4BvjU7RRVLlmsmuKOLbfaFkEtHscujl_lBxLdUgPZeQWGUSxbjf1S0P_tGZZ8gGXCnskbR927Rin25RcciFbJFyik7bkQR3xIifo8-jE3P9EEvXoVIEbjHVGQ4-zDYKKkiY6MQIanLribzDusoeld5FUsHdalSGrRRbQiq2WuHoTFrw1KDvH84eQxNldugkg-2N_qQD_sj3w1xk8SwzLD9qFtxlWkgE4ZrpzsZ6kRQlxUH7Toi6C75vtU13vo6aeBVCctzG_SfAZ-a-5qGRjLr1TquWkL8XiQ7cc2cLGyL0k7eMYdqdXVBHhlsih_pkIVklIRaGuwQS9AMii3ZdmFOdIIWJgntkoJ8n5M531ifHPgvIbKdmxRmkZDwDVJldyYvklTPUS2VyG2zbopjJGEv8LdBSLgif0jY7fnng4uLoDvwLwfXwbUfdMiShH7__GrQ7132rOTKD_xef9MhX9u8F-eDIBh0g343uLR-VtchaMdbyHH5Hm6fxc1fu1AsWg

---

## 🧾 Notes

- Normalized database design
- Avoids redundant data
- Scalable for future features like:
  - discounts
  - returns
  - analytics

---

## 🚀 Conclusion

This database design reflects a real-world Instagram thrift business transitioning into a structured system.

It is simple enough for a small creator while being scalable for growth.

---

## 👨‍💻 Author

Built as part of a backend/database design learning exercise.
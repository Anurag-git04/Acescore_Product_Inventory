# Acescore Product Inventory

**Live Demo:** [Explore the app on Vercel](https://acescore-product-inventory.vercel.app/)  
**Repository:** [GitHub Source Code](https://github.com/Anurag-git04/Acescore_Product_Inventory)

---

## 📌 Overview

Acescore Product Inventory is a React + Redux Toolkit application that manages an inventory of products with full CRUD capabilities. The app interfaces with a mock API (Fakestore API) to fetch, add, edit, and delete products, while providing a smooth user experience.

---

## ✨ Key Features

- **API Integration**  
  Interacts with the mock API to handle Create, Read, Update, and Delete operations. Supports loading and error states.

- **Product Listing**  
  Displays products with their image, name, price, and stock status in a responsive grid layout.

- **Add / Edit Products**  
  Use a form (embedded in a clean modal UI) to add new products or update existing ones.

- **Delete Products**  
  Remove products cleanly with confirmation and state updates.

- **Search & Filter**  
  Filter products by name and category using intuitive search and dropdown controls.

- **Redux Architecture**  
  Built with Redux Toolkit—including slices, async thunks, and selectors.

- **State Persistence (Bonus)**  
  Inventory state persists in `localStorage`, making product data available even after page refreshes.

- **Enhanced UI**  
  Leveraged Bootstrap for responsive design, including form styling, grid layout, and modals.

---

## 🖥 Demo

Experience the live app here:  
[https://acescore-product-inventory.vercel.app/](https://acescore-product-inventory.vercel.app/)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 +)
- npm or yarn

### Running Locally
```bash
git clone https://github.com/Anurag-git04/Acescore_Product_Inventory.git
cd Acescore_Product_Inventory
npm install
npm start
# or if using yarn:
# yarn && yarn start
```
## 📂 Folder Structure
```plain text
src/
├─ api/
│   └── productsApi.ts         # API calls to mock product endpoints
├─ app/
│   └── store.ts               # Redux store configuration
├─ features/
│   └── products/
│       ├── productsSlice.ts   # Redux slice with async thunks
│       ├── ProductList.tsx    # Search, filter, and list display
│       ├── ProductCard.tsx    # Individual product component
│       └── ProductForm.tsx    # Bootstrap-styled form for Add/Edit
├─ utils/
│   └── localStorage.ts        # Helpers for state persistence
├─ types.ts                    # TypeScript types (e.g., Product)
├─ App.tsx                     # Main app component with modal logic
├─ main.tsx                    # Root render, includes Redux provider
└─ index.css                   # App-wide styles

---
```
## 🛠 Technologies
- **React (TypeScript)**
- **Redux Toolkit**
- **Axios** (API requests)
- **Fakestore API** (mock backend)
- **Bootstrap** (UI design)
- **Vercel** (deployment)
- **localStorage** (state persistence)

---

## 🔮 Future Enhancements
- Add sorting options (e.g., by price or name)
- Add more product detail views or pagination
- Improve error handling with toast notifications
- Add form validation, image preview, and drag-and-drop uploads
- Integrate real backend for live inventory sync
- Secure data via user authentication

---

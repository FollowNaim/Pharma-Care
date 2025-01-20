# Pharma Care

Pharma Care is a comprehensive e-commerce platform designed to sell pharmacy products and medicines with a user-friendly interface for buyers, sellers, and administrators. This project offers an extensive set of features, including dashboards for users, sellers, and admins, robust payment management, and advanced reporting tools.

## **Showcasing Excellence in Healthcare Solutions** - Explore. Select. Simplify.

<img src='https://github.com/Programming-Hero-Web-Course4/b10a12-client-side-FollowNaim/blob/master/pharmacare.jpg?raw=true'/>

## **Live Website**

- **URL**: [Pharma Care Website](https://pharmacares.vercel.app)

## **Admin Login Details**

- **Email**: admin@pharmacare.com
- **Password**: admin123

## **Seller Login Details**

- **Email**: seller@pharmacare.com
- **Password**: seller123

---

## **Features Overview**

### **General Features**

1. **User Registration and Authentication**

   - Sign up with roles (`User` or `Seller`) and social login options (Google).
   - Role-based access to features.

2. **Shop Page**

   - Browse all medicines with sorting, searching, and pagination capabilities.
   - Add medicines to the cart or view details via a modal popup.

3. **Category Details Page**

   - Filter medicines by category (e.g., Tablets, Syrups, Capsules).
   - View and select medicines for purchase.

4. **Cart Management**

   - Modify selected items, update quantities, or clear the cart.
   - Navigate to the checkout page for payment.

5. **Checkout and Invoice Generation**
   - Pay securely via Stripe.
   - Download detailed invoices as PDF after payment.

---

## **Admin Dashboard Features**

1. **Homepage Insights**

   - With nice visualization chart View total sales revenue with `Paid`, `Pending` and `Rejected` summaries.

2. **User Management**

   - Upgrade users to sellers or admins and downgrade sellers to users.

3. **Category Management**

   - Add, edit, and delete medicine categories with a user-friendly modal form.

4. **Payment Management**

   - Manage payments and update statuses from `Pending` to `Paid` or `Reject`.

5. **Sales Reports**

   - Filter data based on date range and export sales data in XLSX format.

6. **Advertisement Management**
   - Approve or reject medicine advertisements for homepage sliders.

---

## **Seller Dashboard Features**

1. **Homepage Statistics**

   - With nice visualization chart View revenue from medicines sold (`Paid`, `Pending` and `Rejected` breakdowns).

2. **Manage Medicines**

   - Add new medicines with details like name, category, price, and discounts.
   - Edit or delete existing medicines and view in tabular format.

3. **Payment History**

   - Track purchase transactions with `Paid` or `Pending` statuses.

4. **Advertisement Requests**
   - Submit advertisements with images and descriptions.
   - Monitor the status of advertisements (approved/rejected).

---

## **User Features**

1. **Payment History**

   - Access all transaction details, including `Paid` and `Pending` statuses.

2. **Invoice Management**

   - Download invoices for completed purchases.

3. **Cart Management**

   - Modify selected medicines, adjust quantities, or clear the cart.

4. **Browsing and Selection**
   - Seamlessly explore and choose medicines based on categories.

---

## **Other Features**

- Implemented **pagination**, **search**, and **sorting** shop tables.
- Secure **JWT token-based authentication** with local storage.
- Export sales reports in XLSX format.
- Download invoice in PDF format.
- Integrated **React Hook Form** for efficient form handling.
- Used **React Helmet** for dynamic page metadata management.

---

## **Technology Stack**

- **Frontend**: React, Tailwind CSS, Shadcn, Context API, Firebase Authentication, Stripe Payment Gateway.
- **Backend**: Node.js, Express, MongoDB.

## Dependencies

Below is a list of all the dependencies and their respective versions used in the Pharma Care project:

### **Dependencies**

- `@ag-media/react-pdf-table`: ^2.0.1
- `@hookform/resolvers`: ^3.10.0
- `@leenguyen/react-flip-clock-countdown`: ^1.6.0
- `@radix-ui/react-avatar`: ^1.1.2
- `@radix-ui/react-dialog`: ^1.1.4
- `@radix-ui/react-dropdown-menu`: ^2.1.4
- `@radix-ui/react-label`: ^2.1.1
- `@radix-ui/react-navigation-menu`: ^1.2.3
- `@radix-ui/react-popover`: ^1.1.4
- `@radix-ui/react-select`: ^2.1.4
- `@radix-ui/react-separator`: ^1.1.1
- `@radix-ui/react-slot`: ^1.1.1
- `@radix-ui/react-tooltip`: ^1.1.6
- `@react-pdf/renderer`: ^4.1.6
- `@stripe/react-stripe-js`: ^3.1.1
- `@stripe/stripe-js`: ^5.5.0
- `@tanstack/react-query`: ^5.64.1
- `axios`: ^1.7.9
- `class-variance-authority`: ^0.7.1
- `clsx`: ^2.1.1
- `cmdk`: ^1.0.0
- `firebase`: ^11.1.0
- `lucide-react`: ^0.471.1
- `react`: ^18.3.1
- `react-day-picker`: ^8.10.1
- `react-dom`: ^18.3.1
- `react-export-table-to-excel`: ^1.0.6
- `react-helmet-async`: ^2.0.5
- `react-hook-form`: ^7.54.2
- `react-hot-toast`: ^2.5.1
- `react-icons`: ^5.4.0
- `react-router-dom`: ^7.1.1
- `recharts`: ^2.15.0
- `sweetalert2`: ^11.15.10
- `swiper`: ^11.2.1
- `tailwind-merge`: ^2.6.0
- `tailwindcss-animate`: ^1.0.7
- `zod`: ^3.24.1

---

### **Dev Dependencies**

- `@eslint/js`: ^9.17.0
- `@types/node`: ^22.10.5
- `@types/react`: ^18.3.18
- `@types/react-dom`: ^18.3.5
- `@vitejs/plugin-react`: ^4.3.4
- `autoprefixer`: ^10.4.20
- `eslint`: ^9.17.0
- `eslint-plugin-react`: ^7.37.2
- `eslint-plugin-react-hooks`: ^5.0.0
- `eslint-plugin-react-refresh`: ^0.4.16
- `globals`: ^15.14.0
- `postcss`: ^8.4.49
- `tailwindcss`: ^3.4.17
- `vite`: ^6.0.5

Enjoy exploring **Pharma Care**!

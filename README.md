# Pharma Care

Pharma Care is a comprehensive e-commerce platform designed to sell pharmacy products and medicines with a user-friendly interface for buyers, sellers, and administrators. This project offers an extensive set of features, including dashboards for users, sellers, and admins, robust payment management, and advanced reporting tools.

## **Live Website**

- **URL**: [Pharma Care Website](https://pharmacares.vercel.app)

## **Admin Login Details**

- **Email**: admin@pharmacare.com
- **Password**: admin123

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

## **User Dashboard Features**

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

Enjoy exploring **Pharma Care**!

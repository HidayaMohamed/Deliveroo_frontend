# Deliveroo - Frontend

A modern parcel delivery management system built with React, Vite, and Tailwind CSS.

## Features

-  **Lightning Fast** - Built with Vite for optimal performance
-  **Modern UI** - Beautiful interfaces with Tailwind CSS
-  **Secure Authentication** - JWT-based authentication system
-  **Responsive Design** - Works on all devices
-  **Role-Based Access** - Admin, Courier, and Customer dashboards

## Tech Stack

- **Framework:** React 18
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router v6
- **HTTP Client:** Axios
- **Animations:** Framer Motion
- **Icons:** Lucide React

## Project Structure

```
frontend/
├── public/
│   └── vite.svg
├── src/
│   ├── api/              # API integration
│   │   ├── admin.js
│   │   ├── auth.js
│   │   ├── axios.js
│   │   ├── courier.js
│   │   ├── fetchWrapper.js
│   │   ├── orders.js
│   │   └── payments.js
│   ├── components/       # Reusable components
│   │   ├── Footer.jsx
│   │   ├── Navbar.jsx
│   │   ├── NotificationToast.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── PublicRoute.jsx
│   │   └── Sidebar.jsx
│   ├── features/         # Feature-based modules
│   │   ├── admin/
│   │   │   ├── AllOrders.jsx
│   │   │   ├── AllUsers.jsx
│   │   │   ├── AssignCourier.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── auth/
│   │   │   ├── AuthContext.jsx
│   │   │   └── useAuth.js
│   │   ├── courier/
│   │   │   ├── AssignedOrders.jsx
│   │   │   ├── RiderPortal.jsx
│   │   │   ├── StatsCard.jsx
│   │   │   └── UpdateLocation.jsx
│   │   ├── orders/
│   │   │   ├── CreateOrder.jsx
│   │   │   ├── MyOrders.jsx
│   │   │   ├── OrderCard.jsx
│   │   │   ├── OrderDetails.jsx
│   │   │   └── OrdersList.jsx
│   │   ├── payments/
│   │   │   └── Checkout.jsx
│   │   └── user/
│   │       └── UserProfile.jsx
│   ├── pages/            # Page components
│   │   ├── AdminDashboard.jsx
│   │   ├── CourierDashboard.jsx
│   │   ├── CustomerDashboard.jsx
│   │   ├── Landing.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── RiderProfile.jsx
│   │   └── Unauthorized.jsx
│   ├── routes/          # Route definitions
│   │   └── AppRoutes.jsx
│   ├── utils/           # Utility functions
│   │   └── token.js
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── eslint.config.js
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

4. Start the development server:

```bash
npm run dev
```

5. Open your browser at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## User Roles

### Admin

- Access to complete dashboard with analytics
- Manage all orders (create, assign, update status)
- Manage users (view, deactivate)
- View system statistics and performance metrics

### Courier

- View assigned orders
- Update order status
- Update delivery location
- View personal stats

### Customer

- Create new delivery orders
- View order history
- Track order status
- Manage profile

## API Integration

The frontend communicates with the backend REST API. All API calls are handled through the `fetchWrapper` utility which:

- Automatically adds JWT token to requests
- Handles authentication errors (401)
- Manages error messages
- Supports JSON and FormData

### Example API Usage

```javascript
import { get, post } from "./api/fetchWrapper";

// GET request
const users = await get("/admin/users");

// POST request
const order = await post("/orders", { pickup_address, destination_address });
```

## Environment Variables

| Variable       | Description     | Default                     |
| -------------- | --------------- | --------------------------- |
| `VITE_API_URL` | Backend API URL | `http://localhost:5000/api` |

## Building for Production

```bash
npm run build
```

The build output will be in the `dist` folder, ready for deployment.

## Deployment

### Static Hosting (Netlify, Vercel, etc.)

1. Build the project:

```bash
npm run build
```

2. Deploy the `dist` folder to your hosting provider

3. Configure environment variables in your hosting dashboard

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
FROM nginx:alpine
COPY --from=0 /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

export default function AdminDashboard() {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <ul>
        <li>Manage Products</li>
        <li>Manage Orders</li>
        <li>Manage Inventory</li>
      </ul>
    </div>
  );
}
<Route path="/admin"
  element={
    <ProtectedRoute role="admin">
      <AdminDashboard />
    </ProtectedRoute>
  }
/>

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import API from "../../api/api";

import Link from "next/link";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Assuming the backend has a /auth/token endpoint that returns { access_token: "..." }
      // Adjust the endpoint and payload based on your actual backend implementation
      const response = await API.post("/auth/token", new URLSearchParams({
        username: username,
        password: password,
      }), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });

      const token = response.data.access_token;
      localStorage.setItem("token", token);
      router.push("/orders"); // Redirect to orders after login
    } catch (err) {
      console.error("Login failed:", err);
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Login</h2>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <button type="submit" style={{ padding: '10px', backgroundColor: '#3498db', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Login
        </button>
      </form>
      <p style={{ textAlign: 'center', marginTop: '15px' }}>
        Don't have an account? <Link href="/signup" style={{ color: '#3498db' }}>Sign Up</Link>
      </p>
    </div>
  );
}

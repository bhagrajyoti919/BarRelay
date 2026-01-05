"use client";
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav style={{ 
      padding: '1rem 2rem', 
      background: '#2c3e50', 
      color: '#ecf0f1', 
      display: 'flex', 
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
    }}>
      <div style={{ fontWeight: 'bold', fontSize: '1.5rem', letterSpacing: '1px' }}>
        <Link href="/" style={{ color: 'white', textDecoration: 'none' }}>
          🍾 SpiritsDelivered
        </Link>
      </div>
      <div>
        <Link href="/" style={{ margin: '0 15px', color: '#ecf0f1', textDecoration: 'none', fontSize: '1.1rem' }}>Home</Link>
        <Link href="/products" style={{ margin: '0 15px', color: '#ecf0f1', textDecoration: 'none', fontSize: '1.1rem' }}>Shop</Link>
        <Link href="/orders" style={{ margin: '0 15px', color: '#ecf0f1', textDecoration: 'none', fontSize: '1.1rem' }}>Orders</Link>
        <Link href="/login" style={{ margin: '0 15px', color: '#ecf0f1', textDecoration: 'none', fontSize: '1.1rem' }}>Login</Link>
      </div>
    </nav>
  );
}

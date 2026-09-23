import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const formatPrice = (price) => new Intl.NumberFormat('vi-VN').format(price);

function App() {
  const [catalog, setCatalog] = useState(null);
  const [category, setCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError('');
    fetch(`/api/catalog?category=${encodeURIComponent(category)}`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error('Không thể tải sản phẩm. Vui lòng thử lại.');
        return response.json();
      })
      .then((data) => { setCatalog(data); setLoading(false); })
      .catch((err) => {
        if (err.name !== 'AbortError') { setError(err.message); setLoading(false); }
      });
    return () => controller.abort();
  }, [category, attempt]);

  return (
    <main className="storefront">
      <section className="catalog" aria-labelledby="catalog-title">
        <aside className="sidebar">
          <h1 id="catalog-title"><span className="category-icon"><img src="/api/images/heart" alt="" /></span>MỸ PHẨM</h1>
          <nav aria-label="Danh mục mỹ phẩm">
            {catalog?.categories.map((item) => (
              <button key={item.id} className={category === item.id ? 'active' : ''}
                aria-pressed={category === item.id} onClick={() => setCategory(item.id)}>{item.name}</button>
            ))}
          </nav>
        </aside>

        <div className="products" aria-live="polite" aria-busy={loading}>
          {loading ? <div className="state-message">Đang tải sản phẩm…</div> : error ? (
            <div className="state-message" role="alert"><p>{error}</p><button className="retry" onClick={() => setAttempt((n) => n + 1)}>Thử lại</button></div>
          ) : catalog?.products.length === 0 ? (
            <div className="state-message">Chưa có sản phẩm trong danh mục này.</div>
          ) : catalog?.products.map((product) => (
            <article className="product" key={product.id}>
              <div className="product-visual">
                <span className="badge">{product.badge}</span>
                <img src={product.image} alt={product.name} width="550" height="550" />
              </div>
              <div className="product-info">
                <h2>{product.name}</h2>
                <p className="prices"><span className="price">{formatPrice(product.price)}<u>đ</u></span>
                  {product.originalPrice && <del>{formatPrice(product.originalPrice)}đ</del>}
                </p>
              </div>
            </article>
          ))}
        </div>

        <aside className="promotion" aria-label="Bộ sưu tập Cosmetics Nature Products">
          {catalog && <img src={catalog.banner} alt="Cosmetics — Nature Products" width="352" height="550" />}
        </aside>
      </section>
      <footer className="brands" aria-label="Thương hiệu đối tác">
        {catalog?.brands.map((brand) => <img key={brand.id} src={brand.image} alt={brand.name} />)}
      </footer>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
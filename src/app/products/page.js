'use client'
import { useState } from 'react';

export default function Products() {
  // Тестовые данные
  const initialProducts = [
    { id: 1, name: 'Ноутбук', price: 50000, category: 'Электроника', stock: 10 },
    { id: 2, name: 'Смартфон', price: 25000, category: 'Электроника', stock: 15 },
    { id: 3, name: 'Наушники', price: 5000, category: 'Аксессуары', stock: 20 },
    { id: 4, name: 'Клавиатура', price: 3000, category: 'Аксессуары', stock: 30 },
    { id: 5, name: 'Мышь', price: 1500, category: 'Аксессуары', stock: 25 },
  ];

  // Состояние для хранения товаров
  const [products, setProducts] = useState(initialProducts);

  // Состояние для формы добавления товара
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: 'Электроника',
    stock: '',
  });

  // Обработчик добавления товара
  const handleAddProduct = (e) => {
    e.preventDefault();
    const product = {
      id: products.length + 1,
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      category: newProduct.category,
      stock: parseInt(newProduct.stock),
    };
    setProducts([...products, product]);
    setNewProduct({ name: '', price: '', category: 'Электроника', stock: '' }); // Очистка формы
  };

  // Обработчик удаления товара
  const handleDeleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  // Обработчик смены категории
  const handleChangeCategory = (id, newCategory) => {
    setProducts(
      products.map((product) =>
        product.id === id ? { ...product, category: newCategory } : product
      )
    );
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Список товаров</h1>

      {/* Форма добавления товара */}
      <form
        onSubmit={handleAddProduct}
        style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}
      >
        <input
          type="text"
          placeholder="Название товара"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          required
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
        />
        <input
          type="number"
          placeholder="Цена"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          required
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
        />
        <select
          value={newProduct.category}
          onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
        >
          <option value="Электроника">Электроника</option>
          <option value="Аксессуары">Аксессуары</option>
        </select>
        <input
          type="number"
          placeholder="Остаток"
          value={newProduct.stock}
          onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
          required
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
        />
        <button
          type="submit"
          style={{
            padding: '8px 16px',
            backgroundColor: '#007BFF',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Добавить товар
        </button>
      </form>

      {/* Таблица товаров */}
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px',
          overflow: 'hidden',
        }}
      >
        <thead>
          <tr style={{ backgroundColor: '#007BFF', color: '#fff' }}>
            <th style={{ padding: '12px', textAlign: 'left' }}>ID</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Название</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Категория</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Цена (руб.)</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Остаток</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Действия</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr
              key={product.id}
              style={{
                borderBottom: '1px solid #ddd',
                backgroundColor: product.stock < 15 ? '#FFF3CD' : '#fff',
              }}
            >
              <td style={{ padding: '12px' }}>{product.id}</td>
              <td style={{ padding: '12px' }}>{product.name}</td>
              <td style={{ padding: '12px' }}>
                <select
                  value={product.category}
                  onChange={(e) => handleChangeCategory(product.id, e.target.value)}
                  style={{ padding: '6px', borderRadius: '4px', border: '1px solid #ddd' }}
                >
                  <option value="Электроника">Электроника</option>
                  <option value="Аксессуары">Аксессуары</option>
                </select>
              </td>
              <td style={{ padding: '12px' }}>{product.price}</td>
              <td style={{ padding: '12px' }}>{product.stock}</td>
              <td style={{ padding: '12px' }}>
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  style={{
                    padding: '6px 12px',
                    backgroundColor: '#dc3545',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Удалить
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
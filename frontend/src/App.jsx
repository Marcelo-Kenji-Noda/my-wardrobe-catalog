import React, { useState, useEffect } from 'react';
import './App.css';

const API_URL = 'http://localhost:5000/api';

function App() {
  const [clothes, setClothes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [filterCategory, setFilterCategory] = useState('');
  const [filterSeason, setFilterSeason] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    color: '',
    brand: '',
    size: '',
    season: '',
    image_url: '',
    notes: ''
  });

  const categories = ['Tops', 'Bottoms', 'Dresses', 'Outerwear', 'Shoes', 'Accessories'];
  const seasons = ['Spring', 'Summer', 'Fall', 'Winter', 'All Season'];

  useEffect(() => {
    fetchClothes();
  }, [filterCategory, filterSeason]);

  const fetchClothes = async () => {
    try {
      setLoading(true);
      let url = `${API_URL}/clothes`;
      const params = new URLSearchParams();
      if (filterCategory) params.append('category', filterCategory);
      if (filterSeason) params.append('season', filterSeason);
      if (params.toString()) url += `?${params.toString()}`;

      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch clothes');
      const data = await response.json();
      setClothes(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingItem
        ? `${API_URL}/clothes/${editingItem.id}`
        : `${API_URL}/clothes`;
      const method = editingItem ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to save item');

      resetForm();
      fetchClothes();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    try {
      const response = await fetch(`${API_URL}/clothes/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete item');

      fetchClothes();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name || '',
      category: item.category || '',
      color: item.color || '',
      brand: item.brand || '',
      size: item.size || '',
      season: item.season || '',
      image_url: item.image_url || '',
      notes: item.notes || ''
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: '',
      color: '',
      brand: '',
      size: '',
      season: '',
      image_url: '',
      notes: ''
    });
    setEditingItem(null);
    setShowForm(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>👔 My Wardrobe Catalog</h1>
        <p>Organize your clothing collection</p>
      </header>

      <div className="container">
        {/* Controls */}
        <div className="controls">
          <button 
            className="btn btn-primary"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Cancel' : '+ Add Item'}
          </button>

          <div className="filters">
            <select 
              value={filterCategory} 
              onChange={(e) => setFilterCategory(e.target.value)}
              className="filter-select"
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            <select 
              value={filterSeason} 
              onChange={(e) => setFilterSeason(e.target.value)}
              className="filter-select"
            >
              <option value="">All Seasons</option>
              {seasons.map(season => (
                <option key={season} value={season}>{season}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Form */}
        {showForm && (
          <div className="form-container">
            <h2>{editingItem ? 'Edit Item' : 'Add New Item'}</h2>
            <form onSubmit={handleSubmit} className="item-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Category *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Color</label>
                  <input
                    type="text"
                    name="color"
                    value={formData.color}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label>Brand</label>
                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Size</label>
                  <input
                    type="text"
                    name="size"
                    value={formData.size}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label>Season</label>
                  <select
                    name="season"
                    value={formData.season}
                    onChange={handleInputChange}
                  >
                    <option value="">Select season</option>
                    {seasons.map(season => (
                      <option key={season} value={season}>{season}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Image URL</label>
                <input
                  type="url"
                  name="image_url"
                  value={formData.image_url}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="form-group">
                <label>Notes</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows="3"
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  {editingItem ? 'Update' : 'Add'} Item
                </button>
                <button type="button" className="btn btn-secondary" onClick={resetForm}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="error-message">
            Error: {error}
          </div>
        )}

        {/* Loading State */}
        {loading && <div className="loading">Loading...</div>}

        {/* Clothes Grid */}
        {!loading && (
          <div className="clothes-grid">
            {clothes.length === 0 ? (
              <div className="empty-state">
                <p>No items in your wardrobe yet.</p>
                <p>Click "Add Item" to get started!</p>
              </div>
            ) : (
              clothes.map(item => (
                <div key={item.id} className="clothes-card">
                  {item.image_url && (
                    <div className="card-image">
                      <img src={item.image_url} alt={item.name} />
                    </div>
                  )}
                  <div className="card-content">
                    <h3>{item.name}</h3>
                    <div className="card-details">
                      <span className="badge badge-category">{item.category}</span>
                      {item.season && <span className="badge badge-season">{item.season}</span>}
                    </div>
                    {item.color && <p><strong>Color:</strong> {item.color}</p>}
                    {item.brand && <p><strong>Brand:</strong> {item.brand}</p>}
                    {item.size && <p><strong>Size:</strong> {item.size}</p>}
                    {item.notes && <p className="notes">{item.notes}</p>}
                  </div>
                  <div className="card-actions">
                    <button 
                      className="btn btn-edit"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>
                    <button 
                      className="btn btn-delete"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import './Menu.css';

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('breakfast');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  // Menu data organized by categories with Sinhala names and real images
  const menuData = {
    breakfast: [
      {
        id: 1,
        name: "String Hoppers (Indi Appa)",
        price: "Rs. 80",
        description: "Crispy rice and lentil crepe filled with spiced potato mixture",
        image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop",
        category: "Breakfast",
        spicy: false,
        vegetarian: true,
        popular: true
      },
      {
        id: 2,
        name: "Rice and Curry (Bath & Curry)",
        price: "Rs. 60",
        description: "Steamed rice cakes served with lentil soup and coconut chutney",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
        category: "Breakfast",
        spicy: false,
        vegetarian: true,
        popular: false
      },
      {
        id: 3,
        name: "Coconut Roti (Pol Roti)",
        price: "Rs. 70",
        description: "Deep-fried bread served with spiced potato curry",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
        category: "Breakfast",
        spicy: true,
        vegetarian: true,
        popular: true
      },
      {
        id: 4,
        name: "Milk Rice (Kiri Bath)",
        price: "Rs. 50",
        description: "Semolina porridge with vegetables and mild spices",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
        category: "Breakfast",
        spicy: false,
        vegetarian: true,
        popular: false
      },
      {
        id: 5,
        name: "Egg Hoppers (Biththara Appa)",
        price: "Rs. 65",
        description: "Fluffy omelette served with toasted bread",
        image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=400&h=300&fit=crop",
        category: "Breakfast",
        spicy: false,
        vegetarian: false,
        popular: true
      },
      {
        id: 6,
        name: "Curd and Treacle (Curd & Kitul Pani)",
        price: "Rs. 55",
        description: "Flattened rice cooked with onions, peanuts, and mild spices",
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
        category: "Breakfast",
        spicy: false,
        vegetarian: true,
        popular: false
      }
    ],
    lunch: [
      {
        id: 7,
        name: "Chicken Curry (Kukul Mas Curry)",
        price: "Rs. 120",
        description: "Aromatic basmati rice with tender grilled chicken and spices",
        image: "https://images.unsplash.com/photo-1563379091339-03246963d4a9?w=400&h=300&fit=crop",
        category: "Lunch",
        spicy: true,
        vegetarian: false,
        popular: true
      },
      {
        id: 8,
        name: "Dhal Curry (Parippu Curry)",
        price: "Rs. 90",
        description: "Creamy and rich paneer curry with butter and spices",
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
        category: "Lunch",
        spicy: true,
        vegetarian: true,
        popular: true
      },
      {
        id: 9,
        name: "Fish Curry (Malu Curry)",
        price: "Rs. 100",
        description: "Spicy chicken curry with onions and tomatoes",
        image: "https://images.unsplash.com/photo-1563379091339-03246963d4a9?w=400&h=300&fit=crop",
        category: "Lunch",
        spicy: true,
        vegetarian: false,
        popular: true
      },
      {
        id: 10,
        name: "Pumpkin Curry (Wattakka Curry)",
        price: "Rs. 80",
        description: "Stir-fried rice with fresh vegetables",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
        category: "Lunch",
        spicy: false,
        vegetarian: true,
        popular: false
      },
      {
        id: 11,
        name: "Prawn Curry (Issa Curry)",
        price: "Rs. 110",
        description: "Spicy fish curry with coconut milk and tamarind",
        image: "https://images.unsplash.com/photo-1563379091339-03246963d4a9?w=400&h=300&fit=crop",
        category: "Lunch",
        spicy: true,
        vegetarian: false,
        popular: false
      },
      {
        id: 12,
        name: "Green Beans Curry (Bonchi Curry)",
        price: "Rs. 75",
        description: "Comforting rice and lentil dish with mild spices",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
        category: "Lunch",
        spicy: false,
        vegetarian: true,
        popular: false
      },
      {
        id: 13,
        name: "Beef Curry (Goru Mas Curry)",
        price: "Rs. 130",
        description: "Tender mutton in aromatic Kashmiri spices",
        image: "https://images.unsplash.com/photo-1563379091339-03246963d4a9?w=400&h=300&fit=crop",
        category: "Lunch",
        spicy: true,
        vegetarian: false,
        popular: true
      },
      {
        id: 14,
        name: "Brinjal Curry (Wambatu Curry)",
        price: "Rs. 85",
        description: "Assorted vegetables in rich tomato-based gravy",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
        category: "Lunch",
        spicy: true,
        vegetarian: true,
        popular: false
      }
    ],
    dinner: [
      {
        id: 15,
        name: "Lamprais (Lamprais)",
        price: "Rs. 140",
        description: "Tender chicken in rich tomato and butter gravy",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
        category: "Dinner",
        spicy: true,
        vegetarian: false,
        popular: true
      },
      {
        id: 16,
        name: "Coconut Sambol (Pol Sambol)",
        price: "Rs. 95",
        description: "Fresh spinach curry with soft paneer cubes",
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
        category: "Dinner",
        spicy: false,
        vegetarian: true,
        popular: true
      },
      {
        id: 17,
        name: "Pork Curry (Uru Mas Curry)",
        price: "Rs. 150",
        description: "Fragrant rice with tender lamb and aromatic spices",
        image: "https://images.unsplash.com/photo-1563379091339-03246963d4a9?w=400&h=300&fit=crop",
        category: "Dinner",
        spicy: true,
        vegetarian: false,
        popular: true
      },
      {
        id: 18,
        name: "Gotu Kola Salad (Gotu Kola Sambol)",
        price: "Rs. 85",
        description: "Spiced chickpea curry with onions and tomatoes",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
        category: "Dinner",
        spicy: true,
        vegetarian: true,
        popular: false
      },
      {
        id: 19,
        name: "Crab Curry (Kakuluwo Curry)",
        price: "Rs. 160",
        description: "Marinated chicken roasted in traditional tandoor",
        image: "https://images.unsplash.com/photo-1563379091339-03246963d4a9?w=400&h=300&fit=crop",
        category: "Dinner",
        spicy: true,
        vegetarian: false,
        popular: true
      },
      {
        id: 20,
        name: "Mango Curry (Amba Curry)",
        price: "Rs. 100",
        description: "Vegetable dumplings in creamy cashew gravy",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
        category: "Dinner",
        spicy: false,
        vegetarian: true,
        popular: false
      }
    ],
    snacks: [
      {
        id: 21,
        name: "Fish Cutlets (Malu Cutlets)",
        price: "Rs. 15",
        description: "Crispy pastry with potato and pea filling",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
        category: "Snacks",
        spicy: true,
        vegetarian: true,
        popular: true
      },
      {
        id: 22,
        name: "Vadai (Vadai)",
        price: "Rs. 20",
        description: "Spicy potato fritter in soft bread bun",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
        category: "Snacks",
        spicy: true,
        vegetarian: true,
        popular: true
      },
      {
        id: 23,
        name: "Rolls (Rolls)",
        price: "Rs. 25",
        description: "Mixed vegetable fritters with gram flour",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
        category: "Snacks",
        spicy: true,
        vegetarian: true,
        popular: false
      },
      {
        id: 24,
        name: "Short Eats (Short Eats)",
        price: "Rs. 30",
        description: "Crispy puffed rice with chutneys and vegetables",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
        category: "Snacks",
        spicy: true,
        vegetarian: true,
        popular: true
      }
    ],
    beverages: [
      {
        id: 25,
        name: "Ceylon Tea (Ceylon Tea)",
        price: "Rs. 10",
        description: "Spiced Indian tea with milk and ginger",
        image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop",
        category: "Beverages",
        spicy: false,
        vegetarian: true,
        popular: true
      },
      {
        id: 26,
        name: "King Coconut (Thambili)",
        price: "Rs. 15",
        description: "Strong South Indian filter coffee",
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
        category: "Beverages",
        spicy: false,
        vegetarian: true,
        popular: true
      },
      {
        id: 27,
        name: "Wood Apple Juice (Divul Kiri)",
        price: "Rs. 20",
        description: "Sweet yogurt-based drink",
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
        category: "Beverages",
        spicy: false,
        vegetarian: true,
        popular: false
      },
      {
        id: 28,
        name: "Ginger Beer (Ginger Beer)",
        price: "Rs. 12",
        description: "Refreshing lemon soda with mint",
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
        category: "Beverages",
        spicy: false,
        vegetarian: true,
        popular: false
      }
    ],
    desserts: [
      {
        id: 29,
        name: "Watalappan (Watalappan)",
        price: "Rs. 30",
        description: "Sweet milk dumplings in sugar syrup",
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
        category: "Desserts",
        spicy: false,
        vegetarian: true,
        popular: true
      },
      {
        id: 30,
        name: "Curd with Treacle (Curd & Kitul Pani)",
        price: "Rs. 25",
        description: "Soft cottage cheese balls in light syrup",
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
        category: "Desserts",
        spicy: false,
        vegetarian: true,
        popular: false
      },
      {
        id: 31,
        name: "Milk Toffee (Kiri Toffee)",
        price: "Rs. 35",
        description: "Rice pudding with nuts and saffron",
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
        category: "Desserts",
        spicy: false,
        vegetarian: true,
        popular: true
      },
      {
        id: 32,
        name: "Jaggery (Hakuru)",
        price: "Rs. 20",
        description: "Crispy sweet pretzels in sugar syrup",
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
        category: "Desserts",
        spicy: false,
        vegetarian: true,
        popular: false
      }
    ]
  };

  // Filter items based on search term
  const filteredItems = menuData[activeCategory]?.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  return (
    <div className="menu-container">
      {/* Header */}
      <div className="menu-header">
        <h1>🍽️ Our Menu</h1>
        <p>Explore our delicious Sinhala cuisine from breakfast to dinner</p>
      </div>

      {/* Search Bar */}
      <div className="search-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search for Sinhala dishes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="category-tabs">
        <button
          className={`tab ${activeCategory === 'breakfast' ? 'active' : ''}`}
          onClick={() => setActiveCategory('breakfast')}
        >
          🌅 Breakfast
        </button>
        <button
          className={`tab ${activeCategory === 'lunch' ? 'active' : ''}`}
          onClick={() => setActiveCategory('lunch')}
        >
          🍽️ Lunch
        </button>
        <button
          className={`tab ${activeCategory === 'dinner' ? 'active' : ''}`}
          onClick={() => setActiveCategory('dinner')}
        >
          🌙 Dinner
        </button>
        <button
          className={`tab ${activeCategory === 'snacks' ? 'active' : ''}`}
          onClick={() => setActiveCategory('snacks')}
        >
          🥪 Snacks
        </button>
        <button
          className={`tab ${activeCategory === 'beverages' ? 'active' : ''}`}
          onClick={() => setActiveCategory('beverages')}
        >
          ☕ Beverages
        </button>
        <button
          className={`tab ${activeCategory === 'desserts' ? 'active' : ''}`}
          onClick={() => setActiveCategory('desserts')}
        >
          🍰 Desserts
        </button>
      </div>

      {/* Menu Items Grid */}
      <div className="menu-content">
        <div className="menu-grid">
          {filteredItems.map(item => (
            <div
              key={item.id}
              className={`menu-item ${item.popular ? 'popular' : ''}`}
              onClick={() => handleItemClick(item)}
            >
              <div className="item-image">
                <img src={item.image} alt={item.name} />
                {item.popular && <span className="popular-badge">🔥 Popular</span>}
              </div>
              <div className="item-content">
                <div className="item-header">
                  <h3>{item.name}</h3>
                  <span className="item-price">{item.price}</span>
                </div>
                <p className="item-description">{item.description}</p>
                <div className="item-tags">
                  {item.vegetarian && <span className="tag veg">🥬 Veg</span>}
                  {!item.vegetarian && <span className="tag non-veg">🍗 Non-Veg</span>}
                  {item.spicy && <span className="tag spicy">🌶️ Spicy</span>}
                  {!item.spicy && <span className="tag mild">😊 Mild</span>}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="no-items">
            <p>No items found matching your search.</p>
          </div>
        )}
      </div>

      {/* Item Detail Modal */}
      {selectedItem && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={closeModal}>✕</button>
            <div className="modal-body">
              <div className="modal-image">
                <img src={selectedItem.image} alt={selectedItem.name} />
                {selectedItem.popular && <span className="popular-badge">🔥 Popular</span>}
              </div>
              <div className="modal-info">
                <h2>{selectedItem.name}</h2>
                <p className="modal-description">{selectedItem.description}</p>
                <div className="modal-price">{selectedItem.price}</div>
                <div className="modal-tags">
                  {selectedItem.vegetarian && <span className="tag veg">🥬 Vegetarian</span>}
                  {!selectedItem.vegetarian && <span className="tag non-veg">🍗 Non-Vegetarian</span>}
                  {selectedItem.spicy && <span className="tag spicy">🌶️ Spicy</span>}
                  {!selectedItem.spicy && <span className="tag mild">😊 Mild</span>}
                </div>
                <div className="modal-category">
                  <strong>Category:</strong> {selectedItem.category}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;

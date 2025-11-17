import React, { useState, useMemo, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  Modal,
  Alert
} from 'react-native';
import { router, useFocusEffect } from 'expo-router'; // ✅ Added useFocusEffect
import AsyncStorage from '@react-native-async-storage/async-storage';

// Images
import rice from '@/assets/rice.png';
import carrot from '@/assets/carrot.png';
import tomato from '@/assets/tomato.png';
import potato from '@/assets/potato.png';
import mango from '@/assets/mango.png';
import milk from '@/assets/milk.png';
import eggs from '@/assets/eggs.png';
import starIcon from '@/assets/star-icon.webp';
import homeIcon from '@/assets/home-icon.png';
import productsIcon from '@/assets/products-icon.png';
import cartIcon from '@/assets/cart.png';
import ordersIcon from '@/assets/orders.png';

export default function BuyerBrowse() {
  const [activeNav, setActiveNav] = useState('Browse');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [sortBy, setSortBy] = useState('Newest First');
  const [searchQuery, setSearchQuery] = useState('');

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [cartCount, setCartCount] = useState(0);

  const products = [
    { id: 1, name: 'Premium Basmati Rice', farmer: 'Rice Fields', price: 85, location: 'Khulna', category: 'Grains', image: rice, rating: 4.8, harvestedDays: 2, available: 500 },
    { id: 2, name: 'Fresh Carrots', farmer: 'Green Valley Farms', price: 45, location: 'Khulna', category: 'Vegetables', image: carrot, rating: 4.9, harvestedDays: 1, available: 300 },
    { id: 3, name: 'Fresh Tomatoes', farmer: 'Green Valley Farms', price: 60, location: 'Dhaka', category: 'Vegetables', image: tomato, rating: 4.5, harvestedDays: 5, available: 200 },
    { id: 4, name: 'Organic Potatoes', farmer: 'Farm Fresh Co.', price: 85, location: 'Chittagong', category: 'Vegetables', image: potato, rating: 4.2, harvestedDays: 3, available: 400 },
    { id: 5, name: 'Sweet Mangoes', farmer: 'Mango Garden', price: 80, location: 'Rajshahi', category: 'Fruits', image: mango, rating: 4.8, harvestedDays: 10, available: 150 },
    { id: 6, name: 'Fresh Milk', farmer: 'Dairy Pure', price: 1.2, location: 'Dhaka', category: 'Dairy', image: milk, rating: 4.3, harvestedDays: 1, available: 100 },
    { id: 7, name: 'Eggs', farmer: 'Happy Hens', price: 0.25, location: 'Sylhet', category: 'Poultry', image: eggs, rating: 4.6, harvestedDays: 4, available: 250 },
  ];

  const categories = ['All Categories', 'Vegetables', 'Fruits', 'Dairy', 'Poultry', 'Grains', 'Spices'];
  const locations = ['All Locations', 'Dhaka', 'Chittagong', 'Rajshahi', 'Khulna', 'Sylhet', 'Barisal'];
  const sortOptions = ['Newest First', 'Price: Low to High', 'Price: High to Low', 'Highest Rated', 'Oldest First'];

  // ✅ Refresh cart count whenever screen is focused
  useFocusEffect(
    React.useCallback(() => {
      const loadCart = async () => {
        const cartData = await AsyncStorage.getItem('cart');
        const cartItems = cartData ? JSON.parse(cartData) : [];
        setCartCount(cartItems.reduce((acc, item) => acc + Number(item.quantity), 0));
      };
      loadCart();
    }, [])
  );

  const filteredProducts = useMemo(() => {
    let result = [...products];
    if (searchQuery.trim() !== "") {
      result = result.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.farmer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (selectedCategory !== "All Categories") result = result.filter(item => item.category === selectedCategory);
    if (selectedLocation !== "All Locations") result = result.filter(item => item.location === selectedLocation);

    switch (sortBy) {
      case "Newest First": result.sort((a, b) => a.harvestedDays - b.harvestedDays); break;
      case "Oldest First": result.sort((a, b) => b.harvestedDays - a.harvestedDays); break;
      case "Price: Low to High": result.sort((a, b) => a.price - b.price); break;
      case "Price: High to Low": result.sort((a, b) => b.price - a.price); break;
      case "Highest Rated": result.sort((a, b) => b.rating - a.rating); break;
    }

    return result;
  }, [searchQuery, selectedCategory, selectedLocation, sortBy]);

  const totalPrice = selectedProduct ? (selectedProduct.price * quantity).toFixed(2) : 0;

  const addToCart = async () => {
    try {
      const cartData = await AsyncStorage.getItem('cart');
      let cartItems = cartData ? JSON.parse(cartData) : [];
      const existingIndex = cartItems.findIndex(i => i.id === selectedProduct.id);
      if (existingIndex >= 0) {
        cartItems[existingIndex].quantity += quantity;
      } else {
        cartItems.push({ ...selectedProduct, quantity });
      }
      await AsyncStorage.setItem('cart', JSON.stringify(cartItems));
      setCartCount(cartItems.reduce((acc, item) => acc + Number(item.quantity), 0));
      Alert.alert('Success', `${selectedProduct.name} added to cart`);
      setDetailsVisible(false);
    } catch (err) {
      Alert.alert('Error', 'Failed to add to cart');
      console.error(err);
    }
  };

  const renderProductItem = ({ item }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => { setSelectedProduct(item); setQuantity(1); setDetailsVisible(true); }}
    >
      <Image source={item.image} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.farmerName}>{item.farmer}</Text>
        <View style={styles.productMeta}>
          <Text style={styles.productPrice}>৳{item.price}</Text>
          <Text style={styles.productLocation}>{item.location}</Text>
        </View>
        <View style={styles.ratingContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={starIcon} style={styles.starIcon} />
            <Text style={styles.rating}>{item.rating}</Text>
          </View>
          <Text style={styles.category}>{item.category}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const navItems = [
    { name: 'Home', image: homeIcon, route: 'BuyerDashboard' },
    { name: 'Browse', image: productsIcon, route: 'BuyerBrowse' },
    { name: 'Cart', image: cartIcon, notification: cartCount, route: 'Cart' },
    { name: 'Orders', image: ordersIcon, route: 'BuyerOrder' },
  ];

  return (
    <View style={styles.container}>
      {/* PRODUCT DETAILS MODAL */}
      {selectedProduct && (
        <Modal visible={detailsVisible} animationType="slide" transparent onRequestClose={() => setDetailsVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalBox}>
              <ScrollView style={styles.modalContent}>
                <Image source={selectedProduct.image} style={styles.modalImage} />
                <Text style={styles.modalTitle}>{selectedProduct.name}</Text>
                <Text style={styles.modalSubtitle}>Hot and fresh</Text>
                <View style={styles.ratingRow}>
                  <View style={styles.starsContainer}>
                    {[1, 2, 3, 4, 5].map(star => <Text key={star} style={styles.star}>⭐</Text>)}
                  </View>
                  <Text style={styles.ratingText}>({selectedProduct.rating} rating)</Text>
                </View>
                <View style={styles.priceSection}>
                  <Text style={styles.priceLabel}>Price per kg</Text>
                  <Text style={styles.priceValue}>৳{selectedProduct.price}</Text>
                </View>
                {['available','location','farmer','harvestedDays'].map((field,i) => (
                  <View key={i} style={styles.infoSection}>
                    <Text style={styles.infoLabel}>
                      {field==='available'?'Available':field==='location'?'Location':field==='farmer'?'Farmer':'Harvested'}
                    </Text>
                    <Text style={styles.infoValue}>
                      {field==='available'?selectedProduct.available:field==='location'?selectedProduct.location:field==='farmer'?selectedProduct.farmer:`${selectedProduct.harvestedDays} days ago`}
                    </Text>
                  </View>
                ))}
                <View style={styles.quantitySection}>
                  <Text style={styles.quantityLabel}>Quantity</Text>
                  <View style={styles.quantitySelector}>
                    <TouchableOpacity style={styles.quantityButton} onPress={()=>quantity>1&&setQuantity(quantity-1)}><Text style={styles.quantityButtonText}>-</Text></TouchableOpacity>
                    <Text style={styles.quantityValue}>{quantity} kg</Text>
                    <TouchableOpacity style={styles.quantityButton} onPress={()=>setQuantity(quantity+1)}><Text style={styles.quantityButtonText}>+</Text></TouchableOpacity>
                  </View>
                </View>
                <View style={styles.totalSection}>
                  <Text style={styles.totalLabel}>Total</Text>
                  <Text style={styles.totalValue}>৳{totalPrice}</Text>
                </View>
                <View style={styles.actionButtons}>
                  <TouchableOpacity style={styles.addToCartButton} onPress={addToCart}><Text style={styles.addToCartText}>Add to Cart</Text></TouchableOpacity>
                  <TouchableOpacity style={styles.buyNowButton}><Text style={styles.buyNowText}>Buy Now</Text></TouchableOpacity>
                </View>
              </ScrollView>
              <TouchableOpacity style={styles.closeBtn} onPress={()=>setDetailsVisible(false)}><Text style={styles.closeBtnText}>Close</Text></TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

      {/* MAIN CONTENT */}
      <ScrollView style={styles.content}>
        <View style={styles.browseSection}>
          <Text style={styles.browseTitle}>Browse Products</Text>
          <Text style={styles.browseSubtitle}>Discover fresh produce from local farmers</Text>
          <View style={styles.searchContainer}>
            <TextInput style={styles.searchInput} placeholder="Search products..." value={searchQuery} onChangeText={setSearchQuery}/>
          </View>
          <Text style={styles.filterLabel}>Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
            {categories.map((category, index)=>(
              <TouchableOpacity key={index} style={[styles.filterChip, selectedCategory===category&&styles.selectedFilterChip]} onPress={()=>setSelectedCategory(category)}>
                <Text style={[styles.filterChipText, selectedCategory===category&&styles.selectedFilterChipText]}>{category}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <Text style={styles.filterLabel}>Locations</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
            {locations.map((location,index)=>(
              <TouchableOpacity key={index} style={[styles.filterChip, selectedLocation===location&&styles.selectedFilterChip]} onPress={()=>setSelectedLocation(location)}>
                <Text style={[styles.filterChipText, selectedLocation===location&&styles.selectedFilterChipText]}>{location}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <View style={styles.sortContainer}>
            <Text style={styles.sortLabel}>Sort by:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.sortScroll}>
              {sortOptions.map((option,index)=>(
                <TouchableOpacity key={index} style={[styles.sortChip, sortBy===option&&styles.selectedSortChip]} onPress={()=>setSortBy(option)}>
                  <Text style={[styles.sortChipText, sortBy===option&&styles.selectedSortChipText]}>{option}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          <Text style={styles.productsTitle}>Available Products</Text>
          <FlatList data={filteredProducts} renderItem={renderProductItem} keyExtractor={item=>item.id.toString()} scrollEnabled={false} numColumns={2} columnWrapperStyle={styles.productsRow}/>
        </View>
      </ScrollView>

      {/* BOTTOM NAV */}
      <View style={styles.bottomNav}>
        {navItems.map((item,index)=>{
          const isActive = activeNav===item.name;
          return (
            <TouchableOpacity key={index} style={[styles.navItem, isActive&&styles.activeNavItem]} onPress={()=>{setActiveNav(item.name); router.push(`/${item.route}`)}}>
              <View style={{position:'relative'}}>
                <Image source={item.image} style={styles.navIcon}/>
                {item.notification>0 && <View style={styles.notificationBadge}><Text style={styles.notificationText}>{item.notification}</Text></View>}
              </View>
              <Text style={[styles.navText,isActive&&styles.activeNavText]}>{item.name}</Text>
            </TouchableOpacity>
          )
        })}
      </View>
    </View>
  );
}
// Styles remain the same as your provided code
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { flex: 1, padding: 20 },
  browseSection: { flex: 1 },
  browseTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
    marginTop: -8,
  },
  browseSubtitle: { fontSize: 16, color: '#666', marginBottom: 20 },
  searchContainer: { marginBottom: 20 },
  searchInput: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#e9ecef',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    color: '#333',
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 10,
    marginTop: 10,
  },
  filterScroll: { marginBottom: 15 },
  filterChip: {
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  selectedFilterChip: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  filterChipText: { fontSize: 14, color: '#666', fontWeight: '500' },
  selectedFilterChipText: { color: '#fff', fontWeight: '600' },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  sortLabel: { fontSize: 14, fontWeight: '600', color: '#666', marginRight: 10 },
  sortScroll: { flex: 1 },
  sortChip: {
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  selectedSortChip: {
    backgroundColor: '#2196F3',
    borderColor: '#2196F3',
  },
  sortChipText: { fontSize: 12, color: '#666', fontWeight: '500' },
  selectedSortChipText: { color: '#fff', fontWeight: '600' },
  productsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
    marginTop: 10,
  },
  productsRow: { justifyContent: 'space-between', marginBottom: 15 },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    width: '48%',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  productImage: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  productInfo: { flex: 1 },
  productName: { fontSize: 14, fontWeight: 'bold', color: '#333', marginBottom: 4 },
  farmerName: { fontSize: 12, color: '#666', marginBottom: 6 },
  productMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  productPrice: { fontSize: 14, fontWeight: 'bold', color: '#4CAF50' },
  productLocation: { fontSize: 11, color: '#999' },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  starIcon: { width: 14, height: 14, marginRight: 4, resizeMode: 'contain' },
  rating: { fontSize: 11, color: '#666' },
  category: {
    fontSize: 10,
    color: '#999',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingVertical: 10,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderWidth: 2,
    borderColor: 'transparent',
    borderRadius: 10,
    marginHorizontal: 5,
  },
  activeNavItem: { borderColor: '#4CAF50', backgroundColor: '#eaf8ea' },
  navIcon: { width: 28, height: 28, marginBottom: 5, resizeMode: 'contain' },
  navText: {
    fontSize: 12,
    color: '#333',
    fontWeight: '500',
    textAlign: 'center',
  },
  notificationBadge: {
    position: 'absolute',
    top: -5,
    right: -10,
    backgroundColor: 'red',
    borderRadius: 8,
    paddingHorizontal: 4,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },

  // MODAL STYLES - Updated to match the image
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalBox: {
    width: '100%',
    maxHeight: '90%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
  },
  modalContent: {
    flex: 1,
  },
  modalImage: {
    width: 120,
    height: 120,
    borderRadius: 20,
    alignSelf: 'center',
    backgroundColor: '#ecf9ef',
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#222',
    marginBottom: 5,
  },
  modalSubtitle: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 15,
    fontSize: 16,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 8,
  },
  star: {
    fontSize: 16,
    marginRight: 2,
  },
  ratingText: {
    color: '#666',
    fontSize: 14,
  },
  priceSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  priceLabel: {
    fontSize: 16,
    color: '#666',
  },
  priceValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
  },
  infoSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 16,
    color: '#666',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#222',
  },
  quantitySection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#f0f0f0',
  },
  quantityLabel: {
    fontSize: 16,
    color: '#666',
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 5,
  },
  quantityButton: {
    width: 30,
    height: 30,
    backgroundColor: '#e9ecef',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  quantityValue: {
    fontSize: 16,
    fontWeight: '500',
    marginHorizontal: 15,
    color: '#222',
  },
  totalSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '500',
    color: '#666',
  },
  totalValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  addToCartButton: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#4CAF50',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginRight: 10,
  },
  addToCartText: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buyNowButton: {
    flex: 1,
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginLeft: 10,
  },
  buyNowText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeBtn: {
    backgroundColor: '#6c757d',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  closeBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },});
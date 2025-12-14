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
import { router, useFocusEffect } from 'expo-router';
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

const imageMap = {
  "rice.png": rice,
  "carrot.png": carrot,
  "tomato.png": tomato,
  "potato.png": potato,
  "mango.png": mango,
  "milk.png": milk,
  "eggs.png": eggs,
};

export default function BuyerBrowse() {
  const [activeNav, setActiveNav] = useState('পণ্য');
  const [selectedCategory, setSelectedCategory] = useState('সব ক্যাটাগরি');
  const [selectedLocation, setSelectedLocation] = useState('সব লোকেশন');
  const [sortBy, setSortBy] = useState('নতুন পণ্য আগে');
  const [searchQuery, setSearchQuery] = useState('');

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [cartCount, setCartCount] = useState(0);

  const products = [
    { id: 1, name: 'বাসমতি চাল', farmer: 'ধানক্ষেত', price: 85, location: 'খুলনা', category: 'শস্য', image: rice, rating: 4.8, harvestedDays: 2, available: 500 },
    { id: 2, name: 'গাজর', farmer: 'গ্রিন ভ্যালি ফার্মস', price: 45, location: 'খুলনা', category: 'সবজি', image: carrot, rating: 4.9, harvestedDays: 1, available: 300 },
    { id: 3, name: 'টমেটো', farmer: 'গ্রিন ভ্যালি ফার্মস', price: 60, location: 'ঢাকা', category: 'সবজি', image: tomato, rating: 4.5, harvestedDays: 5, available: 200 },
    { id: 4, name: 'আলু', farmer: 'ফার্ম ফ্রেশ লিমিটেড', price: 85, location: 'চট্টগ্রাম', category: 'সবজি', image: potato, rating: 4.2, harvestedDays: 3, available: 400 },
    { id: 5, name: 'মিষ্টি আম', farmer: 'আম বাগান', price: 80, location: 'রাজশাহী', category: 'ফল', image: mango, rating: 4.8, harvestedDays: 10, available: 150 },
    { id: 6, name: 'দুধ', farmer: 'বিশুদ্ধ দুগ্ধজাত', price: 1.2, location: 'ঢাকা', category: 'দুগ্ধজাত পণ্য', image: milk, rating: 4.3, harvestedDays: 1, available: 100 },
    { id: 7, name: 'ডিম', farmer: 'হ্যাপি হেনস', price: 0.25, location: 'সিলেট', category: 'মুরগি/পোল্ট্রি', image: eggs, rating: 4.6, harvestedDays: 4, available: 250 },
  ];

  const categories = ['সব ক্যাটাগরি', 'সবজি', 'ফল', 'দুগ্ধজাত পণ্য', 'মুরগি/পোল্ট্রি', 'শস্য', 'মসলা'];
  const locations = ['সব লোকেশন', 'ঢাকা', 'চট্টগ্রাম', 'রাজশাহী', 'খুলনা', 'সিলেট', 'বরিশাল'];
  const sortOptions = ['নতুন পণ্য আগে', 'দাম: কম থেকে বেশি', 'দাম: বেশি থেকে কম', 'সর্বোচ্চ রেটিং', 'পুরনো পণ্য আগে'];

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
    if (selectedCategory !== "সব ক্যাটাগরি") result = result.filter(item => item.category === selectedCategory);
    if (selectedLocation !== "সব লোকেশন") result = result.filter(item => item.location === selectedLocation);

    switch (sortBy) {
      case "নতুন পণ্য আগে": result.sort((a, b) => a.harvestedDays - b.harvestedDays); break;
      case "পুরনো পণ্য আগে": result.sort((a, b) => b.harvestedDays - a.harvestedDays); break;
      case "দাম: কম থেকে বেশি": result.sort((a, b) => a.price - b.price); break;
      case "দাম: বেশি থেকে কম": result.sort((a, b) => b.price - a.price); break;
      case "সর্বোচ্চ রেটিং": result.sort((a, b) => b.rating - a.rating); break;
    }

    return result;
  }, [searchQuery, selectedCategory, selectedLocation, sortBy]);

  const totalPrice = selectedProduct ? (selectedProduct.price * quantity).toFixed(2) : 0;

  const addToCart = async () => {
    try {
      let cartData = await AsyncStorage.getItem("cart");
      let cartItems = cartData ? JSON.parse(cartData) : [];

      const productId =
        selectedProduct.productId ||
        selectedProduct.id ||
        selectedProduct._id ||
        Date.now();

      const imageNameMap = {
        "বাসমতি চাল": "rice.png",
        "গাজর": "carrot.png",
        "টমেটো": "tomato.png",
        "আলু": "potato.png",
        "মিষ্টি আম": "mango.png",
        "দুধ": "milk.png",
        "ডিম": "eggs.png",
      };

      const imageName = imageNameMap[selectedProduct.name] || "rice.png";

      const existingIndex = cartItems.findIndex(i => i.productId === productId);

      if (existingIndex >= 0) {
        cartItems[existingIndex].quantity += quantity;
      } else {
        cartItems.push({
          ...selectedProduct,
          productId,
          quantity,
          imageName: imageName,
        });
      }

      await AsyncStorage.setItem("cart", JSON.stringify(cartItems));

      setCartCount(
        cartItems.reduce((acc, item) => acc + Number(item.quantity), 0)
      );
      const api = "http://192.168.0.107:5000/api/product/add-to-cart"

      await fetch(api, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId,
          name: selectedProduct.name,
          farmer: selectedProduct.farmer,
          price: selectedProduct.price,
          location: selectedProduct.location,
          category: selectedProduct.category?.trim(),
          harvestedDays: selectedProduct.harvestedDays,
          available: selectedProduct.available,
          quantity,
          imageName: imageName,
        }),
      });

      Alert.alert("সফল", `${selectedProduct.name} কার্টে যোগ করা হয়েছে`);
      setDetailsVisible(false);

    } catch (err) {
      Alert.alert("ত্রুটি", "কার্টে যোগ করতে ব্যর্থ হয়েছে");
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
    { name: 'হোম', image: homeIcon, route: 'BuyerDashboard' },
    { name: 'পণ্য', image: productsIcon, route: 'BuyerBrowse' },
    { name: 'কার্ট', image: cartIcon, notification: cartCount, route: 'Cart' },
    { name: 'অর্ডার', image: ordersIcon, route: 'BuyerOrder' },
  ];

  return (
    <View style={styles.container}>

      {/* PRODUCT DETAILS MODAL */}
      {selectedProduct && (
        <Modal
          visible={detailsVisible}
          animationType="slide"
          transparent
          statusBarTranslucent={true}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalBox}>
              <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
                <View style={styles.modalHeader}>
                  <Image source={selectedProduct.image} style={styles.modalImage} />
                  <Text style={styles.modalTitle}>{selectedProduct.name}</Text>
                  <View style={styles.ratingRow}>
                    <View style={styles.starsContainer}>
                      {[1, 2, 3, 4, 5].map(i => <Text key={i} style={styles.star}>⭐</Text>)}
                    </View>
                    <Text style={styles.ratingText}>({selectedProduct.rating} রেটিং)</Text>
                  </View>
                </View>

                <View style={styles.modalInfoContainer}>
                  <View style={styles.modalInfoRow}>
                    <Text style={styles.modalInfoLabel}>দাম:</Text>
                    <Text style={styles.modalInfoValue}>৳{selectedProduct.price} প্রতি কেজি</Text>
                  </View>
                  
                  <View style={styles.modalInfoRow}>
                    <Text style={styles.modalInfoLabel}>উপলব্ধ:</Text>
                    <Text style={styles.modalInfoValue}>{selectedProduct.available} kg</Text>
                  </View>
                  
                  <View style={styles.modalInfoRow}>
                    <Text style={styles.modalInfoLabel}>লোকেশন:</Text>
                    <Text style={styles.modalInfoValue}>{selectedProduct.location}</Text>
                  </View>
                  
                  <View style={styles.modalInfoRow}>
                    <Text style={styles.modalInfoLabel}>কৃষক:</Text>
                    <Text style={styles.modalInfoValue}>{selectedProduct.farmer}</Text>
                  </View>
                  
                  <View style={styles.modalInfoRow}>
                    <Text style={styles.modalInfoLabel}>কাটাই হয়েছে:</Text>
                    <Text style={styles.modalInfoValue}>{selectedProduct.harvestedDays} দিন আগে</Text>
                  </View>
                </View>

                <View style={styles.quantityContainer}>
                  <Text style={styles.quantityLabel}>পরিমাণ (kg):</Text>
                  <View style={styles.quantitySelector}>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => quantity > 1 && setQuantity(quantity - 1)}
                    >
                      <Text style={styles.quantityButtonText}>-</Text>
                    </TouchableOpacity>
                    
                    <Text style={styles.quantityDisplay}>{quantity}</Text>
                    
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => setQuantity(quantity + 1)}
                    >
                      <Text style={styles.quantityButtonText}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.totalContainer}>
                  <Text style={styles.totalLabel}>মোট:</Text>
                  <Text style={styles.totalPrice}>৳{totalPrice}</Text>
                </View>

                <View style={styles.modalActionButtons}>
                  <TouchableOpacity 
                    style={styles.addToCartButton} 
                    onPress={addToCart}
                  >
                    <Text style={styles.addToCartText}>কার্টে যোগ করুন</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={styles.buyNowButton}
                    onPress={() => {
                      Alert.alert('সফল', 'অর্ডার প্লেস করা হয়েছে!');
                      setDetailsVisible(false);
                    }}
                  >
                    <Text style={styles.buyNowText}>এখনই কিনুন</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity 
                  style={styles.closeButton} 
                  onPress={() => setDetailsVisible(false)}
                >
                  <Text style={styles.closeButtonText}>বন্ধ করুন</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        </Modal>
      )}

      {/* MAIN CONTENT */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.browseSection}>
          <Text style={styles.browseTitle}>পণ্য ব্রাউজ করুন</Text>
          <Text style={styles.browseSubtitle}>স্থানীয় কৃষকদের থেকে পণ্য কিনুন</Text>

          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="পণ্য সার্চ করুন..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#999"
            />
          </View>

          <Text style={styles.filterLabel}>ক্যাটাগরি</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.filterScroll}
          >
            {categories.map((c, i) => (
              <TouchableOpacity
                key={i}
                style={[styles.filterChip, selectedCategory === c && styles.selectedFilterChip]}
                onPress={() => setSelectedCategory(c)}
              >
                <Text style={[
                  styles.filterChipText,
                  selectedCategory === c && styles.selectedFilterChipText
                ]}>{c}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text style={styles.filterLabel}>লোকেশন</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.filterScroll}
          >
            {locations.map((l, i) => (
              <TouchableOpacity
                key={i}
                style={[styles.filterChip, selectedLocation === l && styles.selectedFilterChip]}
                onPress={() => setSelectedLocation(l)}
              >
                <Text style={[
                  styles.filterChipText,
                  selectedLocation === l && styles.selectedFilterChipText
                ]}>{l}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.sortContainer}>
            <Text style={styles.sortLabel}>সাজান:</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.sortScroll}
            >
              {sortOptions.map((o, i) => (
                <TouchableOpacity
                  key={i}
                  style={[styles.sortChip, sortBy === o && styles.selectedSortChip]}
                  onPress={() => setSortBy(o)}
                >
                  <Text style={[
                    styles.sortChipText,
                    sortBy === o && styles.selectedSortChipText
                  ]}>{o}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <Text style={styles.productsTitle}>উপলব্ধ পণ্য</Text>

          <FlatList
            data={filteredProducts}
            renderItem={renderProductItem}
            keyExtractor={item => item.id.toString()}
            scrollEnabled={false}
            numColumns={2}
            columnWrapperStyle={styles.productsRow}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>কোন পণ্য পাওয়া যায়নি</Text>
              </View>
            }
          />

        </View>
      </ScrollView>

      {/* BOTTOM NAV */}
      <View style={styles.bottomNav}>
        {navItems.map((item, index) => {
          const isActive = activeNav === item.name;
          return (
            <TouchableOpacity
              key={index}
              style={[styles.navItem, isActive && styles.activeNavItem]}
              onPress={() => {
                setActiveNav(item.name);
                router.push(`/${item.route}`);
              }}
            >
              <View style={{ position: 'relative' }}>
                <Image source={item.image} style={styles.navIcon} />

                {item.notification > 0 && (
                  <View style={styles.notificationBadge}>
                    <Text style={styles.notificationText}>{item.notification}</Text>
                  </View>
                )}
              </View>
              <Text style={[styles.navText, isActive && styles.activeNavText]}>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff' 
  },
  content: { 
    flex: 1, 
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  browseSection: { 
    flex: 1,
    paddingBottom: 20,
  },
  browseTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  browseSubtitle: { 
    fontSize: 14, 
    color: '#666', 
    marginBottom: 20 
  },
  searchContainer: { 
    marginBottom: 20 
  },
  searchInput: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#e9ecef',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 14,
    color: '#333',
  },
  filterLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
    marginTop: 5,
  },
  filterScroll: { 
    marginBottom: 15 
  },
  filterChip: {
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  selectedFilterChip: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  filterChipText: { 
    fontSize: 12, 
    color: '#666', 
    fontWeight: '500' 
  },
  selectedFilterChipText: { 
    color: '#fff', 
    fontWeight: '600' 
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  sortLabel: { 
    fontSize: 14, 
    fontWeight: '600', 
    color: '#666', 
    marginRight: 10 
  },
  sortScroll: { 
    flex: 1 
  },
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
  sortChipText: { 
    fontSize: 11, 
    color: '#666', 
    fontWeight: '500' 
  },
  selectedSortChipText: { 
    color: '#fff', 
    fontWeight: '600' 
  },
  productsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
    marginTop: 5,
  },
  productsRow: { 
    justifyContent: 'space-between', 
    marginBottom: 10 
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    width: '48%',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  productImage: {
    width: '100%',
    height: 90,
    borderRadius: 8,
    marginBottom: 8,
    resizeMode: 'contain',
  },
  productInfo: { 
    flex: 1 
  },
  productName: { 
    fontSize: 13, 
    fontWeight: 'bold', 
    color: '#333', 
    marginBottom: 4 
  },
  farmerName: { 
    fontSize: 11, 
    color: '#666', 
    marginBottom: 6 
  },
  productMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  productPrice: { 
    fontSize: 13, 
    fontWeight: 'bold', 
    color: '#4CAF50' 
  },
  productLocation: { 
    fontSize: 10, 
    color: '#999' 
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  starIcon: { 
    width: 12, 
    height: 12, 
    marginRight: 3, 
    resizeMode: 'contain' 
  },
  rating: { 
    fontSize: 10, 
    color: '#666' 
  },
  category: {
    fontSize: 9,
    color: '#999',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#f8f9fa',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingVertical: 8,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
  },
  activeNavItem: { 
    backgroundColor: '#eaf8ea',
    borderRadius: 8,
  },
  navIcon: { 
    width: 24, 
    height: 24, 
    marginBottom: 4, 
    resizeMode: 'contain' 
  },
  navText: {
    fontSize: 11,
    color: '#333',
    fontWeight: '500',
    textAlign: 'center',
  },
  activeNavText: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  notificationBadge: {
    position: 'absolute',
    top: -5,
    right: -8,
    backgroundColor: 'red',
    borderRadius: 8,
    paddingHorizontal: 4,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationText: { 
    color: '#fff', 
    fontSize: 9, 
    fontWeight: 'bold' 
  },

  // MODAL STYLES - Phone-friendly
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  modalBox: {
    width: '95%',
    maxHeight: '85%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
  },
  modalContent: {
    flexGrow: 1,
  },
  modalHeader: {
    alignItems: 'center',
    marginBottom: 15,
  },
  modalImage: {
    width: 100,
    height: 100,
    borderRadius: 15,
    backgroundColor: '#ecf9ef',
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#222',
    marginBottom: 5,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 5,
  },
  star: {
    fontSize: 14,
  },
  ratingText: {
    color: '#666',
    fontSize: 12,
  },
  modalInfoContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  modalInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  modalInfoLabel: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  modalInfoValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#222',
    flex: 1.5,
    textAlign: 'right',
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#f0f0f0',
  },
  quantityLabel: {
    fontSize: 15,
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
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  quantityDisplay: {
    fontSize: 15,
    fontWeight: '500',
    marginHorizontal: 15,
    color: '#222',
    minWidth: 20,
    textAlign: 'center',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#f0f0f0',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  modalActionButtons: {
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
    marginRight: 8,
  },
  addToCartText: {
    color: '#4CAF50',
    fontSize: 14,
    fontWeight: 'bold',
  },
  buyNowButton: {
    flex: 1,
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginLeft: 8,
  },
  buyNowText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: '#6c757d',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
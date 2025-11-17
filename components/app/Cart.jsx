// === Cart.jsx ===

import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  Image, 
  TouchableOpacity 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

// Import your icons
import homeIcon from '@/assets/home-icon.png';
import productsIcon from '@/assets/products-icon.png';
import cartIcon from '@/assets/cart.png';
import ordersIcon from '@/assets/orders.png';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [activeNav, setActiveNav] = useState('Cart');

  const loadCart = async () => {
    try {
      const data = await AsyncStorage.getItem('cart');
      if (data !== null) {
        setCartItems(JSON.parse(data));
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const removeItem = async (id) => {
    try {
      const updated = cartItems.filter(item => item.id !== id);
      await AsyncStorage.setItem('cart', JSON.stringify(updated));
      setCartItems(updated);
    } catch (err) {
      console.error(err);
    }
  };

  const updateQuantity = async (id, delta) => {
    try {
      const updated = cartItems.map(item => {
        if (item.id === id) {
          let newQty = item.quantity + delta;
          if (newQty < 1) newQty = 1;
          return { ...item, quantity: newQty };
        }
        return item;
      });
      await AsyncStorage.setItem('cart', JSON.stringify(updated));
      setCartItems(updated);
    } catch (err) {
      console.error(err);
    }
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  ).toFixed(2);

  // ⭐ Save order to AsyncStorage and clear cart
  const proceedToCheckout = async () => {
    try {
      const existing = await AsyncStorage.getItem('orders');
      const orders = existing ? JSON.parse(existing) : [];

      const newOrder = {
        id: Date.now(),
        date: new Date().toLocaleString(),
        items: cartItems,
        total: totalPrice
      };

      await AsyncStorage.setItem('orders', JSON.stringify([newOrder, ...orders]));

      await AsyncStorage.setItem('cart', JSON.stringify([]));
      setCartItems([]);

      router.push('/BuyerOrder');
    } catch (err) {
      console.error(err);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemCard}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>৳{item.price} per kg</Text>

        <View style={styles.quantityRow}>
          <TouchableOpacity onPress={() => updateQuantity(item.id, -1)} style={styles.qtyBtn}>
            <Text style={styles.qtyBtnText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.qtyValue}>{item.quantity} kg</Text>
          <TouchableOpacity onPress={() => updateQuantity(item.id, 1)} style={styles.qtyBtn}>
            <Text style={styles.qtyBtnText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity onPress={() => removeItem(item.id)} style={styles.removeBtn}>
        <Text style={styles.removeText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  const ListFooter = () => (
    <View style={styles.footer}>
      <View style={styles.totalSection}>
        <Text style={styles.totalLabel}>Total:</Text>
        <Text style={styles.totalValue}>৳{totalPrice}</Text>
      </View>

      <TouchableOpacity style={styles.checkoutBtn} onPress={proceedToCheckout}>
        <Text style={styles.checkoutText}>Proceed to Checkout</Text>
      </TouchableOpacity>
    </View>
  );

  const navItems = [
    { name: 'Home', image: homeIcon, route: 'BuyerDashboard' },
    { name: 'Browse', image: productsIcon, route: 'BuyerBrowse' },
    { name: 'Cart', image: cartIcon, route: 'Cart', notification: cartItems.length },
    { name: 'Orders', image: ordersIcon, route: 'BuyerOrder' },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        ListHeaderComponent={<Text style={styles.cartTitle}>Shopping Cart</Text>}
        ListFooterComponent={ListFooter}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListEmptyComponent={<Text style={styles.emptyText}>Your cart is empty!</Text>}
      />

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
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 20, paddingTop: 20 },
  emptyText: { textAlign: 'center', marginTop: 50, fontSize: 18, color: '#666' },
  
  cartTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#2c3e50' },

  itemCard: {
    flexDirection: 'row',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 12,
    marginBottom: 15,
    alignItems: 'center',
  },
  image: { width: 80, height: 80, borderRadius: 10, marginRight: 12, resizeMode: 'contain' },
  info: { flex: 1 },
  name: { fontSize: 16, fontWeight: 'bold', marginBottom: 4, color: '#333' },
  price: { fontSize: 14, color: '#4CAF50', marginBottom: 10 },
  quantityRow: { flexDirection: 'row', alignItems: 'center' },
  qtyBtn: {
    width: 30,
    height: 30,
    backgroundColor: '#e9ecef',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  qtyBtnText: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  qtyValue: { marginHorizontal: 10, fontSize: 16, fontWeight: '500', color: '#222' },

  removeBtn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#ff4d4f',
    borderRadius: 8,
  },
  removeText: { color: '#fff', fontWeight: 'bold', fontSize: 12 },

  footer: { marginTop: 10 },

  totalSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderColor: '#ddd',
    marginBottom: 15,
  },
  totalLabel: { fontSize: 18, fontWeight: '500', color: '#666' },
  totalValue: { fontSize: 22, fontWeight: 'bold', color: '#4CAF50' },

  checkoutBtn: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  checkoutText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },

  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingVertical: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
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
  navText: { fontSize: 12, color: '#333', fontWeight: '500', textAlign: 'center' },
  activeNavText: { color: '#4CAF50', fontWeight: '600' },

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
});

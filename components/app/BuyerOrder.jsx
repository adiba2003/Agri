import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
} from 'react-native';
import { router } from 'expo-router';

// 🔥 Import all images
import backArrow from '@/assets/back-arrow.png';
import homeIcon from '@/assets/home-icon.png';
import productsIcon from '@/assets/products-icon.png';
import cartIcon from '@/assets/cart.png';
import ordersIcon from '@/assets/orders.png';
import tomatoImage from '@/assets/tomato.png';
import carrotImage from '@/assets/carrot.png';
import riceImage from '@/assets/rice.png';

export default function BuyerOrder() {
  const [activeNav, setActiveNav] = useState('Orders');

  // Orders data
  const orders = [
    {
      id: 1,
      orderId: '#1236',
      date: 'Placed on Sep 10, 2025',
      status: 'Delivered',
      statusColor: '#4CAF50',
      image: tomatoImage,
      items: [{ name: 'Fresh Tomatoes - 3kg', price: '190' }],
      total: '190',
      buttonText: 'Reorder',
      buttonColor: '#4CAF50',
    },
    {
      id: 2,
      orderId: '#1235',
      date: 'Placed on Sep 8, 2025',
      status: 'In Transit',
      statusColor: '#FF9800',
      image: carrotImage,
      items: [{ name: 'Fresh Carrots - 2kg', price: '140' }],
      total: '140',
      buttonText: 'Track Order',
      buttonColor: '#2196F3',
    },
    {
      id: 3,
      orderId: '#1234',
      date: 'Delivered on Sep 5, 2025',
      status: 'Delivered',
      statusColor: '#4CAF50',
      image: riceImage,
      items: [{ name: 'Premium Basmati Rice - 5kg', price: '1475' }],
      total: '1475',
      buttonText: 'Reorder',
      buttonColor: '#4CAF50',
    },
  ];

  // ⭐ UPDATED — removed notification from Cart
  const navItems = [
    { name: 'Home', image: homeIcon, route: 'BuyerDashboard' },
    { name: 'Browse', image: productsIcon, route: 'BuyerBrowse' },
    { name: 'Cart', image: cartIcon, route: 'Cart' }, // 🔥 no notification
    { name: 'Orders', image: ordersIcon, route: 'BuyerOrder' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4CAF50" />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.titleSection}>
          <Text style={styles.pageTitle}>My Orders</Text>
          <Text style={styles.pageSubtitle}>
            Track your order status and history
          </Text>
        </View>

        <View style={styles.ordersList}>
          {orders.map((order) => (
            <View key={order.id} style={styles.orderCard}>

              {/* Order Header */}
              <View style={styles.orderHeader}>
                <View>
                  <Text style={styles.orderId}>{order.orderId}</Text>
                  <Text style={styles.orderDate}>{order.date}</Text>
                </View>

                <View
                  style={[
                    styles.orderStatus,
                    { backgroundColor: order.statusColor + '20' },
                  ]}
                >
                  <Text
                    style={[
                      styles.statusText,
                      { color: order.statusColor },
                    ]}
                  >
                    {order.status}
                  </Text>
                </View>
              </View>

              {/* Order Items */}
              <View style={styles.orderItems}>
                {order.items.map((item, index) => (
                  <View key={index} style={styles.orderItem}>
                    <Image source={order.image} style={styles.itemImage} />
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemPrice}>${item.price}</Text>
                  </View>
                ))}
              </View>

              {/* Order Footer */}
              <View style={styles.orderFooter}>
                <View style={styles.totalSection}>
                  <Text style={styles.totalLabel}>Total:</Text>
                  <Text style={styles.totalAmount}>${order.total}</Text>
                </View>

                <TouchableOpacity
                  style={[
                    styles.actionButton,
                    { backgroundColor: order.buttonColor },
                  ]}
                >
                  <Text style={styles.actionButtonText}>
                    {order.buttonText}
                  </Text>
                </TouchableOpacity>
              </View>

            </View>
          ))}
        </View>
      </ScrollView>

      {/* ⭐ Updated Bottom Navigation — NO BADGE */}
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
              {/* Icon */}
              <Image source={item.image} style={styles.navIcon} />

              {/* Text */}
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

// 🔥 Styles unchanged
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  content: { flex: 1, padding: 20 },
  titleSection: { marginBottom: 25 },
  pageTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  pageSubtitle: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
  },

  ordersList: { marginBottom: 20 },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    elevation: 3,
  },

  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 15,
    marginBottom: 15,
  },
  orderId: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  orderDate: { fontSize: 14, color: '#666' },
  orderStatus: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  statusText: { fontSize: 12, fontWeight: '600' },

  orderItems: { marginBottom: 15 },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  itemImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginRight: 10,
  },
  itemName: { flex: 1, fontSize: 16, color: '#333', fontWeight: '500' },
  itemPrice: { fontSize: 16, fontWeight: 'bold', color: '#2c3e50' },

  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 15,
  },
  totalSection: { flexDirection: 'row', alignItems: 'center' },
  totalLabel: { fontSize: 16, color: '#666', marginRight: 8 },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },

  actionButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },

  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    marginHorizontal: 5,
    borderRadius: 10,
  },
  activeNavItem: { backgroundColor: '#eaf8ea' },
  navIcon: {
    width: 24,
    height: 24,
    marginBottom: 4,
    resizeMode: 'contain',
  },
  navText: { fontSize: 12, color: '#666', fontWeight: '500' },
  activeNavText: { color: '#4CAF50', fontWeight: 'bold' },
});

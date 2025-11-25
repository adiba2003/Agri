// BuyerOrder.jsx (UPDATED - uses backend)
import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';

// Icons
import homeIcon from '@/assets/home-icon.png';
import productsIcon from '@/assets/products-icon.png';
import cartIcon from '@/assets/cart.png';
import ordersIcon from '@/assets/orders.png';

// <-- set this to your backend URL -->
const API_BASE = 'http://localhost:5000';

export default function BuyerOrder() {
  const [activeNav, setActiveNav] = useState('Orders');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);



  useEffect(() => {
    fetchOrders();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchOrders();
    }, [])
  );

  
  const fetchOrders = async () => {
    try {
      setLoading(true);
      
    const res = await fetch("http://localhost:5000/api/product/get-cart-item");
    const data = await res.json();
    console.log("Cart items from backend:", data);
    setOrders(data?.data);
    console.log(data.data)
      // backend returns { pending, processing, declined, cancelled }
      // map each array to include status and combine
      // const combined = [];
      // if (data.pending?.length) {
      //   data.pending.forEach(o => combined.push({ ...o, status: 'pending' }));
      // }
      // if (data.processing?.length) {
      //   data.processing.forEach(o => combined.push({ ...o, status: 'processing' }));
      // }
      // if (data.declined?.length) {
      //   data.declined.forEach(o => combined.push({ ...o, status: 'declined' }));
      // }
      // if (data.cancelled?.length) {
      //   data.cancelled.forEach(o => combined.push({ ...o, status: 'cancelled' }));
      // }
      setOrders(combined);
      setLoading(false);
    } catch (err) {
      console.log('Error fetching orders:', err);
      setLoading(false);
    }
  };

  // Generate random 6-digit order ID (for display)
  const generateRandomOrderId = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const confirmCancel = (orderIdWithCat, category) => {
    // RN Alert confirm
    Alert.alert(
      `Cancel ${category} order?`,
      `Are you sure you want to cancel the ${category} items from this order?`,
      [
        { text: 'No', style: 'cancel' },
        { text: 'Yes', onPress: () => handleCancelConfirmation(orderIdWithCat, category) },
      ],
      { cancelable: true }
    );
  };

  const handleCancelConfirmation = async (orderIdWithCat, category) => {
    try {
      // handle both formats:
      // If frontend passed "mainId-category", split
      let mainOrderId = orderIdWithCat;
      if (orderIdWithCat.includes('-')) {
        mainOrderId = orderIdWithCat.split('-')[0];
      }

      const res = await fetch(`${API_BASE}/api/orders/${mainOrderId}/cancel`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category }),
      });

      const data = await res.json();
      if (!res.ok) {
        Alert.alert('Cancel failed', data.error || 'Failed to cancel order');
        return;
      }

      Alert.alert('Cancelled', data.message || 'Order updated');
      setRefreshKey(prev => prev + 1);
      fetchOrders();
    } catch (err) {
      console.log('cancel error', err);
      Alert.alert('Error', 'Failed to cancel order');
    }
  };

  // Group orders by category with status
  const getOrdersByCategory = () => {
    const categoryOrders = [];

    orders.forEach(order => {
      if (!order.items || order.items.length === 0) return;

      const itemsByCategory = {};
      
      order.forEach(item => {
        const category = item.category || 'General';
        if (!itemsByCategory[category]) {
          itemsByCategory[category] = {
            orderId: order.orderId + '-' + category,
            originalOrderId: order.orderId,
            category: category,
            items: [],
            totalAmount: 0,
            createdAt: order.createdAt,
            displayOrderId: generateRandomOrderId(),
            parentStatus: order.status || 'pending'
          };
        }
        itemsByCategory[category].items.push(item);
        itemsByCategory[category].totalAmount += (item.price * (item.quantity || 1));
      });
      
      Object.values(itemsByCategory).forEach(catOrder => {
        categoryOrders.push(catOrder);
      });
    });

    
    return orders;
  };

  const navItems = [
    { name: 'Home', image: homeIcon, route: 'BuyerDashboard' },
    { name: 'Browse', image: productsIcon, route: 'BuyerBrowse' },
    { name: 'Cart', image: cartIcon, route: 'Cart' },
    { name: 'Orders', image: ordersIcon, route: 'BuyerOrder' },
  ];

  const handleNavPress = (item) => {
    setActiveNav(item.name);
    router.push(`/${item.route}`);
  };

  const categoryOrders = getOrdersByCategory();

  return (
    <View key={refreshKey} style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4CAF50" />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.titleSection}>
          <Text style={styles.pageTitle}>My Orders</Text>
          <Text style={styles.pageSubtitle}>Track your order status and history</Text>
          <Text style={styles.orderCount}>Total Orders: {categoryOrders.length}</Text>
        </View>

        {categoryOrders.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>{loading ? 'Loading orders...' : 'No orders yet'}</Text>
            <Text style={styles.emptySubtext}>Your orders will appear here</Text>
          </View>
        ) : (
          categoryOrders.map((order) => {
            // Determine status based on parentStatus
            const hasProcessing = order.parentStatus === 'processing';
            const hasDeclined = order.parentStatus === 'declined';
            const status = hasDeclined ? 'Declined' : hasProcessing ? 'Processing' : 'Pending';

            return (
              <View key={order.orderId} style={styles.orderCard}>
                <View style={styles.orderHeader}>
                  <View>
                    <Text style={styles.orderNumber}>#{order.displayOrderId}</Text>
                    <Text style={styles.orderCategory}>{order.category} Order</Text>
                  </View>
                  <View style={styles.statusSection}>
                    <Text style={styles.orderDate}>
                      {new Date(order.createdAt).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </Text>
                    <View style={[
                      styles.statusBadge,
                      status === 'Processing' && styles.processingStatus,
                      status === 'Declined' && styles.declinedStatus
                    ]}>
                      <Text style={styles.statusText}>{status}</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.divider} />

                <View style={styles.orderItems}>
                  {order.items?.map((item, idx) => (
                    <View key={`${order.orderId}-${idx}`} style={styles.orderItem}>
                      <View style={styles.itemInfo}>
                        <Text style={styles.itemName}>{item.name} - {item.quantity}kg</Text>
                        <Text style={styles.itemPrice}>৳{item.price * item.quantity}</Text>
                      </View>
                    </View>
                  ))}
                </View>

                <View style={styles.orderFooter}>
                  <View style={styles.totalSection}>
                    <Text style={styles.totalLabel}>Total:</Text>
                    <Text style={styles.totalAmount}>৳{order.totalAmount}</Text>
                  </View>

                  {status === 'Pending' && (
                    <TouchableOpacity
                      style={styles.cancelButton}
                      onPress={() => confirmCancel(order.orderId, order.category)}
                    >
                      <Text style={styles.cancelButtonText}>Cancel Order</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            );
          })
        )}
      </ScrollView>

      <View style={styles.bottomNav}>
        {navItems.map((item, index) => {
          const isActive = activeNav === item.name;
          return (
            <TouchableOpacity
              key={index}
              style={styles.navItem}
              onPress={() => handleNavPress(item)}
            >
              <Image 
                source={item.image} 
                style={styles.navIcon} 
              />
              <Text style={styles.navText}>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

// styles: keep the same styles as your original file (copy-paste)
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f8f9fa' 
  },
  content: { 
    flex: 1, 
    padding: 20,
    marginBottom: 70
  },
  titleSection: { 
    marginBottom: 24,
  },
  pageTitle: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    color: '#2c3e50', 
    marginBottom: 8 
  },
  pageSubtitle: { 
    fontSize: 16, 
    color: '#666',
  },
  orderCount: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '600',
    marginTop: 4,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    fontWeight: '600',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  orderCard: { 
    backgroundColor: '#fff', 
    borderRadius: 12, 
    padding: 20, 
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  orderNumber: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#2c3e50',
    marginBottom: 4,
  },
  orderCategory: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '600',
  },
  statusSection: {
    alignItems: 'flex-end',
  },
  orderDate: { 
    fontSize: 14, 
    color: '#666',
    marginBottom: 6,
    textAlign: 'right',
  },
  statusBadge: {
    backgroundColor: '#FFF3CD',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  processingStatus: {
    backgroundColor: '#BBDEFB',
  },
  declinedStatus: {
    backgroundColor: '#FFCDD2',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#856404',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginBottom: 16,
  },
  orderItems: { 
    marginBottom: 16,
  },
  orderItem: { 
    marginBottom: 12,
  },
  itemInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemName: { 
    fontSize: 16, 
    color: '#333', 
    fontWeight: '500',
    flex: 1,
  },
  itemPrice: { 
    fontSize: 16, 
    fontWeight: '600', 
    color: '#2c3e50',
    marginLeft: 10,
  },
  orderFooter: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
  },
  totalSection: { 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  totalLabel: { 
    fontSize: 16, 
    color: '#666', 
    marginRight: 8,
    fontWeight: '500',
  },
  totalAmount: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#2c3e50' 
  },
  cancelButton: {
    backgroundColor: '#ff4d4f',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  cancelButtonText: { 
    color: '#fff', 
    fontSize: 14, 
    fontWeight: '600' 
  },
  bottomNav: { 
    flexDirection: 'row', 
    backgroundColor: '#fff', 
    borderTopWidth: 1, 
    borderTopColor: '#e0e0e0',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 0,
    paddingVertical: 12,
    height: 70,
  },
  navItem: { 
    flex: 1, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  navIcon: { 
    width: 24, 
    height: 24, 
    resizeMode: 'contain',
    marginBottom: 4,
  },
  navText: { 
    fontSize: 12, 
    color: '#333', 
    fontWeight: '500',
  },
});

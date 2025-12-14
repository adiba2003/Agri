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
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Icons
import homeIcon from '@/assets/home-icon.png';
import productsIcon from '@/assets/products-icon.png';
import cartIcon from '@/assets/cart.png';
import ordersIcon from '@/assets/orders.png';

export default function BuyerOrder() {
  const [activeNav, setActiveNav] = useState('অর্ডার');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const storedOrders = await AsyncStorage.getItem('orders');
      
      if (storedOrders) {
        const parsedOrders = JSON.parse(storedOrders);
        
        // Filter out any null or invalid orders এবং status ensure করুন
        const validOrders = Array.isArray(parsedOrders) 
          ? parsedOrders
              .filter(order => order && order.orderId)
              .map(order => ({
                ...order,
                status: order.status || 'pending' // ✅ Default status set করুন
              }))
          : [];
          
        setOrders(validOrders);
      } else {
        setOrders([]);
      }
      setLoading(false);
    } catch (err) {
      console.log('Error loading orders:', err);
      setLoading(false);
      Alert.alert('ত্রুটি', 'অর্ডার লোড করতে ব্যর্থ হয়েছে');
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadOrders().then(() => setRefreshing(false));
  }, []);

  const saveOrders = async (updatedOrders) => {
    try {
      await AsyncStorage.setItem('orders', JSON.stringify(updatedOrders));
      setOrders(updatedOrders);
    } catch (err) {
      console.log('Error saving orders:', err);
      Alert.alert('ত্রুটি', 'অর্ডার সংরক্ষণ করতে ব্যর্থ হয়েছে');
    }
  };

  const confirmCancel = (order) => {
    Alert.alert(
      'অর্ডার বাতিল করবেন?',
      `আপনি কি নিশ্চিত যে অর্ডার #${order.displayOrderId} বাতিল করতে চান?\n\nএই কাজটি পূর্বাবস্থায় ফেরানো যাবে না।`,
      [
        { text: 'না', style: 'cancel' },
        { 
          text: 'হ্যাঁ, বাতিল করুন', 
          style: 'destructive',
          onPress: () => handleCancelOrder(order) 
        },
      ],
      { cancelable: true }
    );
  };

  const handleCancelOrder = async (orderToCancel) => {
    try {
      // Order টি filter করে বাদ দেই
      const updatedOrders = orders.filter(order => order.orderId !== orderToCancel.orderId);
      
      // AsyncStorage থেকে delete করি
      await AsyncStorage.setItem('orders', JSON.stringify(updatedOrders));
      
      // State update করি
      setOrders(updatedOrders);
      
      Alert.alert('সফল', `অর্ডার #${orderToCancel.displayOrderId} বাতিল করা হয়েছে`);
      
    } catch (err) {
      console.log('Cancel error', err);
      Alert.alert('ত্রুটি', 'অর্ডার বাতিল করতে ব্যর্থ হয়েছে। আবার চেষ্টা করুন।');
    }
  };

  // CLEAR ALL ORDERS (for testing/debugging)
  const clearAllOrders = async () => {
    Alert.alert(
      'সব অর্ডার মুছবেন?',
      'আপনি কি নিশ্চিত যে সব অর্ডার মুছতে চান? এই কাজটি পূর্বাবস্থায় ফেরানো যাবে না।',
      [
        { text: 'না', style: 'cancel' },
        { 
          text: 'হ্যাঁ, সব মুছুন', 
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('orders');
              setOrders([]);
              Alert.alert('সফল', 'সব অর্ডার মুছে ফেলা হয়েছে');
            } catch (err) {
              console.log('Clear error:', err);
              Alert.alert('ত্রুটি', 'অর্ডার মুছতে ব্যর্থ হয়েছে');
            }
          }
        },
      ]
    );
  };

  const navItems = [
    { name: 'হোম', image: homeIcon, route: 'BuyerDashboard' },
    { name: 'পণ্য', image: productsIcon, route: 'BuyerBrowse' },
    { name: 'কার্ট', image: cartIcon, route: 'Cart' },
    { name: 'অর্ডার', image: ordersIcon, route: 'BuyerOrder' },
  ];

  const handleNavPress = (item) => {
    setActiveNav(item.name);
    router.push(`/${item.route}`);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.loadingText}>অর্ডার লোড হচ্ছে...</Text>
      </View>
    );
  }

  // সব orders একসাথে sort করি (নতুন order উপরে)
  const sortedOrders = [...orders].sort((a, b) => 
    new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4CAF50" />

      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#4CAF50']}
            tintColor="#4CAF50"
          />
        }
      >
        <View style={styles.headerSection}>
          <View>
            <Text style={styles.pageTitle}>আমার অর্ডারসমূহ</Text>
            <Text style={styles.pageSubtitle}>আপনার অর্ডারের অবস্থা এবং ইতিহাস দেখুন</Text>
          </View>
          
          {orders.length > 0 && (
            <TouchableOpacity onPress={clearAllOrders} style={styles.clearButton}>
              <Text style={styles.clearButtonText}>সব মুছুন</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{orders.length}</Text>
            <Text style={styles.statLabel}>মোট অর্ডার</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, styles.pendingStat]}>
              {orders.filter(o => o.status === 'pending').length}
            </Text>
            <Text style={styles.statLabel}>পেন্ডিং</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, styles.processingStat]}>
              {orders.filter(o => o.status === 'processing').length}
            </Text>
            <Text style={styles.statLabel}>প্রক্রিয়াধীন</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, styles.cancelledStat]}>
              {orders.filter(o => o.status === 'cancelled').length}
            </Text>
            <Text style={styles.statLabel}>বাতিল</Text>
          </View>
        </View>

        {orders.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>কোন অর্ডার নেই</Text>
            <Text style={styles.emptySubtext}>আপনার অর্ডারগুলো এখানে দেখানো হবে</Text>
            <TouchableOpacity
              style={styles.browseButton}
              onPress={() => router.push('/BuyerBrowse')}
            >
              <Text style={styles.browseButtonText}>পণ্য ব্রাউজ করুন</Text>
            </TouchableOpacity>
          </View>
        ) : (
          sortedOrders.map((order) => (
            <OrderCard 
              key={order.orderId} 
              order={order} 
              onCancel={order.status === 'pending' ? confirmCancel : null} 
            />
          ))
        )}
        
        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        {navItems.map((item, index) => {
          const isActive = activeNav === item.name;
          return (
            <TouchableOpacity
              key={index}
              style={[styles.navItem, isActive && styles.activeNavItem]}
              onPress={() => handleNavPress(item)}
            >
              <View style={styles.navIconContainer}>
                <Image 
                  source={item.image} 
                  style={styles.navIcon}
                />
              </View>
              <Text style={[
                styles.navText, 
                isActive && styles.activeNavText
              ]}>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

// Separate Order Card Component
const OrderCard = ({ order, onCancel }) => {
  const totalAmount = order.items?.reduce((sum, item) => {
    return sum + (item.price * (item.quantity || 1));
  }, 0) || (order.price * (order.quantity || 1));

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return '#FFA726';
      case 'processing': return '#29B6F6';
      case 'completed': return '#4CAF50';
      case 'cancelled': return '#F44336';
      default: return '#757575';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'pending': return 'পেন্ডিং';
      case 'processing': return 'প্রক্রিয়াধীন';
      case 'completed': return 'সম্পূর্ণ';
      case 'cancelled': return 'বাতিল';
      default: return status;
    }
  };

  return (
    <View style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <View style={styles.orderInfo}>
          <Text style={styles.orderNumber}>অর্ডার #{order.displayOrderId}</Text>
          <Text style={styles.orderDate}>
            {new Date(order.createdAt).toLocaleDateString('en-BD', { 
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </Text>
        </View>
        <View style={[
          styles.statusBadge,
          { backgroundColor: getStatusColor(order.status) }
        ]}>
          <Text style={styles.statusText}>
            {getStatusText(order.status)}
          </Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.orderItems}>
        {order.items?.map((item, idx) => (
          <View key={`${order.orderId}-${idx}`} style={styles.orderItem}>
            <Text style={styles.itemName}>
              {item.name} 
              {item.quantity > 1 ? ` (${item.quantity} কেজি)` : ' (১ কেজি)'}
            </Text>
            <Text style={styles.itemPrice}>
              ৳{(item.price * (item.quantity || 1)).toFixed(2)}
            </Text>
            {item.category && (
              <Text style={styles.itemCategory}>{item.category}</Text>
            )}
          </View>
        ))}
      </View>

      <View style={styles.orderFooter}>
        <View style={styles.totalSection}>
          <Text style={styles.totalLabel}>মোট:</Text>
          <Text style={styles.totalAmount}>৳{totalAmount.toFixed(2)}</Text>
        </View>

        {order.status === 'pending' && onCancel && (
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => onCancel(order)}
          >
            <Text style={styles.cancelButtonText}>বাতিল করুন</Text>
          </TouchableOpacity>
        )}
        
        {order.status === 'processing' && (
          <View style={styles.processingMessage}>
            <Text style={styles.processingText}>কৃষক অর্ডারটি প্রক্রিয়া করছেন</Text>
          </View>
        )}
        
        {order.status === 'cancelled' && (
          <View style={styles.cancelledMessage}>
            <Text style={styles.cancelledText}>অর্ডারটি বাতিল করা হয়েছে</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f8f9fa' 
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  headerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  clearButton: {
    backgroundColor: '#F44336',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  content: { 
    flex: 1, 
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 80,
  },
  pageTitle: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#2c3e50', 
    marginBottom: 4 
  },
  pageSubtitle: { 
    fontSize: 14, 
    color: '#666',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  pendingStat: {
    color: '#FFA726',
  },
  processingStat: {
    color: '#29B6F6',
  },
  cancelledStat: {
    color: '#F44336',
  },
  statLabel: {
    fontSize: 10,
    color: '#666',
    marginTop: 4,
    textAlign: 'center',
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
    marginBottom: 20,
  },
  browseButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  browseButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orderCard: { 
    backgroundColor: '#fff', 
    borderRadius: 12, 
    padding: 16, 
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  orderHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  orderInfo: {
    flex: 1,
    marginRight: 10,
  },
  orderNumber: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#2c3e50',
    marginBottom: 4,
  },
  orderDate: { 
    fontSize: 13, 
    color: '#666',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    minWidth: 70,
    alignItems: 'center',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#fff',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginBottom: 12,
  },
  orderItems: { 
    marginBottom: 12,
  },
  orderItem: { 
    marginBottom: 10,
    padding: 8,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  itemName: { 
    fontSize: 14, 
    color: '#333', 
    fontWeight: '500',
    marginBottom: 4,
  },
  itemPrice: { 
    fontSize: 14, 
    fontWeight: '600', 
    color: '#2c3e50',
    marginBottom: 2,
  },
  itemCategory: {
    fontSize: 11,
    color: '#666',
    fontStyle: 'italic',
  },
  orderFooter: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginTop: 5,
  },
  totalSection: { 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  totalLabel: { 
    fontSize: 15, 
    color: '#666', 
    marginRight: 8,
    fontWeight: '500',
  },
  totalAmount: { 
    fontSize: 17, 
    fontWeight: 'bold', 
    color: '#2c3e50' 
  },
  cancelButton: {
    backgroundColor: '#ff4d4f',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  cancelButtonText: { 
    color: '#fff', 
    fontSize: 13, 
    fontWeight: '600' 
  },
  processingMessage: {
    backgroundColor: '#E1F5FE',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  processingText: {
    color: '#0277bd',
    fontSize: 12,
    fontWeight: '500',
  },
  cancelledMessage: {
    backgroundColor: '#FFEBEE',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  cancelledText: {
    color: '#c62828',
    fontSize: 12,
    fontWeight: '500',
  },
  bottomSpacer: {
    height: 20,
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
    paddingVertical: 10,
    height: 70,
  },
  navItem: { 
    flex: 1, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeNavItem: {
    // শুধু text color change হবে, কোনো background বা
  },
  navIconContainer: {
    marginBottom: 4,
  },
  navIcon: { 
    width: 24, 
    height: 24,
  },
  navText: { 
    fontSize: 11, 
    color: '#666', 
    fontWeight: '500',
  },
  activeNavText: { 
    color: '#4CAF50', 
    fontWeight: 'bold' 
  },
});
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  Alert,
} from "react-native";
import { router } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';

// ✅ Import all images at the top
import backArrow from "@/assets/back-arrow.png";
import notificationIconImg from "@/assets/notification.png";
import homeIcon from "@/assets/home-icon.png";
import productsIcon from "@/assets/products-icon.png";
import weatherIcon from "@/assets/weather.png";
import helpIcon from "@/assets/help.png";
import ordersIcon from "@/assets/orders.png";

export default function FarmerOrders() {
  const [activeNav, setActiveNav] = useState("Orders");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const stored = await AsyncStorage.getItem('orders');
      const parsed = stored ? JSON.parse(stored) : [];
      console.log('Fetched orders for farmer:', parsed);
      setOrders(parsed);
    } catch (err) {
      console.log('Error fetching orders:', err);
    }
  };

  // Generate random order ID for display
  const generateRandomOrderId = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
  };

  // Group orders by category for farmer view
  const getFarmerOrders = () => {
    const farmerOrders = [];
    
    orders.forEach(order => {
      if (order.items && order.items.length > 0) {
        // Group items by category
        const itemsByCategory = {};
        
        order.items.forEach(item => {
          const category = item.category || 'General';
          if (!itemsByCategory[category]) {
            itemsByCategory[category] = {
              orderId: order.orderId + '-' + category,
              originalOrderId: order.orderId,
              displayOrderId: generateRandomOrderId(),
              category: category,
              items: [],
              totalAmount: 0,
              createdAt: order.createdAt,
              deliveryLocation: getRandomLocation(),
              status: item.status || 'New Order' // Use item status if exists
            };
          }
          itemsByCategory[category].items.push(item);
          itemsByCategory[category].totalAmount += item.price * item.quantity;
        });
        
        // Add category-wise orders to the list
        Object.values(itemsByCategory).forEach(catOrder => {
          farmerOrders.push(catOrder);
        });
      }
    });
    
    return farmerOrders;
  };

  // Helper functions for demo data
  const getRandomLocation = () => {
    const locations = ['Dhaka', 'Chittagong', 'Sylhet', 'Rajshahi', 'Khulna'];
    return locations[Math.floor(Math.random() * locations.length)];
  };

  const handleAcceptOrder = async (order) => {
    try {
      const updatedOrders = orders.map(mainOrder => {
        if (String(mainOrder.orderId) === String(order.originalOrderId)) {
          // Update status for items in this category
          const updatedItems = mainOrder.items.map(item => {
            const itemCategory = item.category || 'General';
            if (itemCategory === order.category) {
              return { ...item, status: 'Processing' };
            }
            return item;
          });
          
          return { ...mainOrder, items: updatedItems };
        }
        return mainOrder;
      });

      await AsyncStorage.setItem('orders', JSON.stringify(updatedOrders));
      setOrders(updatedOrders);
      Alert.alert('Order Accepted', `Order #${order.displayOrderId} has been accepted and is now processing!`);
      
    } catch (err) {
      console.log('Error accepting order:', err);
      Alert.alert('Error', 'Failed to accept order');
    }
  };

  const handleDeclineOrder = async (order) => {
    try {
      const updatedOrders = orders.map(mainOrder => {
        if (String(mainOrder.orderId) === String(order.originalOrderId)) {
          // Update status for items in this category
          const updatedItems = mainOrder.items.map(item => {
            const itemCategory = item.category || 'General';
            if (itemCategory === order.category) {
              return { ...item, status: 'Declined' };
            }
            return item;
          });
          
          return { ...mainOrder, items: updatedItems };
        }
        return mainOrder;
      });

      await AsyncStorage.setItem('orders', JSON.stringify(updatedOrders));
      setOrders(updatedOrders);
      Alert.alert('Order Declined', `Order #${order.displayOrderId} has been declined!`);
      
    } catch (err) {
      console.log('Error declining order:', err);
      Alert.alert('Error', 'Failed to decline order');
    }
  };

  const farmerOrders = getFarmerOrders();
  const newOrders = farmerOrders.filter(order => 
    !order.items.some(item => item.status === 'Processing' || item.status === 'Declined')
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4CAF50" />

      {/* Header */}
      <View style={styles.header}>
        {/* <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Image source={backArrow} style={styles.backIcon} />
        </TouchableOpacity> */}
        
        {/* <View style={styles.logoBox}>
          <Text style={styles.logoText}>F</Text>
        </View> */}
        
        <View style={styles.headerText}>
          <Text style={styles.appName}>FarmAssist</Text>
          <Text style={styles.subtitle}>Farmer Portal</Text>
        </View>
        
        <View style={styles.notificationContainer}>
          <Image source={notificationIconImg} style={styles.notificationIcon} />
          <View style={styles.headerNotificationBadge}>
            <Text style={styles.headerNotificationText}>{newOrders.length}</Text>
          </View>
        </View>
      </View>

      {/* Scrollable Orders Section */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.screenTitle}>Order Management</Text>
        <Text style={styles.screenSubtitle}>
          Process and track customer orders
        </Text>

        {farmerOrders.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No orders yet</Text>
            <Text style={styles.emptySubtext}>Customer orders will appear here</Text>
          </View>
        ) : (
          farmerOrders.map((order, index) => {
            const hasProcessing = order.items.some(item => item.status === 'Processing');
            const hasDeclined = order.items.some(item => item.status === 'Declined');
            const isNewOrder = !hasProcessing && !hasDeclined;

            return (
              <View key={order.orderId}>
                {/* Order Card */}
                <View style={styles.orderCard}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.orderId}>Order #{order.displayOrderId}</Text>
                    
                    {order.items?.map((item, idx) => (
                      <View key={idx} style={styles.orderProductRow}>
                        <View style={styles.productInfo}>
                          <Text style={styles.orderName}>
                            {item.name} - {item.quantity}kg
                          </Text>
                          <Text style={styles.orderDetails}>
                            ৳{item.price * item.quantity} • Delivery: {order.deliveryLocation}
                          </Text>
                        </View>
                      </View>
                    ))}
                  </View>
                  
                  {/* Status Badge */}
                  <View style={[
                    styles.statusBadge,
                    isNewOrder && styles.newOrderBadge,
                    hasProcessing && styles.processingBadge,
                    hasDeclined && styles.declinedBadge
                  ]}>
                    <Text style={styles.badgeText}>
                      {hasDeclined ? 'Declined' : hasProcessing ? 'Processing' : 'New Order'}
                    </Text>
                  </View>
                </View>

                {/* Action Buttons - Only show for new orders */}
                {isNewOrder ? (
                  <View style={styles.actionRow}>
                    <TouchableOpacity 
                      style={styles.acceptBtn}
                      onPress={() => handleAcceptOrder(order)}
                    >
                      <Text style={styles.acceptText}>Accept Order</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={styles.declineBtn}
                      onPress={() => handleDeclineOrder(order)}
                    >
                      <Text style={styles.declineText}>Decline</Text>
                    </TouchableOpacity>
                  </View>
                ) : hasProcessing ? (
                  <TouchableOpacity style={styles.shipBtn}>
                    <Text style={styles.shipText}>Mark as Shipped</Text>
                  </TouchableOpacity>
                ) : null}

                {/* Divider between orders */}
                {index < farmerOrders.length - 1 && <View style={styles.divider} />}
              </View>
            );
          })
        )}
      </ScrollView>

      {/* Fixed Bottom Navigation */}
      <View style={styles.bottomNav}>
        {[
          { name: "Home", image: homeIcon, route: "/FarmerDashboard" },
          { name: "Products", image: productsIcon, route: "/FarmerProducts" },
          { name: "Weather", image: weatherIcon, route: "/Calendar" },
          { name: "Help", image: helpIcon, route: "/FAi" },
          { name: "Orders", image: ordersIcon, notification: newOrders.length, route: "/FarmerOrders" },
        ].map((item, index) => {
          const isActive = activeNav === item.name;
          return (
            <TouchableOpacity
              key={index}
              style={[styles.navItem, isActive && styles.activeNavItem]}
              onPress={() => {
                setActiveNav(item.name);
                router.push(item.route);
              }}
            >
              <View style={{ position: "relative" }}>
                <Image source={item.image} style={styles.navIcon} />
                {item.notification && item.notification > 0 && (
                  <View style={styles.notificationBadge}>
                    <Text style={styles.notificationText}>
                      {item.notification}
                    </Text>
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

// ✅ Updated Styles with status colors
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    paddingTop: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  backButton: { marginRight: 10 },
  backIcon: { width: 24, height: 24, resizeMode: "contain" },
  logoBox: {
    backgroundColor: "#28a745",
    width: 50,
    height: 50,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  logoText: { color: "#fff", fontSize: 22, fontWeight: "bold" },
  headerText: { flex: 1 },
  appName: { fontSize: 18, fontWeight: "bold", color: "#000" },
  subtitle: { fontSize: 13, color: "#666" },
  notificationContainer: { position: "relative" },
  notificationIcon: { width: 28, height: 28, resizeMode: "contain" },
  headerNotificationBadge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "red",
    borderRadius: 8,
    paddingHorizontal: 4,
    minWidth: 16,
    height: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  headerNotificationText: { color: "#fff", fontSize: 10, fontWeight: "bold" },
  content: { flex: 1, padding: 20, marginBottom: 70 },
  screenTitle: { 
    fontSize: 24, 
    fontWeight: "bold", 
    color: "#2c3e50",
    marginBottom: 4 
  },
  screenSubtitle: { 
    fontSize: 16, 
    color: "#666", 
    marginBottom: 20 
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 60,
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: "#666",
    fontWeight: "600",
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
  },
  orderCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  orderId: { 
    fontSize: 18, 
    fontWeight: "bold", 
    color: "#2c3e50",
    marginBottom: 12 
  },
  orderProductRow: { 
    flexDirection: "row", 
    alignItems: "center",
    marginBottom: 8,
  },
  productInfo: {
    flex: 1,
  },
  orderName: { 
    fontSize: 15, 
    fontWeight: "600", 
    color: "#333",
    marginBottom: 2 
  },
  orderDetails: { 
    fontSize: 13, 
    color: "#666" 
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  newOrderBadge: {
    backgroundColor: "#FFEE93",
  },
  processingBadge: {
    backgroundColor: "#BBDEFB",
  },
  declinedBadge: {
    backgroundColor: "#FFCDD2",
  },
  badgeText: { 
    fontSize: 12, 
    fontWeight: "600", 
    color: "#444" 
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    gap: 10,
  },
  acceptBtn: {
    flex: 1,
    backgroundColor: "#C8E6C9",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  declineBtn: {
    flex: 1,
    backgroundColor: "#FFCDD2",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  acceptText: { 
    color: "#2e7d32", 
    fontWeight: "600",
    fontSize: 14 
  },
  declineText: { 
    color: "#c62828", 
    fontWeight: "600",
    fontSize: 14 
  },
  shipBtn: {
    backgroundColor: "#E1F5FE",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  shipText: { 
    color: "#0277bd", 
    fontWeight: "600",
    fontSize: 14 
  },
  divider: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginVertical: 16,
  },
  bottomNav: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingVertical: 10,
    paddingHorizontal: 5,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    marginHorizontal: 5,
    borderRadius: 10,
  },
  activeNavItem: { backgroundColor: "#eaf8ea" },
  navIcon: { width: 24, height: 24, marginBottom: 4, resizeMode: "contain" },
  navText: { fontSize: 12, color: "#666", fontWeight: "500" },
  activeNavText: { color: "#4CAF50", fontWeight: "bold" },
  notificationBadge: {
    position: "absolute",
    top: -5,
    right: -10,
    backgroundColor: "red",
    borderRadius: 8,
    paddingHorizontal: 4,
    minWidth: 16,
    height: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  notificationText: { color: "#fff", fontSize: 10, fontWeight: "bold" },
});
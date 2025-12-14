import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

// Bottom Nav Icons
import homeIcon from "@/assets/home-icon.png";
import productsIcon from "@/assets/products-icon.png";
import cartIcon from "@/assets/cart.png";
import ordersIcon from "@/assets/orders.png";

// Product images
import rice from "@/assets/rice.png";
import carrot from "@/assets/carrot.png";
import tomato from "@/assets/tomato.png";
import potato from "@/assets/potato.png";
import mango from "@/assets/mango.png";
import milk from "@/assets/milk.png";
import eggs from "@/assets/eggs.png";

// Image map
const imageMap = {
  "rice.png": rice,
  "carrot.png": carrot,
  "tomato.png": tomato,
  "potato.png": potato,
  "mango.png": mango,
  "milk.png": milk,
  "eggs.png": eggs,
};

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);

  const loadCart = async () => {
    try {
      const stored = await AsyncStorage.getItem("cart");
      setCartItems(stored ? JSON.parse(stored) : []);
    } catch (error) {
      console.log("Error loading cart:", error);
      setCartItems([]);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const saveCart = async (updated) => {
    try {
      await AsyncStorage.setItem("cart", JSON.stringify(updated));
      setCartItems(updated);
    } catch (error) {
      console.log("Error saving cart:", error);
    }
  };

  // ======================================
  // 🔥 BACKEND UPDATE FUNCTION
  // ======================================
  const updateBackendQuantity = async (item) => {
    try {
      await fetch(
        `http://192.168.0.107:5000/api/product/update-quantity/${item.productId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            quantity: item.quantity,
          }),
        }
      );
    } catch (err) {
      console.log("Backend update error:", err);
    }
  };

  // ======================================
  // 🔼 Quantity Increase / 🔽 Decrease
  // ======================================
  const updateQuantity = async (id, delta) => {
    try {
      const updated = cartItems.map((item) => {
        if (item.productId === id) {
          let newQty = Math.max(1, item.quantity + delta);
          let updatedItem = { ...item, quantity: newQty };

          // Update backend
          updateBackendQuantity(updatedItem);

          return updatedItem;
        }
        return item;
      });

      await saveCart(updated);
    } catch (error) {
      console.log("Error updating quantity:", error);
    }
  };

  // ======================================
  // ❌ REMOVE FROM CART (LOCAL + DATABASE)
  // ======================================
  const removeFromCart = async (productId) => {
    try {
      // FRONTEND REMOVE
      let updatedCart = cartItems.filter((item) => item.productId !== productId);
      await saveCart(updatedCart);

      // BACKEND REMOVE
      const res = await fetch(
        `http://192.168.0.107:5000/api/product/remove-from-cart/${productId}`,
        { method: "DELETE" }
      );

      if (!res.ok) console.log("Backend remove failed");
    } catch (err) {
      console.error("Remove error:", err);
    }
  };

  const totalPrice = cartItems
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

// Cart.jsx - checkout function আপডেট করুন
const proceedToCheckout = async () => {
  try {
    if (cartItems.length === 0) {
      Alert.alert("কার্ট খালি", "দয়া করে কার্টে কিছু পণ্য যোগ করুন");
      return;
    }

    const totalAmount = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    // Order object তৈরি করুন
    const newOrder = {
      orderId: Date.now().toString(),
      displayOrderId: Math.floor(100000 + Math.random() * 900000).toString(),
      createdAt: new Date().toISOString(),
      status: "pending",
      items: cartItems.map(item => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        category: item.category || 'General',
        farmer: item.farmer,
        location: item.location
      })),
      totalAmount,
    };

    // AsyncStorage-এ order save করুন
    const existingOrders = await AsyncStorage.getItem('orders');
    const parsedOrders = existingOrders ? JSON.parse(existingOrders) : [];
    parsedOrders.push(newOrder);
    await AsyncStorage.setItem('orders', JSON.stringify(parsedOrders));

    // কার্ট clear করুন
    await AsyncStorage.removeItem('cart');
    setCartItems([]);

    // Success message show করুন
    Alert.alert(
      "সফল!",
      `অর্ডার #${newOrder.displayOrderId} সফলভাবে প্লেস করা হয়েছে!`,
      [
        { 
          text: "অর্ডার দেখুন", 
          onPress: () => router.push("/BuyerOrder") 
        },
        { 
          text: "ঠিক আছে", 
          style: "cancel" 
        }
      ]
    );

  } catch (error) {
    console.log("Checkout Error:", error);
    Alert.alert("ত্রুটি", "চেকআউট প্রক্রিয়ায় ত্রুটি হয়েছে");
  }
};

  const renderItem = ({ item }) => {
    const imageSource = imageMap[item.imageName] ?? rice;

    return (
      <View style={styles.itemCard}>
        <Image source={imageSource} style={styles.image} />

        <View style={styles.info}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.price}>৳{item.price} প্রতি কেজি</Text>

          <View style={styles.quantityRow}>
            <TouchableOpacity
              onPress={() => updateQuantity(item.productId, -1)}
              style={styles.qtyBtn}
            >
              <Text style={styles.qtyBtnText}>-</Text>
            </TouchableOpacity>

            <Text style={styles.qtyValue}>{item.quantity} কেজি</Text>

            <TouchableOpacity
              onPress={() => updateQuantity(item.productId, 1)}
              style={styles.qtyBtn}
            >
              <Text style={styles.qtyBtnText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* REMOVE BUTTON */}
        <TouchableOpacity
          onPress={() => removeFromCart(item.productId)}
          style={styles.removeBtn}
        >
          <Text style={styles.removeText}>মুছুন</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <FlatList
          data={cartItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.productId?.toString() || Math.random().toString()}
          ListHeaderComponent={
            <Text style={styles.cartTitle}>আপনার কার্ট</Text>
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>আপনার কার্ট খালি!</Text>
              <TouchableOpacity
                style={styles.browseButton}
                onPress={() => router.push("/BuyerBrowse")}
              >
                <Text style={styles.browseButtonText}>পণ্য ব্রাউজ করুন</Text>
              </TouchableOpacity>
            </View>
          }
          contentContainerStyle={{ paddingBottom: 150 }}
        />
      </View>

      {/* Checkout Bar - Only show if cart has items */}
      {cartItems.length > 0 && (
        <View style={styles.checkoutBar}>
          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>মোট:</Text>
            <Text style={styles.totalPrice}>৳{totalPrice}</Text>
          </View>

          <TouchableOpacity
            style={styles.checkoutBtn}
            onPress={proceedToCheckout}
          >
            <Text style={styles.checkoutText}>চেকআউট করুন</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        {[
          { name: "হোম", image: homeIcon, route: "BuyerDashboard" },
          { name: "পণ্য", image: productsIcon, route: "BuyerBrowse" },
          {
            name: "কার্ট",
            image: cartIcon,
            route: "Cart",
            notification: cartItems.reduce((acc, item) => acc + item.quantity, 0),
          },
          { name: "অর্ডার", image: ordersIcon, route: "BuyerOrder" },
        ].map((item, index) => {
          const isActive = item.name === "কার্ট";
          return (
            <TouchableOpacity
              key={index}
              style={[styles.navItem, isActive && styles.activeNavItem]}
              onPress={() => router.push(`/${item.route}`)}
            >
              <View style={{ position: 'relative' }}>
                <Image source={item.image} style={styles.navIcon} />

                {item.notification > 0 && item.name === "কার্ট" && (
                  <View style={styles.notificationBadge}>
                    <Text style={styles.notificationText}>
                      {item.notification}
                    </Text>
                  </View>
                )}
              </View>

              <Text
                style={[styles.navText, isActive && styles.activeNavText]}
              >
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
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
  },
  emptyText: {
    textAlign: "center",
    fontSize: 18,
    color: "#666",
    marginBottom: 20,
  },
  browseButton: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  browseButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  cartTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop:-2,
    color: "#2c3e50",
    textAlign: "Left",
  },

  itemCard: {
    flexDirection: "row",
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e9ecef",
  },

  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 12,
    resizeMode: "contain",
    backgroundColor: "#fff",
  },

  info: { 
    flex: 1,
    marginRight: 10,
  },
  name: { 
    fontSize: 15, 
    fontWeight: "bold", 
    marginBottom: 4, 
    color: "#333" 
  },
  price: { 
    fontSize: 14, 
    color: "#4CAF50", 
    marginBottom: 10,
    fontWeight: "500",
  },

  quantityRow: { 
    flexDirection: "row", 
    alignItems: "center" 
  },
  qtyBtn: {
    width: 30,
    height: 30,
    backgroundColor: "#e9ecef",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
  },
  qtyBtnText: { 
    fontSize: 16, 
    fontWeight: "bold", 
    color: "#333" 
  },
  qtyValue: { 
    marginHorizontal: 10, 
    fontSize: 15, 
    fontWeight: "500", 
    color: "#222",
    minWidth: 30,
    textAlign: "center",
  },

  removeBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: "#ff4d4f",
    borderRadius: 6,
  },
  removeText: { 
    color: "#fff", 
    fontWeight: "bold", 
    fontSize: 11 
  },

  checkoutBar: {
    position: "absolute",
    bottom: 70,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    padding: 15,
    borderTopWidth: 1,
    borderColor: "#ddd",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },

  totalContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  totalLabel: { 
    fontSize: 16, 
    fontWeight: "600", 
    color: "#444",
    marginRight: 5,
  },
  totalPrice: { 
    fontSize: 18, 
    fontWeight: "bold", 
    color: "#4CAF50" 
  },

  checkoutBtn: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  checkoutText: { 
    color: "#fff", 
    fontSize: 15, 
    fontWeight: "bold" 
  },

  bottomNav: {
    flexDirection: "row",
    backgroundColor: "#f8f9fa",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingVertical: 10,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },

  navItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
  },
  activeNavItem: { 
    backgroundColor: "#eaf8ea",
    borderRadius: 8,
  },
  navIcon: { 
    width: 24, 
    height: 24, 
    marginBottom: 4, 
    resizeMode: "contain" 
  },
  navText: { 
    fontSize: 11, 
    color: "#333", 
    fontWeight: "500", 
    textAlign: "center" 
  },
  activeNavText: { 
    color: "#4CAF50", 
    fontWeight: "bold" 
  },

  notificationBadge: {
    position: "absolute",
    top: -5,
    right: -8,
    backgroundColor: "red",
    borderRadius: 8,
    paddingHorizontal: 4,
    minWidth: 16,
    height: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  notificationText: { 
    color: "#fff", 
    fontSize: 9, 
    fontWeight: "bold" 
  },
});
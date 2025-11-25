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
    const stored = await window.localStorage.getItem("cart");
    setCartItems(stored ? JSON.parse(stored) : []);
  };

  useEffect(() => {
    loadCart();
  }, []);

  const saveCart = async (updated) => {
    await AsyncStorage.setItem("cart", JSON.stringify(updated));
    setCartItems(updated);
  };

  // ======================================
  // 🔥 BACKEND UPDATE FUNCTION
  // ======================================
const updateBackendQuantity = async (item) => {
  try {
    await fetch(
      `http://localhost:5000/api/product/update-quantity/${item.productId}`,
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

    saveCart(updated);
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
      `http://localhost:5000/api/product/remove-from-cart/${productId}`,
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

const proceedToCheckout = async () => {
  try {
    const orderId = Date.now().toString(); // unique ID

    const totalAmount = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    const res = await fetch("http://localhost:5000/api/product/get-cart-item");
    const data = await res.json();
    console.log("Cart items from backend:", data);



    // ================================
    // 1️⃣ Create order object
    // ================================
    const newOrder = {
      orderId,
      createdAt: new Date().toISOString(),
      status: "Pending",
      items: cartItems,
      totalAmount,
    };

    // ================================
    // 2️⃣ Save to AsyncStorage (orders)
    // ================================
    const existingOrders = await window.localStorage.getItem("orders");
    const parsedOrders = existingOrders ? JSON.parse(existingOrders) : [];

    parsedOrders.push(newOrder);

    await AsyncStorage.setItem("orders", JSON.stringify(parsedOrders));

    // ================================
    // 3️⃣ Clear cart
    // ================================
    await AsyncStorage.removeItem("cart");
    setCartItems([]);

    // ================================
    // 4️⃣ Navigate to Orders page
    // ================================
    router.push("/BuyerOrder");

  } catch (error) {
    console.log("Checkout Error:", error);
  }
};





  const renderItem = ({ item }) => {
    const imageSource = imageMap[item.imageName] ?? rice;

    return (
      <View style={styles.itemCard}>
        <Image source={imageSource} style={styles.image} />

        <View style={styles.info}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.price}>৳{item.price} per kg</Text>

          <View style={styles.quantityRow}>
            <TouchableOpacity
              onPress={() => updateQuantity(item.productId, -1)}
              style={styles.qtyBtn}
            >
              <Text style={styles.qtyBtnText}>-</Text>
            </TouchableOpacity>

            <Text style={styles.qtyValue}>{item.quantity} kg</Text>

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
          <Text style={styles.removeText}>Remove</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <FlatList
          data={cartItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.productId.toString()}
          ListHeaderComponent={
            <Text style={styles.cartTitle}>Shopping Cart</Text>
          }
          ListEmptyComponent={
            <Text style={styles.emptyText}>Your cart is empty!</Text>
          }
          contentContainerStyle={{ paddingBottom: 150 }}
        />
      </View>

      {/* Checkout Bar */}
      <View style={styles.checkoutBar}>
        <Text style={styles.totalLabel}>Total:</Text>
        <Text style={styles.totalPrice}>৳{totalPrice}</Text>

        <TouchableOpacity
          style={styles.checkoutBtn}
          onPress={proceedToCheckout}
        >
          <Text style={styles.checkoutText}>Proceed to Checkout</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        {[
          { name: "Home", image: homeIcon, route: "BuyerDashboard" },
          { name: "Browse", image: productsIcon, route: "BuyerBrowse" },
          {
            name: "Cart",
            image: cartIcon,
            route: "Cart",
            tification: cartItems.length,
          },
          { name: "Orders", image: ordersIcon, route: "BuyerOrder" },
        ].map((item, index) => {
          const isActive = item.name === "Cart";
          return (
            <TouchableOpacity
              key={index}
              style={[styles.navItem, isActive && styles.activeNavItem]}
              onPress={() => router.push(`/${item.route}`)}
            >
              <Image source={item.image} style={styles.navIcon} />

              {item.notification > 0 && item.name === "Cart" && (
                <View style={styles.notificationBadge}>
                  <Text style={styles.notificationText}>
                    {item.notification}
                  </Text>
                </View>
              )}

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
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 18,
    color: "#666",
  },
  cartTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#2c3e50",
  },

  itemCard: {
    flexDirection: "row",
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    padding: 12,
    marginBottom: 15,
    alignItems: "center",
  },

  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 12,
    resizeMode: "contain",
  },

  info: { flex: 1 },
  name: { fontSize: 16, fontWeight: "bold", marginBottom: 4, color: "#333" },
  price: { fontSize: 14, color: "#4CAF50", marginBottom: 10 },

  quantityRow: { flexDirection: "row", alignItems: "center" },
  qtyBtn: {
    width: 30,
    height: 30,
    backgroundColor: "#e9ecef",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
  },
  qtyBtnText: { fontSize: 18, fontWeight: "bold", color: "#333" },
  qtyValue: { marginHorizontal: 10, fontSize: 16, fontWeight: "500", color: "#222" },

  removeBtn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#ff4d4f",
    borderRadius: 8,
  },
  removeText: { color: "#fff", fontWeight: "bold", fontSize: 12 },

  checkoutBar: {
    position: "absolute",
    bottom: 90,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    padding: 15,
    borderTopWidth: 1,
    borderColor: "#ddd",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  totalLabel: { fontSize: 18, fontWeight: "600", color: "#444" },
  totalPrice: { fontSize: 20, fontWeight: "bold", color: "#4CAF50" },

  checkoutBtn: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 10,
  },
  checkoutText: { color: "#fff", fontSize: 16, fontWeight: "bold" },

  bottomNav: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
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
    paddingVertical: 8,
    borderWidth: 2,
    borderColor: "transparent",
    borderRadius: 10,
    marginHorizontal: 5,
  },
  activeNavItem: { borderColor: "#4CAF50", backgroundColor: "#eaf8ea" },
  navIcon: { width: 28, height: 28, marginBottom: 5, resizeMode: "contain" },
  navText: { fontSize: 12, color: "#333", fontWeight: "500", textAlign: "center" },
  activeNavText: { color: "#4CAF50", fontWeight: "600" },

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

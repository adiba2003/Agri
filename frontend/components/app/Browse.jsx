import React, { useState, useMemo } from "react";
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
} from "react-native";
import { router } from "expo-router";

// PRODUCT IMAGES
import rice from "@/assets/rice.png";
import carrot from "@/assets/carrot.png";
import tomato from "@/assets/tomato.png";
import potato from "@/assets/potato.png";
import mango from "@/assets/mango.png";
import milk from "@/assets/milk.png";
import eggs from "@/assets/eggs.png";

// Icons
import starIcon from "@/assets/star-icon.webp";
import homeIcon from "@/assets/home-icon.png";
import productsIcon from "@/assets/products-icon.png";
import learnIcon from "@/assets/learn-icon.webp";
import chatIcon from "@/assets/chat-icon.png";

export default function Browse() {
  const [activeTab, setActiveTab] = useState("Products");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [sortBy, setSortBy] = useState("Newest First");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [detailsVisible, setDetailsVisible] = useState(false);

  // PRODUCTS DATA WITH HARVESTED DAYS
  const products = [
    {
      id: 1,
      name: "Premium Basmati Rice",
      farmer: "Rice Fields",
      price: 85,
      location: "Khulna",
      category: "Grains",
      image: rice,
      rating: 4.8,
      harvestedDays: 2,
    },
    {
      id: 2,
      name: "Fresh Carrots",
      farmer: "Green Valley Farms",
      price: 45,
      location: "Khulna",
      category: "Vegetables",
      image: carrot,
      rating: 4.9,
      harvestedDays: 1,
    },
    {
      id: 3,
      name: "Fresh Tomatoes",
      farmer: "Green Valley Farms",
      price: 60,
      location: "Dhaka",
      category: "Vegetables",
      image: tomato,
      rating: 4.5,
      harvestedDays: 5,
    },
    {
      id: 4,
      name: "Organic Potatoes",
      farmer: "Farm Fresh Co.",
      price: 85,
      location: "Chittagong",
      category: "Vegetables",
      image: potato,
      rating: 4.2,
      harvestedDays: 3,
    },
    {
      id: 5,
      name: "Sweet Mangoes",
      farmer: "Mango Garden",
      price: 80,
      location: "Rajshahi",
      category: "Fruits",
      image: mango,
      rating: 4.8,
      harvestedDays: 10,
    },
    {
      id: 6,
      name: "Fresh Milk",
      farmer: "Dairy Pure",
      price: 1.2,
      location: "Dhaka",
      category: "Dairy",
      image: milk,
      rating: 4.3,
      harvestedDays: 1,
    },
    {
      id: 7,
      name: "Eggs",
      farmer: "Happy Hens",
      price: 0.25,
      location: "Sylhet",
      category: "Poultry",
      image: eggs,
      rating: 4.6,
      harvestedDays: 4,
    },
  ];

  const categories = [
    "All Categories",
    "Vegetables",
    "Fruits",
    "Dairy",
    "Poultry",
    "Grains",
    "Spices",
  ];

  const locations = [
    "All Locations",
    "Dhaka",
    "Chittagong",
    "Rajshahi",
    "Khulna",
    "Sylhet",
    "Barisal",
  ];

  const sortOptions = [
    "Newest First",
    "Price: Low to High",
    "Price: High to Low",
    "Highest Rated",
    "Oldest First",
  ];

  // FILTER + SEARCH + SORT LOGIC
  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (searchQuery.trim() !== "") {
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.farmer.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== "All Categories") {
      result = result.filter((item) => item.category === selectedCategory);
    }

    if (selectedLocation !== "All Locations") {
      result = result.filter((item) => item.location === selectedLocation);
    }

    switch (sortBy) {
      case "Newest First":
        result.sort((a, b) => a.harvestedDays - b.harvestedDays);
        break;

      case "Oldest First":
        result.sort((a, b) => b.harvestedDays - a.harvestedDays);
        break;

      case "Price: Low to High":
        result.sort((a, b) => a.price - b.price);
        break;

      case "Price: High to Low":
        result.sort((a, b) => b.price - a.price);
        break;

      case "Highest Rated":
        result.sort((a, b) => b.rating - a.rating);
        break;
    }

    return result;
  }, [searchQuery, selectedCategory, selectedLocation, sortBy]);

  // PRODUCT CARD
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => {
        setSelectedProduct(item);
        setDetailsVisible(true);
      }}
    >
      <Image source={item.image} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.farmerName}>{item.farmer}</Text>

      <Text style={styles.priceText}>৳{item.price}</Text>

      <Text style={styles.locationText}>{item.location}</Text>

      <View style={styles.ratingRow}>
        <Image source={starIcon} style={styles.starIcon} />
        <Text style={styles.ratingText}>{item.rating}</Text>
        <Text style={styles.catText}>{item.category}</Text>
      </View>
    </TouchableOpacity>
  );

  // BOTTOM NAV
  const bottomNavItems = [
    { name: "Home", image: homeIcon, route: "GuestHome" },
    { name: "Products", image: productsIcon, route: "browse" },
    { name: "Learn", image: learnIcon, route: "LearnArti" },
    { name: "AI Chat", image: chatIcon, route: "Ai" },
  ];

  return (
    <View style={styles.container}>
      {/* PRODUCT DETAILS MODAL */}
      {selectedProduct && (
        <Modal visible={detailsVisible} animationType="slide" transparent>
          <View style={styles.modalOverlay}>
            <View style={styles.modalBox}>
              <Image
                source={selectedProduct.image}
                style={styles.modalImage}
              />

              <Text style={styles.modalTitle}>{selectedProduct.name}</Text>
              <Text style={styles.modalSubtitle}>
                Organic, fresh & pesticide-free
              </Text>

              <View style={styles.modalRatingRow}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <Image key={i} source={starIcon} style={styles.starIconLarge} />
                ))}
                <Text style={styles.modalRatingText}>
                  ({selectedProduct.rating} rating)
                </Text>
              </View>

              <View style={styles.infoBlock}>
                <Text style={styles.infoRow}>
                  Price per kg:
                  <Text style={styles.priceGreen}> ৳{selectedProduct.price}</Text>
                </Text>

                <Text style={styles.infoRow}>
                  Available: <Text style={styles.infoBold}>500 kg</Text>
                </Text>

                <Text style={styles.infoRow}>
                  Location: <Text style={styles.infoBold}>{selectedProduct.location}</Text>
                </Text>

                <Text style={styles.infoRow}>
                  Farmer: <Text style={styles.infoBold}>{selectedProduct.farmer}</Text>
                </Text>

                <Text style={styles.infoRow}>
                  Harvested:
                  <Text style={styles.infoBold}> {selectedProduct.harvestedDays} days ago</Text>
                </Text>
              </View>

              <View style={styles.guestBox}>
                <Text style={styles.guestText}>
                  Guest Mode: To purchase products, please sign in.
                </Text>
              </View>

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={styles.closeBtn}
                  onPress={() => setDetailsVisible(false)}
                >
                  <Text style={styles.closeBtnText}>Close</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.buyBtn}
                  onPress={() => router.push("/login")}
                >
                  <Text style={styles.buyBtnText}>Sign In to Purchase</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}

      {/* MAIN CONTENT */}
      <ScrollView style={styles.content}>
        <Text style={styles.title}>Browse Products</Text>

        <TextInput
          style={styles.searchInput}
          placeholder="Search products..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        <Text style={styles.filterTitle}>Categories</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((cat, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedCategory(cat)}
              style={[
                styles.chip,
                selectedCategory === cat && styles.activeChip,
              ]}
            >
              <Text
                style={[
                  styles.chipText,
                  selectedCategory === cat && styles.activeChipText,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.filterTitle}>Locations</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {locations.map((loc, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedLocation(loc)}
              style={[
                styles.chip,
                selectedLocation === loc && styles.activeChip,
              ]}
            >
              <Text
                style={[
                  styles.chipText,
                  selectedLocation === loc && styles.activeChipText,
                ]}
              >
                {loc}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.filterTitle}>Sort By</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {sortOptions.map((opt, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSortBy(opt)}
              style={[
                styles.chip,
                sortBy === opt && styles.activeChipBlue,
              ]}
            >
              <Text
                style={[
                  styles.chipText,
                  sortBy === opt && styles.activeChipBlueText,
                ]}
              >
                {opt}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <FlatList
          data={filteredProducts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          scrollEnabled={false}
          columnWrapperStyle={{ justifyContent: "space-between" }}
        />
      </ScrollView>

      {/* BOTTOM NAVIGATION */}
      <View style={styles.bottomNav}>
        {bottomNavItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              setActiveTab(item.name);
              router.push(`/${item.route}`);
            }}
            style={[
              styles.navItem,
              activeTab === item.name && styles.navActiveItem,
            ]}
          >
            <Image source={item.image} style={styles.navIcon} />
            <Text
              style={[
                styles.navText,
                activeTab === item.name && styles.navActiveText,
              ]}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

//////////////////////////////////////////////////
//              STYLES BELOW                  //
//////////////////////////////////////////////////

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  content: { padding: 20 },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#222",
  },

  searchInput: {
    backgroundColor: "#f2f2f2",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
  },

  filterTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
  },

  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: "#eee",
    borderRadius: 20,
    marginRight: 8,
  },

  chipText: {
    fontSize: 13,
    color: "#444",
  },

  activeChip: {
    backgroundColor: "#4CAF50",
  },

  activeChipText: {
    color: "#fff",
    fontWeight: "bold",
  },

  activeChipBlue: {
    backgroundColor: "#2196F3",
  },

  activeChipBlueText: {
    color: "#fff",
    fontWeight: "bold",
  },

  // PRODUCT CARD
  productCard: {
    backgroundColor: "#fff",
    width: "48%",
    marginBottom: 15,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#eee",
  },

  productImage: {
    width: "100%",
    height: 100,
    borderRadius: 8,
    resizeMode: "contain",
  },

  productName: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 8,
  },

  farmerName: { fontSize: 12, color: "#777" },

  priceText: { fontSize: 14, color: "#4CAF50", fontWeight: "bold" },

  locationText: { fontSize: 12, color: "#999", marginBottom: 4 },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  starIcon: { width: 14, height: 14 },

  ratingText: { fontSize: 12, color: "#444" },

  catText: {
    fontSize: 10,
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },

  /* MODAL STYLE */
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalBox: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
  },

  modalImage: {
    width: 120,
    height: 120,
    borderRadius: 20,
    alignSelf: "center",
    backgroundColor: "#ecf9ef",
    marginBottom: 10,
  },

  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "#222",
  },

  modalSubtitle: {
    textAlign: "center",
    color: "#666",
    marginBottom: 10,
  },

  modalRatingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },

  starIconLarge: {
    width: 20,
    height: 20,
    marginRight: 4,
  },

  modalRatingText: { color: "#777" },

  infoBlock: { marginVertical: 10 },

  infoRow: {
    fontSize: 16,
    color: "#444",
    marginBottom: 6,
  },

  infoBold: { fontWeight: "bold", color: "#222" },

  priceGreen: { color: "#28a745", fontWeight: "bold" },

  guestBox: {
    backgroundColor: "#e7f0ff",
    padding: 10,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: "#007bff",
    marginTop: 10,
  },

  guestText: { color: "#0056b3", fontSize: 13, textAlign: "center" },

  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },

  closeBtn: {
    width: "48%",
    backgroundColor: "#eee",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },

  closeBtnText: { color: "#444", fontSize: 16 },

  buyBtn: {
    width: "48%",
    backgroundColor: "#28a745",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },

  buyBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  /* BOTTOM NAV */
  bottomNav: {
    flexDirection: "row",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    backgroundColor: "#fafafa",
  },

  navItem: { flex: 1, alignItems: "center", paddingVertical: 5 },

  navIcon: { width: 28, height: 28, marginBottom: 5 },

  navText: { fontSize: 12, color: "#333" },

  navActiveItem: { backgroundColor: "#eaf8ea", borderRadius: 10 },

  navActiveText: {
    color: "#4CAF50",
    fontWeight: "bold",
  },
});

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
  const [activeTab, setActiveTab] = useState("পণ্য");
  const [selectedCategory, setSelectedCategory] = useState("সব ক্যাটাগরি");
  const [selectedLocation, setSelectedLocation] = useState("সব লোকেশন");
  const [sortBy, setSortBy] = useState("নতুন পণ্য আগে");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [detailsVisible, setDetailsVisible] = useState(false);

  // PRODUCTS DATA WITH HARVESTED DAYS
  const products = [
    {
      id: 1,
      name: "বাসমতি চাল",
      farmer: "ধানক্ষেত",
      price: 85,
      location: "খুলনা",
      category: "শস্য",
      image: rice,
      rating: 4.8,
      harvestedDays: 2,
    },
    {
      id: 2,
      name: "গাজর",
      farmer: "গ্রিন ভ্যালি ফার্মস",
      price: 45,
      location: "খুলনা",
      category: "সবজি",
      image: carrot,
      rating: 4.9,
      harvestedDays: 1,
    },
    {
      id: 3,
      name: "টমেটো",
      farmer: "গ্রিন ভ্যালি ফার্মস",
      price: 60,
      location: "ঢাকা",
      category: "সবজি",
      image: tomato,
      rating: 4.5,
      harvestedDays: 5,
    },
    {
      id: 4,
      name: "আলু",
      farmer: "ফার্ম ফ্রেশ লিমিটেড",
      price: 85,
      location: "চট্টগ্রাম",
      category: "সবজি",
      image: potato,
      rating: 4.2,
      harvestedDays: 3,
    },
    {
      id: 5,
      name: "মিষ্টি আম",
      farmer: "আম বাগান",
      price: 80,
      location: "রাজশাহী",
      category: "ফল",
      image: mango,
      rating: 4.8,
      harvestedDays: 10,
    },
    {
      id: 6,
      name: "দুধ",
      farmer: "বিশুদ্ধ দুগ্ধজাত",
      price: 1.2,
      location: "ঢাকা",
      category: "দুগ্ধজাত পণ্য",
      image: milk,
      rating: 4.3,
      harvestedDays: 1,
    },
    {
      id: 7,
      name: "ডিম",
      farmer: "হ্যাপি হেনস",
      price: 0.25,
      location: "সিলেট",
      category: "মুরগি/পোল্ট্রি",
      image: eggs,
      rating: 4.6,
      harvestedDays: 4,
    },
  ];

  const categories = [
    "সব ক্যাটাগরি",
    "সবজি",
    "ফল",
    "দুগ্ধজাত পণ্য",
    "মুরগি/পোল্ট্রি",
    "শস্য",
    "মসলা",
  ];

  const locations = [
    "সব লোকেশন",
    "ঢাকা",
    "চট্টগ্রাম",
    "রাজশাহী",
    "খুলনা",
    "সিলেট",
    "বরিশাল",
  ];

  const sortOptions = [
    "নতুন পণ্য আগে",
    "দাম: কম থেকে বেশি",
    "দাম: বেশি থেকে কম",
    "সর্বোচ্চ রেটিং",
    "পুরনো পণ্য আগে",
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

    if (selectedCategory !== "সব ক্যাটাগরি") {
      result = result.filter((item) => item.category === selectedCategory);
    }

    if (selectedLocation !== "সব লোকেশন") {
      result = result.filter((item) => item.location === selectedLocation);
    }

    switch (sortBy) {
      case "নতুন পণ্য আগে":
        result.sort((a, b) => a.harvestedDays - b.harvestedDays);
        break;
      case "পুরনো পণ্য আগে":
        result.sort((a, b) => b.harvestedDays - a.harvestedDays);
        break;
      case "দাম: কম থেকে বেশি":
        result.sort((a, b) => a.price - b.price);
        break;
      case "দাম: বেশি থেকে কম":
        result.sort((a, b) => b.price - a.price);
        break;
      case "সর্বোচ্চ রেটিং":
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
    { name: "হোম", image: homeIcon, route: "GuestHome" },
    { name: "পণ্য", image: productsIcon, route: "browse" },
    { name: "শিখুন", image: learnIcon, route: "LearnArti" },
    { name: "এআই চ্যাট", image: chatIcon, route: "Ai" },
  ];

  return (
    <View style={styles.container}>
      {/* PRODUCT DETAILS MODAL */}
      {selectedProduct && (
        <Modal visible={detailsVisible} animationType="slide" transparent>
          <View style={styles.modalOverlay}>
            <View style={styles.modalBox}>
              <Image source={selectedProduct.image} style={styles.modalImage} />

              <Text style={styles.modalTitle}>{selectedProduct.name}</Text>
              <Text style={styles.modalSubtitle}>
                অর্গানিক, তাজা ও ক্ষতিকর কেমিকেলমুক্ত
              </Text>

              <View style={styles.modalRatingRow}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <Image key={i} source={starIcon} style={styles.starIconLarge} />
                ))}
                <Text style={styles.modalRatingText}>
                  ({selectedProduct.rating} রেটিং)
                </Text>
              </View>

              <View style={styles.infoBlock}>
                <Text style={styles.infoRow}>
                  মূল্য (প্রতি কেজি):
                  <Text style={styles.priceGreen}> ৳{selectedProduct.price}</Text>
                </Text>

                <Text style={styles.infoRow}>
                  উপলব্ধ: <Text style={styles.infoBold}>500 কেজি</Text>
                </Text>

                <Text style={styles.infoRow}>
                  লোকেশন:{" "}
                  <Text style={styles.infoBold}>{selectedProduct.location}</Text>
                </Text>

                <Text style={styles.infoRow}>
                  কৃষক:{" "}
                  <Text style={styles.infoBold}>{selectedProduct.farmer}</Text>
                </Text>

                <Text style={styles.infoRow}>
                  ফসল তোলা হয়েছে:{" "}
                  <Text style={styles.infoBold}>
                    {selectedProduct.harvestedDays} দিন আগে
                  </Text>
                </Text>
              </View>

              <View style={styles.guestBox}>
                <Text style={styles.guestText}>
                  গেস্ট মোড: পণ্য কিনতে হলে অনুগ্রহ করে লগইন করুন।
                </Text>
              </View>

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={styles.closeBtn}
                  onPress={() => setDetailsVisible(false)}
                >
                  <Text style={styles.closeBtnText}>বন্ধ করুন</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.buyBtn}
                  onPress={() => router.push("/login")}
                >
                  <Text style={styles.buyBtnText}>কিনতে লগইন করুন</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}

      {/* MAIN CONTENT */}
      <ScrollView style={styles.content}>
        <Text style={styles.title}>পণ্য ব্রাউজ করুন</Text>

        <TextInput
          style={styles.searchInput}
          placeholder="পণ্য সার্চ করুন..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        <Text style={styles.filterTitle}>ক্যাটাগরি</Text>
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

        <Text style={styles.filterTitle}>লোকেশন</Text>
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

        <Text style={styles.filterTitle}>সাজান</Text>
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
    paddingTop: 1,
    marginTop:-25
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

  productCard: {
    backgroundColor: "#fff",
    width: "48%",
    marginBottom: 15,
     marginTop: 15,
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

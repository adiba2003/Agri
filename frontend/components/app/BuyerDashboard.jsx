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

// Images
import riceImg from '@/assets/rice.png';
import carrotImg from '@/assets/carrot.png';
import tomatoImg from '@/assets/tomato.png';
import cartImg from '@/assets/cart.png';
import orderImg from '@/assets/order.png';
import booksImg from '@/assets/books.png';
import homeIcon from '@/assets/home-icon.png';
import productsIcon from '@/assets/products-icon.png';
import ordersIcon from '@/assets/orders.png';
import backArrow from '@/assets/back-arrow.png';
import notificationIcon from '@/assets/notification.png';
import starIcon from '@/assets/star-icon.webp';
import shoppingCart from '@/assets/Shopping _Cart.png';

export default function BuyerDashboard() {
  const [activeNav, setActiveNav] = useState('Home');

  const recentOrders = [
    {
      id: 1,
      name: 'প্রিমিয়াম বাসমতি চাল - ৫ কেজি',
      orderId: '#1234',
      status: 'ডেলিভার্ড',
      statusColor: '#4CAF50',
      image: riceImg,
    },
    {
      id: 2,
      name: 'তাজা গাজর - ২ কেজি',
      orderId: '#1235',
      status: 'পথে আছে',
      statusColor: '#FF9800',
      image: carrotImg,
    },
    {
      id: 3,
      name: 'তাজা টমেটো - ৩ কেজি',
      orderId: '#1236',
      status: 'ডেলিভার্ড',
      statusColor: '#4CAF50',
      image: tomatoImg,
    },
  ];

  const quickActions = [
    {
      title: 'প্রোডাক্ট দেখুন',
      subtitle: 'তাজা পণ্য খুঁজুন',
      image: cartImg,
      route: 'BuyerBrowse',
    },
    {
      title: 'আমার অর্ডার',
      subtitle: 'ডেলিভারি ট্র্যাক করুন',
      image: orderImg,
      route: 'BuyerOrder',
    },
    {
      title: 'শপিং কার্ট',
      subtitle: '৫ টি পণ্য প্রস্তুত',
      image: shoppingCart,
      route: 'Cart',
    },
    {
      title: 'শিখুন',
      subtitle: 'কৃষি বিষয়ক গাইড',
      image: booksImg,
      route: 'BuyerLearn',
    },
  ];

  const navItems = [
    { name: 'Home', image: homeIcon, route: 'BuyerDashboard' },
    { name: 'Browse', image: productsIcon, route: 'BuyerBrowse' },
    { name: 'Cart', image: cartImg, route: 'Cart' },
    { name: 'Orders', image: ordersIcon, route: 'BuyerOrder' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4CAF50" />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>ফিরে আসার জন্য স্বাগতম!</Text>
          <Text style={styles.welcomeSubtitle}>
            স্থানীয় কৃষকদের কাছ থেকে তাজা পণ্য খুঁজে নিন
          </Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Image source={cartImg} style={styles.statIcon} />
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>কার্ট আইটেম</Text>
          </View>
          <View style={styles.statCard}>
            <Image source={orderImg} style={styles.statIcon} />
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>অর্ডার</Text>
          </View>
          <View style={styles.statCard}>
            <Image source={starIcon} style={styles.statIcon} />
            <Text style={styles.statNumber}>4.8</Text>
            <Text style={styles.statLabel}>রেটিং</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>দ্রুত অ্যাকশন</Text>
        <View style={styles.quickActionsGrid}>
          {quickActions.map((action, index) => (
            <TouchableOpacity
              key={index}
              style={styles.actionCard}
              onPress={() => router.push(`/${action.route}`)}
            >
              <Image source={action.image} style={styles.actionImage} />
              <View style={styles.actionText}>
                <Text style={styles.actionTitle}>{action.title}</Text>
                <Text style={styles.actionSubtitle}>{action.subtitle}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.ordersHeader}>
          <Text style={styles.sectionTitle}>সাম্প্রতিক অর্ডার</Text>
          <TouchableOpacity onPress={() => router.push('/BuyerOrder')}>
            <Text style={styles.viewAllText}>সব দেখুন</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.ordersContainer}>
          {recentOrders.map((order) => (
            <View key={order.id} style={styles.orderCard}>
              <Image source={order.image} style={styles.orderImage} />
              <View style={styles.orderInfo}>
                <Text style={styles.orderName}>{order.name}</Text>
                <Text style={styles.orderId}>{order.orderId}</Text>
              </View>
              <View
                style={[
                  styles.orderStatus,
                  { backgroundColor: order.statusColor + '20' },
                ]}
              >
                <Text
                  style={[styles.statusText, { color: order.statusColor }]}
                >
                  {order.status}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
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
              </View>
              <Text style={[styles.navText, isActive && styles.activeNavText]}>
                {item.name === 'Home'
                  ? 'হোম'
                  : item.name === 'Browse'
                  ? 'ব্রাউজ'
                  : item.name === 'Cart'
                  ? 'কার্ট'
                  : 'অর্ডার'}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}


// Styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  content: { flex: 1, padding: 20 },

  welcomeSection: { marginBottom: 25 },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  welcomeSubtitle: { fontSize: 16, color: '#666', lineHeight: 22 },

  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginHorizontal: 5,
    alignItems: 'center',
    elevation: 3,
  },
  statIcon: { width: 24, height: 24, marginBottom: 8 },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  statLabel: { fontSize: 12, color: '#666' },

  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },

  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  actionCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
  },
  actionImage: { width: 40, height: 40, marginRight: 12 },
  actionText: { flex: 1 },
  actionTitle: { fontSize: 14, fontWeight: 'bold', color: '#2c3e50' },
  actionSubtitle: { fontSize: 12, color: '#666' },

  ordersHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  viewAllText: { fontSize: 14, color: '#4CAF50', fontWeight: '600' },

  ordersContainer: { marginBottom: 20 },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
  },
  orderImage: { width: 40, height: 40, marginRight: 12 },
  orderInfo: { flex: 1 },
  orderName: { fontSize: 16, fontWeight: 'bold', color: '#2c3e50' },
  orderId: { fontSize: 12, color: '#666' },
  orderStatus: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  statusText: { fontSize: 12, fontWeight: '600' },

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
  navIcon: { width: 24, height: 24, marginBottom: 4 },
  navText: { fontSize: 12, color: '#666' },
  activeNavText: { color: '#4CAF50', fontWeight: 'bold' },
});

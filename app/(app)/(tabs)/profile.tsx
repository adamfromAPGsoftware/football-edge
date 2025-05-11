import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Platform, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Settings, LogOut, Medal, Calendar, Clock, ChevronRight } from 'lucide-react-native';
import { useAuth } from '@/context/AuthContext';

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  const [loading, setLoading] = useState(false);
  const [stats] = useState({
    exercisesCompleted: 27,
    learningCompleted: 8,
    minutesTrained: 345,
    longestStreak: 14,
  });
  
  // Mock profile data
  const profile = {
    id: user?.id || '1',
    email: user?.email || 'john@example.com',
    first_name: user?.firstName || 'John',
    last_name: user?.lastName || 'Smith',
    profile_image_url: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
    height: 180,
    weight: 75,
    age: 24,
    positions: ['Center Mid', 'Defensive Mid'],
    preferred_foot: 'right',
    training_goal: 'semi-pro',
    player_comparison: 'Kevin De Bruyne',
  };

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Sign Out',
          onPress: signOut,
          style: 'destructive',
        },
      ]
    );
  };
  
  if (loading) {
    return (
      <View style={styles.loading}>
        <Text>Loading profile...</Text>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Image 
              source={{ uri: profile.profile_image_url }}
              style={styles.profileImage}
            />
            <Text style={styles.name}>{profile.first_name} {profile.last_name}</Text>
            <Text style={styles.position}>{profile.positions?.join(' / ')}</Text>
          </View>
          
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.headerButton}>
              <Settings size={20} color="#6B7280" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.headerButton}
              onPress={handleSignOut}
            >
              <LogOut size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.statsCards}>
          <View style={styles.statsCard}>
            <View style={[styles.statsIconContainer, { backgroundColor: '#ECFDF5' }]}>
              <Medal size={20} color="#10B981" />
            </View>
            <View>
              <Text style={styles.statsValue}>{stats.exercisesCompleted}</Text>
              <Text style={styles.statsLabel}>Exercises</Text>
            </View>
          </View>
          
          <View style={styles.statsCard}>
            <View style={[styles.statsIconContainer, { backgroundColor: '#EFF6FF' }]}>
              <Calendar size={20} color="#3B82F6" />
            </View>
            <View>
              <Text style={styles.statsValue}>{stats.longestStreak}</Text>
              <Text style={styles.statsLabel}>Day Streak</Text>
            </View>
          </View>
          
          <View style={styles.statsCard}>
            <View style={[styles.statsIconContainer, { backgroundColor: '#FFF7ED' }]}>
              <Clock size={20} color="#F97316" />
            </View>
            <View>
              <Text style={styles.statsValue}>{stats.minutesTrained}</Text>
              <Text style={styles.statsLabel}>Minutes</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Player Info</Text>
          
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Height</Text>
              <Text style={styles.infoValue}>{profile.height} cm</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Weight</Text>
              <Text style={styles.infoValue}>{profile.weight} kg</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Age</Text>
              <Text style={styles.infoValue}>{profile.age}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Preferred Foot</Text>
              <Text style={styles.infoValue}>{profile.preferred_foot === 'right' ? 'Right' : profile.preferred_foot === 'left' ? 'Left' : 'Both'}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Training Goal</Text>
              <Text style={styles.infoValue}>
                {profile.training_goal === 'amateur' ? 'Amateur' : 
                profile.training_goal === 'semi-pro' ? 'Semi-Pro' : 'Professional'}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Player Similar To</Text>
              <Text style={styles.infoValue}>{profile.player_comparison}</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          
          <View style={styles.menuCard}>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuItemText}>Edit Profile</Text>
              <ChevronRight size={20} color="#6B7280" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuItemText}>Blocked Users</Text>
              <ChevronRight size={20} color="#6B7280" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuItemText}>Notification Settings</Text>
              <ChevronRight size={20} color="#6B7280" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuItemText}>Privacy Policy</Text>
              <ChevronRight size={20} color="#6B7280" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuItemText}>Terms of Service</Text>
              <ChevronRight size={20} color="#6B7280" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.menuItem, styles.menuItemDanger]}
              onPress={handleSignOut}
            >
              <Text style={styles.menuItemDangerText}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.appVersion}>
          <Text style={styles.appVersionText}>Football Edge v1.0.0</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerContent: {
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  headerActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 24,
    marginTop: 16,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  name: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#111827',
    marginBottom: 4,
  },
  position: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#6B7280',
  },
  statsCards: {
    flexDirection: 'row',
    padding: 16,
    justifyContent: 'space-between',
  },
  statsCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    width: '31%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  statsIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statsValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: '#111827',
    textAlign: 'center',
  },
  statsLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  section: {
    padding: 24,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#111827',
    marginBottom: 16,
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  infoLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  infoValue: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#111827',
  },
  menuCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  menuItemText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#374151',
  },
  menuItemDanger: {
    borderBottomWidth: 0,
  },
  menuItemDangerText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#EF4444',
  },
  appVersion: {
    alignItems: 'center',
    padding: 16,
  },
  appVersionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#9CA3AF',
  },
});
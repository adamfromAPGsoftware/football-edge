import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, FlatList, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Clock, BookOpen, Brain, User } from 'lucide-react-native';
import { LearningModule } from '@/types/db';

const LEARNING_CATEGORIES = [
  { id: 'all', name: 'All', icon: BookOpen },
  { id: 'tactical', name: 'Tactical', icon: BookOpen },
  { id: 'mentality', name: 'Mentality', icon: Brain },
  { id: 'player', name: 'Player Focus', icon: User },
];

// Mock data - in a real app, this would come from Supabase
const LEARNING_MODULES: LearningModule[] = [
  {
    id: '1',
    title: 'Understanding Pressing Tactics',
    description: 'Learn how to effectively press as a team and win back possession quickly.',
    category: 'tactical',
    video_url: 'https://example.com/video1.mp4',
    thumbnail_url: 'https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg',
    duration: 15,
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Mental Preparation for Big Games',
    description: 'Strategies to maintain focus and handle pressure before important matches.',
    category: 'mentality',
    video_url: 'https://example.com/video2.mp4',
    thumbnail_url: 'https://images.pexels.com/photos/2682543/pexels-photo-2682543.jpeg',
    duration: 10,
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Positioning as a Central Midfielder',
    description: 'Study the movement and positioning of elite central midfielders.',
    category: 'tactical',
    video_url: 'https://example.com/video3.mp4',
    thumbnail_url: 'https://images.pexels.com/photos/13235316/pexels-photo-13235316.jpeg',
    duration: 12,
    created_at: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Cristiano Ronaldo: Goal Scoring Mentality',
    description: 'Analysis of CR7\'s mindset and approach to scoring goals consistently.',
    category: 'player',
    video_url: 'https://example.com/video4.mp4',
    thumbnail_url: 'https://images.pexels.com/photos/3148452/pexels-photo-3148452.jpeg',
    duration: 20,
    created_at: new Date().toISOString(),
  },
];

export default function LearningScreen() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [modules, setModules] = useState<LearningModule[]>(LEARNING_MODULES);
  
  const filterModules = (category: string) => {
    setSelectedCategory(category);
    if (category === 'all') {
      setModules(LEARNING_MODULES);
    } else {
      setModules(LEARNING_MODULES.filter(module => module.category === category));
    }
  };
  
  const renderCategoryItem = ({ item }: { item: typeof LEARNING_CATEGORIES[0] }) => {
    const Icon = item.icon;
    return (
      <TouchableOpacity
        style={[
          styles.categoryCard,
          selectedCategory === item.id && styles.selectedCategoryCard
        ]}
        onPress={() => filterModules(item.id)}
      >
        <Icon 
          size={24} 
          color={selectedCategory === item.id ? '#fff' : '#6B7280'} 
        />
        <Text style={[
          styles.categoryText,
          selectedCategory === item.id && styles.selectedCategoryText
        ]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };
  
  const renderModuleItem = ({ item }: { item: LearningModule }) => (
    <TouchableOpacity style={styles.moduleCard}>
      <Image 
        source={{ uri: item.thumbnail_url }}
        style={styles.moduleImage}
      />
      <View style={styles.moduleContent}>
        <View style={styles.moduleBadge}>
          <Clock size={12} color="#3B82F6" />
          <Text style={styles.moduleBadgeText}>{item.duration} min</Text>
        </View>
        <Text style={styles.moduleTitle}>{item.title}</Text>
        <Text style={styles.moduleDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.moduleFooter}>
          <Text style={styles.moduleCategory}>
            {LEARNING_CATEGORIES.find(cat => cat.id === item.category)?.name}
          </Text>
          <TouchableOpacity style={styles.watchButton}>
            <Text style={styles.watchButtonText}>Watch</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
  
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <Text style={styles.title}>Learning</Text>
      </View>
      
      <View style={styles.categoriesContainer}>
        <FlatList
          horizontal
          data={LEARNING_CATEGORIES}
          renderItem={renderCategoryItem}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        />
      </View>
      
      <FlatList
        data={modules}
        renderItem={renderModuleItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.modulesList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No learning modules found in this category.</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
    color: '#111827',
  },
  categoriesContainer: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  categoriesList: {
    paddingHorizontal: 20,
    gap: 12,
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    marginRight: 8,
  },
  selectedCategoryCard: {
    backgroundColor: '#3B82F6',
  },
  categoryText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 8,
  },
  selectedCategoryText: {
    color: '#fff',
  },
  modulesList: {
    padding: 16,
  },
  moduleCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  moduleImage: {
    width: '100%',
    height: 160,
  },
  moduleContent: {
    padding: 16,
  },
  moduleBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  moduleBadgeText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#3B82F6',
    marginLeft: 4,
  },
  moduleTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#111827',
    marginBottom: 8,
  },
  moduleDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  moduleFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  moduleCategory: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6B7280',
  },
  watchButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  watchButtonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: '#fff',
  },
  emptyContainer: {
    padding: 24,
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
});
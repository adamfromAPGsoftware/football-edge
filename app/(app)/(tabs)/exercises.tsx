import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, FlatList, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Search, Filter } from 'lucide-react-native';
import { supabase } from '@/lib/supabase';
import { Exercise } from '@/types/db';

const EXERCISE_CATEGORIES = [
  { id: 'all', name: 'All' },
  { id: 'ball-mastery', name: 'Ball Mastery' },
  { id: 'shooting', name: 'Shooting' },
  { id: 'passing', name: 'Passing' },
  { id: 'dribbling', name: 'Dribbling' },
  { id: 'fitness', name: 'Fitness' },
];

const DIFFICULTY_LEVELS = [
  { id: 'beginner', name: 'Beginner' },
  { id: 'intermediate', name: 'Intermediate' },
  { id: 'advanced', name: 'Advanced' },
];

// Mock data - in a real app, this would come from Supabase
const EXERCISES: Exercise[] = [
  {
    id: '1',
    title: 'Quick Feet Drill',
    description: 'Improve your foot speed and ball control with this drill.',
    category: 'ball-mastery',
    difficulty: 'beginner',
    duration: 600,
    video_url: 'https://example.com/video1.mp4',
    thumbnail_url: 'https://images.pexels.com/photos/918798/pexels-photo-918798.jpeg',
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Shooting Accuracy',
    description: 'Improve your shooting accuracy with this target practice drill.',
    category: 'shooting',
    difficulty: 'intermediate',
    duration: 900,
    video_url: 'https://example.com/video2.mp4',
    thumbnail_url: 'https://images.pexels.com/photos/47730/the-ball-stadion-football-the-pitch-47730.jpeg',
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Passing Triangles',
    description: 'Work on your passing precision with this triangle passing drill.',
    category: 'passing',
    difficulty: 'beginner',
    duration: 480,
    video_url: 'https://example.com/video3.mp4',
    thumbnail_url: 'https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg',
    created_at: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Cone Dribbling',
    description: 'Improve your ball control and agility with this cone dribbling exercise.',
    category: 'dribbling',
    difficulty: 'intermediate',
    duration: 720,
    video_url: 'https://example.com/video4.mp4',
    thumbnail_url: 'https://images.pexels.com/photos/3148452/pexels-photo-3148452.jpeg',
    created_at: new Date().toISOString(),
  },
];

export default function ExercisesScreen() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [exercises, setExercises] = useState<Exercise[]>(EXERCISES);
  const [loading, setLoading] = useState(false);
  
  const filterExercises = () => {
    let filtered = [...EXERCISES];
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(ex => ex.category === selectedCategory);
    }
    
    if (selectedDifficulty) {
      filtered = filtered.filter(ex => ex.difficulty === selectedDifficulty);
    }
    
    setExercises(filtered);
  };
  
  useEffect(() => {
    filterExercises();
  }, [selectedCategory, selectedDifficulty]);
  
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} min`;
  };
  
  const renderExerciseItem = ({ item }: { item: Exercise }) => (
    <TouchableOpacity style={styles.exerciseCard}>
      <Image 
        source={{ uri: item.thumbnail_url }}
        style={styles.exerciseImage}
      />
      <View style={styles.exerciseContent}>
        <View style={styles.exerciseHeader}>
          <Text style={styles.exerciseTitle}>{item.title}</Text>
          <View style={styles.difficultyBadge}>
            <Text style={styles.difficultyText}>{item.difficulty}</Text>
          </View>
        </View>
        <Text style={styles.exerciseDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.exerciseFooter}>
          <Text style={styles.exerciseDuration}>{formatDuration(item.duration)}</Text>
          <TouchableOpacity style={styles.startButton}>
            <Text style={styles.startButtonText}>Start</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
  
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <Text style={styles.title}>Exercises</Text>
        
        <View style={styles.searchContainer}>
          <TouchableOpacity style={styles.searchButton}>
            <Search size={20} color="#6B7280" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color="#6B7280" />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.categoriesContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesScroll}
        >
          {EXERCISE_CATEGORIES.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryChip,
                selectedCategory === category.id && styles.selectedCategoryChip
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              <Text style={[
                styles.categoryText,
                selectedCategory === category.id && styles.selectedCategoryText
              ]}>
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      
      <View style={styles.difficultyContainer}>
        <Text style={styles.difficultyLabel}>Difficulty:</Text>
        <View style={styles.difficultyButtons}>
          {DIFFICULTY_LEVELS.map((level) => (
            <TouchableOpacity
              key={level.id}
              style={[
                styles.difficultyChip,
                selectedDifficulty === level.id && styles.selectedDifficultyChip
              ]}
              onPress={() => {
                if (selectedDifficulty === level.id) {
                  setSelectedDifficulty(null);
                } else {
                  setSelectedDifficulty(level.id);
                }
              }}
            >
              <Text style={[
                styles.difficultyChipText,
                selectedDifficulty === level.id && styles.selectedDifficultyChipText
              ]}>
                {level.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      
      <FlatList
        data={exercises}
        renderItem={renderExerciseItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.exercisesList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No exercises found. Try changing your filters.</Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  searchContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  searchButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoriesContainer: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  categoriesScroll: {
    paddingHorizontal: 20,
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },
  selectedCategoryChip: {
    backgroundColor: '#10B981',
  },
  categoryText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6B7280',
  },
  selectedCategoryText: {
    color: '#fff',
  },
  difficultyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  difficultyLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#374151',
    marginRight: 12,
  },
  difficultyButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  difficultyChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
  },
  selectedDifficultyChip: {
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#10B981',
  },
  difficultyChipText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
  },
  selectedDifficultyChipText: {
    color: '#10B981',
  },
  exercisesList: {
    padding: 16,
  },
  exerciseCard: {
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
  exerciseImage: {
    width: '100%',
    height: 160,
  },
  exerciseContent: {
    padding: 16,
  },
  exerciseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  exerciseTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#111827',
    flex: 1,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
  },
  difficultyText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#6B7280',
    textTransform: 'capitalize',
  },
  exerciseDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  exerciseFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  exerciseDuration: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#374151',
  },
  startButton: {
    backgroundColor: '#10B981',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  startButtonText: {
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
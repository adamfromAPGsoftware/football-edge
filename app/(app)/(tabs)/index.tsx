import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { CalendarDays, Trophy, Clock, ChevronRight } from 'lucide-react-native';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';

export default function DashboardScreen() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [streak, setStreak] = useState(0);
  const [stats, setStats] = useState({
    ballMastery: 0,
    shooting: 0,
    passing: 0,
    tactical: 0,
  });
  
  useEffect(() => {
    fetchUserStats();
  }, []);
  
  const fetchUserStats = async () => {
    if (!user?.id) return;
    
    try {
      setLoading(true);
      
      // Fetch user streak (this would be calculated server-side in reality)
      setStreak(5);
      
      // Fetch user exercise minutes per category
      setStats({
        ballMastery: 45,
        shooting: 30,
        passing: 60,
        tactical: 20,
      });
      
    } catch (error) {
      console.error('Error fetching user stats:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const renderStreakCalendar = () => {
    const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    
    return (
      <View style={styles.streakCalendar}>
        {days.map((day, index) => (
          <View key={index} style={styles.calendarDay}>
            <Text style={styles.calendarDayText}>{day}</Text>
            <View style={[
              styles.calendarDot, 
              index < streak && styles.calendarDotActive
            ]} />
          </View>
        ))}
      </View>
    );
  };
  
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good morning,</Text>
            <Text style={styles.username}>{user?.firstName || 'Player'}</Text>
          </View>
          <View style={styles.streak}>
            <CalendarDays size={20} color="#10B981" />
            <Text style={styles.streakText}>{streak} day streak</Text>
          </View>
        </View>
        
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Weekly Progress</Text>
            <TouchableOpacity>
              <Text style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
          </View>
          
          {renderStreakCalendar()}
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <View style={[styles.statDot, { backgroundColor: '#3B82F6' }]} />
              <Text style={styles.statLabel}>Ball Mastery</Text>
              <Text style={styles.statValue}>{stats.ballMastery} min</Text>
            </View>
            
            <View style={styles.statItem}>
              <View style={[styles.statDot, { backgroundColor: '#F97316' }]} />
              <Text style={styles.statLabel}>Shooting</Text>
              <Text style={styles.statValue}>{stats.shooting} min</Text>
            </View>
            
            <View style={styles.statItem}>
              <View style={[styles.statDot, { backgroundColor: '#8B5CF6' }]} />
              <Text style={styles.statLabel}>Passing</Text>
              <Text style={styles.statValue}>{stats.passing} min</Text>
            </View>
            
            <View style={styles.statItem}>
              <View style={[styles.statDot, { backgroundColor: '#EC4899' }]} />
              <Text style={styles.statLabel}>Tactical</Text>
              <Text style={styles.statValue}>{stats.tactical} min</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Exercise</Text>
          
          <TouchableOpacity style={styles.exerciseCard}>
            <Image 
              source={{ uri: 'https://images.pexels.com/photos/918798/pexels-photo-918798.jpeg' }}
              style={styles.exerciseImage}
            />
            <View style={styles.exerciseContent}>
              <View style={styles.exerciseBadge}>
                <Clock size={12} color="#10B981" />
                <Text style={styles.exerciseBadgeText}>15 min</Text>
              </View>
              <Text style={styles.exerciseTitle}>Quick Feet Drill</Text>
              <Text style={styles.exerciseCategory}>Ball Mastery • Beginner</Text>
              
              <View style={styles.exerciseFooter}>
                <TouchableOpacity style={styles.startButton}>
                  <Text style={styles.startButtonText}>Start Exercise</Text>
                  <ChevronRight size={16} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Weekly Goal</Text>
          
          <View style={styles.goalCard}>
            <View style={styles.goalHeader}>
              <Trophy size={24} color="#F97316" />
              <Text style={styles.goalTitle}>Complete 5 exercises</Text>
            </View>
            
            <View style={styles.goalProgress}>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '60%' }]} />
              </View>
              <Text style={styles.progressText}>3/5 completed</Text>
            </View>
          </View>
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
  scrollContent: {
    padding: 24,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  greeting: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#6B7280',
  },
  username: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#111827',
  },
  streak: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  streakText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#10B981',
    marginLeft: 4,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#111827',
  },
  viewAll: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#10B981',
  },
  streakCalendar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    marginBottom: 16,
  },
  calendarDay: {
    alignItems: 'center',
    width: 32,
  },
  calendarDayText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  calendarDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#E5E7EB',
  },
  calendarDotActive: {
    backgroundColor: '#10B981',
  },
  statsContainer: {
    marginTop: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#374151',
    flex: 1,
  },
  statValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: '#111827',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#111827',
    marginBottom: 16,
  },
  exerciseCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
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
  exerciseBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  exerciseBadgeText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#10B981',
    marginLeft: 4,
  },
  exerciseTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#111827',
    marginBottom: 4,
  },
  exerciseCategory: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  exerciseFooter: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  startButton: {
    backgroundColor: '#10B981',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  startButtonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: '#fff',
    marginRight: 4,
  },
  goalCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  goalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  goalTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#111827',
    marginLeft: 12,
  },
  goalProgress: {
    marginTop: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#F97316',
    borderRadius: 4,
  },
  progressText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'right',
  },
});
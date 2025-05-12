import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { router } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';
import ProgressBar from '@/components/onboarding/ProgressBar';
import { StatusBar } from 'expo-status-bar';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';

const TRAINING_GOALS = [
  {
    id: 'amateur',
    title: 'Amateur',
    description: 'I play for fun and want to improve my skills',
  },
  {
    id: 'semi-pro',
    title: 'Semi-Pro',
    description: 'I play competitively and want to reach a higher level',
  },
  {
    id: 'pro',
    title: 'Professional',
    description: 'I aim to play professionally and need elite training',
  },
];

export default function TrainingGoalStep() {
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const { user } = useAuth();

  const handleContinue = async () => {
    if (!selectedGoal) return;
    
    if (user?.id) {
      // Update the user's profile with training goal
      await supabase
        .from('profiles')
        .update({ training_goal: selectedGoal })
        .eq('id', user.id);
    }
    
    // Navigate to next step
    router.push('/(onboarding)/step-6');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <ProgressBar currentStep={5} totalSteps={9} />
        <Text style={styles.title}>Training Goal</Text>
        <Text style={styles.subtitle}>What level are you aiming to reach?</Text>
      </View>
      
      <View style={styles.goalsContainer}>
        {TRAINING_GOALS.map((goal) => (
          <TouchableOpacity
            key={goal.id}
            style={[
              styles.goalCard,
              selectedGoal === goal.id && styles.selectedGoal
            ]}
            onPress={() => setSelectedGoal(goal.id)}
          >
            <Text style={[
              styles.goalTitle,
              selectedGoal === goal.id && styles.selectedGoalText
            ]}>
              {goal.title}
            </Text>
            <Text style={[
              styles.goalDescription,
              selectedGoal === goal.id && styles.selectedGoalDescription
            ]}>
              {goal.description}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.continueButton, !selectedGoal && styles.disabledButton]}
          onPress={handleContinue}
          disabled={!selectedGoal}
        >
          <Text style={styles.continueText}>Continue</Text>
          <ArrowRight size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
  },
  header: {
    paddingHorizontal: 24,
    gap: 16,
    marginBottom: 32,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#111827',
    marginTop: 16,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#6B7280',
  },
  goalsContainer: {
    paddingHorizontal: 24,
    gap: 16,
  },
  goalCard: {
    padding: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#F9FAFB',
  },
  selectedGoal: {
    backgroundColor: '#ECFDF5',
    borderColor: '#10B981',
  },
  goalTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#111827',
    marginBottom: 8,
  },
  selectedGoalText: {
    color: '#10B981',
  },
  goalDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  selectedGoalDescription: {
    color: '#374151',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    backgroundColor: '#fff',
  },
  continueButton: {
    backgroundColor: '#10B981',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  disabledButton: {
    backgroundColor: '#D1D5DB',
  },
  continueText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#fff',
    marginRight: 8,
  },
});
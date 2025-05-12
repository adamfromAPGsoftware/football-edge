import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { router } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';
import ProgressBar from '@/components/onboarding/ProgressBar';
import { StatusBar } from 'expo-status-bar';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';

const FOOT_OPTIONS = [
  { id: 'left', label: 'Left' },
  { id: 'right', label: 'Right' },
  { id: 'both', label: 'Both' },
];

export default function PreferredFootStep() {
  const [selectedFoot, setSelectedFoot] = useState<string | null>(null);
  const { user } = useAuth();

  const handleContinue = async () => {
    if (!selectedFoot) return;
    
    if (user?.id) {
      // Update the user's profile with preferred foot
      await supabase
        .from('profiles')
        .update({ preferred_foot: selectedFoot })
        .eq('id', user.id);
    }
    
    // Navigate to next step
    router.push('/(onboarding)/step-5');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <ProgressBar currentStep={4} totalSteps={9} />
        <Text style={styles.title}>Preferred Foot</Text>
        <Text style={styles.subtitle}>Which foot do you prefer to use when playing?</Text>
      </View>
      
      <View style={styles.optionsContainer}>
        {FOOT_OPTIONS.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.optionButton,
              selectedFoot === option.id && styles.selectedOption
            ]}
            onPress={() => setSelectedFoot(option.id)}
          >
            <Text style={[
              styles.optionText,
              selectedFoot === option.id && styles.selectedOptionText
            ]}>
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.continueButton, !selectedFoot && styles.disabledButton]}
          onPress={handleContinue}
          disabled={!selectedFoot}
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
  optionsContainer: {
    paddingHorizontal: 24,
    gap: 16,
  },
  optionButton: {
    paddingVertical: 20,
    paddingHorizontal: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#F9FAFB',
  },
  selectedOption: {
    backgroundColor: '#ECFDF5',
    borderColor: '#10B981',
  },
  optionText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#374151',
    textAlign: 'center',
  },
  selectedOptionText: {
    color: '#10B981',
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
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Platform } from 'react-native';
import { router } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';
import ProgressBar from '@/components/onboarding/ProgressBar';
import { StatusBar } from 'expo-status-bar';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';

const referralOptions = [
  'Instagram',
  'Facebook',
  'Twitter',
  'YouTube',
  'Friend',
  'Coach',
  'Search Engine',
  'Other'
];

export default function ReferralStep() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [otherReferral, setOtherReferral] = useState('');
  const { user } = useAuth();

  const handleContinue = async () => {
    if (!selectedOption) return;
    
    const referralSource = selectedOption === 'Other' ? otherReferral : selectedOption;
    
    if (user?.id) {
      // Update the user's profile with referral source
      await supabase
        .from('profiles')
        .update({ referral_source: referralSource })
        .eq('id', user.id);
    }
    
    // Navigate to next step
    router.push('/(onboarding)/step-2');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <ProgressBar currentStep={1} totalSteps={9} />
        <Text style={styles.title}>Where did you hear about us?</Text>
        <Text style={styles.subtitle}>Help us understand how you found Football Edge</Text>
      </View>
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {referralOptions.map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.optionButton,
              selectedOption === option && styles.selectedOption
            ]}
            onPress={() => setSelectedOption(option)}
          >
            <Text style={[
              styles.optionText,
              selectedOption === option && styles.selectedOptionText
            ]}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
        
        {selectedOption === 'Other' && (
          <TextInput
            style={styles.otherInput}
            placeholder="Please specify"
            placeholderTextColor="#9CA3AF"
            value={otherReferral}
            onChangeText={setOtherReferral}
          />
        )}
      </ScrollView>
      
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.continueButton, !selectedOption && styles.disabledButton]}
          onPress={handleContinue}
          disabled={!selectedOption || (selectedOption === 'Other' && !otherReferral)}
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
  scrollView: {
    flex: 1,
    paddingHorizontal: 24,
  },
  scrollContent: {
    paddingBottom: 32,
    gap: 12,
  },
  optionButton: {
    paddingVertical: 16,
    paddingHorizontal: 20,
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
  },
  selectedOptionText: {
    color: '#10B981',
  },
  otherInput: {
    marginTop: 12,
    height: 56,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#111827',
  },
  footer: {
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
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
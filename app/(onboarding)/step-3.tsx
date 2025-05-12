import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Platform } from 'react-native';
import { router } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';
import ProgressBar from '@/components/onboarding/ProgressBar';
import { StatusBar } from 'expo-status-bar';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';

export default function PhysicalProfileStep() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const { user } = useAuth();

  const handleContinue = async () => {
    if (!height || !weight || !age) return;
    
    if (user?.id) {
      // Update the user's profile with physical attributes
      await supabase
        .from('profiles')
        .update({
          height: parseInt(height),
          weight: parseInt(weight),
          age: parseInt(age)
        })
        .eq('id', user.id);
    }
    
    // Navigate to next step
    router.push('/(onboarding)/step-4');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <ProgressBar currentStep={3} totalSteps={9} />
        <Text style={styles.title}>Physical Profile</Text>
        <Text style={styles.subtitle}>Help us understand your physical attributes</Text>
      </View>
      
      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Height (cm)</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your height"
            keyboardType="numeric"
            value={height}
            onChangeText={setHeight}
            maxLength={3}
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Weight (kg)</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your weight"
            keyboardType="numeric"
            value={weight}
            onChangeText={setWeight}
            maxLength={3}
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Age</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your age"
            keyboardType="numeric"
            value={age}
            onChangeText={setAge}
            maxLength={2}
          />
        </View>
      </View>
      
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.continueButton, (!height || !weight || !age) && styles.disabledButton]}
          onPress={handleContinue}
          disabled={!height || !weight || !age}
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
  form: {
    paddingHorizontal: 24,
    gap: 24,
  },
  inputContainer: {
    gap: 8,
  },
  label: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#374151',
  },
  input: {
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
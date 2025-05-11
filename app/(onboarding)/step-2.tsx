import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';
import { router } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';
import ProgressBar from '@/components/onboarding/ProgressBar';
import { StatusBar } from 'expo-status-bar';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';

type Position = {
  id: string;
  name: string;
  x: number;
  y: number;
};

const positions: Position[] = [
  { id: 'gk', name: 'Goalkeeper', x: 50, y: 10 },
  { id: 'lb', name: 'Left Back', x: 20, y: 25 },
  { id: 'cb1', name: 'Center Back', x: 40, y: 25 },
  { id: 'cb2', name: 'Center Back', x: 60, y: 25 },
  { id: 'rb', name: 'Right Back', x: 80, y: 25 },
  { id: 'dm', name: 'Defensive Mid', x: 50, y: 40 },
  { id: 'lm', name: 'Left Mid', x: 20, y: 50 },
  { id: 'cm1', name: 'Center Mid', x: 40, y: 50 },
  { id: 'cm2', name: 'Center Mid', x: 60, y: 50 },
  { id: 'rm', name: 'Right Mid', x: 80, y: 50 },
  { id: 'lw', name: 'Left Wing', x: 25, y: 70 },
  { id: 'st', name: 'Striker', x: 50, y: 70 },
  { id: 'rw', name: 'Right Wing', x: 75, y: 70 },
];

export default function PositionSelectionStep() {
  const [selectedPositions, setSelectedPositions] = useState<string[]>([]);
  const { user } = useAuth();

  const togglePosition = (positionId: string) => {
    if (selectedPositions.includes(positionId)) {
      setSelectedPositions(selectedPositions.filter(id => id !== positionId));
    } else {
      if (selectedPositions.length < 2) {
        setSelectedPositions([...selectedPositions, positionId]);
      }
    }
  };

  const handleContinue = async () => {
    if (selectedPositions.length > 0) {
      if (user?.id) {
        // Map position IDs to names
        const positionNames = selectedPositions.map(id => 
          positions.find(pos => pos.id === id)?.name
        );
        
        // Update the user's profile with positions
        await supabase
          .from('profiles')
          .update({ positions: positionNames })
          .eq('id', user.id);
      }
      
      // Navigate to next step
      router.push('/(onboarding)/step-3');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <ProgressBar currentStep={2} totalSteps={9} />
        <Text style={styles.title}>Select your position(s)</Text>
        <Text style={styles.subtitle}>Choose up to 2 positions you usually play</Text>
      </View>
      
      <View style={styles.pitchContainer}>
        <Image 
          source={{ uri: 'https://images.pexels.com/photos/186239/pexels-photo-186239.jpeg' }} 
          style={styles.pitchImage}
          resizeMode="contain"
        />
        
        {positions.map((position) => (
          <TouchableOpacity
            key={position.id}
            style={[
              styles.positionDot,
              { left: `${position.x}%`, top: `${position.y}%` },
              selectedPositions.includes(position.id) && styles.selectedPositionDot
            ]}
            onPress={() => togglePosition(position.id)}
          >
            <Text style={[
              styles.positionText,
              selectedPositions.includes(position.id) && styles.selectedPositionText
            ]}>
              {position.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <View style={styles.selectionInfo}>
        <Text style={styles.selectionText}>
          {selectedPositions.length === 0 
            ? 'Tap on the pitch to select positions' 
            : `Selected: ${selectedPositions.length}/2`}
        </Text>
      </View>
      
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.continueButton, selectedPositions.length === 0 && styles.disabledButton]}
          onPress={handleContinue}
          disabled={selectedPositions.length === 0}
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
  pitchContainer: {
    flex: 1,
    position: 'relative',
    margin: 24,
    borderRadius: 12,
    overflow: 'hidden',
  },
  pitchImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  positionDot: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -12,
    marginTop: -12,
  },
  selectedPositionDot: {
    backgroundColor: '#10B981',
    borderColor: '#fff',
    zIndex: 10,
  },
  positionText: {
    position: 'absolute',
    bottom: -20,
    fontFamily: 'Inter-Medium',
    fontSize: 10,
    color: '#374151',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
  },
  selectedPositionText: {
    color: '#10B981',
  },
  selectionInfo: {
    paddingHorizontal: 24,
    marginBottom: 16,
    alignItems: 'center',
  },
  selectionText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6B7280',
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
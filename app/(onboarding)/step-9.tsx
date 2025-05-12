import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { router } from 'expo-router';
import { ArrowRight, Bell } from 'lucide-react-native';
import ProgressBar from '@/components/onboarding/ProgressBar';
import { StatusBar } from 'expo-status-bar';
import * as Notifications from 'expo-notifications';

export default function NotificationsStep() {
  const [permissionGranted, setPermissionGranted] = useState(false);

  const requestPermissions = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    setPermissionGranted(status === 'granted');
  };

  const handleContinue = () => {
    // Navigate to main app
    router.replace('/(app)/(tabs)');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <ProgressBar currentStep={9} totalSteps={9} />
      </View>
      
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Bell size={48} color="#10B981" />
        </View>
        
        <Text style={styles.title}>Stay Updated</Text>
        <Text style={styles.subtitle}>
          Enable notifications to get training reminders and updates about your progress
        </Text>
        
        {!permissionGranted && (
          <TouchableOpacity
            style={styles.enableButton}
            onPress={requestPermissions}
          >
            <Text style={styles.enableButtonText}>Enable Notifications</Text>
          </TouchableOpacity>
        )}
      </View>
      
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinue}
        >
          <Text style={styles.continueText}>
            {permissionGranted ? 'Get Started' : 'Maybe Later'}
          </Text>
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
    marginBottom: 32,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  iconContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#111827',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  enableButton: {
    backgroundColor: '#ECFDF5',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
  },
  enableButtonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#10B981',
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
  continueText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#fff',
    marginRight: 8,
  },
});
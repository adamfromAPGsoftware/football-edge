import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { ChevronRight } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';

export default function OnboardingStart() {
  useEffect(() => {
    // Redirect to first step
    router.replace('/(onboarding)/step-1');
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Text>Redirecting to onboarding...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
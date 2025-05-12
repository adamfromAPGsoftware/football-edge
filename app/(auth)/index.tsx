import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ChevronRight } from 'lucide-react-native';

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: 'https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg' }} 
          style={styles.image} 
          resizeMode="cover"
        />
        <View style={styles.overlay} />
      </View>
      
      <View style={styles.contentContainer}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>Football Edge</Text>
        </View>
        
        <View style={styles.textContainer}>
          <Text style={styles.title}>Elevate Your Game</Text>
          <Text style={styles.subtitle}>
            Train like a pro with personalized exercises, expert learning modules, and connect with players like you
          </Text>
        </View>
        
        <View style={styles.buttonContainer}>
          <Link href="/(auth)/sign-in" asChild>
            <TouchableOpacity style={styles.signInButton}>
              <Text style={styles.signInText}>Sign In</Text>
            </TouchableOpacity>
          </Link>
          
          <Link href="/(onboarding)" asChild>
            <TouchableOpacity style={styles.signUpButton}>
              <Text style={styles.signUpText}>Create Account</Text>
              <ChevronRight size={20} color="#10B981" />
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  imageContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
  },
  contentContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
  },
  logoContainer: {
    marginTop: 60,
    alignItems: 'center',
  },
  logoText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 32,
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  textContainer: {
    alignItems: 'center',
    marginVertical: 40,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 32,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#E5E7EB',
    textAlign: 'center',
    lineHeight: 24,
  },
  buttonContainer: {
    marginBottom: 40,
    gap: 16,
  },
  signInButton: {
    backgroundColor: '#10B981',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signInText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#fff',
  },
  signUpButton: {
    backgroundColor: 'transparent',
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ffffff50',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signUpText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#fff',
    marginRight: 8,
  },
});
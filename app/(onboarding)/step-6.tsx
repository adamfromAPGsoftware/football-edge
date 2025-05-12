import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Platform } from 'react-native';
import { router } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';
import ProgressBar from '@/components/onboarding/ProgressBar';
import { StatusBar } from 'expo-status-bar';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';

const PLAYERS = [
  {
    id: 'kdb',
    name: 'Kevin De Bruyne',
    position: 'Center Mid',
    image: 'https://images.pexels.com/photos/3148452/pexels-photo-3148452.jpeg',
  },
  {
    id: 'modric',
    name: 'Luka Modric',
    position: 'Center Mid',
    image: 'https://images.pexels.com/photos/918798/pexels-photo-918798.jpeg',
  },
  {
    id: 'kroos',
    name: 'Toni Kroos',
    position: 'Center Mid',
    image: 'https://images.pexels.com/photos/47730/the-ball-stadion-football-the-pitch-47730.jpeg',
  },
  {
    id: 'messi',
    name: 'Lionel Messi',
    position: 'Right Wing',
    image: 'https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg',
  },
  {
    id: 'haaland',
    name: 'Erling Haaland',
    position: 'Striker',
    image: 'https://images.pexels.com/photos/186239/pexels-photo-186239.jpeg',
  },
];

export default function PlayerComparisonStep() {
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);
  const { user } = useAuth();

  const handleContinue = async () => {
    if (!selectedPlayer) return;
    
    const player = PLAYERS.find(p => p.id === selectedPlayer);
    
    if (user?.id && player) {
      // Update the user's profile with player comparison
      await supabase
        .from('profiles')
        .update({ player_comparison: player.name })
        .eq('id', user.id);
    }
    
    // Navigate to next step
    router.push('/(onboarding)/step-7');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <ProgressBar currentStep={6} totalSteps={9} />
        <Text style={styles.title}>Playing Style</Text>
        <Text style={styles.subtitle}>Which player's style matches yours the most?</Text>
      </View>
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {PLAYERS.map((player) => (
          <TouchableOpacity
            key={player.id}
            style={[
              styles.playerCard,
              selectedPlayer === player.id && styles.selectedPlayer
            ]}
            onPress={() => setSelectedPlayer(player.id)}
          >
            <Image 
              source={{ uri: player.image }}
              style={styles.playerImage}
            />
            <View style={styles.playerInfo}>
              <Text style={styles.playerName}>{player.name}</Text>
              <Text style={styles.playerPosition}>{player.position}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.continueButton, !selectedPlayer && styles.disabledButton]}
          onPress={handleContinue}
          disabled={!selectedPlayer}
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
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 100,
    gap: 16,
  },
  playerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#F9FAFB',
  },
  selectedPlayer: {
    backgroundColor: '#ECFDF5',
    borderColor: '#10B981',
  },
  playerImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  playerInfo: {
    flex: 1,
  },
  playerName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#111827',
    marginBottom: 4,
  },
  playerPosition: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
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
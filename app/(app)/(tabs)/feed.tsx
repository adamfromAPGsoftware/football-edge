import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Heart, MessageCircle, Plus, MoreVertical } from 'lucide-react-native';
import { Post } from '@/types/db';
import * as ImagePicker from 'expo-image-picker';

// Mock data - in a real app, this would come from Supabase
const FEED_POSTS: Post[] = [
  {
    id: '1',
    user_id: '1',
    image_url: 'https://images.pexels.com/photos/3148452/pexels-photo-3148452.jpeg',
    caption: 'Working on my shooting technique today. Feeling good about the progress! 💪⚽',
    likes: 24,
    created_at: '2023-05-15T14:30:00Z',
    profile: {
      id: '1',
      email: 'john@example.com',
      first_name: 'John',
      last_name: 'Smith',
      profile_image_url: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
      onboarding_completed: true,
      created_at: '2023-01-01T00:00:00Z',
    },
  },
  {
    id: '2',
    user_id: '2',
    image_url: 'https://images.pexels.com/photos/918798/pexels-photo-918798.jpeg',
    caption: 'After 3 weeks of consistent training, I can feel my ball control improving. Never give up on your dreams! #football #training',
    likes: 42,
    created_at: '2023-05-14T09:15:00Z',
    profile: {
      id: '2',
      email: 'sarah@example.com',
      first_name: 'Sarah',
      last_name: 'Johnson',
      profile_image_url: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
      onboarding_completed: true,
      created_at: '2023-01-02T00:00:00Z',
    },
  },
  {
    id: '3',
    user_id: '3',
    image_url: 'https://images.pexels.com/photos/47730/the-ball-stadion-football-the-pitch-47730.jpeg',
    caption: 'Great training session with the team today. Focus on passing drills and tactical awareness.',
    likes: 18,
    created_at: '2023-05-13T16:45:00Z',
    profile: {
      id: '3',
      email: 'mike@example.com',
      first_name: 'Mike',
      last_name: 'Williams',
      profile_image_url: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
      onboarding_completed: true,
      created_at: '2023-01-03T00:00:00Z',
    },
  },
];

export default function FeedScreen() {
  const [posts, setPosts] = useState<Post[]>(FEED_POSTS);
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  
  const handleLike = (postId: string) => {
    if (likedPosts.includes(postId)) {
      setLikedPosts(likedPosts.filter(id => id !== postId));
      setPosts(posts.map(post => {
        if (post.id === postId) {
          return { ...post, likes: post.likes - 1 };
        }
        return post;
      }));
    } else {
      setLikedPosts([...likedPosts, postId]);
      setPosts(posts.map(post => {
        if (post.id === postId) {
          return { ...post, likes: post.likes + 1 };
        }
        return post;
      }));
    }
  };
  
  const handleAddPost = async () => {
    try {
      // Request permission
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
        return;
      }
      
      // Pick image
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      
      if (!result.canceled) {
        // Here you would upload to Supabase Storage and create a post
        console.log('Image selected:', result.assets[0].uri);
        
        // For demo, we'll just add a mock post to the local state
        const newPost: Post = {
          id: `new-${Date.now()}`,
          user_id: '1', // Current user's ID would be used here
          image_url: result.assets[0].uri,
          caption: 'My latest training session 🔥',
          likes: 0,
          created_at: new Date().toISOString(),
          profile: {
            id: '1',
            email: 'current@example.com',
            first_name: 'John', // Current user's info
            last_name: 'Smith',
            profile_image_url: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
            onboarding_completed: true,
            created_at: new Date().toISOString(),
          },
        };
        
        setPosts([newPost, ...posts]);
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };
  
  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const postDate = new Date(dateString);
    const diffInSeconds = Math.floor((now.getTime() - postDate.getTime()) / 1000);
    
    if (diffInSeconds < 60) {
      return `${diffInSeconds}s ago`;
    } else if (diffInSeconds < 3600) {
      return `${Math.floor(diffInSeconds / 60)}m ago`;
    } else if (diffInSeconds < 86400) {
      return `${Math.floor(diffInSeconds / 3600)}h ago`;
    } else {
      return `${Math.floor(diffInSeconds / 86400)}d ago`;
    }
  };
  
  const renderPostItem = ({ item }: { item: Post }) => (
    <View style={styles.postCard}>
      <View style={styles.postHeader}>
        <View style={styles.userInfo}>
          <Image 
            source={{ uri: item.profile?.profile_image_url }}
            style={styles.userAvatar}
          />
          <View>
            <Text style={styles.userName}>
              {item.profile?.first_name} {item.profile?.last_name}
            </Text>
            <Text style={styles.postTime}>{formatTimeAgo(item.created_at)}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.moreButton}>
          <MoreVertical size={20} color="#6B7280" />
        </TouchableOpacity>
      </View>
      
      <Image 
        source={{ uri: item.image_url }}
        style={styles.postImage}
      />
      
      <View style={styles.postActions}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => handleLike(item.id)}
        >
          <Heart 
            size={24} 
            color={likedPosts.includes(item.id) ? '#F43F5E' : '#6B7280'} 
            fill={likedPosts.includes(item.id) ? '#F43F5E' : 'transparent'}
          />
          <Text style={styles.actionText}>{item.likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <MessageCircle size={24} color="#6B7280" />
          <Text style={styles.actionText}>Comment</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.postContent}>
        <Text style={styles.postCaption}>{item.caption}</Text>
      </View>
    </View>
  );
  
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <Text style={styles.title}>Feed</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleAddPost}>
          <Plus size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={posts}
        renderItem={renderPostItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.feedList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
    color: '#111827',
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F97316',
    alignItems: 'center',
    justifyContent: 'center',
  },
  feedList: {
    padding: 16,
  },
  postCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  userName: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#111827',
  },
  postTime: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
  },
  moreButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  postImage: {
    width: '100%',
    height: 300,
  },
  postActions: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  actionText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 6,
  },
  postContent: {
    padding: 16,
  },
  postCaption: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
});
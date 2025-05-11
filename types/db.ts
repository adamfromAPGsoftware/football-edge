export interface Profile {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  profile_image_url?: string;
  height?: number;
  weight?: number;
  age?: number;
  positions?: string[];
  preferred_foot?: 'left' | 'right' | 'both';
  training_goal?: 'amateur' | 'semi-pro' | 'pro';
  referral_source?: string;
  player_comparison?: string;
  onboarding_completed: boolean;
  created_at: string;
}

export interface Exercise {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // in seconds
  video_url: string;
  thumbnail_url: string;
  created_at: string;
}

export interface LearningModule {
  id: string;
  title: string;
  description: string;
  category: 'tactical' | 'mentality' | 'player';
  video_url: string;
  thumbnail_url: string;
  duration: number; // in minutes
  created_at: string;
}

export interface Post {
  id: string;
  user_id: string;
  image_url: string;
  caption: string;
  likes: number;
  created_at: string;
  profile?: Profile;
}

export interface ExerciseCompletion {
  id: string;
  user_id: string;
  exercise_id: string;
  completed_at: string;
  duration: number; // in seconds
  posted: boolean;
}

export interface LearningCompletion {
  id: string;
  user_id: string;
  learning_module_id: string;
  completed_at: string;
}
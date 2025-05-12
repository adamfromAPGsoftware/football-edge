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
  updated_at: string;
}

export interface Exercise {
  id: string;
  title: string;
  description: string;
  category: 'ball_mastery' | 'shooting' | 'passing_first_touch' | 'dribbling';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // in seconds
  video_url: string;
  thumbnail_url: string;
  created_at: string;
  updated_at: string;
}

export interface LearningModule {
  id: string;
  title: string;
  description: string;
  category: 'tactical' | 'mentality' | 'player_focus';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  video_url: string;
  thumbnail_url: string;
  duration: number; // in minutes
  created_at: string;
  updated_at: string;
}

export interface Post {
  id: string;
  user_id: string;
  image_url: string;
  caption: string;
  likes: number;
  created_at: string;
  updated_at: string;
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

export interface BlockedUser {
  id: string;
  blocker_id: string;
  blocked_id: string;
  created_at: string;
}

export interface CommentLike {
  id: string;
  comment_id: string;
  user_id: string;
  created_at: string;
}

export interface PostComment {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface PostLike {
  id: string;
  post_id: string;
  user_id: string;
  created_at: string;
}

export interface ReportedContent {
  id: string;
  reporter_id: string;
  reported_id: string;
  post_id?: string;
  reason: string;
  status: 'pending' | 'reviewed' | 'resolved';
  created_at: string;
  updated_at: string;
}

export interface UserExercise {
  id: string;
  user_id: string;
  exercise_id: string;
  completed_at: string;
  duration: number;
  notes?: string;
  created_at: string;
}

export interface UserLearning {
  id: string;
  user_id: string;
  module_id: string;
  completed_at: string;
  created_at: string;
}
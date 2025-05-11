# 🗄️ Football Edge Database Structure

## Overview
This document outlines the Supabase database structure for the Football Edge application, including tables, relationships, and security policies.

## Database Tables

### 1. `profiles`
Stores user profile information and onboarding data.
```sql
create table profiles (
  id uuid references auth.users primary key,
  email text unique not null,
  first_name text,
  last_name text,
  profile_image_url text,
  height integer,
  weight integer,
  age integer,
  positions text[],
  preferred_foot text check (preferred_foot in ('left', 'right', 'both')),
  training_goal text check (training_goal in ('amateur', 'semi-pro', 'pro')),
  referral_source text,
  player_comparison text,
  onboarding_completed boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);
```

### 2. `exercises`
Stores exercise content and metadata.
```sql
create table exercises (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  difficulty text check (difficulty in ('beginner', 'intermediate', 'advanced')),
  duration integer, -- in minutes
  category text check (category in ('ball_mastery', 'shooting', 'passing_first_touch', 'dribbling')),
  video_url text,
  thumbnail_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);
```

### 3. `user_exercises`
Tracks user exercise completion and progress.
```sql
create table user_exercises (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) not null,
  exercise_id uuid references exercises(id) not null,
  completed_at timestamp with time zone default timezone('utc'::text, now()) not null,
  duration integer, -- actual time taken in minutes
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, exercise_id)
);
```

### 4. `learning_modules`
Stores educational content.
```sql
create table learning_modules (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  content text,
  category text check (category in ('tactical', 'mentality', 'player_focus')),
  difficulty text check (difficulty in ('beginner', 'intermediate', 'advanced')),
  video_url text,
  thumbnail_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);
```

### 5. `user_learning`
Tracks user learning progress.
```sql
create table user_learning (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) not null,
  module_id uuid references learning_modules(id) not null,
  completed_at timestamp with time zone default timezone('utc'::text, now()) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, module_id)
);
```

### 6. `posts`
Stores social feed posts.
```sql
create table posts (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) not null,
  image_url text,
  caption text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);
```

### 7. `post_likes`
Tracks post likes.
```sql
create table post_likes (
  id uuid default uuid_generate_v4() primary key,
  post_id uuid references posts(id) not null,
  user_id uuid references profiles(id) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(post_id, user_id)
);
```

### 8. `post_comments`
Tracks post comments.
```sql
create table post_comments (
  id uuid default uuid_generate_v4() primary key,
  post_id uuid references posts(id) not null,
  user_id uuid references profiles(id) not null,
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);
```

### 9. `comment_likes`
Tracks comment likes.
```sql
create table comment_likes (
  id uuid default uuid_generate_v4() primary key,
  comment_id uuid references post_comments(id) not null,
  user_id uuid references profiles(id) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(comment_id, user_id)
);
```

### 10. `blocked_users`
Tracks user blocks.
```sql
create table blocked_users (
  id uuid default uuid_generate_v4() primary key,
  blocker_id uuid references profiles(id) not null,
  blocked_id uuid references profiles(id) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(blocker_id, blocked_id)
);
```

### 11. `reported_content`
Tracks reported posts and users.
```sql
create table reported_content (
  id uuid default uuid_generate_v4() primary key,
  reporter_id uuid references profiles(id) not null,
  reported_id uuid references profiles(id) not null,
  post_id uuid references posts(id),
  reason text not null,
  status text check (status in ('pending', 'reviewed', 'resolved')) default 'pending',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);
```

## Row Level Security (RLS) Policies

### Profiles
```sql
-- Users can read any profile
create policy "Profiles are viewable by everyone"
  on profiles for select
  using (true);

-- Users can only update their own profile
create policy "Users can update own profile"
  on profiles for update
  using (auth.uid() = id);
```

### Exercises
```sql
-- Everyone can read exercises
create policy "Exercises are viewable by everyone"
  on exercises for select
  using (true);

-- Only admins can modify exercises
create policy "Only admins can modify exercises"
  on exercises for all
  using (auth.jwt() ->> 'role' = 'admin');
```

### User Exercises
```sql
-- Users can read their own exercise history
create policy "Users can view own exercise history"
  on user_exercises for select
  using (auth.uid() = user_id);

-- Users can create their own exercise records
create policy "Users can create own exercise records"
  on user_exercises for insert
  with check (auth.uid() = user_id);
```

### Posts
```sql
-- Everyone can read posts
create policy "Posts are viewable by everyone"
  on posts for select
  using (true);

-- Users can create their own posts
create policy "Users can create own posts"
  on posts for insert
  with check (auth.uid() = user_id);

-- Users can update their own posts
create policy "Users can update own posts"
  on posts for update
  using (auth.uid() = user_id);

-- Users can delete their own posts
create policy "Users can delete own posts"
  on posts for delete
  using (auth.uid() = user_id);
```

### Post Comments
```sql
-- Everyone can read comments
create policy "Comments are viewable by everyone"
  on post_comments for select
  using (true);

-- Users can create their own comments
create policy "Users can create own comments"
  on post_comments for insert
  with check (auth.uid() = user_id);

-- Users can update their own comments
create policy "Users can update own comments"
  on post_comments for update
  using (auth.uid() = user_id);

-- Users can delete their own comments
create policy "Users can delete own comments"
  on post_comments for delete
  using (auth.uid() = user_id);
```

## Storage Buckets

1. `profile-photos`
   - Public access
   - Size limit: 5MB
   - Allowed types: image/*

2. `exercise-videos`
   - Public access
   - Size limit: 100MB
   - Allowed types: video/*

3. `exercise-thumbnails`
   - Public access
   - Size limit: 2MB
   - Allowed types: image/*

4. `feed-media`
   - Public access
   - Size limit: 10MB
   - Allowed types: image/*, video/*

## Indexes

```sql
-- Profiles
create index profiles_email_idx on profiles(email);

-- Exercises
create index exercises_category_idx on exercises(category);
create index exercises_difficulty_idx on exercises(difficulty);

-- User Exercises
create index user_exercises_user_id_idx on user_exercises(user_id);
create index user_exercises_exercise_id_idx on user_exercises(exercise_id);

-- Posts
create index posts_user_id_idx on posts(user_id);
create index posts_created_at_idx on posts(created_at);

-- Post Likes
create index post_likes_post_id_idx on post_likes(post_id);
create index post_likes_user_id_idx on post_likes(user_id);

-- Post Comments
create index post_comments_post_id_idx on post_comments(post_id);
create index post_comments_user_id_idx on post_comments(user_id);
create index post_comments_created_at_idx on post_comments(created_at);

-- Comment Likes
create index comment_likes_comment_id_idx on comment_likes(comment_id);
create index comment_likes_user_id_idx on comment_likes(user_id);
```

## Functions and Triggers

### Update Timestamps
```sql
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Apply to all tables with updated_at
create trigger update_profiles_updated_at
  before update on profiles
  for each row
  execute function update_updated_at_column();
```

### Post Likes Counter
```sql
create or replace function update_post_likes_count()
returns trigger as $$
begin
  if (TG_OP = 'INSERT') then
    update posts set likes = likes + 1 where id = NEW.post_id;
  elsif (TG_OP = 'DELETE') then
    update posts set likes = likes - 1 where id = OLD.post_id;
  end if;
  return null;
end;
$$ language plpgsql;

create trigger update_post_likes_count
  after insert or delete on post_likes
  for each row
  execute function update_post_likes_count();
``` 
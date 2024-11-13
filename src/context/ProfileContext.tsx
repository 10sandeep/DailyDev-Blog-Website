import React, { createContext, useContext, useState } from 'react';

interface Profile {
  displayName: string;
  email: string;
  phone: string;
  bio: string;
  avatar: string;
}

interface ProfileContextType {
  profile: Profile;
  updateProfile: (updates: Partial<Profile>) => void;
  isUpdating: boolean;
}

const defaultProfile: Profile = {
  displayName: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+1 (555) 123-4567',
  bio: 'Senior Software Engineer passionate about web development and open source.',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<Profile>(defaultProfile);
  const [isUpdating, setIsUpdating] = useState(false);

  const updateProfile = async (updates: Partial<Profile>) => {
    setIsUpdating(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      setProfile(prev => ({ ...prev, ...updates }));
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <ProfileContext.Provider value={{ profile, updateProfile, isUpdating }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
}
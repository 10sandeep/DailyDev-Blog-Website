import React, { useState, useRef } from 'react';
import { Camera, Mail, Phone, Lock, Loader2, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../context/ProfileContext';
import Toast from '../components/common/Toast';

interface Toast {
  message: string;
  type: 'success' | 'error';
}

export default function EditProfilePage() {
  const { profile, updateProfile, isUpdating } = useProfile();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [toast, setToast] = useState<Toast | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const reader = new FileReader();
        reader.onloadend = async () => {
          const imageUrl = reader.result as string;
          setPreviewImage(imageUrl);
          await updateProfile({ avatar: imageUrl });
          setToast({
            message: 'Profile picture updated successfully',
            type: 'success'
          });
        };
        reader.readAsDataURL(file);
      } catch (error) {
        setToast({
          message: 'Failed to update profile picture',
          type: 'error'
        });
      }
    }
  };

  const validatePasswords = () => {
    if (newPassword && newPassword.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
      return false;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword && !validatePasswords()) return;

    try {
      const updates = {
        displayName: profile.displayName,
        email: profile.email,
        phone: profile.phone,
        bio: profile.bio,
      };

      await updateProfile(updates);
      setToast({
        message: 'Profile updated successfully',
        type: 'success'
      });
    } catch (error) {
      setToast({
        message: 'Failed to update profile',
        type: 'error'
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 animate-fade-in">
      {/* Rest of the component remains the same until the form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Profile Picture Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Profile Picture
          </h2>
          <div className="flex items-center space-x-6">
            <div className="relative group">
              <img
                src={previewImage || profile.avatar}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover ring-4 ring-white dark:ring-gray-700"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full text-white hover:bg-blue-700 transition-colors"
              >
                <Camera className="w-5 h-5" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Recommended: Square image, at least 400x400 pixels
              </p>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="mt-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium"
              >
                Upload new picture
              </button>
            </div>
          </div>
        </div>

        {/* Rest of the form sections remain the same */}
        {/* ... */}

        {/* Action Buttons */}
        <div className="flex items-center justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/settings')}
            className="px-6 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isUpdating}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {isUpdating ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Check className="w-5 h-5" />
            )}
            <span>{isUpdating ? 'Saving...' : 'Save Changes'}</span>
          </button>
        </div>
      </form>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
'use client';

import React, { ChangeEvent, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { useSingleUser } from "@/hooks/useprofile";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { uploadUserAvatar } from "@/lib/api/profile";

interface ProfileFieldProps {
  label: string;
  value: string;
}

const ProfileSideBar: React.FC = () => {
  const { data: session } = useSession();
  const { data: userData, isLoading } = useSingleUser(session?.user?.id || '');
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  // Get initials for avatar
  const getInitials = () => {
    if (userData?.firstName && userData?.lastName) {
      return `${userData.firstName[0]}${userData.lastName[0]}`.toUpperCase();
    }
    return "U";
  };

  const handleAvatarChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !session?.user?.id || !session.accessToken) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Profile photo must be 5 MB or smaller.');
      return;
    }

    setIsUploading(true);
    try {
      await uploadUserAvatar(session.user.id, file, session.accessToken);
      await queryClient.invalidateQueries({ queryKey: ['user', session.user.id] });
      toast.success('Profile photo updated successfully.');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to upload profile photo.');
    } finally {
      setIsUploading(false);
      event.target.value = '';
    }
  };

  if (isLoading) {
    return (
      <aside className="max-w-xs w-full mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-8 text-center text-gray-500">Loading profile...</div>
      </aside>
    );
  }

  return (
    <aside className="w-full overflow-hidden  border border-slate-200 bg-white shadow-sm">
      {/* Profile Header */}
      <div className="relative">
        <div className="relative h-28 bg-gradient-to-br from-cyan-700 via-teal-600 to-emerald-500 sm:h-32">
          <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2">
            <div className="h-20 w-20 shrink-0 overflow-hidden rounded-full border-4 border-white bg-white shadow-lg">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                aria-label="Upload profile photo"
                className="relative block h-full w-full overflow-hidden rounded-full bg-gradient-to-r from-cyan-600 to-teal-500 disabled:cursor-wait"
              >
                {userData?.avatar ? (
                  <img
                    src={userData.avatar}
                    alt="Profile photo"
                    className="absolute inset-0 block h-full w-full max-w-none rounded-full object-cover"
                  />
                ) : (
                  <span className="flex h-full w-full items-center justify-center text-lg font-bold text-white">
                    {isUploading ? '...' : getInitials()}
                  </span>
                )}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </div>
          </div>
        </div>
        
        {/* Profile Summary */}
        <div className="px-6 pb-6 pt-14 text-center">
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            {userData?.firstName} {userData?.lastName}
          </h2>
          <p className="mt-1 text-xs font-medium tracking-wide text-slate-400">MEMBER ID · {userData?._id?.slice(-8) || 'N/A'}</p>
          <button type="button" onClick={() => fileInputRef.current?.click()} className="mt-4 text-xs font-semibold text-cyan-700 transition hover:text-cyan-900">{isUploading ? 'Uploading photo…' : 'Change profile photo'}</button>
        </div>
      </div>

      {/* Profile Details */}
      <div className="border-t border-slate-100 px-4 pb-4 pt-4 sm:px-5 sm:pb-5">
        <h3 className="mb-2 px-2 text-xs font-bold uppercase tracking-[0.14em] text-slate-400">Profile information</h3>
        <ul className="divide-y divide-slate-100">
          <ProfileField label="Name" value={`${userData?.firstName || ''} ${userData?.lastName || ''}`} />
          <ProfileField label="Email" value={userData?.email || 'N/A'} />
          <ProfileField label="Phone" value={userData?.phoneNum || 'N/A'} />
          <ProfileField label="Address" value={userData?.address || 'N/A'} />
        </ul>
      </div>
    </aside>
  );
};

// ProfileField component for consistent field rendering
const ProfileField: React.FC<ProfileFieldProps> = ({ label, value }) => (
  <li className="flex items-start justify-between gap-4 rounded-lg px-2 py-3 transition-colors hover:bg-slate-50">
    <p className="shrink-0 text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</p>
    <p className="break-words text-right text-sm font-medium text-slate-700">{value}</p>
  </li>
);

export default ProfileSideBar;

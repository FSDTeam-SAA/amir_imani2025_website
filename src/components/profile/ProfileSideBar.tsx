'use client';

import React from "react";
import { useSession } from "next-auth/react";
import { useSingleUser } from "@/hooks/useprofile";

interface ProfileFieldProps {
  label: string;
  value: string;
}

const ProfileSideBar: React.FC = () => {
  const { data: session } = useSession();
  const { data: userData, isLoading } = useSingleUser(session?.user?.id || '');
 console.log('user ddddddd',userData)
  // Get initials for avatar
  const getInitials = () => {
    if (userData?.firstName && userData?.lastName) {
      return `${userData.firstName[0]}${userData.lastName[0]}`.toUpperCase();
    }
    return "U";
  };

  if (isLoading) {
    return (
      <aside className="max-w-xs w-full mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-8 text-center text-gray-500">Loading profile...</div>
      </aside>
    );
  }

  return (
    <aside className="max-w-md w-full mx-auto bg-white rounded-2xl shadow-lg   ">
      {/* Profile Header */}
      <div className="relative">
        <div className="bg-gradient-to-r relative from-cyan-600 to-teal-500 md:h-32 rounded-t-2xl p-5 h-20">
          <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2">
            <div className="w-20 h-20 bg-white rounded-full border-4 border-white flex items-center justify-center shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-600 to-teal-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">{getInitials()}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Profile Summary */}
        <div className="pt-14 pb-6 px-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            {userData?.firstName} {userData?.lastName}
          </h2>
          <p className="text-gray-500 text-sm mt-1">ID: {userData?._id?.slice(-8) || 'N/A'}</p>
        </div>
      </div>

      {/* Profile Details */}
      <div className="px-4 pb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4 px-4">Profile Information</h3>
        <ul className="space-y-1 divide-y divide-gray-100">
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
  <li className="flex justify-start gap-4 items-center py-3 px-4 hover:bg-gray-50 transition-colors">
    <p className="font-medium text-gray-600 inline">{label}:</p>
    <p className="text-gray-800 text-right ">{value}</p>
  </li>
);

export default ProfileSideBar;
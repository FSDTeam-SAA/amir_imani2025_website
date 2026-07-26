'use client'
import React, { useState } from 'react'
import ProfileSideBar from './ProfileSideBar'
import { Button } from '../ui/button';
import ChangeInformation from './ChangeInformation';
import OrderHistory from './OrderHistory';
import ChangePassword from './ChangePassword';

type ActiveTab = 'info' | 'history' | 'security';

const ProfileMain = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('info');
  
  const tabs = [
    { id: 'info', label: 'Profile Information' },
    { id: 'history', label: 'Order History' },
    { id: 'security', label: 'Security' },
  ] as const;

  return (
    <div className='container mx-auto my-20 md:my-40 px-4'>
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-start'>
        
        {/* Sidebar - Left Column */}
        <div className='lg:col-span-4'>
          <ProfileSideBar />
        </div>

        {/* Main Content - Right Column */}
        <div className='lg:col-span-8 space-y-6'>
          
          {/* Tab Navigation */}
          <div className='flex flex-col sm:flex-row gap-4 sm:gap-2 border-b border-gray-200 pb-4'>
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "ghost"}
   
                onClick={() => setActiveTab(tab.id)}
                className={`
                  w-full sm:w-auto px-6 py-3 rounded-lg font-medium transition-all
                  ${activeTab === tab.id 
                    ? 'bg-primary text-white shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }
                `}
              >
                {tab.label}
              </Button>
            ))}
          </div>

          {/* Active Tab Content */}
          <div className='bg-white rounded-xl shadow-sm p-6'>
            {activeTab === 'info' && <ChangeInformation />}
            {activeTab === 'history' && <OrderHistory />}
            {activeTab === 'security' && <ChangePassword />}
          </div>

        </div>
      </div>
    </div>
  )
}

export default ProfileMain
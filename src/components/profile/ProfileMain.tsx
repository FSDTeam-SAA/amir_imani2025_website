'use client'
import React, { useState } from 'react'
import ProfileSideBar from './ProfileSideBar'
import { Button } from '../ui/button';
import ChangeInformation from './ChangeInformation';
import OrderHistory from './OrderHistory';
import ChangePassword from './ChangePassword';
import FortuneHistory from './FortuneHistory';

type ActiveTab = 'info' | 'history' | 'fortune-history' | 'security';

const ProfileMain = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('info');
  
  const tabs = [
    { id: 'info', label: 'Profile Information' },
    { id: 'history', label: 'Order History' },
    { id: 'fortune-history', label: 'Fortune History' },
    { id: 'security', label: 'Security' },
  ] as const;

  return (
    <main className='min-h-screen bg-slate-50/70 py-10 sm:py-14 lg:py-20'>
      <div className='container mx-auto container px-4 sm:px-6 lg:px-8'>
        <div className='mb-8 sm:mb-10'>
          <p className='mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700'>Account</p>
          <h1 className='text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl'>My profile</h1>
          <p className='mt-2 max-w-xl text-sm leading-6 text-slate-500 sm:text-base'>Manage your personal details, orders, and account security in one place.</p>
        </div>
        <div className='grid grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:gap-8'>
        
        {/* Sidebar - Left Column */}
        <div className='lg:col-span-4 lg:sticky lg:top-24'>
          <ProfileSideBar />
        </div>

        {/* Main Content - Right Column */}
        <div className='min-w-0 lg:col-span-8'>
          
          {/* Tab Navigation */}
          <div className='mb-5 overflow-x-auto  border border-slate-200 bg-white p-1.5 shadow-sm'>
            <div className='flex justify-around gap-1'>
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "ghost"}
   
                onClick={() => setActiveTab(tab.id)}
                className={`
                  h-10 !rounded-none px-4 text-sm font-semibold transition-all sm:px-5
                  ${activeTab === tab.id 
                    ? 'bg-slate-900 text-white shadow-sm' 
                    : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
                  }
                `}
              >
                {tab.label}
              </Button>
            ))}
            </div>
          </div>

          {/* Active Tab Content */}
          <div className=' border border-slate-200 bg-white p-5 shadow-sm sm:p-7'>
            {activeTab === 'info' && <ChangeInformation />}
            {activeTab === 'history' && <OrderHistory />}
            {activeTab === 'fortune-history' && <FortuneHistory />}
            {activeTab === 'security' && <ChangePassword />}
          </div>

        </div>
      </div>
      </div>
    </main>
  )
}

export default ProfileMain

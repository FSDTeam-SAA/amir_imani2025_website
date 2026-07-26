/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { updateUserInfo } from '@/lib/api/profile';
import { useSingleUser } from '@/hooks/useprofile';

const profileSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  address: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const ChangeInformation = () => {
  const { data: session } = useSession();
  const {data:userData}=useSingleUser(session?.user?.id || '')
  const [isPending, setIsPending] = React.useState(false);

  console.log('user data',userData)

  // Helper to split name
  const splitName = (fullName: string | null | undefined) => {
    if (!fullName) return { firstName: '', lastName: '' };
    const parts = fullName.split(' ');
    const firstName = parts[0];
    const lastName = parts.slice(1).join(' ');
    return { firstName, lastName: lastName || '' }; // Handle case with single name
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
    },
  });
  // Update form values when userData loads
  useEffect(() => {
    if (userData) {
      form.reset({
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        email: userData.email || session?.user?.email || '',
        phone: userData.phoneNum?.toString() || '', 
        address: userData.address || '',
      });
    }
  }, [userData, session, form]);

  async function onSubmit(values: ProfileFormValues) {
    if (!session?.user?.id || !session?.accessToken) {
      toast.error('You must be logged in to update your profile');
      return;
    }

    setIsPending(true);
    try {
      const updateData = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        address: values.address,
        phoneNum: values.phone || undefined
      };

      const response = await updateUserInfo(session.user.id, updateData, session.accessToken);
      
      if (response && (response.success || response._id)) { // Adjust based on actual API response success indicator
         toast.success('Profile updated successfully!');
         // Ideally update session here using update() from useSession if NextAuth supports it
      } else {
         throw new Error(response.message || 'Update failed');
      }

    } catch (error: any) {
      console.error('Profile update error:', error);
      toast.error(error.message || 'Failed to update profile.');
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className='max-w-2xl w-full'>
      <div className='mb-8'>
        <h2 className='text-2xl font-bold text-gray-900'>Change User Information</h2>
        <p className='text-gray-500 mt-1'>Manage your personal information and profile details.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Hasibul" {...field}
                    className=' placeholder:text-gray-400'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Hasan" {...field} 
                    className=' placeholder:text-gray-400'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email@example.com" type="email" {...field} 
                  className=' placeholder:text-gray-400'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="+1234567890" {...field} 
                  className=' placeholder:text-gray-400'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="123 Street Name, City, Country" {...field}
                  className=' placeholder:text-gray-400'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='pt-2'>
            <Button
              type="submit"
              disabled={isPending}
              className="bg-primary hover:bg-primary/90 text-white min-w-[140px]"
            >
              {isPending ? "Saving..." : "Save Changes"}
            </Button>
          </div>

        </form>
      </Form>
    </div>
  );
};

export default ChangeInformation;
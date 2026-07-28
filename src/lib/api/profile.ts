// import axiosInstance from "./axios-instance";


export async function changePassword(oldPassword: string, newPassword: string,token:string) {
    console.log('token is',token)
    try {   

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/change-password`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            oldPassword,
            newPassword
          })
        }); 

        return response.json();
    }catch (error) {
        if(error instanceof Error) {
        throw new Error(`Failed to change password: ${error.message}`);
    }}      

}

interface UpdateProfileData {
  firstName: string;
  lastName: string;
  phoneNum?: string;
  address?: string;
  avatar?: string;
  gender?: string;
  dateOfBirth?: string;
  email?: string;
}

export async function updateUserInfo(userId: string, data: UpdateProfileData, token: string) {
    try {   
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${userId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(data)
        }); 

        return response.json();
    } catch (error) {
        if(error instanceof Error) {
        throw new Error(`Failed to update profile: ${error.message}`);
        }
        throw error;
    }      
}

export async function uploadUserAvatar(
  userId: string,
  file: File,
  token: string,
) {
  const formData = new FormData();
  formData.append('avatar', file);

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${userId}`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });

  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(data.message || 'Failed to upload profile photo');
  }

  return data;
}

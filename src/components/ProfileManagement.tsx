import { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Camera, Save, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useUser } from '@clerk/clerk-react';

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

export function ProfileManagement() {
  const { user } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
  });
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Initialize profile data from user object
  useEffect(() => {
    if (user) {
      setProfileData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.primaryEmailAddress?.emailAddress || '',
        phone: user.phoneNumbers[0]?.phoneNumber || '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
      });
    }
  }, [user]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      // In a real implementation, you would save the profile data to your backend
      // For now, we'll just update the local state
      if (user) {
        await user.update({
          firstName: profileData.firstName,
          lastName: profileData.lastName,
        });
      }
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleChange = (field: keyof ProfileData, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-rose-50 to-pink-50 p-6 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-rose-100 to-pink-100 flex items-center justify-center border-4 border-white shadow">
                {previewImage || user?.imageUrl ? (
                  <img 
                    src={previewImage || user?.imageUrl} 
                    alt="Profile" 
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <User className="h-8 w-8 text-rose-600" />
                )}
              </div>
              {isEditing && (
                <label className="absolute bottom-0 right-0 bg-rose-600 rounded-full p-2 cursor-pointer shadow-lg hover:bg-rose-700 transition-colors">
                  <Camera className="h-4 w-4 text-white" />
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {profileData.firstName} {profileData.lastName}
              </h1>
              <p className="text-gray-600">{profileData.email}</p>
              <div className="flex gap-2 mt-2">
                {!isEditing ? (
                  <Button 
                    onClick={() => setIsEditing(true)}
                    className="bg-rose-600 hover:bg-rose-700 text-white rounded-full"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button 
                      onClick={handleSave}
                      className="bg-rose-600 hover:bg-rose-700 text-white rounded-full"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                      className="rounded-full"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="firstName" className="text-gray-700">First Name</Label>
                    {isEditing ? (
                      <Input
                        id="firstName"
                        value={profileData.firstName}
                        onChange={(e) => handleChange('firstName', e.target.value)}
                        className="mt-1"
                      />
                    ) : (
                      <p className="mt-1 text-gray-900">{profileData.firstName || 'Not provided'}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="lastName" className="text-gray-700">Last Name</Label>
                    {isEditing ? (
                      <Input
                        id="lastName"
                        value={profileData.lastName}
                        onChange={(e) => handleChange('lastName', e.target.value)}
                        className="mt-1"
                      />
                    ) : (
                      <p className="mt-1 text-gray-900">{profileData.lastName || 'Not provided'}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="text-gray-700">Email Address</Label>
                    {isEditing ? (
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        className="mt-1"
                      />
                    ) : (
                      <p className="mt-1 text-gray-900">{profileData.email || 'Not provided'}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="phone" className="text-gray-700">Phone Number</Label>
                    {isEditing ? (
                      <Input
                        id="phone"
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        className="mt-1"
                      />
                    ) : (
                      <p className="mt-1 text-gray-900">{profileData.phone || 'Not provided'}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Address Information */}
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Address Information</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="address" className="text-gray-700">Street Address</Label>
                    {isEditing ? (
                      <Input
                        id="address"
                        value={profileData.address}
                        onChange={(e) => handleChange('address', e.target.value)}
                        className="mt-1"
                      />
                    ) : (
                      <p className="mt-1 text-gray-900">{profileData.address || 'Not provided'}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="city" className="text-gray-700">City</Label>
                    {isEditing ? (
                      <Input
                        id="city"
                        value={profileData.city}
                        onChange={(e) => handleChange('city', e.target.value)}
                        className="mt-1"
                      />
                    ) : (
                      <p className="mt-1 text-gray-900">{profileData.city || 'Not provided'}</p>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="state" className="text-gray-700">State</Label>
                      {isEditing ? (
                        <Input
                          id="state"
                          value={profileData.state}
                          onChange={(e) => handleChange('state', e.target.value)}
                          className="mt-1"
                        />
                      ) : (
                        <p className="mt-1 text-gray-900">{profileData.state || 'Not provided'}</p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="zipCode" className="text-gray-700">ZIP Code</Label>
                      {isEditing ? (
                        <Input
                          id="zipCode"
                          value={profileData.zipCode}
                          onChange={(e) => handleChange('zipCode', e.target.value)}
                          className="mt-1"
                        />
                      ) : (
                        <p className="mt-1 text-gray-900">{profileData.zipCode || 'Not provided'}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Account Information */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h2>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-rose-100 p-2 rounded-full">
                      <Mail className="h-5 w-5 text-rose-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Member since</p>
                      <p className="text-sm text-gray-600">
                        {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
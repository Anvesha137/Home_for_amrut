import { ProfileManagement } from './ProfileManagement';
import { Button } from './ui/button';
import { ArrowLeft, User } from 'lucide-react';

interface ProfilePageProps {
  onBack?: () => void;
}

export function ProfilePage({ onBack }: ProfilePageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            {onBack && (
              <Button
                onClick={onBack}
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-gray-100"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            )}
            <h1 className="text-xl font-semibold text-gray-900">My Profile</h1>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="py-8">
        <ProfileManagement />
      </div>
    </div>
  );
}
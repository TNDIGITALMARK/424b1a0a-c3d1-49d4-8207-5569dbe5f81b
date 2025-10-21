'use client';

/**
 * ChatEasy - Group Creation (PAGE 3: Create and Manage Groups)
 * Simple group creation flow with instant room availability
 */

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MessageCircle, ArrowLeft, Users, Check, Globe, Lock } from 'lucide-react';

export default function CreateGroupPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<{ displayName: string } | null>(null);
  const [roomName, setRoomName] = useState('');
  const [roomDescription, setRoomDescription] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    // Get current user from localStorage
    const storedUser = localStorage.getItem('chatEasyUser');
    if (!storedUser) {
      router.push('/');
      return;
    }
    setCurrentUser(JSON.parse(storedUser));
  }, [router]);

  const handleCreateRoom = async () => {
    if (!roomName.trim() || !currentUser) {
      alert('Please enter a room name');
      return;
    }

    setIsCreating(true);

    // Simulate room creation
    setTimeout(() => {
      // In a real app, this would create the room on the server
      const newRoomId = Date.now().toString();

      // Store room info
      const roomInfo = {
        id: newRoomId,
        name: roomName.trim(),
        description: roomDescription.trim(),
        createdBy: currentUser.displayName,
        isPrivate,
      };

      localStorage.setItem(`room_${newRoomId}`, JSON.stringify(roomInfo));

      // Navigate to the new room
      router.push(`/chat?room=${newRoomId}`);
    }, 800);
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-4 sticky top-0 z-10">
        <button
          onClick={() => router.push('/')}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>

        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold text-gray-900">ChatEasy</h1>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Create a New Room</h2>
          <p className="text-gray-600">
            Set up your chat room and start connecting with others instantly
          </p>
        </div>

        {/* Creation Form */}
        <div className="bg-white rounded-2xl border-2 border-gray-200 shadow-lg overflow-hidden">
          {/* Room Icon Preview */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 px-6 py-8 border-b border-gray-200">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-md">
                <Users className="w-10 h-10 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-700 mb-1">Room Preview</p>
                <p className="text-lg font-bold text-gray-900">
                  {roomName || 'Your Room Name'}
                </p>
                <p className="text-sm text-gray-600">
                  Created by {currentUser.displayName}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Room Name Input */}
            <div>
              <label htmlFor="roomName" className="block text-sm font-semibold text-gray-900 mb-2">
                Room Name <span className="text-red-500">*</span>
              </label>
              <input
                id="roomName"
                type="text"
                placeholder="e.g., weekend_plans_chat"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                maxLength={50}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-lg focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all"
                autoFocus
              />
              <p className="text-xs text-gray-500 mt-1">
                {roomName.length}/50 characters
              </p>
            </div>

            {/* Room Description */}
            <div>
              <label htmlFor="roomDescription" className="block text-sm font-semibold text-gray-900 mb-2">
                Description (Optional)
              </label>
              <textarea
                id="roomDescription"
                placeholder="What's this room about?"
                value={roomDescription}
                onChange={(e) => setRoomDescription(e.target.value)}
                maxLength={200}
                rows={3}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl resize-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all"
              />
              <p className="text-xs text-gray-500 mt-1">
                {roomDescription.length}/200 characters
              </p>
            </div>

            {/* Privacy Settings */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Room Privacy
              </label>

              <div className="space-y-3">
                <button
                  onClick={() => setIsPrivate(false)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                    !isPrivate
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-gray-200 hover:border-emerald-300'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    !isPrivate ? 'bg-emerald-500' : 'bg-gray-200'
                  }`}>
                    <Globe className={`w-6 h-6 ${!isPrivate ? 'text-white' : 'text-gray-600'}`} />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-semibold text-gray-900">Public Room</div>
                    <div className="text-sm text-gray-600">
                      Anyone can discover and join this room
                    </div>
                  </div>
                  {!isPrivate && (
                    <Check className="w-6 h-6 text-emerald-500 flex-shrink-0" />
                  )}
                </button>

                <button
                  onClick={() => setIsPrivate(true)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                    isPrivate
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-gray-200 hover:border-emerald-300'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    isPrivate ? 'bg-emerald-500' : 'bg-gray-200'
                  }`}>
                    <Lock className={`w-6 h-6 ${isPrivate ? 'text-white' : 'text-gray-600'}`} />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-semibold text-gray-900">Private Room</div>
                    <div className="text-sm text-gray-600">
                      Only people with the invite link can join
                    </div>
                  </div>
                  {isPrivate && (
                    <Check className="w-6 h-6 text-emerald-500 flex-shrink-0" />
                  )}
                </button>
              </div>
            </div>

            {/* Room Guidelines */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
              <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                Room Guidelines
              </h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Be respectful and kind to all members</li>
                <li>• Stay on topic for the room's purpose</li>
                <li>• No spam or promotional content</li>
                <li>• Report inappropriate behavior</li>
              </ul>
            </div>

            {/* Create Button */}
            <button
              onClick={handleCreateRoom}
              disabled={!roomName.trim() || isCreating}
              className="w-full px-6 py-4 bg-emerald-500 text-white font-semibold text-lg rounded-xl hover:bg-emerald-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
            >
              {isCreating ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Creating Room...
                </span>
              ) : (
                'Create Room & Start Chatting'
              )}
            </button>
          </div>
        </div>

        {/* Quick Tips */}
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center mb-3">
              <span className="text-xl">⚡</span>
            </div>
            <h4 className="font-semibold text-gray-900 mb-1">Instant Access</h4>
            <p className="text-sm text-gray-600">
              Your room is live immediately after creation
            </p>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center mb-3">
              <span className="text-xl">👥</span>
            </div>
            <h4 className="font-semibold text-gray-900 mb-1">Invite Friends</h4>
            <p className="text-sm text-gray-600">
              Share your room link to invite others
            </p>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center mb-3">
              <span className="text-xl">🎯</span>
            </div>
            <h4 className="font-semibold text-gray-900 mb-1">Full Control</h4>
            <p className="text-sm text-gray-600">
              Manage members and settings anytime
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

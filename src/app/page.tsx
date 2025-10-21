'use client';

/**
 * ChatEasy - Landing Page (PAGE 1: Name Entry and Room Access)
 * Clean, modern interface for instant access to messaging
 */

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { mockRooms } from '@/lib/mock-data';
import { MessageCircle, Users, Zap, Check } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const [displayName, setDisplayName] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('');
  const [showRoomSelection, setShowRoomSelection] = useState(false);

  const handleJoinChat = () => {
    if (!displayName.trim()) {
      alert('Please enter your display name');
      return;
    }

    if (!selectedRoom) {
      setShowRoomSelection(true);
      return;
    }

    // Store user info in localStorage
    localStorage.setItem('chatEasyUser', JSON.stringify({ displayName: displayName.trim() }));
    router.push(`/chat?room=${selectedRoom}`);
  };

  const handleCreateRoom = () => {
    if (!displayName.trim()) {
      alert('Please enter your display name first');
      return;
    }

    localStorage.setItem('chatEasyUser', JSON.stringify({ displayName: displayName.trim() }));
    router.push('/create-group');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">ChatEasy</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-gray-600 hover:text-gray-900 text-sm font-medium">Features</a>
            <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 text-sm font-medium">How It Works</a>
            <button className="px-4 py-2 rounded-full bg-emerald-500 text-white font-medium text-sm hover:bg-emerald-600 transition-colors">
              Get Started
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
              Connect. Communicate. Confidently.
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Start chatting instantly without phone numbers or email verification. Just enter your name and join the conversation.
            </p>

            {/* Name Entry Form */}
            <div className="bg-white rounded-2xl border-2 border-gray-200 p-6 shadow-lg">
              <label htmlFor="displayName" className="block text-sm font-semibold text-gray-900 mb-2">
                Enter Your Display Name
              </label>
              <input
                id="displayName"
                type="text"
                placeholder="e.g., alex_designer"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleJoinChat()}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-lg focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all"
                autoFocus
              />

              {!showRoomSelection ? (
                <button
                  onClick={handleJoinChat}
                  className="w-full mt-4 px-6 py-3 bg-emerald-500 text-white font-semibold rounded-xl hover:bg-emerald-600 transition-colors shadow-md hover:shadow-lg"
                >
                  Continue
                </button>
              ) : (
                <div className="mt-4 space-y-3">
                  <p className="text-sm font-semibold text-gray-700">Select a room to join:</p>
                  <div className="max-h-64 overflow-y-auto space-y-2">
                    {mockRooms.map((room) => (
                      <button
                        key={room.id}
                        onClick={() => setSelectedRoom(room.id)}
                        className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all ${
                          selectedRoom === room.id
                            ? 'border-emerald-500 bg-emerald-50'
                            : 'border-gray-200 hover:border-emerald-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-semibold text-gray-900">{room.name}</div>
                            <div className="text-sm text-gray-600">{room.memberCount} members</div>
                          </div>
                          {selectedRoom === room.id && (
                            <Check className="w-5 h-5 text-emerald-500" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={handleJoinChat}
                    disabled={!selectedRoom}
                    className="w-full px-6 py-3 bg-emerald-500 text-white font-semibold rounded-xl hover:bg-emerald-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors shadow-md"
                  >
                    Join Room
                  </button>
                </div>
              )}

              <div className="mt-4 text-center">
                <button
                  onClick={handleCreateRoom}
                  className="text-emerald-600 font-medium text-sm hover:text-emerald-700"
                >
                  Or create a new room →
                </button>
              </div>
            </div>
          </div>

          {/* Hero Image Placeholder */}
          <div className="hidden lg:block">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-3xl transform rotate-3"></div>
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 border-4 border-gray-900 max-w-md mx-auto">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600"></div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">ChatRoom</div>
                      <div className="text-sm text-emerald-600">5 people online</div>
                    </div>
                  </div>

                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-300 to-gray-400"></div>
                      <div className="flex-1">
                        <div className="h-3 bg-gray-200 rounded-full w-3/4 mb-2"></div>
                        <div className="h-2 bg-gray-100 rounded-full w-1/2"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Features</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-100 flex items-center justify-center">
                <MessageCircle className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure Messaging</h3>
              <p className="text-gray-600">
                Establish one-to-one for trusted connections with added privacy controls
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-100 flex items-center justify-center">
                <Users className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Group Chats</h3>
              <p className="text-gray-600">
                Secured and easy to chat in groups message...
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-100 flex items-center justify-center">
                <Zap className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Real-time Sync</h3>
              <p className="text-gray-600">
                Receive instant sync data across all..
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Seamless Experience</h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Intuitive Interface</h4>
                  <p className="text-gray-600">Clean and easy-to-use design for effortless navigation</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Cross-Platform</h4>
                  <p className="text-gray-600">Works seamlessly on all devices and platforms</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Rich Media Sharing</h4>
                  <p className="text-gray-600">Share photos, videos, and files with ease</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to connect?</h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-3 bg-emerald-500 text-white font-semibold rounded-xl hover:bg-emerald-600 transition-colors shadow-md">
                  Download for iOS
                </button>
                <button className="px-8 py-3 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-colors shadow-md">
                  Download Android
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-lg">ChatEasy</span>
              </div>
              <p className="text-gray-400 text-sm">
                Simple, instant messaging without barriers.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
            © 2024 ChatEasy. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

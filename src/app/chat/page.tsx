'use client';

/**
 * ChatEasy - Live Chat Interface (PAGE 2: Real-time Chat)
 * Full-featured messaging interface with live updates
 */

import { useState, useEffect, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { mockRooms, mockMessages, mockUsers, getTimeAgo } from '@/lib/mock-data';
import { Message } from '@/types/chat';
import { MessageCircle, Send, ArrowLeft, Users as UsersIcon, MoreVertical, Smile } from 'lucide-react';

function ChatContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roomId = searchParams.get('room');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [currentUser, setCurrentUser] = useState<{ displayName: string } | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);

  const room = mockRooms.find((r) => r.id === roomId);

  useEffect(() => {
    // Get current user from localStorage
    const storedUser = localStorage.getItem('chatEasyUser');
    if (!storedUser) {
      router.push('/');
      return;
    }
    setCurrentUser(JSON.parse(storedUser));

    // Load messages for this room
    if (roomId && mockMessages[roomId]) {
      setMessages(mockMessages[roomId]);
    }
  }, [roomId, router]);

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    // Simulate typing indicators
    if (isTyping) {
      const timer = setTimeout(() => {
        const randomUser = mockUsers[Math.floor(Math.random() * mockUsers.length)];
        setTypingUsers([randomUser.displayName]);

        setTimeout(() => {
          setTypingUsers([]);
        }, 2000);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isTyping]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !currentUser || !roomId) return;

    const message: Message = {
      id: Date.now().toString(),
      roomId,
      userId: 'current-user',
      userName: currentUser.displayName,
      content: newMessage.trim(),
      timestamp: new Date(),
      status: 'sent',
    };

    setMessages([...messages, message]);
    setNewMessage('');
    setIsTyping(true);

    // Simulate message delivery
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === message.id ? { ...msg, status: 'delivered' } : msg
        )
      );
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!room || !currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Loading chat...</p>
        </div>
      </div>
    );
  }

  const onlineCount = room.members.filter((m) => m.isOnline).length;

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Chat Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-4">
        <button
          onClick={() => router.push('/')}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>

        <div className="flex-1 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-semibold text-gray-900">{room.name}</h1>
            <p className="text-sm text-emerald-600">
              {onlineCount} {onlineCount === 1 ? 'person' : 'people'} online
            </p>
          </div>
        </div>

        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <UsersIcon className="w-5 h-5 text-gray-600" />
        </button>

        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <MoreVertical className="w-5 h-5 text-gray-600" />
        </button>
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.map((message, index) => {
          const isOwnMessage = message.userName === currentUser.displayName;
          const showAvatar =
            index === 0 ||
            messages[index - 1].userName !== message.userName;

          return (
            <div
              key={message.id}
              className={`flex gap-3 ${isOwnMessage ? 'flex-row-reverse' : ''}`}
            >
              {!isOwnMessage && (
                <div className="flex-shrink-0">
                  {showAvatar ? (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-400 to-gray-500 flex items-center justify-center text-white text-xs font-semibold">
                      {message.userName.charAt(0).toUpperCase()}
                    </div>
                  ) : (
                    <div className="w-8 h-8"></div>
                  )}
                </div>
              )}

              <div className={`flex-1 max-w-md ${isOwnMessage ? 'text-right' : ''}`}>
                {showAvatar && !isOwnMessage && (
                  <p className="text-xs font-semibold text-gray-700 mb-1">
                    {message.userName}
                  </p>
                )}

                <div
                  className={`inline-block px-4 py-2 rounded-2xl ${
                    isOwnMessage
                      ? 'bg-emerald-500 text-white rounded-br-sm'
                      : 'bg-white text-gray-900 rounded-bl-sm shadow-sm'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </div>

                <p className="text-xs text-gray-500 mt-1">
                  {getTimeAgo(message.timestamp)}
                  {isOwnMessage && message.status === 'sent' && ' • Sent'}
                  {isOwnMessage && message.status === 'delivered' && ' • ✓✓'}
                </p>
              </div>
            </div>
          );
        })}

        {typingUsers.length > 0 && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-400 to-gray-500 flex items-center justify-center text-white text-xs font-semibold">
              {typingUsers[0].charAt(0).toUpperCase()}
            </div>
            <div className="bg-white px-4 py-2 rounded-2xl rounded-bl-sm shadow-sm">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="bg-white border-t border-gray-200 px-4 py-3">
        <div className="flex items-end gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors mb-1">
            <Smile className="w-5 h-5 text-gray-600" />
          </button>

          <div className="flex-1">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type a message..."
              rows={1}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-xl resize-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all"
              style={{ minHeight: '40px', maxHeight: '120px' }}
            />
          </div>

          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="p-2.5 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors mb-1"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ChatPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600">Loading chat...</p>
        </div>
      </div>
    }>
      <ChatContent />
    </Suspense>
  );
}

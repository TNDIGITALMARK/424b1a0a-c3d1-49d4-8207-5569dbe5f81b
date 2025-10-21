/**
 * ChatEasy Type Definitions
 * Comprehensive types for the messaging application
 */

export interface User {
  id: string;
  displayName: string;
  isOnline: boolean;
  lastSeen?: Date;
}

export interface Message {
  id: string;
  roomId: string;
  userId: string;
  userName: string;
  content: string;
  timestamp: Date;
  status: 'sending' | 'sent' | 'delivered' | 'read';
}

export interface ChatRoom {
  id: string;
  name: string;
  description?: string;
  createdBy: string;
  createdAt: Date;
  memberCount: number;
  members: User[];
  lastMessage?: Message;
}

export interface TypingIndicator {
  roomId: string;
  userId: string;
  userName: string;
}

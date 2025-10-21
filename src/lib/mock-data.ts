/**
 * Mock Data for ChatEasy
 * Simulates real-time chat functionality with realistic data
 */

import { User, Message, ChatRoom } from '@/types/chat';

export const mockUsers: User[] = [
  { id: '1', displayName: 'alex_designer', isOnline: true },
  { id: '2', displayName: 'maria_student', isOnline: true },
  { id: '3', displayName: 'john_developer', isOnline: false, lastSeen: new Date(Date.now() - 1000 * 60 * 5) },
  { id: '4', displayName: 'sarah_writer', isOnline: true },
  { id: '5', displayName: 'mike_photographer', isOnline: false, lastSeen: new Date(Date.now() - 1000 * 60 * 30) },
];

export const mockRooms: ChatRoom[] = [
  {
    id: '1',
    name: 'weekend_plans_chat',
    description: 'Planning our weekend activities',
    createdBy: 'alex_designer',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    memberCount: 5,
    members: mockUsers,
  },
  {
    id: '2',
    name: 'book_club_discussion',
    description: 'Monthly book club conversations',
    createdBy: 'sarah_writer',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    memberCount: 8,
    members: mockUsers.slice(0, 3),
  },
  {
    id: '3',
    name: 'project_alpha_team',
    description: 'Project Alpha collaboration space',
    createdBy: 'john_developer',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14),
    memberCount: 12,
    members: mockUsers.slice(0, 4),
  },
  {
    id: '4',
    name: 'random_conversations',
    description: 'Just chatting about anything',
    createdBy: 'maria_student',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    memberCount: 20,
    members: mockUsers,
  },
  {
    id: '5',
    name: 'gaming_buddies',
    description: 'Gaming sessions and strategy',
    createdBy: 'mike_photographer',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
    memberCount: 15,
    members: mockUsers.slice(1, 4),
  },
];

export const mockMessages: Record<string, Message[]> = {
  '1': [
    {
      id: '1',
      roomId: '1',
      userId: '1',
      userName: 'alex_designer',
      content: 'Hey everyone, what are your thoughts on the new design?',
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      status: 'read',
    },
    {
      id: '2',
      roomId: '1',
      userId: '2',
      userName: 'maria_student',
      content: 'I love the clean interface, very intuitive',
      timestamp: new Date(Date.now() - 1000 * 60 * 10),
      status: 'read',
    },
    {
      id: '3',
      roomId: '1',
      userId: '3',
      userName: 'john_developer',
      content: 'The real-time updates work perfectly',
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      status: 'delivered',
    },
    {
      id: '4',
      roomId: '1',
      userId: '4',
      userName: 'sarah_writer',
      content: 'This is so much easier than other chat apps',
      timestamp: new Date(Date.now() - 1000 * 60 * 2),
      status: 'sent',
    },
  ],
  '2': [
    {
      id: '5',
      roomId: '2',
      userId: '4',
      userName: 'sarah_writer',
      content: 'What did everyone think about the last chapter?',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      status: 'read',
    },
    {
      id: '6',
      roomId: '2',
      userId: '2',
      userName: 'maria_student',
      content: 'The plot twist was incredible!',
      timestamp: new Date(Date.now() - 1000 * 60 * 20),
      status: 'read',
    },
  ],
  '3': [
    {
      id: '7',
      roomId: '3',
      userId: '3',
      userName: 'john_developer',
      content: 'Team, we need to discuss the sprint goals',
      timestamp: new Date(Date.now() - 1000 * 60 * 45),
      status: 'read',
    },
    {
      id: '8',
      roomId: '3',
      userId: '1',
      userName: 'alex_designer',
      content: 'I can have the mockups ready by tomorrow',
      timestamp: new Date(Date.now() - 1000 * 60 * 35),
      status: 'read',
    },
  ],
};

export function getTimeAgo(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

  if (seconds < 60) return 'just now';

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`;

  return date.toLocaleDateString();
}

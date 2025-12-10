'use client'
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Smile, Send, Edit2, Trash2, Reply } from 'lucide-react';

interface User {
  id: number;
  name: string;
  initials: string;
  color: string;
}

interface Reply {
  id: number;
  userId: number;
  text: string;
  timestamp: Date;
  reactions: Record<string, number[]>;
}

interface Comment {
  id: number;
  userId: number;
  text: string;
  timestamp: Date;
  reactions: Record<string, number[]>;
  edited: boolean;
  replies: Reply[];
}

const EMOJI_OPTIONS: string[] = ['👍', '❤️', '😊', '🎉', '🚀', '👀', '💯', '🔥'];

const MOCK_USERS: User[] = [
  { id: 1, name: 'Sarah Johnson', initials: 'SJ', color: 'bg-blue-500' },
  { id: 2, name: 'Mike Chen', initials: 'MC', color: 'bg-green-500' },
  { id: 3, name: 'Emma Wilson', initials: 'EW', color: 'bg-purple-500' },
  { id: 4, name: 'You', initials: 'YU', color: 'bg-orange-500' }
];

const CommentsSection: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      userId: 1,
      text: "I've reviewed the design mockups and they look great! Just need to adjust the color scheme to match our brand guidelines 🎨",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      reactions: { '👍': [2, 3], '🎉': [3] },
      edited: false,
      replies: [
        {
          id: 101,
          userId: 2,
          text: "Agreed! I'll update the color palette by EOD",
          timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000),
          reactions: { '👍': [1] }
        }
      ]
    },
    {
      id: 2,
      userId: 3,
      text: "Quick update: The API integration is complete and tested. Ready for code review 🚀",
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
      reactions: { '🚀': [1, 2, 4], '💯': [4] },
      edited: true,
      replies: []
    }
  ]);

  const [newComment, setNewComment] = useState<string>('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>('');
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState<string>('');
  const [showEmojiPicker, setShowEmojiPicker] = useState<number | null>(null);

  const currentUser: User = MOCK_USERS[3];

  const formatTimestamp = (date: Date): string => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  const getUserById = (id: number): User => {
    return MOCK_USERS.find(u => u.id === id) || MOCK_USERS[0];
  };

  const addComment = (): void => {
    if (!newComment.trim()) return;
    
    const comment: Comment = {
      id: Date.now(),
      userId: currentUser.id,
      text: newComment,
      timestamp: new Date(),
      reactions: {},
      edited: false,
      replies: []
    };
    
    setComments([...comments, comment]);
    setNewComment('');
  };

  const addReply = (commentId: number): void => {
    if (!replyText.trim()) return;

    setComments(comments.map(c => {
      if (c.id === commentId) {
        return {
          ...c,
          replies: [...c.replies, {
            id: Date.now(),
            userId: currentUser.id,
            text: replyText,
            timestamp: new Date(),
            reactions: {}
          }]
        };
      }
      return c;
    }));

    setReplyText('');
    setReplyingTo(null);
  };

  const toggleReaction = (
    commentId: number, 
    emoji: string, 
    isReply: boolean = false, 
    parentId: number | null = null
  ): void => {
    setComments(comments.map(c => {
      if (isReply && c.id === parentId) {
        return {
          ...c,
          replies: c.replies.map(r => {
            if (r.id === commentId) {
              const reactions = { ...r.reactions };
              if (reactions[emoji]?.includes(currentUser.id)) {
                reactions[emoji] = reactions[emoji].filter(id => id !== currentUser.id);
                if (reactions[emoji].length === 0) delete reactions[emoji];
              } else {
                reactions[emoji] = [...(reactions[emoji] || []), currentUser.id];
              }
              return { ...r, reactions };
            }
            return r;
          })
        };
      }
      
      if (c.id === commentId) {
        const reactions = { ...c.reactions };
        if (reactions[emoji]?.includes(currentUser.id)) {
          reactions[emoji] = reactions[emoji].filter(id => id !== currentUser.id);
          if (reactions[emoji].length === 0) delete reactions[emoji];
        } else {
          reactions[emoji] = [...(reactions[emoji] || []), currentUser.id];
        }
        return { ...c, reactions };
      }
      return c;
    }));
    setShowEmojiPicker(null);
  };

  const startEdit = (comment: Comment | Reply): void => {
    setEditingId(comment.id);
    setEditText(comment.text);
  };

  const saveEdit = (commentId: number): void => {
    setComments(comments.map(c => 
      c.id === commentId ? { ...c, text: editText, edited: true } : c
    ));
    setEditingId(null);
    setEditText('');
  };

  const deleteComment = (commentId: number): void => {
    setComments(comments.filter(c => c.id !== commentId));
  };

  const renderComment = (
    comment: Comment | Reply, 
    isReply: boolean = false, 
    parentId: number | null = null
  ): JSX.Element => {
    const user = getUserById(comment.userId);
    const isEditing = editingId === comment.id;
    const isOwner = comment.userId === currentUser.id;

    return (
      <div key={comment.id} className={`flex gap-3 ${isReply ? 'ml-12 mt-3' : ''}`}>
        <Avatar className="h-8 w-8">
          <AvatarFallback className={`${user.color} text-white text-xs`}>
            {user.initials}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <div className="bg-slate-50 rounded-lg p-3">
            <div className="flex items-start justify-between mb-1">
              <div>
                <span className="font-semibold text-sm">{user.name}</span>
                <span className="text-xs text-slate-500 ml-2">
                  {formatTimestamp(comment.timestamp)}
                  {comment.edited && <span className="ml-1">(edited)</span>}
                </span>
              </div>
              
              {isOwner && !isEditing && (
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={() => startEdit(comment)}
                  >
                    <Edit2 className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                    onClick={() => deleteComment(comment.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </div>
            
            {isEditing ? (
              <div className="space-y-2">
                <Textarea
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="min-h-[60px]"
                />
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => saveEdit(comment.id)}>
                    Save
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setEditingId(null);
                      setEditText('');
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <p className="text-sm text-slate-700">{comment.text}</p>
            )}
          </div>
          
          <div className="flex items-center gap-2 mt-2">
            {Object.entries(comment.reactions || {}).map(([emoji, users]) => (
              <button
                key={emoji}
                onClick={() => toggleReaction(comment.id, emoji, isReply, parentId)}
                className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs transition-colors ${
                  users.includes(currentUser.id)
                    ? 'bg-blue-100 border border-blue-300'
                    : 'bg-slate-100 hover:bg-slate-200'
                }`}
              >
                <span>{emoji}</span>
                <span className="text-slate-600">{users.length}</span>
              </button>
            ))}
            
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2 text-xs"
                onClick={() => setShowEmojiPicker(showEmojiPicker === comment.id ? null : comment.id)}
              >
                <Smile className="h-3 w-3 mr-1" />
                React
              </Button>
              
              {showEmojiPicker === comment.id && (
                <div className="absolute left-0 top-8 z-10 flex gap-1 p-2 bg-white rounded-lg shadow-lg border">
                  {EMOJI_OPTIONS.map(emoji => (
                    <button
                      key={emoji}
                      onClick={() => toggleReaction(comment.id, emoji, isReply, parentId)}
                      className="hover:bg-slate-100 p-1 rounded text-lg transition-colors"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {!isReply && (
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2 text-xs"
                onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
              >
                <Reply className="h-3 w-3 mr-1" />
                Reply
              </Button>
            )}
          </div>

          {replyingTo === comment.id && (
            <div className="mt-3 flex gap-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className={`${currentUser.color} text-white text-xs`}>
                  {currentUser.initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 flex gap-2">
                <Textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Write a reply..."
                  className="min-h-[60px]"
                />
                <div className="flex flex-col gap-1">
                  <Button size="sm" onClick={() => addReply(comment.id)}>
                    <Send className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setReplyingTo(null);
                      setReplyText('');
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}

          {'replies' in comment && comment.replies?.map(reply => renderComment(reply, true, comment.id))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Comments</span>
              <span className="text-sm font-normal text-slate-500">
                {comments.length} {comments.length === 1 ? 'comment' : 'comments'}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex gap-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback className={`${currentUser.color} text-white text-xs`}>
                  {currentUser.initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 flex gap-2">
                <Textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="min-h-[80px]"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.ctrlKey) {
                      addComment();
                    }
                  }}
                />
                <Button onClick={addComment} disabled={!newComment.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {comments.map(comment => renderComment(comment))}
            </div>

            {comments.length === 0 && (
              <div className="text-center py-12 text-slate-400">
                <p>No comments yet. Be the first to comment!</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CommentsSection;
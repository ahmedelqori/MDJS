'use client'
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  FileText, 
  Download, 
  MessageSquare, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Send,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
  RotateCw,
  Maximize2,
  Smile,
  Edit2,
  Trash2,
  Reply,
  MoreVertical
} from 'lucide-react';

const EMOJI_OPTIONS = ['👍', '❤️', '😊', '🎉', '🚀', '👀', '💯', '🔥'];

const DocumentReviewSystem = () => {
  const [selectedDoc, setSelectedDoc] = useState(0);
  const [newComment, setNewComment] = useState('');
  const [pdfScale, setPdfScale] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewDecision, setReviewDecision] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(null);
  
  const currentUserId = 999;

  const [documents, setDocuments] = useState([
    {
      id: 1,
      filename: 'P01-ARC-XX-00-DR-A-00010-P01-S3.pdf',
      altFilename: 'P01-ARC-XX-L023-DR-A-00010-P01-S3.pdf',
      size: '226.1 kB',
      author: 'RICHARD MOYLE',
      date: '2021-09-08',
      uploadedAt: '08 Sep 2021, 09:30 AM',
      status: 'in_review',
      category: 'Architecture',
      discipline: 'Structural',
      revision: 'S3',
      reviewers: [
        { 
          id: 1,
          name: 'John Smith', 
          role: 'Lead Architect', 
          status: 'approved', 
          initials: 'JS', 
          color: 'bg-blue-500',
          reviewedAt: '2021-09-09T10:30:00',
          comment: 'Structural details are well documented. Minor notes added for coordination.'
        },
        { 
          id: 2,
          name: 'Sarah Johnson', 
          role: 'MEP Engineer', 
          status: 'pending', 
          initials: 'SJ', 
          color: 'bg-purple-500',
          reviewedAt: null,
          comment: null
        },
        { 
          id: 3,
          name: 'Mike Chen', 
          role: 'Contractor Lead', 
          status: 'pending', 
          initials: 'MC', 
          color: 'bg-green-500',
          reviewedAt: null,
          comment: null
        }
      ],
      comments: [
        {
          id: 1,
          authorId: 1,
          author: 'John Smith',
          role: 'Lead Architect',
          initials: 'JS',
          color: 'bg-blue-500',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
          message: "I've reviewed the structural details and they look comprehensive. The beam schedules are clear and coordination points are well marked.",
          reactions: { '👍': [2, 3], '🎉': [3] },
          edited: false,
          replies: [
            {
              id: 101,
              authorId: 2,
              author: 'Sarah Johnson',
              role: 'MEP Engineer',
              initials: 'SJ',
              color: 'bg-purple-500',
              timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000),
              message: "Agreed! I'll coordinate the HVAC routing with these beam locations.",
              reactions: { '👍': [1] },
              edited: false
            }
          ]
        },
        {
          id: 2,
          authorId: 1,
          author: 'John Smith',
          role: 'Lead Architect',
          initials: 'JS',
          color: 'bg-blue-500',
          timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
          message: "Please ensure HVAC duct routing in section A-A doesn't conflict with the structural members shown. 🚀",
          reactions: { '🚀': [2, 999], '👀': [3] },
          edited: true,
          replies: []
        }
      ]
    },
    {
      id: 2,
      filename: 'P01-ARC-XX-02-DR-A-00010-P01-S3.pdf',
      altFilename: 'P01-ARC-XX-L023-DR-A-00010-P01-S3.pdf',
      size: '226.1 kB',
      author: 'RICHARD MOYLE',
      date: '2021-09-07',
      uploadedAt: '07 Sep 2021, 02:45 PM',
      status: 'pending',
      category: 'Architecture',
      discipline: 'General',
      revision: 'S3',
      reviewers: [
        { id: 1, name: 'John Smith', role: 'Lead Architect', status: 'pending', initials: 'JS', color: 'bg-blue-500', reviewedAt: null, comment: null },
        { id: 2, name: 'Sarah Johnson', role: 'MEP Engineer', status: 'pending', initials: 'SJ', color: 'bg-purple-500', reviewedAt: null, comment: null },
        { id: 3, name: 'Mike Chen', role: 'Contractor Lead', status: 'pending', initials: 'MC', color: 'bg-green-500', reviewedAt: null, comment: null }
      ],
      comments: []
    }
  ]);

  const currentDoc = documents[selectedDoc];

  const getStatusConfig = (status) => {
    const configs = {
      approved: { 
        label: 'Approved', 
        variant: 'default',
        className: 'bg-emerald-500 hover:bg-emerald-600'
      },
      rejected: { 
        label: 'Rejected', 
        variant: 'destructive',
        className: ''
      },
      in_review: { 
        label: 'In Review', 
        variant: 'secondary',
        className: 'bg-amber-500 hover:bg-amber-600 text-white'
      },
      pending: { 
        label: 'Pending', 
        variant: 'outline',
        className: ''
      }
    };
    return configs[status] || configs.pending;
  };

  const formatTimestamp = (date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const addComment = () => {
    if (!newComment.trim()) return;
    
    const newCommentObj = {
      id: Date.now(),
      authorId: currentUserId,
      author: 'You',
      role: 'Reviewer',
      initials: 'YO',
      color: 'bg-orange-500',
      timestamp: new Date(),
      message: newComment,
      reactions: {},
      edited: false,
      replies: []
    };
    
    const updatedDocs = [...documents];
    updatedDocs[selectedDoc].comments.push(newCommentObj);
    setDocuments(updatedDocs);
    setNewComment('');
  };

  const addReply = (commentId) => {
    if (!replyText.trim()) return;

    const updatedDocs = [...documents];
    updatedDocs[selectedDoc].comments = updatedDocs[selectedDoc].comments.map(c => {
      if (c.id === commentId) {
        return {
          ...c,
          replies: [...c.replies, {
            id: Date.now(),
            authorId: currentUserId,
            author: 'You',
            role: 'Reviewer',
            initials: 'YO',
            color: 'bg-orange-500',
            timestamp: new Date(),
            message: replyText,
            reactions: {},
            edited: false
          }]
        };
      }
      return c;
    });
    
    setDocuments(updatedDocs);
    setReplyText('');
    setReplyingTo(null);
  };

  const toggleReaction = (commentId, emoji, isReply = false, parentId = null) => {
    const updatedDocs = [...documents];
    
    updatedDocs[selectedDoc].comments = updatedDocs[selectedDoc].comments.map(c => {
      if (isReply && c.id === parentId) {
        return {
          ...c,
          replies: c.replies.map(r => {
            if (r.id === commentId) {
              const reactions = { ...r.reactions };
              if (reactions[emoji]?.includes(currentUserId)) {
                reactions[emoji] = reactions[emoji].filter(id => id !== currentUserId);
                if (reactions[emoji].length === 0) delete reactions[emoji];
              } else {
                reactions[emoji] = [...(reactions[emoji] || []), currentUserId];
              }
              return { ...r, reactions };
            }
            return r;
          })
        };
      }
      
      if (c.id === commentId) {
        const reactions = { ...c.reactions };
        if (reactions[emoji]?.includes(currentUserId)) {
          reactions[emoji] = reactions[emoji].filter(id => id !== currentUserId);
          if (reactions[emoji].length === 0) delete reactions[emoji];
        } else {
          reactions[emoji] = [...(reactions[emoji] || []), currentUserId];
        }
        return { ...c, reactions };
      }
      return c;
    });
    
    setDocuments(updatedDocs);
    setShowEmojiPicker(null);
  };

  const startEdit = (comment) => {
    setEditingId(comment.id);
    setEditText(comment.message);
  };

  const saveEdit = (commentId, isReply = false, parentId = null) => {
    const updatedDocs = [...documents];
    
    if (isReply) {
      updatedDocs[selectedDoc].comments = updatedDocs[selectedDoc].comments.map(c => {
        if (c.id === parentId) {
          return {
            ...c,
            replies: c.replies.map(r => 
              r.id === commentId ? { ...r, message: editText, edited: true } : r
            )
          };
        }
        return c;
      });
    } else {
      updatedDocs[selectedDoc].comments = updatedDocs[selectedDoc].comments.map(c => 
        c.id === commentId ? { ...c, message: editText, edited: true } : c
      );
    }
    
    setDocuments(updatedDocs);
    setEditingId(null);
    setEditText('');
  };

  const deleteComment = (commentId, isReply = false, parentId = null) => {
    const updatedDocs = [...documents];
    
    if (isReply) {
      updatedDocs[selectedDoc].comments = updatedDocs[selectedDoc].comments.map(c => {
        if (c.id === parentId) {
          return {
            ...c,
            replies: c.replies.filter(r => r.id !== commentId)
          };
        }
        return c;
      });
    } else {
      updatedDocs[selectedDoc].comments = updatedDocs[selectedDoc].comments.filter(c => c.id !== commentId);
    }
    
    setDocuments(updatedDocs);
  };

  const renderComment = (comment, isReply = false, parentId = null) => {
    const isEditing = editingId === comment.id;
    const isOwner = comment.authorId === currentUserId;

    return (
      <div key={comment.id} className={`flex gap-3 ${isReply ? 'ml-12 mt-3' : ''}`}>
        <Avatar className="h-8 w-8 shrink-0">
          <AvatarFallback className={`${comment.color} text-white text-xs`}>
            {comment.initials}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 min-w-0">
          <div className="bg-muted rounded-lg p-3">
            <div className="flex items-start justify-between mb-1">
              <div className="min-w-0 flex-1">
                <span className="font-semibold text-sm">{comment.author}</span>
                <span className="text-xs text-muted-foreground ml-2">
                  {formatTimestamp(comment.timestamp)}
                  {comment.edited && <span className="ml-1">(edited)</span>}
                </span>
              </div>
              
              {isOwner && !isEditing && (
                <div className="flex gap-1 ml-2">
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
                    className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                    onClick={() => deleteComment(comment.id, isReply, parentId)}
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
                  <Button size="sm" onClick={() => saveEdit(comment.id, isReply, parentId)}>
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
              <p className="text-sm leading-relaxed">{comment.message}</p>
            )}
          </div>
          
          <div className="flex items-center gap-2 mt-2">
            {Object.entries(comment.reactions || {}).map(([emoji, users]) => (
              <button
                key={emoji}
                onClick={() => toggleReaction(comment.id, emoji, isReply, parentId)}
                className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs transition-colors ${
                  users.includes(currentUserId)
                    ? 'bg-primary/10 border border-primary'
                    : 'bg-muted hover:bg-muted/80'
                }`}
              >
                <span>{emoji}</span>
                <span className="text-muted-foreground">{users.length}</span>
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
                <div className="absolute left-0 top-8 z-10 flex gap-1 p-2 bg-popover rounded-lg shadow-lg border">
                  {EMOJI_OPTIONS.map(emoji => (
                    <button
                      key={emoji}
                      onClick={() => toggleReaction(comment.id, emoji, isReply, parentId)}
                      className="hover:bg-muted p-1 rounded text-lg transition-colors"
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
              <Avatar className="h-8 w-8 shrink-0">
                <AvatarFallback className="bg-orange-500 text-white text-xs">
                  YO
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

          {comment.replies?.map(reply => renderComment(reply, true, comment.id))}
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Left Panel - PDF Viewer */}
      <div className="w-[55%] border-r flex flex-col">
        {/* PDF Toolbar */}
        <div className="border-b px-4 py-3 bg-muted/40">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <div>
                  <h2 className="font-semibold text-sm leading-none mb-1">
                    {currentDoc.filename}
                  </h2>
                  <p className="text-xs text-muted-foreground">{currentDoc.size}</p>
                </div>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
          
          {/* PDF Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="flex items-center gap-2 px-3">
                <span className="text-sm font-medium">{currentPage}</span>
                <span className="text-sm text-muted-foreground">/ 5</span>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setCurrentPage(Math.min(5, currentPage + 1))}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" onClick={() => setPdfScale(Math.max(0.5, pdfScale - 0.1))}>
                <ZoomOut className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium px-2">{Math.round(pdfScale * 100)}%</span>
              <Button variant="ghost" size="icon" onClick={() => setPdfScale(Math.min(2, pdfScale + 0.1))}>
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Separator orientation="vertical" className="mx-2 h-6" />
              <Button variant="ghost" size="icon">
                <RotateCw className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Maximize2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* PDF Viewer */}
        <ScrollArea className="flex-1">
          <div className="p-8 flex items-center justify-center bg-muted/20">
            <div 
              className="bg-card shadow-2xl border"
              style={{ 
                transform: `scale(${pdfScale})`,
                transformOrigin: 'top center',
                width: '816px',
                minHeight: '1056px'
              }}
            >
              <iframe
                src="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
                className="w-full h-[1056px]"
                title="PDF Viewer"
              />
            </div>
          </div>
        </ScrollArea>
      </div>

      {/* Right Panel - Details & Comments */}
      <div className="w-[45%] flex flex-col">
        {/* Header */}
        <div className="border-b p-6 space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h1 className="text-2xl font-semibold tracking-tight">
                Document Review
              </h1>
              <p className="text-sm text-muted-foreground">
                Review and approve project documents
              </p>
            </div>
            <Badge className={getStatusConfig(currentDoc.status).className}>
              {getStatusConfig(currentDoc.status).label}
            </Badge>
          </div>

          {/* Document Selector */}
          <div className="flex gap-2">
            {documents.map((doc, idx) => (
              <Button
                key={doc.id}
                variant={selectedDoc === idx ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedDoc(idx)}
              >
                Document {idx + 1}
              </Button>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="discussion" className="flex-1 flex flex-col">
          <div className="border-b px-6">
            <TabsList className="w-full justify-start h-auto p-0 bg-transparent">
              <TabsTrigger 
                value="discussion" 
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
              >
                Discussion
              </TabsTrigger>
              <TabsTrigger 
                value="reviewers"
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
              >
                Reviewers
              </TabsTrigger>
              <TabsTrigger 
                value="details"
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
              >
                Details
              </TabsTrigger>
            </TabsList>
          </div>

          <ScrollArea className="flex-1">
            {/* Discussion Tab */}
            <TabsContent value="discussion" className="p-6 space-y-6 mt-0">
              {currentDoc.comments.length > 0 ? (
                <div className="space-y-4">
                  {currentDoc.comments.map(comment => renderComment(comment))}
                </div>
              ) : (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <MessageSquare className="h-12 w-12 text-muted-foreground/50 mb-4" />
                    <p className="text-sm text-muted-foreground">No comments yet</p>
                    <p className="text-xs text-muted-foreground">Be the first to start the discussion</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Reviewers Tab */}
            <TabsContent value="reviewers" className="p-6 space-y-4 mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Review Status</CardTitle>
                  <CardDescription>
                    {currentDoc.reviewers.filter(r => r.status === 'approved').length} of {currentDoc.reviewers.length} reviewers have approved
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {currentDoc.reviewers.map((reviewer) => (
                    <div key={reviewer.id} className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback className={`${reviewer.color} text-white`}>{reviewer.initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{reviewer.name}</p>
                          <p className="text-xs text-muted-foreground">{reviewer.role}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {reviewer.reviewedAt && (
                          <span className="text-xs text-muted-foreground">
                            {formatTimestamp(new Date(reviewer.reviewedAt))}
                          </span>
                        )}
                        {reviewer.status === 'approved' && (
                          <Badge variant="default" className="bg-emerald-500">
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            Approved
                          </Badge>
                        )}
                        {reviewer.status === 'rejected' && (
                          <Badge variant="destructive">
                            <XCircle className="h-3 w-3 mr-1" />
                            Rejected
                          </Badge>
                        )}
                        {reviewer.status === 'pending' && (
                          <Badge variant="outline">
                            <Clock className="h-3 w-3 mr-1" />
                            Pending
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Your Review Card */}
              {!reviewDecision && (
                <Card>
                  <CardHeader>
                    <CardTitle>Your Review</CardTitle>
                    <CardDescription>Review and approve or reject this document</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="review-comment">Comment</Label>
                      <Textarea 
                        id="review-comment"
                        placeholder="Add your review comments..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        rows={4}
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button 
                      className="flex-1 bg-emerald-500 hover:bg-emerald-600" 
                      onClick={() => setReviewDecision('approved')}
                    >
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Approve
                    </Button>
                    <Button 
                      variant="destructive" 
                      className="flex-1"
                      onClick={() => setReviewDecision('rejected')}
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                  </CardFooter>
                </Card>
              )}
            </TabsContent>

            {/* Details Tab */}
            <TabsContent value="details" className="p-6 space-y-4 mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Document Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">File Name</Label>
                      <p className="text-sm font-medium">{currentDoc.filename}</p>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Alternate Name</Label>
                      <p className="text-sm font-medium">{currentDoc.altFilename}</p>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">File Size</Label>
                      <p className="text-sm font-medium">{currentDoc.size}</p>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Revision</Label>
                      <p className="text-sm font-medium">{currentDoc.revision}</p>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Category</Label>
                      <p className="text-sm font-medium">{currentDoc.category}</p>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Discipline</Label>
                      <p className="text-sm font-medium">{currentDoc.discipline}</p>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Author</Label>
                      <p className="text-sm font-medium">{currentDoc.author}</p>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Uploaded</Label>
                      <p className="text-sm font-medium">{currentDoc.uploadedAt}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Review Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {currentDoc.reviewers
                      .filter(r => r.reviewedAt)
                      .sort((a, b) => new Date(a.reviewedAt) - new Date(b.reviewedAt))
                      .map((reviewer, idx) => (
                        <div key={reviewer.id} className="flex gap-3">
                          <div className="flex flex-col items-center">
                            <div className={`w-2 h-2 rounded-full ${
                              reviewer.status === 'approved' ? 'bg-emerald-500' : 'bg-destructive'
                            }`} />
                            {idx < currentDoc.reviewers.filter(r => r.reviewedAt).length - 1 && (
                              <div className="w-px h-full bg-border mt-1" />
                            )}
                          </div>
                          <div className="flex-1 pb-4">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="text-sm font-medium">{reviewer.name}</p>
                              <Badge variant="outline" className="text-xs h-5">
                                {reviewer.status === 'approved' ? 'Approved' : 'Rejected'}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground mb-1">
                              {formatTimestamp(new Date(reviewer.reviewedAt))}
                            </p>
                            {reviewer.comment && (
                              <p className="text-sm text-muted-foreground mt-2">
                                {reviewer.comment}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </ScrollArea>

          {/* Comment Input - Fixed at Bottom */}
          <div className="border-t p-4 bg-muted/40">
            <div className="flex gap-2">
              <Input
                placeholder="Type your message..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    addComment();
                  }
                }}
                className="flex-1"
              />
              <Button onClick={addComment} size="icon" disabled={!newComment.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default DocumentReviewSystem;
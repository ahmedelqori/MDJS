'use client'
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Calendar, Filter } from 'lucide-react';

const DocumentTracker = () => {
  const [documents] = useState([
    {
      id: 1,
      filename: 'P01-ARC-XX-00-DR-A-00010-P01-S3.pdf',
      altFilename: '[P01-ARC-XX-L023-DR-A-00010-P01-S3.pdf]',
      size: '226.1 kB',
      author: 'RICHARD MOYLE',
      date: '08-09-2021',
      reviews: {
        architect: 'completed',
        mep: 'pending',
        contractor: 'info'
      }
    },
    {
      id: 2,
      filename: 'P01-ARC-XX-02-DR-A-00010-P01-S3.pdf',
      altFilename: '[P01-ARC-XX-L023-DR-A-00010-P01-S3.pdf]',
      size: '226.1 kB',
      author: 'RICHARD MOYLE',
      date: '07-09-2021',
      reviews: {
        architect: 'in-progress',
        mep: 'pending',
        contractor: 'info'
      }
    },
    {
      id: 3,
      filename: 'P01-RES-Vol 02-ZZ-CA-A-0006-P01-S3.pdf',
      altFilename: '[Plan-RevA.pdf]',
      size: '28.2 kB',
      author: 'RICHARD MOYLE',
      date: '06-09-2021',
      reviews: {
        architect: 'completed',
        mep: 'pending',
        contractor: 'info'
      }
    },
    {
      id: 4,
      filename: 'P01-RES-XX-ZZ-DR-A-00100-P03-S3.pdf',
      altFilename: '[P01-AR-XX-002-DR-A-00100-P03-S3.pdf]',
      size: '315.3 kB',
      author: 'RICHARD MOYLE',
      date: '27-08-2021',
      reviews: {
        architect: 'approved',
        mep: 'rejected',
        contractor: 'rejected'
      }
    }
  ]);

  const getReviewBadge = (status) => {
    const configs = {
      completed: { variant: 'secondary', text: 'Architect Review', className: 'bg-gray-200 text-gray-700' },
      'in-progress': { variant: 'default', text: 'Architect Review', className: 'bg-yellow-400 text-gray-900' },
      approved: { variant: 'default', text: 'Architect Review', className: 'bg-green-500 text-white' },
      pending: { variant: 'secondary', text: 'MEP Review', className: 'bg-gray-200 text-gray-600' },
      rejected: { variant: 'destructive', text: 'MEP Review', className: 'bg-red-200 text-red-700' },
      info: { variant: 'secondary', text: 'Contractor Final Review', className: 'bg-blue-100 text-blue-700' }
    };
    return configs[status];
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Document Review Tracker</h1>
          <div className="flex gap-2 text-sm text-gray-600">
            <button className="px-3 py-1 bg-white border rounded hover:bg-gray-50 flex items-center gap-1">
              <Filter size={16} />
              1 Day
            </button>
            <button className="px-3 py-1 bg-white border rounded hover:bg-gray-50 flex items-center gap-1">
              <Filter size={16} />
              7 Days
            </button>
            <button className="px-3 py-1 bg-white border rounded hover:bg-gray-50 flex items-center gap-1">
              <Filter size={16} />
              15 Days
            </button>
          </div>
        </div>

        {/* Document List */}
        <div className="space-y-4">
          {documents.map((doc) => (
            <Card key={doc.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  {/* PDF Icon */}
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-red-100 rounded flex items-center justify-center">
                      <FileText className="w-6 h-6 text-red-600" />
                    </div>
                  </div>

                  {/* Document Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {doc.filename}
                        </h3>
                        <p className="text-sm text-gray-500 italic mb-2">
                          {doc.altFilename}
                        </p>
                      </div>
                      <span className="text-sm font-medium text-blue-600 ml-4">
                        {doc.size}
                      </span>
                    </div>

                    {/* Author and Date */}
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                      <span className="font-medium">{doc.author}</span>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{doc.date}</span>
                      </div>
                    </div>

                    {/* Review Badges */}
                    <div className="flex flex-wrap gap-2">
                      <Badge className={getReviewBadge(doc.reviews.architect).className}>
                        {getReviewBadge(doc.reviews.architect).text}
                      </Badge>
                      <Badge className={getReviewBadge(doc.reviews.mep).className}>
                        {getReviewBadge(doc.reviews.mep).text}
                      </Badge>
                      <Badge className={`${getReviewBadge(doc.reviews.contractor).className} flex items-center gap-1`}>
                        <span className="w-4 h-4 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">i</span>
                        {getReviewBadge(doc.reviews.contractor).text}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DocumentTracker;
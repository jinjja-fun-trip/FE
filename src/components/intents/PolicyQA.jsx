import React from 'react';

export default function PolicyQA({ message, references }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-md space-y-4 max-w-md">
      {/* 카드 제목 (아이콘 + 제목) */}
      <div className="flex items-center gap-2">
        <span className="text-blue-600 text-lg">📘 정책 안내</span>
      </div>

      {/* 메시지 본문 */}
      <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-line">
        {message}
      </p>

      {/* 출처 정보 */}
      {references?.length > 0 && (
        <div className="border-t pt-3 text-xs text-gray-500">
          {references.map((ref, idx) => (
            <div key={idx}>
              🔖 출처: <strong>{ref.source === 'koreanair' ? '대한항공' : ref.source}</strong>
              {ref.chapter_info && ` - ${ref.chapter_info}`}
              {ref.page && ` (p.${ref.page})`}
              {ref.ModDate && ` | 개정일: ${new Date(ref.ModDate).toLocaleDateString('ko-KR')}`}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
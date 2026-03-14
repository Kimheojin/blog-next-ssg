'use client';

import { useEffect } from 'react';
import mediumZoom from 'medium-zoom';

/**
 * .prose 영역 내의 모든 img 태그에 medium-zoom 효과를 적용하는 클라이언트 컴포넌트입니다.
 */
export default function ZoomImageHandler() {
  useEffect(() => {
    const zoom = mediumZoom('.prose img', {
      margin: 24,
      background: 'rgba(0, 0, 0, 0.8)',
      scrollOffset: 40,
    });

    return () => {
      zoom.detach();
    };
  }, []);

  return null;
}

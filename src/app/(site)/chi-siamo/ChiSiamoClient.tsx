'use client';

import { BRAND } from '@/lib/constants';
import { track } from '@vercel/analytics';

interface ChiSiamoClientProps {
  id: string;
  className?: string;
  children: React.ReactNode;
}

export function ChiSiamoClient({ id, className, children }: ChiSiamoClientProps) {
  return (
    <a
      href={BRAND.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      id={id}
      onClick={() => track('whatsapp_click', { location: 'chi-siamo', element: id })}
    >
      {children}
    </a>
  );
}

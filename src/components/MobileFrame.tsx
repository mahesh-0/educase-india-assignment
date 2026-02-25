import type { ReactNode } from 'react';

export default function MobileFrame({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center justify-center min-h-screen w-full" style={{ background: '#d0d0d0' }}>
      <div
        className="relative overflow-hidden"
        style={{
          width: '390px',
          minHeight: '844px',
          background: '#f7f8fa',
          borderRadius: '40px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
        }}
      >
        {children}
      </div>
    </div>
  );
}

import React from 'react';

import './index.css';

export default function ColorfulCard({ children }: { children: React.ReactElement }) {
  return (
    <div className="colorful">
      <div className="box bg-[#17171a]">
        <div className="box-mask bg-[#28292d]" />
      </div>
      <div className="content bg-[#28292d]">
        {children}
      </div>
    </div>
  )
}
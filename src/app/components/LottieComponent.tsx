'use client';

import Lottie from 'react-lottie';
import * as lotusTeacher from '@/app/lotties/lotus-teacher.json';
import * as lotusGenAI from '@/app/lotties/lotus-gen-ai.json';

export default function LottieComponent({ 
  defaultOptions,
  animation,
  className
}: {
  defaultOptions: {
    loop: boolean
    autoplay: boolean
    rendererSettings: {
      preserveAspectRatio: string
    }
  },
  animation: 'teacher' | 'gen-ai',
  className: string
}) {
  const options = {
    ...defaultOptions,
    animationData: (
      animation === 'teacher' ? 
      lotusTeacher : 
      lotusGenAI
    )
  };
  return (
    <div className={className}>
      <Lottie 
      options={options}
      height={400}
      width={400}
      />
    </div>
  )
}
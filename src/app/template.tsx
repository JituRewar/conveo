'use client'

import React from 'react'
import { motion } from 'framer-motion'

export default function RootTemplate({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.99, filter: 'blur(3px)' }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="flex w-full flex-1 flex-col"
    >
      {children}
    </motion.div>
  )
}

import type { ReactNode } from "react";
import { motion } from 'framer-motion';

export const MotionWrapper = ({children } : {children: ReactNode}) => {
    return(
        <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className=''
      >
        { children }
      </motion.div>
    )
};
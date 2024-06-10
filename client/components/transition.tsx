"use client"

import { AnimatePresence, motion } from "framer-motion"

const Transition = ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 10}}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full"
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}
 
export default Transition;
import { AnimatePresence, motion } from "framer-motion"

interface AnimationWrapperProps {
    children: React.ReactNode;
    initial?: any;
    animate?: any;
    transition?: any;
    keyValue?: string;
    className?: string;
}
const AnimationWrapper: React.FC<AnimationWrapperProps> = ({children, keyValue, initial, animate, transition,className}) => {
    return (
        <AnimatePresence>
            <motion.div
                key={keyValue}
                initial={initial}
                animate={animate}
                transition={transition}
                className={className}
            >
                { children }
            </motion.div>
        </AnimatePresence>
    )
}

export default AnimationWrapper
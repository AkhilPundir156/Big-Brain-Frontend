import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useState } from "react";
import { MotionWrapper } from "./MotionWrapper";

interface DialogModalProps {
  title: string;
  trigger: ReactNode;
  children: ReactNode;
}

export const DialogModal = ({ title, trigger, children }: DialogModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  return (
    <>
      <span onClick={openDialog} className="w-fit inline-block">
        {trigger}
      </span>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <MotionWrapper>
              <motion.div
                className="bg-primary-bg text-secondary-text rounded-2xl shadow-xl w-full max-w-2xl mt-12 p-6 relative"
                initial={{ opacity: 0, y: -30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 40, scale: 0.95 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
              >
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">{title}</h2>
                  <button
                    onClick={closeDialog}
                    className="text-secondary-text hover:text-white transition-colors"
                  >
                    ✕
                  </button>
                </div>

                {/* Content */}
                <div>{children}</div>
              </motion.div>
            </MotionWrapper>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default DialogModal;

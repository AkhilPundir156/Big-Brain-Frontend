import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useState } from "react";
import { MotionWrapper } from "./MotionWrapper";

interface DialogModalProps {
  title: string;
  trigger: ReactNode;
  children: ReactNode;
  onclose?: () => void;
}

export const DialogModal = ({ title, trigger, children, onclose }: DialogModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => {
    setIsOpen(false);
    onclose?.();
  };

  return (
    <>
      <span onClick={openDialog} className="w-fit inline-block z-1">
        {trigger}
      </span>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-10 flex items-start justify-center bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <MotionWrapper>
              <motion.div
                /* Responsive sizing:
                   - mobile: width 90vw
                   - md+: original max-w-4xl (unchanged)
                */
                className="bg-primary-bg text-secondary-text rounded-2xl shadow-xl w-[90vw] md:w-full md:max-w-4xl  sm:mt-24 p-6 relative max-h-[90vh] overflow-y-auto"
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
                    className="text-secondary-text rounded-full h-8 w-8 text-lg hover:bg-primary-dot transition-colors"
                    aria-label="Close dialog"
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

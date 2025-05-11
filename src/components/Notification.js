import React, { useEffect } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

const Notification = () => {
  const { notificationText, setNotificationText } = useAuthContext();

  useEffect(() => {
    if (notificationText) {
      const timer = setTimeout(() => {
        setNotificationText("");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [notificationText, setNotificationText]);

  return (
    <AnimatePresence>
      {notificationText && (
        <motion.div
          key="notification"
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="lg:w-[20%] h-fit bg-textColor flex justify-center items-center rounded-md p-[2%] lg:p-[1%] fixed left-[2%] lg:left-auto top-[1%] right-[2%] lg:right-[1%] z-50"
        >
          <p className="font-inter font-normal text-[4vw] lg:text-[1vw] text-white text-center">
            {notificationText}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Notification;

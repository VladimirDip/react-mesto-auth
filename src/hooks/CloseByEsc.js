import { useEffect } from "react";

function CloseByEsc({ isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      // console.log("useEffect start");
      const closeByEsc = (e) => (e.key === "Escape" ? onClose() : null);

      document.body.addEventListener("keydown", closeByEsc);

      return () => {
        document.body.removeEventListener("keydown", closeByEsc);
        // console.log("useEffect finish");
      };
    }
  }, [isOpen]);
}

export default CloseByEsc;

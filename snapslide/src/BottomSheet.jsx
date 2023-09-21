import { useState, useRef, useEffect } from "react";
import "./BottomSheet.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



const BottomSheet = ({ handle_modal }) => {
  const [position, setPosition] = useState("closed");
  const [isDragging, setIsDragging] = useState(false);
  let initialY = useRef(null);
  let delay = 0;
  let prev = 0;
  const sheetRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (position === "closed") {
      // Return focus to the element that triggered opening the sheet
      contentRef.current?.focus();
    } else {
      // Focus the content inside the sheet
      sheetRef.current?.focus();
    }
  }, [position]);

  const handleSnap = (newPosition) => {
    if (newPosition !== position) {
      handle_modal(newPosition === "fully-open");
      setPosition(newPosition);
    }
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    initialY.current = e.pageY || e.touches?.[0].pageY;
    prev = e.pageY || e.touches?.[0].pageY;
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      delay = initialY.current - (e.pageY || e.touches?.[0].pageY);
      prev = e.pageY || e.touches?.[0].pageY;
    }
  };

  const handleMouseUp = () => {
    if (delay === prev) return;
    if (delay >= 0 && position === "closed") {
      handleSnap("half-open");
    } else if (delay > 0 && position === "half-open") {
      handleSnap("fully-open");
    } else if (delay < 0 && position === "fully-open") {
      handleSnap("half-open");
    } else if (delay < 0 && position === "half-open") {
      handleSnap("closed");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      // Close the sheet when the "Escape" key is pressed
      handleSnap("closed");
    } else if (e.key === "Tab" && position !== "closed") {
      // Manage focus within the sheet when it's open
      e.preventDefault();
      const focusableElements = sheetRef.current.querySelectorAll(
        "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
      );
      const firstFocusable = focusableElements[0];
      const lastFocusable = focusableElements[focusableElements.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          lastFocusable.focus();
        } else {
          const index = Array.from(focusableElements).indexOf(
            document.activeElement
          );
          focusableElements[index - 1].focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          firstFocusable.focus();
        } else {
          const index = Array.from(focusableElements).indexOf(
            document.activeElement
          );
          focusableElements[index + 1].focus();
        }
      }
    }
  };

  return (

    <div
      ref={sheetRef}
      className={`bottom-sheet ${position} `}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onKeyDown={handleKeyDown}
      tabIndex={position === "closed" ? -1 : 0}
    >



      <div className="content" tabIndex={-1} ref={contentRef}>
     🔼⏫⬆️
      <h2>Bottom Sheet Content</h2>
      <p>
              Just as with content, if the header or footer changes their height, the sheet will readjust accordingly.
            </p>
            <br/>  
            <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias itaque veritatis accusamus?
                  Laboriosam, iure dolor. Beatae voluptatum accusamus harum ipsa quidem, soluta velit voluptates
                  voluptatibus numquam minima at saepe illo?here...
                </p>
         
      </div>
      <div className="handle" tabIndex={-1}></div>
      <div className="controls">
        <button
          style={{ marginRight: "5px" }}
          onClick={() => handleSnap("fully-open")}
        >
          Full open view
        </button>
        <button onClick={() => handleSnap("closed")}>Full close view</button>
      </div>
    </div>
  );
};

export default BottomSheet;

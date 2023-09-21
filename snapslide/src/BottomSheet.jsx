import React, { useState } from 'react';
import './BottomSheet.css';

const BottomSheet = () => {
  const [snapPoint, setSnapPoint] = useState('closed');
  const [showFullViewButton, setShowFullViewButton] = useState(true);

  const toggleBottomSheet = () => {
    if (snapPoint === 'closed') {
      setSnapPoint('half-open');
    } else if (snapPoint === 'half-open') {
      setSnapPoint('open');
      setShowFullViewButton(false); 
    } else {
      setSnapPoint('closed');
      setShowFullViewButton(true); 
    }
  };

  return (
    <div className={`bottom-sheet ${snapPoint}`} onClick={toggleBottomSheet}>
      <div className="handle"></div>
      <div className="content">
        {snapPoint === 'closed' && <button>Click to Open</button>}
        {snapPoint !== 'closed' && (
          <>
            <h2>Bottom Sheet Content</h2>
            <p>
              content..... if the header or footer changes their height the sheet will readjust accordingly.
              <br /> <br /><br />
              {showFullViewButton && <button>Full View</button>}
            </p>

            {snapPoint === 'open' && (
              <>
              
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit ? here...
                  <br></br>
                  <button onClick={() => setShowFullViewButton(true)}>close</button>
                </p>

                <p>More content...</p>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BottomSheet;

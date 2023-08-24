import React, { useState } from "react";
import { Tooltip } from "reactstrap";

const TooltipBasic = ({
  children,
  id = "DisabledAutoHideExample",
  className = "",
}) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const toggle = () => setTooltipOpen(!tooltipOpen);

  return (
    <div>
      <span id={`btn-${id}`} className={className}>
        {`${children.slice(0, 45)}...`}
      </span>
      <Tooltip
        placement="top"
        isOpen={tooltipOpen}
        autohide={false}
        target={`btn-${id}`} 
        toggle={toggle}
      >
        {children}
      </Tooltip>
    </div>
  );
};

export default TooltipBasic;

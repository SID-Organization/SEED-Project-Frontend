import React from "react";
import Skeleton from "@mui/material/Skeleton";

interface SkeletonProps {
  width?: number;
  height?: number;
  variant?: "text" | "rectangular" | "circular";
}

const SkeletonComponent: React.FC<SkeletonProps> = ({
  width,
  height,
  variant,
}) => {
  return (
    <Skeleton
      variant={variant}
      width={width}
      height={height}
      animation="wave"
    />
  );
};

export default SkeletonComponent;

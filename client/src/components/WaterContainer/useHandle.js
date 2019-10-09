import React, { useState, useEffect } from "react";
import { useMotionValue, transform } from "framer-motion";

const useHandle = (min, max) => {
  const [value, setValue] = useState(max < 0 ? 0 : 100);
  const [rawValue, setRawValue] = useState(null);
  const y = useMotionValue(min);

  useEffect(() => {
    y.onChange(latest => {
      const inputRange = [min, max];
      const outputRange = max < 0 ? [0, 100] : [100, 0];

      const output = Math.round(transform(latest, inputRange, outputRange));
      setRawValue(latest);
      setValue(output);
    });
  }, []);

  return {
    value,
    rawValue,
    y
  };
};

export default useHandle;

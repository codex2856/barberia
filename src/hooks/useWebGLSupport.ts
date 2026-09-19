import { useEffect, useState } from "react";
import { isLowEndDevice, supportsWebGL } from "../utils/device";

export interface DeviceCapability {
  webglSupported: boolean;
  lowEnd: boolean;
  /** true una vez se ha comprobado en el cliente (evita mismatch SSR/CSR). */
  checked: boolean;
}

export function useDeviceCapability(): DeviceCapability {
  const [capability, setCapability] = useState<DeviceCapability>({
    webglSupported: true,
    lowEnd: false,
    checked: false,
  });

  useEffect(() => {
    setCapability({
      webglSupported: supportsWebGL(),
      lowEnd: isLowEndDevice(),
      checked: true,
    });
  }, []);

  return capability;
}

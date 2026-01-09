"use client";

import { useEffect, useState } from "react";

/**
 * CSRF Token component
 * Generates and stores CSRF token for form submissions
 */
export default function CSRFToken() {
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    // Fetch CSRF token from API
    fetch("/api/csrf-token")
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          setToken(data.token);
        }
      })
      .catch(() => {
        // Silently fail - CSRF is optional
      });
  }, []);

  if (!token || process.env.ENABLE_CSRF !== "true") {
    return null;
  }

  return <input type="hidden" name="csrf_token" value={token} />;
}


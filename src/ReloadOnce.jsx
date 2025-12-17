import { useRef } from "react";

export default function ReloadOnce({ storageKey, children }) {
    const ranRef = useRef(false);

    if (!ranRef.current) {
        ranRef.current = true;

        const key = `__reloaded__${storageKey}`;

        if (!sessionStorage.getItem(key)) {
            sessionStorage.setItem(key, "1");
            console.log("reloaded:", key);
            window.location.reload();
            return null;
        }
    }

    return children;
}

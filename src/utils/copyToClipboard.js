import { toast } from "react-toastify";

export const copyToClipboard = (color) => {
    try {
        const el = document.createElement("textarea");
        el.value = color;
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
        toast.success(`Color code copied successfully: ${color}`, {
            theme: "dark",
            autoClose: 1000
        });
    } catch (error) {
        console.error("An error occurred while copying the color code:", error);
        toast.error("Error copying the color code. Please try again.", {
            theme: "dark",
            autoClose: 3000
        });
    }
}
export function Button({
    children,
    onClick,
    variant = "primary",
    size = "md",
    type = "button",
    style = null,
}) {
    const base = {
        border: "none",
        borderRadius: "999px",
        cursor: "pointer",
        fontWeight: "600",
        transition: "all 0.2s ease",
    };

    const sizes = {
        sm: { padding: "6px 12px", fontSize: "12px" },
        md: { padding: "10px 18px", fontSize: "14px" },
        lg: { padding: "14px 24px", fontSize: "16px" },
    };

    const variants = {
        primary: {
            backgroundColor: "#2563eb",
            color: "white",
        },
        secondary: {
            backgroundColor: "#e5e7eb",
            color: "#111827",
        },
        danger: {
            backgroundColor: "#dc2626",
            color: "white",
        },
    };

    return (
        <button
            type={type}
            onClick={onClick}
            style={{
                ...base,
                ...sizes[size],
                ...variants[variant],
                ...style
            }}
            onMouseOver={(e) => (e.target.style.opacity = 0.85)}
            onMouseOut={(e) => (e.target.style.opacity = 1)}
        >
            {children}
        </button>
    );
}
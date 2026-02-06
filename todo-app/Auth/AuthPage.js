import { useState } from "react";
import WelcomePanel from "./WelcomePanel";
import AuthForm from "./AuthForm";
import "./AuthPage.css"; // for hover animations

export default function AuthPage() {
    const [mode, setMode] = useState("signup"); // or "signin"
    const [hovered, setHovered] = useState(null); // "left" or "right"

    return (
        <div className={`auth-page ${hovered}`}>
            <div
                className="left-panel"
                onMouseEnter={() => setHovered("left")}
                onMouseLeave={() => setHovered(null)}
            >
                <WelcomePanel />
            </div>
            <div
                className="right-panel"
                onMouseEnter={() => setHovered("right")}
                onMouseLeave={() => setHovered(null)}
            >
                <AuthForm mode={mode} setMode={setMode} />
            </div>
        </div>
    );
}
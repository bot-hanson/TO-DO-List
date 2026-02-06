export default function AuthForm({ mode, setMode }) {
    return (
        <div className="auth-form">
            <h2>{mode === "signup" ? "Sign up" : "Sign in"}</h2>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <div className="forgot-password">Forgot password?</div>
            <button>{mode === "signup" ? "Sign up" : "Sign in"}</button>
            <p>
                {mode === "signup" ? "Already have an account?" : "Don't have an account?"}{" "}
                <span
                    className="toggle-link"
                    onClick={() => setMode(mode === "signup" ? "signin" : "signup")}
                >
                    {mode === "signup" ? "Sign in" : "Sign up"}
                </span>
            </p>
        </div>
    );
}
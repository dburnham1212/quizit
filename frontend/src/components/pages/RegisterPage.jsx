const RegisterPage = () => {
    return (
        <>
            <h1>Register</h1>
            <form>
                <div>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="text" id="email" />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="text" id="password" />
                </div>
                <div>
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input type="text" id="confirm-password" />
                </div>
            </form>
        </>
    );
};

export default RegisterPage;

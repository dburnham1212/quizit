import { useState } from "react";
import { BASE_URL } from "../../helpers/constants";
import formStyles from "../../styles/Forms/Form.module.css";

const RegisterPage = () => {
    const [error, setError] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());

        fetch(`${BASE_URL}/register`, {
            method: form.method,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            credentials: "include", // Don't forget to specify this if you need cookies
            body: JSON.stringify(formJson),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                // If we have an error
                if (data.error) setError(data.error);
            });
    };

    return (
        <>
            <div className="background"></div>
            <div className={formStyles.user_form_container}>
                <h1>Register</h1>
                <form method="post" onSubmit={handleSubmit} className={formStyles.user_form}>
                    <div className={formStyles.input_box}>
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" id="username" className={formStyles.input_field} required />
                    </div>
                    <div className={formStyles.input_box}>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" className={formStyles.input_field} required />
                    </div>
                    <div className={formStyles.input_box}>
                        <label htmlFor="password">Password</label>
                        <input type="text" name="password" id="password" className={formStyles.input_field} required />
                    </div>
                    <div className={formStyles.input_box}>
                        <label htmlFor="confirm-password">Confirm Password</label>
                        <input
                            type="text"
                            name="confirmPassword"
                            id="confirm-password"
                            className={formStyles.input_field}
                            required
                        />
                    </div>
                    <div>{error && <h4 className={formStyles.form_error_container}>{error}</h4>}</div>
                    <div className={formStyles.form_button_container}>
                        <button type="submit" className={formStyles.form_submit}>
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default RegisterPage;

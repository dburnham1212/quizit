import { useEffect } from "react";
import { BASE_URL } from "../../helpers/constants";

const HomePage = () => {
    useEffect(() => {
        fetch(`${BASE_URL}/quizzes`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return <h1>Hello World</h1>;
};

export default HomePage;

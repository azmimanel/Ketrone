import * as React from "react";
import { Input, Button, makeStyles } from "@fluentui/react-components";

const useStyles = makeStyles({
    authentication_container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px",
        width: "100vw",
        height: "100vh",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
    },
    card: {
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        width: "80%",
        maxWidth: "400px",
        padding: "20px",
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
});

const Authentication = ({ onLoginClick }) => {

    const styles = useStyles();

    return (
        <section className={styles.authentication_container}>
            <div className={styles.card}>
                <Input label="Email" type="email" placeholder="Enter your email" />
                <Input label="Password" type="password" placeholder="Enter your password" />
                <Button
                    style={{
                        backgroundColor: "black",
                        color: "white",
                        border: "1px solid white",
                        padding: "8px 16px"
                    }}
                    onClick={onLoginClick}
                >
                    Login
                </Button>
            </div>
        </section>
    );
};

export default Authentication;

import * as React from "react";
import { Button, makeStyles } from "@fluentui/react-components";
import { useState } from "react";
import { useTransition, animated } from '@react-spring/web';

const useStyles = makeStyles({
    tabsContainer: {
        display: "flex",
        justifyContent: "center",
        marginTop: "16px"
    },
    tabContainer: {
        display: "flex",
        flexDirection: "row",
        padding: "4px 8px",
        borderRadius: "24px",
        border: "solid 1px grey",
        width: "fit-content",
        alignSelf: "center"
    },
    tabButton: {
        width: "100px",
        padding: "10px 0",
        textAlign: "center",
        cursor: "pointer",
        fontWeight: "bold",
        transition: "background-color 0.3s",
        border: "none",
        borderRadius: "16px"
    },
    activeTab: {
        backgroundColor: "blue",
        color: "white",
    },
    contentContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "200px",
        border: "1px solid black",
        borderRadius: "4px",
        padding: "1rem",
    },
});

const Tabs = () => {
    const styles = useStyles();
    const [selectedTab, setSelectedTab] = useState("Review");

    const renderTabContent = () => {
        switch (selectedTab) {
            case "Review":
                return <div>Review Content</div>;
            case "Ask":
                return <div>Ask Content</div>;
            case "Draft":
                return <div>Draft Content</div>;
            default:
                return null;
        }
    };

    const transitions = useTransition(selectedTab, {
        from: { opacity: 0, transform: "translateY(20px)" },
        enter: { opacity: 1, transform: "translateY(0)" },
        leave: { opacity: 0, transform: "translateY(-20px)" },
        config: { tension: 250, friction: 20 },
    });

    return (
        <div className={styles.tabsContainer}>
            <div className={styles.tabContainer}>
                {["Review", "Ask", "Draft"].map((tab) => (
                    <Button
                        key={tab}
                        className={styles.tabButton}
                        style={{
                            backgroundColor: selectedTab === tab ? "#005feb" : "transparent",
                            color: selectedTab === tab ? "white" : null
                        }}
                        onClick={() => setSelectedTab(tab)}
                        disabled={selectedTab === "Review" ? true : false}
                    >
                        {tab}
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default Tabs;

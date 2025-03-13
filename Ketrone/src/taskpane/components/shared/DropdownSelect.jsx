import { SearchIcon } from "@heroicons/react/outline";
import React, { useState, useEffect } from "react";

const DropdownWithApiCall = ({ options, setOptions }) => {

    const [selectedOption, setSelectedOption] = useState("");
    const [loading, setLoading] = useState(false);
    const styles = {
        container: {},
        dropdown: {
            padding: "10px",
            width: "100%",
            borderRadius: "24px",
            border: "1px solid #dcdcdc",
            fontSize: "16px",
            cursor: "pointer",
            outline: "none",
            transition: "all 0.3s ease",
        },
        heading: {
            fontSize: "20px",
            fontWeight: "bold",
        },
        option: {
            padding: "10px",
            borderRadius: "12px",

        },
        searchIconContainer: {
            backgroundColor: "#ececec",
            padding: "8px",
            borderRadius: "16px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
        loader: {
            width: "24px",
            height: "24px",
            border: "3px solid #f3f3f3",
            borderTop: "3px solid #3498db",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
        }
    };


    const simulateApiCall = () => {
        setTimeout(() => {
            const data = ["Ketrone", "MAA"];
            setOptions(data);
        }, 3000);
    };

    useEffect(() => {
        simulateApiCall();
    }, []);

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleSearchClick = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            simulateApiCall();
        }, 3000);
    };

    return (
        <div style={styles.container}>
            <h3 style={{ fontSize: "12px" }}>Representing</h3>
            <div style={{ display: "flex", flexDirection: "row", gap: "8px" }}>
                <select
                    value={selectedOption}
                    onChange={handleChange}
                    style={styles.dropdown}
                    disabled={loading}
                >
                    <option value="" disabled>Select an option</option>
                    {loading ? (
                        <option disabled>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <div style={styles.loader}></div>
                                <span style={{ marginLeft: "8px" }}>Loading...</span>
                            </div>
                        </option>
                    ) : options.length > 0 ? (
                        options.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))
                    ) : (
                        <option value="" disabled>
                            No options available
                        </option>
                    )}
                </select>

                <div
                    style={styles.searchIconContainer}
                    onClick={handleSearchClick}
                >
                    <SearchIcon style={{ width: "24px", height: "24px", color: "#2c2c2f" }} />
                </div>
            </div>
        </div>
    );
};

export default DropdownWithApiCall;

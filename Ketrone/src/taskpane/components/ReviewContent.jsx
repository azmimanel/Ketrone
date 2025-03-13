import React, { useState } from "react";
import DropdownWithApiCall from "./shared/DropdownSelect";
import { Button, Textarea } from "@fluentui/react-components";
import ReviewCard from "./shared/ReviewCard";
import apiResponse from "../assets/response.json";
import { CheckIcon } from "@heroicons/react/outline";

const ReviewContent = ({ insertText }) => {

    const [text, setText] = useState("");
    const [showRecommendations, setShowRecommendations] = useState(false);
    const [cards, setCards] = useState(apiResponse.apiResponse);
    const [options, setOptions] = useState([]);

    const handleTextChange = async (event) => {
        setText(event.target.value);
    };

    const handleTextInsertion = async () => {
        await insertText(text);
    };

    const onDismiss = (id) => {
        setCards((prevCards) => prevCards.filter((item) => item.id !== id));
    };

    return (
        <div style={{ padding: "16px" }}>
            {!showRecommendations &&
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px"
                }}>
                    <h1>Review</h1>
                    <DropdownWithApiCall options={options} setOptions={setOptions} />
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <h3 style={{ fontSize: "12px" }}>Additional context</h3>
                        <Textarea
                            size="large"
                            value={text}
                            onChange={handleTextChange}
                            placeholder="Enter any additional context here"
                            style={{
                                backgroundColor: "#eff3f4",
                                outline: "none",
                                border: "1px solid #dcdcdc",
                            }}
                        />
                    </div>
                    <Button
                        style={{
                            backgroundColor: options.length !== 0 ? "#005feb" : "#6f94d1",
                            color: "white",
                            border: "1px solid white",
                            padding: "8px 16px",
                            borderRadius: "24px"
                        }}
                        onClick={() => setShowRecommendations(true)}
                    >
                        Review Document
                    </Button>
                </div>
            }
            {showRecommendations &&
                <div>
                    <h1>Review</h1>
                    <div style={{ display: "flex", flexDirection: "row", gap: "4px", alignItems: "center" }} >
                        <CheckIcon style={{ width: "12px", height: "12px", color: "#4f8b64" }} />
                        <h4 style={{ color: "grey", fontSize: "12px", fontWeight: "400" }}>{cards.length} Suggestions</h4>
                    </div>
                    {cards.map((item) => (
                        <ReviewCard key={item.id} passage={item} onDismiss={() => onDismiss(item.id)} />
                    ))}
                </div>

            }
        </div>
    )
};

export default ReviewContent;
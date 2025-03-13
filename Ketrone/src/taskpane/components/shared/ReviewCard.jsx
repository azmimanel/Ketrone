import { Button } from "@fluentui/react-components";
import React from "react";
import PassageComparison from "./PassageComparison";
import { EyeOffIcon, LocationMarkerIcon, PencilIcon } from '@heroicons/react/outline';



const ReviewCard = ({ passage, onDismiss }) => {

    const maxLength = 3000;

    const handleNavigateToCursor = async () => {
        try {
            await Word.run(async (context) => {
                const body = context.document.body;
                const searchQuery = passage.originalPassage.trim();
                if (searchQuery.length > maxLength) {
                    console.warn("Search query is too long, splitting...");
                    for (let i = 0; i < searchQuery.length; i += maxLength) {
                        const part = searchQuery.substring(i, i + maxLength);
                        await performSearch(context, body, part);
                    }
                } else {
                    await performSearch(context, body, searchQuery);
                }
            });
        } catch (error) {
            console.error("Error navigating to passage:", error);
        }
    };

    const performSearch = async (context, body, query) => {
        const searchResults = body.search(query, { matchCase: false, matchWholeWord: false });
        context.load(searchResults, "items");
        await context.sync();

        if (searchResults.items.length > 0) {
            searchResults.items[0].select();
            console.log("Passage found and selected.");
        } else {
            console.log("Passage not found.");
        }
    };



    const applyChange = async () => {
        const updatedText = passage.updatedPassage;

        try {
            await Word.run(async (context) => {
                var body = context.document.body;
                var options = Word.SearchOptions.newObject(context);
                options.matchCase = false;
                options.matchWholeWord = true;
                options.matchWildcards = false;
                options.ignorePunct = true;

                const originalText = passage.originalPassage.replace(/\s+/g, ' ').trim();
                console.log("Searching for: ", "Ketrone");
                const searchResults = body.search(originalText, options);
                context.load(searchResults, 'items');
                await context.sync();
                console.log('Found count: ' + searchResults.items.length);

                if (searchResults.items.length > 0) {
                    for (var i = 0; i < searchResults.items.length; i++) {
                        searchResults.items[i].insertText(updatedText, Word.InsertLocation.replace);
                    }
                    await context.sync();
                    console.log("Changes applied to the document");
                } else {
                    console.log("No matching text found");
                }
            });
        } catch (error) {
            console.error("Error applying changes: ", error);
        }
    };

    const styles = {
        cardContainer: {
            border: "1px solid #ccc",
            borderRadius: "12px",
            padding: "16px",
            marginBottom: "12px",
            backgroundColor: "#fff",
            boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
        },
        buttonContainer: {
            display: "flex",
            gap: "10px",
            marginTop: "12px",
        },
        typeText: {
            color: "grey",
            fontSize: "14px",
            fontWeight: "400",
        },
        divider: {
            height: "1px",
            backgroundColor: "#ccc",
            margin: "20px 0",
        }
    };

    const severityStyle = {
        backgroundColor:
            passage.severityLevel === "Mid"
                ? "#cbdefb"
                : passage.severityLevel === "High"
                    ? "#f1d0d2"
                    : "#d5f2dd",
        color:
            passage.severityLevel === "Mid"
                ? "#355c9a"
                : passage.severityLevel === "High"
                    ? "red"
                    : "#4f8b64",
        width: 'fit-content',
        padding: '10px',
        borderRadius: '12px'
    };

    return (
        <div style={styles.cardContainer}>
            <h4 style={severityStyle}>{passage.severityLevel}</h4>
            <h3>{passage.title}</h3>
            <h4 style={styles.typeText}>{passage.updateType}</h4>
            <div style={styles.divider}></div>
            <p>{passage.explanation}</p>

            <PassageComparison passage={passage} />
            <div style={styles.divider}></div>
            <div style={styles.buttonContainer}>
                <div style={{
                    backgroundColor: "#cbdefb",
                    padding: "8px",
                    borderRadius: "16px",
                    cursor: "pointer"
                }}
                    onClick={handleNavigateToCursor}
                >
                    <LocationMarkerIcon style={{ width: "24px", height: "24px", color: "#355c9a" }} />
                </div>
                <div style={{
                    backgroundColor: "#d5f2dd",
                    padding: "8px",
                    borderRadius: "16px",
                    cursor: "pointer"
                }}
                    onClick={applyChange}>
                    <PencilIcon style={{ width: "24px", height: "24px", color: "#4f8b64" }} />
                </div>
                <div style={{
                    backgroundColor: "#ececec",
                    padding: "8px",
                    borderRadius: "16px",
                    cursor: "pointer"
                }}
                    onClick={onDismiss}
                >
                    <EyeOffIcon style={{ width: "24px", height: "24px", color: "#2c2c2f" }} />
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;

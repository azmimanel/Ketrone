import React, { useState } from 'react';

const getDiffs = (original, updated) => {
    let diffText = [];
    let i = 0;
    let j = 0;

    while (i < original.length || j < updated.length) {
        if (original[i] === updated[j]) {
            diffText.push({ text: original[i], type: 'normal' });
            i++;
            j++;
        } else if (original[i] !== updated[j]) {
            let deletedText = '';
            let addedText = '';

            while (i < original.length && (j >= updated.length || original[i] !== updated[j])) {
                deletedText += original[i];
                i++;
            }

            while (j < updated.length && (i >= original.length || original[i] !== updated[j])) {
                addedText += updated[j];
                j++;
            }

            if (deletedText) {
                diffText.push({ text: deletedText, type: 'deleted' });
            }
            if (addedText) {
                diffText.push({ text: addedText, type: 'added' });
            }
        }
    }

    return diffText;
};

const PassageComparison = ({ passage }) => {
    const { originalPassage, updatedPassage } = passage;

    const diffText = getDiffs(originalPassage, updatedPassage);

    return (
        <div style={{ padding: '20px', marginBottom: '10px', backgroundColor: "#eff1f3", borderRadius: "16px" }}>
            <p>
                {diffText.map((item, index) => {
                    let style = {};
                    if (item.type === 'added') {
                        style = { color: 'green' };
                    } else if (item.type === 'deleted') {
                        style = { color: 'red', textDecoration: 'line-through' };
                    }

                    return (
                        <span key={index} style={style}>
                            {item.text}
                        </span>
                    );
                })}
            </p>
        </div>
    );
};

export default PassageComparison;

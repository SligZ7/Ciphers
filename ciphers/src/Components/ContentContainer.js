import React from 'react';

function ContentContainer({ TabContent }) {
    return (
        <main>
            <section className="side" />
            {TabContent}
            <section className="side" />
        </main>
    );
}

export default ContentContainer;
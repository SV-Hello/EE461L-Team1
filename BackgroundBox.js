import React from 'react';

class BackgroundBox extends React.Component {
    render() {
        const BackgroundBox = {
            border: '1px solid #ccc',
            padding: '20px',
            backgroundColor: '#154c79',
        };

    return (
        <div style = {BackgroundBox}>
            {this.props.children}
            </div>
        );
    }
}

export default BackgroundBox;
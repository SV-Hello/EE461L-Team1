import React from 'react';

class Shape extends React.Component {
    render() {
        const style = {
            width: this.props.width || '100px',
            height: this.props.height || '100px',
            backgroundColor: '#76b5c5',
            justifyContent: 'center',
            alignItems: 'center',
        };
        
        return <div style = {style}> {this.props.text} </div>
    }
}

export default Shape;
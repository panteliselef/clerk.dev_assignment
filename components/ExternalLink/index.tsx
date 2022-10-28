import React from 'react';

const ExternalLink: React.FC<JSX.IntrinsicElements['a']> = ({ target = `_blank`, href, ...props }) => {
    return (
        <a {...props} className={props.className || ''} href={href} target={target} rel="noopener noreferrer">
            {props.children}
        </a>
    );
};

export default ExternalLink;

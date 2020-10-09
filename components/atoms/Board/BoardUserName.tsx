import React from 'react';

interface IBoardUserName {
    children?: string;
}

function BoardUserName({ children }: IBoardUserName): JSX.Element {
    return <div>{children || '익명'}</div>;
}

export default BoardUserName;

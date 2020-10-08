import React from 'react';

import Edit from 'components/board/Edit';

function EditPage({ isOpen, boardId }) {
    return <Edit isOpen={isOpen} boardId={boardId} />;
}

export default EditPage;

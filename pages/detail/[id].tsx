import React, { useState } from 'react';
import styled from '@emotion/styled';
import useSWR from 'swr';
import SEO from 'components/atoms/SEO';
import Board from 'components/Board';
import { Section } from 'assets/styles/Layout.style';
import { useRouter } from 'next/router';

function Page(): JSX.Element {
    const router = useRouter();
    const { id } = router.query;
    const { data } = useSWR(`/api/board/read?id=${id}`);
    const [boardLikeId, setBoardLikeId] = useState(0);
    const [replyList, setReplyList] = useState([]);
    const [replyTotal, setReplyTotal] = useState(0);
    const [replyPage, setReplyPage] = useState(1);
    const [reReplyPage, setReReplyPage] = useState([]);
    const [replyLikeId, setReplyLikeId] = useState([]);
    const [reply, setReply] = useState('');
    const [reReply, setReReply] = useState([]);
    const [openReply, setOpenReply] = useState([] as any);
    const [openModal, setOpenModal] = useState(false);
    return (
        <>
            <SEO
                title="상세페이지 | 스쿨빌런"
                description="스쿨빌런 게시물 상세 페이지입니다."
                keywords="스쿨빌런 게시물 상세 페이지"
            />
            <DetailSection>
                <Board
                    board={data}
                    likeBoard={() => {
                        console.log('like');
                    }}
                    boardLikeId={boardLikeId}
                    deleteBoard={() => {
                        console.log('delete');
                    }}
                    editBoard={() => {
                        console.log('edit');
                    }}
                />
            </DetailSection>
        </>
    );
}

const DetailSection = styled.section`
    ${Section()};
    margin-top: 6em;
`;

export default Page;

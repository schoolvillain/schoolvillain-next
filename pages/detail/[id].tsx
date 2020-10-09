import React from 'react';
import SEO from 'components/SEO/SEO';
import DetailSection from 'components/modules/DetailSection';

function Detail(): JSX.Element {
    return (
        <>
            <SEO
                title="상세페이지 | 스쿨빌런"
                description="스쿨빌런 게시물 상세 페이지입니다."
                keywords="스쿨빌런 게시물 상세 페이지"
            />
            <DetailSection />
        </>
    );
}

export default Detail;

import React from 'react';
import Head from 'next/head';

interface propsType {
    title: string;
    description: string;
    keywords: string;
    img?: string;
}

const SEO: React.FC<propsType> = ({ title, description, keywords, img }) => {
    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />

            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={img} />

            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={img} />
        </Head>
    );
};

export default SEO;

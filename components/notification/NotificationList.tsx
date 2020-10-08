/** @jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/core';
import { Grid } from 'styles/Layout.style';
import { MarkdownBase, MarkdownSm } from 'styles/Markdown.style';
import { Color } from 'styles/Color.style';
import styled from '@emotion/styled';
import { media } from 'styles/Media.style';

const NotiList = styled.li`
    padding: 1.5em;
    cursor: pointer;
    ${Grid(25, 75)};
    ${MarkdownSm()}
    ${media.sm`padding:1.5em 0;`}
`;

interface notiTypeProps {
    isRead: string | any;
}
const NotiType = styled.div<notiTypeProps>`
    margin-right: 0.8em;
    text-align: center;
    padding: 0.3em;
    border-radius: 0.5em;
    ${(props: notiTypeProps) =>
        props.isRead
            ? css`
                  ${MarkdownSm(Color.purple100)};
                  border: 1px solid ${Color.purple100};
              `
            : css`
                  ${MarkdownSm(Color.purple200)};
                  border: 1px solid ${Color.purple200};
              `};
`;

interface propsType {
    notificationList: any;
    readOne: any;
}

const NotificationList: React.FC<propsType> = ({ notificationList, readOne }) => {
    // let list = useSelector(state => state.notification.list);
    return (
        <>
            {notificationList.length > 0 && notificationList ? (
                notificationList.map((item: any, index: number) => {
                    return (
                        <NotiList
                            key={`noti-${index}`}
                            css={css`
                                ${item.read_at ? `color:${Color.gray200}` : ''}
                            `}
                            onClick={() => readOne(item.id, index)}
                        >
                            <div>
                                <NotiType isRead={item.read_at}>
                                    {item.notice_type.description}
                                </NotiType>
                            </div>
                            <div>
                                <p
                                    css={css`
                                        margin-bottom: 0.3em;
                                    `}
                                >
                                    {item.contents}
                                </p>
                                <span
                                    css={css`
                                        ${MarkdownSm(Color.gray200)}
                                    `}
                                >
                                    {item.create_time_ago}
                                </span>
                            </div>
                        </NotiList>
                    );
                })
            ) : (
                <div
                    css={css`
                        text-align: center;
                        padding: 5em;
                        ${MarkdownBase(Color.gray200)}
                    `}
                >
                    알림이 존재하지 않습니다.
                </div>
            )}
        </>
    );
};
export default NotificationList;

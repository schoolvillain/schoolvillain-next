import * as React from 'react';
import styled from '@emotion/styled';
import { MarkdownBase, MarkdownLg, MarkdownMd } from 'styles/Markdown.style';
import { Color } from 'styles/Color.style';
import Link from 'next/link';
import SEO from 'components/SEO/SEO';
import { media } from 'styles/Media.style';

const PrivacyRuleSection = styled.section`
    min-height: 100vh;
    padding: 2em 0 4em 0;
    ${media.sm` padding:1em 0 4em 0 ;`}
`;
const PrivacyRuleArticle = styled.article`
    padding: 15px 0;
`;
const PrivacyRuleHeading = styled.div`
    ${MarkdownLg(Color.purple200, 700)};
    text-align: center;
`;
const PrivacyRuleTitle = styled.div`
    ${MarkdownBase('', 700)};
    margin-bottom: 10px;
`;
const PrivacyRuleList = styled.li`
    list-style: initial;
`;

const PrivacyRuleBtn = styled.button`
    position: fixed;
    right: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 45px;
    ${MarkdownMd(Color.white)};
    background-color: ${Color.purple200};
    &:hover {
        background-color: ${Color.purple300};
    }
`;
const PrivacyRule = () => {
    return (
        <>
            <SEO
                title="개인정보 처리 방침 | 스쿨빌런"
                description="스쿨빌런 개인정보 처리 방침 페이지입니다."
                keywords="스쿨빌런 개인정보 처리 방침 페이지"
            />
            <Link href="/join/agreement">
                <PrivacyRuleBtn>확인</PrivacyRuleBtn>
            </Link>
            <PrivacyRuleSection>
                <PrivacyRuleHeading>개인정보 처리 방침</PrivacyRuleHeading>
                <PrivacyRuleArticle>
                    <PrivacyRuleTitle>제 1조. 개인정보의 처리 목적</PrivacyRuleTitle>
                    <div>
                        스쿨빌런(‘https://villain.school 이하 ‘회사’) 은(는) 다음의 목적을 위하여
                        개인정보를 처리하고 있으며, 다음의 목적 이외의 용도로는 이용하지 않습니다.
                        <br />
                        <br />
                        ‘사용자’가입의사 확인, ‘사용자’에 대한 서비스 제공에 따른 본인 식별, 인증,
                        회원자격 유지, 관리, 물품 또는 서비스 공급에 따른 금액 결제, 물품 또는
                        서비스의 공급 배송 등
                    </div>
                </PrivacyRuleArticle>
                <PrivacyRuleArticle>
                    <PrivacyRuleTitle>
                        제 2조. 정보주체의 권리, 의무 및 그 행사방법
                    </PrivacyRuleTitle>
                    <div>
                        이용자는 개인정보주체로서 다음과 같은 권리를 행사할 수 있습니다.
                        <br />
                        <br />
                        정보주체는 회사에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를
                        행사할 수 있습니다.
                        <br />
                        <br />
                        <PrivacyRuleList>개인정보 열람요구</PrivacyRuleList>
                        <PrivacyRuleList>오류 등이 있을 경우 정정 요구</PrivacyRuleList>
                        <PrivacyRuleList>삭제요구</PrivacyRuleList>
                        <PrivacyRuleList>처리정지 요구</PrivacyRuleList>
                    </div>
                </PrivacyRuleArticle>
                <PrivacyRuleArticle>
                    <PrivacyRuleTitle>
                        제 3조. 개인정보처리 제공 및 처리위탁 및 국외이전
                    </PrivacyRuleTitle>
                    <div>
                        회사는 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를
                        위탁하고 있습니다.
                        <br />
                        <br />
                        회사는 위탁계약 체결시 개인정보 보호법 제25조에 따라 위탁업무 수행목적 외
                        개인정보 처리금지, 기술적․관리적 보호조치, 재위탁 제한, 수탁자에 대한
                        관리․감독, 손해배상 등 책임에 관한 사항을 계약서 등 문서에 명시하고,
                        수탁자가 개인정보를 안전하게 처리하는지를 감독하고 있습니다.
                        <br />
                        <br />
                        위탁업무의 내용이나 수탁자가 변경될 경우에는 지체없이 본 개인정보 처리방침을
                        통하여 공개하도록 하겠습니다.
                        <br />
                        <br />
                        "회사"는 개인정보를 1. 개인정보의 수집 및 이용목적에서 고지한 범위 내에서
                        사용하며, 이용자의 사전 동의 없이 동 범위를 초과하여 이용하지 않습니다.
                        <br />
                        <br />
                        <strong>처리위탁</strong>
                        <br />
                        <br />
                        "회사"는 서비스 향상을 위해서 아래와 같이 개인정보를 위탁하고 있으며, 관계
                        법령에 따라 위탁계약 시 개인정보가 안전하게 관리될 수 있도록 필요한 사항을
                        규정하고 있습니다. 변동사항 발생 시 공지사항 또는 개인정보취급방침을 통해
                        고지하도록 하겠습니다.
                        <br />
                        <br />
                        다음의 경우에는 합당한 절차를 통한 이용자의 동의를 얻어 개인정보를 제공 또는
                        이용할 수 있습니다.
                        <br />
                        <br />
                        <PrivacyRuleList>
                            제휴관계: 본 개인정보취급방침 시행일 현재 아래와 같이 개인회원의
                            개인정보를 제공하는 제휴관계가 있으며, 제휴를 통한 변동사항 발생 시
                            사전공지 합니다. 이 경우 개별적인 동의를 구하는 절차를 거치며, 동의가
                            없는 경우에는 제공하지 않습니다. 단, 기업회원은 기업회원 약관 제 9조에
                            따릅니다.
                        </PrivacyRuleList>
                        <PrivacyRuleList>
                            매각, 인수합병: 서비스 제공자의 권리, 의무가 승계 또는 이전되는 경우
                            이를 반드시 사전에 고지하며 이용자의 개인정보에 대한 동의철회의 선택권을
                            부여합니다.
                        </PrivacyRuleList>
                        <br />
                        다만, 아래의 경우에는 예외로 합니다.
                        <br />
                        <br />
                        관계법령에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라
                        수사기관의 요구가 있는 경우
                    </div>
                </PrivacyRuleArticle>
                <PrivacyRuleArticle>
                    <PrivacyRuleTitle>제 4조. 처리하는 개인정보의 항목 작성</PrivacyRuleTitle>
                    <div>
                        회사는 다음의 개인정보 항목을 처리하고 있습니다.
                        <br />
                        <br />
                        ‘사용자’ 가입의사 확인, ‘사용자’ 에 대한 서비스 제공에 따른 본인 식별․인증,
                        회원자격 유지․관리, 물품 또는 서비스 공급에 따른 금액 결제, 물품 또는
                        서비스의 공급, 배송
                        <br />
                        <br />
                        필수항목 : 비밀번호, 로그인ID(이메일), 학교, 학년, 전화번호, 신용카드정보,
                        은행계좌정보, 결제기록, 접속 IP 정보, 쿠키, 서비스 이용 기록, 접속 로그
                        <br />
                        <br />
                        선택항목 : 없음
                        <br />
                        <br />
                    </div>
                </PrivacyRuleArticle>
                <PrivacyRuleArticle>
                    <PrivacyRuleTitle>제 5조. 개인정보의 보유 및 이용기간</PrivacyRuleTitle>
                    <div>
                        회사는 회원가입일로부터 서비스를 제공하는 기간 동안에 한하여 이용자의
                        개인정보를 보유 및 이용하게 됩니다. 회원탈퇴를 요청하거나 개인정보의 수집 및
                        이용에 대한 동의를 철회하는 경우, 수집 및 이용목적이 달성되거나 이용기간이
                        종료한 경우 개인정보를 지체 없이 파기합니다.단, 다음의 경우에 대해서는 각각
                        명시한 이유와 기간 동안 보존합니다.
                        <br />
                        <br />
                        상법 등 관계법령의 규정에 의하여 보존할 필요가 있는 경우 법령에서 규정한
                        보존기간 동안 거래내역과 최소한의 기본정보를 보유합니다.
                        <br />
                        <br />
                        <PrivacyRuleList>계약 또는 청약철회 등에 관한 기록: 5년</PrivacyRuleList>
                        <PrivacyRuleList>
                            대금결제 및 재화 등의 공급에 관한 기록: 5년
                        </PrivacyRuleList>
                        <PrivacyRuleList>
                            소비자의 불만 또는 분쟁처리에 관한 기록: 3년
                        </PrivacyRuleList>
                        <PrivacyRuleList>부정이용 등에 관한 기록: 5년</PrivacyRuleList>
                        <PrivacyRuleList>
                            웹사이트 방문기록(로그인 기록, 접속기록): 3년
                        </PrivacyRuleList>
                        <br />
                        <br />
                        보유기간을 미리 공지하고 그 보유기간이 경과하지 아니한 경우와 개별적으로
                        동의를 받은 경우에는 약정한 기간 동안 보유합니다.
                        <br />
                        <br />
                        개인정보보호를 위하여 이용자가 1년 동안 "사이트"를 이용하지 않은 경우,
                        이메일(또는 페이스북 등 외부 서비스와의 연동을 통해 이용자가 설정한 계정
                        정보)를 "휴면계정"로 분리하여 해당 계정의 이용을 중지할 수 있습니다. 이 경우
                        "회사"는 "휴면계정 처리 예정일"로부터 30일 이전에 해당사실을 전자메일, 서면,
                        SMS 중 하나의 방법으로 사전 통지하며 이용자가 직접 본인확인을 거쳐, 다시
                        회사 이용 의사표시를 한 경우에는 회사 이용이 가능합니다.
                    </div>
                </PrivacyRuleArticle>
                <PrivacyRuleArticle>
                    <PrivacyRuleTitle>제 6조. 개인정보의 파기</PrivacyRuleTitle>
                    <div>
                        회사는 원칙적으로 개인정보 처리목적이 달성된 경우에는 지체없이 해당
                        개인정보를 파기합니다. 파기의 절차, 기한 및 방법은 다음과 같습니다.
                        <br />
                        <br />
                        <strong>파기절차</strong>
                        <br />
                        <br />
                        이용자가 입력한 정보는 목적 달성 후 별도의 DB에 옮겨져(종이의 경우 별도의
                        서류) 내부 방침 및 기타 관련 법령에 따라 일정기간 저장된 후 혹은 즉시
                        파기됩니다. 이 때, DB로 옮겨진 개인정보는 법률에 의한 경우가 아니고서는 다른
                        목적으로 이용되지 않습니다.
                        <br />
                        <br />
                        <strong> 파기기한</strong>
                        <br />
                        <br />
                        이용자의 개인정보는 개인정보의 보유기간이 경과된 경우에는 보유기간의
                        종료일로부터 5일 이내에, 개인정보의 처리 목적 달성, 해당 서비스의 폐지,
                        사업의 종료 등 그 개인정보가 불필요하게 되었을 때에는 개인정보의 처리가
                        불필요한 것으로 인정되는 날로부터 5일 이내에 그 개인정보를 파기합니다.
                    </div>
                </PrivacyRuleArticle>

                <PrivacyRuleArticle>
                    <PrivacyRuleTitle>
                        제 7조. 개인정보 자동 수집 장치의 설치, 운영 및 거부에 관한 사항
                    </PrivacyRuleTitle>
                    <div>
                        회사는 원칙적으로 개인정보 처리목적이 달성된 경우에는 지체없이 해당
                        개인정보를 파기합니다. 파기의 절차, 기한 및 방법은 다음과 같습니다.
                        <br />
                        <br />
                        <strong>쿠키란?</strong>
                        <br />
                        <br />
                        웹사이트를 운영하는데 이용되는 서버가 이용자의 브라우저에 보내는 작은 텍스트
                        파일로 이용자의 하드디스크에 저장됩니다.
                        <br />
                        <br />
                        <strong>쿠키의 사용 목적</strong>
                        <br />
                        <br />
                        "회사"가 쿠키를 통해 수집하는 정보는 '2. 수집하는 개인정보 항목 및
                        수집방법'과 같으며 '1. 개인정보의 수집 및 이용목적'외의 용도로는 이용되지
                        않습니다.
                        <br />
                        <br />
                        <strong>쿠키 설치, 운영 및 거부</strong>
                        <br />
                        <br />
                        이용자는 쿠키 설치에 대한 선택권을 가지고 있습니다. 웹브라우저에서 옵션을
                        설정함으로써 모든 쿠키를 허용하거나, 쿠키가 저장될 때마다 확인을 거치거나,
                        아니면 모든 쿠키의 저장을 거부할 수도 있습니다.
                        <br />
                        <br />
                        쿠키 설치 허용 여부를 지정하는 방법(Internet Explorer의 경우)은 다음과
                        같습니다. 예)웹 브라우저 상단의 도구 &gt; 인터넷 옵션 &gt; 개인정보
                        <br />
                        <br />
                        단, 쿠키의 저장을 거부할 경우에는 로그인이 필요한 일부 서비스 이용에
                        어려움이 있을 수 있습니다.
                    </div>
                </PrivacyRuleArticle>
                <PrivacyRuleArticle>
                    <PrivacyRuleTitle>제 8조. 개인정보의 안전성 확보 조치</PrivacyRuleTitle>
                    <div>
                        회사는 개인정보보호법 제29조에 따라 다음과 같이 안전성 확보에 필요한
                        기술적/관리적 및 물리적 조치를 하고 있습니다.
                        <br />
                        <br />
                        <strong>개인정보 취급 직원의 최소화 및 교육</strong>
                        <br />
                        <br />
                        개인정보를 취급하는 직원을 지정하고 담당자에 한정시켜 최소화 하여 개인정보를
                        관리하는 대책을 시행하고 있습니다.
                        <br />
                        <br />
                        <strong>정기적인 자체 감사 실시</strong>
                        <br />
                        <br />
                        개인정보 취급 관련 안정성 확보를 위해 정기적(분기 1회)으로 자체 감사를
                        실시하고 있습니다.
                        <br />
                        <br />
                        <strong>내부관리계획의 수립 및 시행</strong>
                        <br />
                        <br />
                        개인정보의 안전한 처리를 위하여 내부관리계획을 수립하고 시행하고 있습니다.
                        <br />
                        <br />
                        <strong>개인정보의 암호화</strong>
                        <br />
                        <br />
                        이용자의 개인정보 및 비밀번호는 암호화 되어 저장 및 관리되고 있어 본인만이
                        알 수 있으며, 중요한 데이터에 대해서는 파일 및 전송 데이터를 암호화 하거나
                        파일 잠금 기능을 사용하는 등의 별도 보안기능을 사용하고 있습니다.
                        <br />
                        <br />
                        <strong>해킹 등에 대비한 기술적 대책</strong>
                        <br />
                        <br />
                        회사는 해킹이나 컴퓨터 바이러스 등에 의한 개인정보 유출 및 훼손을 막기
                        위하여 보안프로그램을 설치하고 주기적인 갱신·점검을 하며 외부로부터 접근이
                        통제된 구역에 시스템을 설치하고 기술적/물리적으로 감시 및 차단하고 있습니다.
                        <br />
                        <br />
                        <strong>개인정보에 대한 접근 제한</strong>
                        <br />
                        <br />
                        개인정보를 처리하는 데이터베이스시스템에 대한 접근권한의 부여,변경,말소를
                        통하여 개인정보에 대한 접근통제를 위하여 필요한 조치를 하고 있으며
                        침입차단시스템을 이용하여 외부로부터의 무단 접근을 통제하고 있습니다.
                        <br />
                        <br />
                        <strong>접속기록의 보관 및 위변조 방지</strong>
                        <br />
                        <br />
                        개인정보처리시스템에 접속한 기록을 최소 6개월 이상 보관, 관리하고 있으며,
                        접속 기록이 위변조 및 도난, 분실되지 않도록 보안기능 사용하고 있습니다.
                        <br />
                        <br />
                        <strong>비인가자에 대한 출입 통제</strong>
                        <br />
                        <br />
                        개인정보를 보관하고 있는 물리적 보관 장소를 별도로 두고 이에 대해 출입통제
                        절차를 수립, 운영하고 있습니다.
                    </div>
                </PrivacyRuleArticle>
                <PrivacyRuleArticle>
                    <PrivacyRuleTitle>제 9조. 이용자의 권리와 그 행사방법</PrivacyRuleTitle>
                    <div>
                        이용자 및 법정대리인은 언제든지 등록되어 있는 자신 혹은 당해 미성년자의
                        정보를 열람, 공개 및 비공개 처리, 수정, 삭제할 수 있습니다. 이용자 및
                        법정대리인은 개인정보 조회/수정을 위해서는 '회원정보관리'를 통하여 가능하며,
                        가입해지(동의철회)를 위해서는 개인정보 보호책임자에게 서면, 전화 또는
                        이메일로 연락하시면 본인 확인 절차를 거친 후 지체 없이 조치하겠습니다.
                        <br />
                        <br />
                        이용자가 개인정보의 오류에 대한 정정을 요청하신 경우에는 정정을 완료하기
                        전까지 당해 개인정보를 이용 또는 제공하지 않습니다. 또한 잘못된 개인정보를
                        제3자에게 이미 제공한 경우에는 정정 처리결과를 제3자에게 지체 없이 통지하여
                        정정이 이루어지도록 하겠습니다.
                        <br />
                        <br />
                        "회사"는 이용자 요청에 의해 해지 또는 삭제된 개인정보는 '4. 개인정보의 보유
                        및 이용기간'에 명시된 바에 따라 처리하고 그 외의 용도로 열람 또는 이용할 수
                        없도록 처리하고 있습니다.
                    </div>
                </PrivacyRuleArticle>
                <PrivacyRuleArticle>
                    <PrivacyRuleTitle>제 10조. 개인정보 보호책임자 및 민원서비스</PrivacyRuleTitle>
                    <div>
                        회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한
                        정보주체의 고충처리 및 피해구제 등을 위하여 아래와 같이 개인정보
                        보호책임자를 지정하고 있습니다.
                        <br />
                        <br />
                        <strong>개인정보 보호책임자</strong>
                        <br />
                        <br />
                        성명: 유현종
                        <br />
                        직책: 운영책임자
                        <br />
                        직급: COO
                        <br />
                        연락처: 010-4001-3361, roy@villain.school
                        <br />
                        ※ 개인정보 보호 담당자에게 연결됩니다.
                        <br />
                        <br />
                        <strong>개인정보보호 담당부서</strong>
                        <br />
                        <br />
                        부서명: 스쿨빌런
                        <br />
                        담당자: 유현종
                        <br />
                        연락처: 010-4001-3361, help@villain.school
                        <br />
                        <br />
                        <strong>쿠키의 사용 목적</strong>
                        <br />
                        <br />
                        "회사"가 쿠키를 통해 수집하는 정보는 '2. 수집하는 개인정보 항목 및
                        수집방법'과 같으며 '1. 개인정보의 수집 및 이용목적'외의 용도로는 이용되지
                        않습니다.
                        <br />
                        <br />
                        <strong>쿠키 설치, 운영 및 거부</strong>
                        <br />
                        <br />
                        이용자는 쿠키 설치에 대한 선택권을 가지고 있습니다. 웹브라우저에서 옵션을
                        설정함으로써 모든 쿠키를 허용하거나, 쿠키가 저장될 때마다 확인을 거치거나,
                        아니면 모든 쿠키의 저장을 거부할 수도 있습니다.
                        <br />
                        <br />
                        쿠키 설치 허용 여부를 지정하는 방법(Internet Explorer의 경우)은 다음과
                        같습니다. 예)웹 브라우저 상단의 도구 &gt; 인터넷 옵션 &gt; 개인정보
                        <br />
                        <br />
                        단, 쿠키의 저장을 거부할 경우에는 로그인이 필요한 일부 서비스 이용에
                        어려움이 있을 수 있습니다.
                        <br />
                        <br />
                        정보주체께서는 회사의 서비스(또는 사업)을 이용하시면서 발생한 모든 개인정보
                        보호 관련 문의, 불만처리, 피해구제 등에 관한 사항을 개인정보 보호책임자 및
                        담당부서로 문의하실 수 있습니다. 회사는 정보주체의 문의에 대해 지체 없이
                        답변 및 처리해드릴 것입니다.
                    </div>
                </PrivacyRuleArticle>
                <PrivacyRuleArticle>
                    <PrivacyRuleTitle>제 11조. 개인정보 처리방침 변경</PrivacyRuleTitle>
                    <div>
                        이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의
                        추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을
                        통하여 고지할 것입니다.
                    </div>
                </PrivacyRuleArticle>
            </PrivacyRuleSection>
        </>
    );
};

export default PrivacyRule;

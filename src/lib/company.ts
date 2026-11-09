/**
 * 회사소개 내용. 회사소개 페이지(/about)와 인쇄용 회사소개서(/print)가 같은 문구를 쓰도록 한곳에 둡니다.
 */
import { services } from "./services";
import { siteConfig } from "./site";

/** 회사소개 본문 */
export const aboutIntro =
  `${siteConfig.name}(${siteConfig.nameEn})은 반도체 장비 부품의 쉴드 세정·정밀세척과 ` +
  "알루미늄·SUS403 제품 주문제작, 용접, 샌딩, 용사코팅, 그리고 크린룸 관련 제품을 " +
  "취급하는 기업입니다. 청정도와 마감 상태가 중요한 반도체 산업 " +
  "현장에서 필요한 제품과 작업을 제공하기 위해 노력합니다.";

/** 회사 개요 표 (값이 비어 있는 연락처 항목은 자동으로 생략) */
export function getCompanyOverview() {
  const { phone, fax, address } = siteConfig.contact;

  return [
    { label: "상호", value: siteConfig.name },
    { label: "영문명", value: siteConfig.nameEn },
    { label: "사업 분야", value: services.map((s) => s.name).join(", ") },
    ...(address ? [{ label: "소재지", value: address }] : []),
    ...(phone ? [{ label: "전화", value: phone }] : []),
    ...(fax ? [{ label: "팩스", value: fax }] : []),
  ];
}

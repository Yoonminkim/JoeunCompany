/**
 * 문의 폼 공용 정의 (타입, 선택지, 검증). 서버 액션과 클라이언트 폼이 함께 사용합니다.
 */

export const inquiryTypes = [
  { value: "semiconductor", label: "반도체 장비 후처리" },
  { value: "fabrication", label: "알루미늄·SUS403 제품 주문제작" },
  { value: "welding-sanding", label: "용접·샌딩" },
  { value: "cleanroom", label: "크린룸 관련 제품" },
  { value: "other", label: "기타 문의" },
] as const;

export type InquiryType = (typeof inquiryTypes)[number]["value"];

export type InquiryField =
  | "name"
  | "company"
  | "email"
  | "phone"
  | "type"
  | "message"
  | "consent";

export const inquiryLimits = {
  name: 50,
  company: 100,
  email: 254,
  phone: 30,
  messageMin: 10,
  message: 2000,
} as const;

export type Inquiry = {
  name: string;
  company: string;
  email: string;
  phone: string;
  type: InquiryType;
  message: string;
};

export type InquiryFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<InquiryField, string>>;
  /** 오류 시 사용자가 입력한 값을 폼에 되돌려 주기 위한 값 */
  values?: Partial<Record<InquiryField, string>>;
};

export const initialInquiryState: InquiryFormState = { status: "idle" };

/**
 * 개인정보 수집·이용 안내 문구.
 * TODO: 회사 방침에 맞게 보유·이용 기간 등을 확인/수정하세요.
 */
export const privacyNotice = {
  items: "이름, 회사명(선택), 이메일, 연락처(선택), 문의 내용",
  purpose: "문의 확인 및 답변",
  retention: "문의 처리 완료 후 지체 없이 파기 (관련 법령에 따라 보관이 필요한 경우 제외)",
} as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[0-9+\-()\s]{7,30}$/;

type ValidationResult =
  | { ok: true; data: Inquiry }
  | { ok: false; errors: Partial<Record<InquiryField, string>> };

/** 한 줄 입력값: 앞뒤 공백 제거, 줄바꿈 제거 */
const singleLine = (value: string) => value.replace(/[\r\n]+/g, " ").trim();

export function validateInquiry(
  raw: Record<InquiryField, string>,
): ValidationResult {
  const name = singleLine(raw.name);
  const company = singleLine(raw.company);
  const email = singleLine(raw.email);
  const phone = singleLine(raw.phone);
  const message = raw.message.replace(/\r\n/g, "\n").trim();
  const errors: Partial<Record<InquiryField, string>> = {};

  if (!name) errors.name = "이름을 입력해 주세요.";
  else if (name.length > inquiryLimits.name)
    errors.name = `이름은 ${inquiryLimits.name}자 이하로 입력해 주세요.`;

  if (company.length > inquiryLimits.company)
    errors.company = `회사명은 ${inquiryLimits.company}자 이하로 입력해 주세요.`;

  if (!email) errors.email = "이메일을 입력해 주세요.";
  else if (email.length > inquiryLimits.email || !EMAIL_PATTERN.test(email))
    errors.email = "올바른 이메일 주소를 입력해 주세요.";

  if (phone && !PHONE_PATTERN.test(phone))
    errors.phone = "연락처는 숫자와 - 만 사용해 입력해 주세요.";

  const type = inquiryTypes.find((t) => t.value === raw.type)?.value;
  if (!type) errors.type = "문의 유형을 선택해 주세요.";

  if (message.length < inquiryLimits.messageMin)
    errors.message = `문의 내용을 ${inquiryLimits.messageMin}자 이상 입력해 주세요.`;
  else if (message.length > inquiryLimits.message)
    errors.message = `문의 내용은 ${inquiryLimits.message}자 이하로 입력해 주세요.`;

  if (raw.consent !== "on")
    errors.consent = "개인정보 수집·이용에 동의해 주세요.";

  if (Object.keys(errors).length > 0 || !type) {
    return { ok: false, errors };
  }

  return { ok: true, data: { name, company, email, phone, type, message } };
}

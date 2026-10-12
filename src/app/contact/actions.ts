"use server";

import {
  validateInquiry,
  type InquiryField,
  type InquiryFormState,
} from "@/lib/contact";
import { sendInquiryMail } from "@/lib/mail";

const fieldNames: InquiryField[] = [
  "name",
  "company",
  "email",
  "phone",
  "type",
  "message",
  "consent",
];

const SUCCESS_MESSAGE =
  "문의가 접수되었습니다. 확인 후 입력하신 이메일로 답변드리겠습니다.";

export async function submitInquiry(
  _previousState: InquiryFormState,
  formData: FormData,
): Promise<InquiryFormState> {
  // 스팸 봇 방지용 숨김 입력란: 사람은 비워 두므로, 값이 있으면 봇으로 보고 조용히 성공 처리
  const honeypot = formData.get("website");
  if (typeof honeypot === "string" && honeypot.trim() !== "") {
    return { status: "success", message: SUCCESS_MESSAGE };
  }

  const values = Object.fromEntries(
    fieldNames.map((field) => {
      const value = formData.get(field);
      return [field, typeof value === "string" ? value : ""];
    }),
  ) as Record<InquiryField, string>;

  const result = validateInquiry(values);
  if (!result.ok) {
    return {
      status: "error",
      message: "입력 내용을 확인해 주세요.",
      fieldErrors: result.errors,
      values,
    };
  }

  const sent = await sendInquiryMail(result.data);
  if (!sent.ok) {
    return {
      status: "error",
      message:
        sent.reason === "not-configured"
          ? "현재 온라인 문의 접수를 이용할 수 없습니다. 전화 또는 이메일로 문의해 주세요."
          : "문의 접수 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.",
      values,
    };
  }

  return { status: "success", message: SUCCESS_MESSAGE };
}

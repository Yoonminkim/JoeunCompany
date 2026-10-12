import { inquiryTypes, type Inquiry } from "./contact";

export type SendResult =
  | { ok: true }
  | { ok: false; reason: "not-configured" | "failed" };

/**
 * 문의 내용을 메일로 발송합니다. (Resend HTTP API, 별도 SDK 불필요)
 *
 * 필요한 환경변수
 *  - RESEND_API_KEY       : Resend API 키
 *  - CONTACT_TO_EMAIL     : 문의를 받을 담당자 이메일 (쉼표로 여러 명 가능)
 *  - CONTACT_FROM_EMAIL   : (선택) 발신자. 인증된 도메인 주소여야 합니다.
 *
 * 다른 메일/알림 수단(SMTP, Slack 등)을 쓰려면 이 함수만 교체하면 됩니다.
 */
export async function sendInquiryMail(inquiry: Inquiry): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !to) {
    // 개발 중에는 서버 콘솔에서 내용을 확인할 수 있게 하고, 프로덕션에서는 실패로 처리
    if (process.env.NODE_ENV !== "production") {
      console.info("[contact] 메일 설정이 없어 발송하지 않고 콘솔에만 기록합니다.", inquiry);
      return { ok: true };
    }
    console.error("[contact] RESEND_API_KEY 또는 CONTACT_TO_EMAIL 이 설정되지 않았습니다.");
    return { ok: false, reason: "not-configured" };
  }

  const typeLabel =
    inquiryTypes.find((t) => t.value === inquiry.type)?.label ?? inquiry.type;

  const text = [
    `문의 유형: ${typeLabel}`,
    `이름: ${inquiry.name}`,
    `회사명: ${inquiry.company || "-"}`,
    `이메일: ${inquiry.email}`,
    `연락처: ${inquiry.phone || "-"}`,
    "",
    "문의 내용",
    "----------------------------------------",
    inquiry.message,
  ].join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from:
          process.env.CONTACT_FROM_EMAIL ??
          "조은상사 홈페이지 <onboarding@resend.dev>",
        to: to.split(",").map((address) => address.trim()),
        reply_to: inquiry.email,
        subject: `[홈페이지 문의] ${typeLabel} - ${inquiry.name}`,
        text,
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      // 개인정보가 로그에 남지 않도록 상태코드와 오류 응답만 기록
      console.error("[contact] 메일 발송 실패", response.status, await response.text());
      return { ok: false, reason: "failed" };
    }
    return { ok: true };
  } catch (error) {
    console.error("[contact] 메일 발송 중 오류", error);
    return { ok: false, reason: "failed" };
  }
}

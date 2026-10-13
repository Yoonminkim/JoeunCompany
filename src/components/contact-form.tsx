"use client";

import { useActionState } from "react";
import { submitInquiry } from "@/app/contact/actions";
import {
  initialInquiryState,
  inquiryLimits,
  inquiryTypes,
  privacyNotice,
  type InquiryField,
} from "@/lib/contact";

const inputClass =
  "mt-2 block w-full rounded-none border border-ink/30 bg-white px-3.5 py-3 text-[15px] placeholder:text-ink-soft/60 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25 aria-invalid:border-red-700";

const labelClass = "text-sm font-semibold";

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    submitInquiry,
    initialInquiryState,
  );

  const errors = state.fieldErrors ?? {};
  const values = state.values ?? {};

  const errorProps = (field: InquiryField) => ({
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? `${field}-error` : undefined,
  });

  const fieldError = (field: InquiryField) =>
    errors[field] ? (
      <p id={`${field}-error`} className="mt-2 text-sm font-medium text-red-700">
        {errors[field]}
      </p>
    ) : null;

  return (
    <form action={formAction} className="space-y-6">
      <div aria-live="polite">
        {state.status === "success" && (
          <p className="border-l-4 border-accent bg-paper-deep px-4 py-3.5 text-sm font-medium">
            {state.message}
          </p>
        )}
        {state.status === "error" && (
          <p className="border-l-4 border-red-700 bg-red-50 px-4 py-3.5 text-sm font-medium text-red-800">
            {state.message}
          </p>
        )}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            이름 <span className="text-accent">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            maxLength={inquiryLimits.name}
            autoComplete="name"
            defaultValue={values.name}
            className={inputClass}
            {...errorProps("name")}
          />
          {fieldError("name")}
        </div>

        <div>
          <label htmlFor="company" className={labelClass}>
            회사명
          </label>
          <input
            id="company"
            name="company"
            type="text"
            maxLength={inquiryLimits.company}
            autoComplete="organization"
            defaultValue={values.company}
            className={inputClass}
            {...errorProps("company")}
          />
          {fieldError("company")}
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            이메일 <span className="text-accent">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={inquiryLimits.email}
            autoComplete="email"
            defaultValue={values.email}
            className={inputClass}
            {...errorProps("email")}
          />
          {fieldError("email")}
        </div>

        <div>
          <label htmlFor="phone" className={labelClass}>
            연락처
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            maxLength={inquiryLimits.phone}
            autoComplete="tel"
            placeholder="010-0000-0000"
            defaultValue={values.phone}
            className={inputClass}
            {...errorProps("phone")}
          />
          {fieldError("phone")}
        </div>
      </div>

      <div>
        <label htmlFor="type" className={labelClass}>
          문의 유형 <span className="text-accent">*</span>
        </label>
        <select
          // React 는 <select> 의 defaultValue 변경을 반영하지 않으므로, 오류 후에도
          // 선택값이 유지되도록 값이 바뀔 때 다시 마운트합니다.
          key={values.type ?? "none"}
          id="type"
          name="type"
          required
          defaultValue={values.type ?? ""}
          className={inputClass}
          {...errorProps("type")}
        >
          <option value="" disabled>
            선택해 주세요
          </option>
          {inquiryTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
        {fieldError("type")}
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          문의 내용 <span className="text-accent">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={7}
          minLength={inquiryLimits.messageMin}
          maxLength={inquiryLimits.message}
          placeholder="필요한 제품(규격·수량) 또는 후처리 요청 사항을 적어 주세요."
          defaultValue={values.message}
          className={inputClass}
          {...errorProps("message")}
        />
        {fieldError("message")}
      </div>

      {/* 스팸 봇 방지용 숨김 입력란 (사람에게는 보이지 않음) */}
      <div
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
      >
        <label>
          웹사이트
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <fieldset className="border border-line bg-paper-deep p-5">
        <legend className="label px-2">Privacy · 개인정보 수집·이용 안내</legend>
        <dl className="space-y-1.5 text-xs leading-5 text-ink-soft">
          <div className="grid grid-cols-[4.5rem_1fr] gap-3">
            <dt className="font-semibold text-ink">수집 항목</dt>
            <dd>{privacyNotice.items}</dd>
          </div>
          <div className="grid grid-cols-[4.5rem_1fr] gap-3">
            <dt className="font-semibold text-ink">이용 목적</dt>
            <dd>{privacyNotice.purpose}</dd>
          </div>
          <div className="grid grid-cols-[4.5rem_1fr] gap-3">
            <dt className="font-semibold text-ink">보유 기간</dt>
            <dd>{privacyNotice.retention}</dd>
          </div>
        </dl>
        <label className="mt-4 flex items-start gap-2.5 text-sm font-medium">
          <input
            type="checkbox"
            name="consent"
            required
            defaultChecked={values.consent === "on"}
            className="mt-0.5 size-4 shrink-0 rounded-none border-ink/40 accent-[#4125b5]"
            {...errorProps("consent")}
          />
          <span>
            개인정보 수집·이용에 동의합니다. <span className="text-accent">*</span>
          </span>
        </label>
        {fieldError("consent")}
      </fieldset>

      <button
        type="submit"
        disabled={pending}
        className="inline-flex w-full items-center justify-center gap-3 bg-accent px-8 py-4 text-sm font-semibold text-white transition-colors hover:bg-accent-deep disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {pending ? (
          "접수 중..."
        ) : (
          <>
            문의 보내기
            <span aria-hidden="true">→</span>
          </>
        )}
      </button>
    </form>
  );
}

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
  "mt-1.5 block w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/20 aria-invalid:border-red-500";

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
      <p id={`${field}-error`} className="mt-1.5 text-sm text-red-600">
        {errors[field]}
      </p>
    ) : null;

  return (
    <form action={formAction} className="space-y-5">
      <div aria-live="polite">
        {state.status === "success" && (
          <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
            {state.message}
          </p>
        )}
        {state.status === "error" && (
          <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {state.message}
          </p>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-semibold text-slate-800">
            이름 <span className="text-red-600">*</span>
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
          <label
            htmlFor="company"
            className="text-sm font-semibold text-slate-800"
          >
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
          <label htmlFor="email" className="text-sm font-semibold text-slate-800">
            이메일 <span className="text-red-600">*</span>
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
          <label htmlFor="phone" className="text-sm font-semibold text-slate-800">
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
        <label htmlFor="type" className="text-sm font-semibold text-slate-800">
          문의 유형 <span className="text-red-600">*</span>
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
        <label htmlFor="message" className="text-sm font-semibold text-slate-800">
          문의 내용 <span className="text-red-600">*</span>
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
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          웹사이트
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <fieldset className="rounded-lg border border-slate-200 bg-slate-50 p-4">
        <legend className="px-1 text-sm font-semibold text-slate-800">
          개인정보 수집·이용 안내
        </legend>
        <dl className="mt-1 space-y-1 text-xs leading-5 text-slate-600">
          <div className="flex gap-2">
            <dt className="shrink-0 font-semibold">수집 항목</dt>
            <dd>{privacyNotice.items}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="shrink-0 font-semibold">이용 목적</dt>
            <dd>{privacyNotice.purpose}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="shrink-0 font-semibold">보유 기간</dt>
            <dd>{privacyNotice.retention}</dd>
          </div>
        </dl>
        <label className="mt-3 flex items-start gap-2 text-sm text-slate-800">
          <input
            type="checkbox"
            name="consent"
            required
            defaultChecked={values.consent === "on"}
            className="mt-0.5 size-4 rounded border-slate-300"
            {...errorProps("consent")}
          />
          <span>
            개인정보 수집·이용에 동의합니다.{" "}
            <span className="text-red-600">*</span>
          </span>
        </label>
        {fieldError("consent")}
      </fieldset>

      <button
        type="submit"
        disabled={pending}
        className="inline-flex w-full items-center justify-center rounded-lg bg-brand-700 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-900 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {pending ? "접수 중..." : "문의 보내기"}
      </button>
    </form>
  );
}

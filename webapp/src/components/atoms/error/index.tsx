"use client";

export type ErrorProps = {
  testId?: string;
  message?: string;
};

export const Error = ({ testId, message }: ErrorProps) => {
  return (
    <div
      data-testid={testId}
      className="flex justify-content-center align-content-center flex-wrap h-full"
    >
      <p className="text-red-500 text-xl font-medium">
        {message || "🙁 Ups, something wrong has happened"}
      </p>
    </div>
  );
};

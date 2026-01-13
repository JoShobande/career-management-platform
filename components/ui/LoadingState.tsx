'use client';

type LoadingStateProps = {
  title?: string;
  description?: string;
};

export function LoadingState({ title, description }: LoadingStateProps) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <div
        className="h-10 w-10 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900"
        aria-hidden="true"
      />
      {(title || description) && (
        <div className="space-y-1">
          {title && (
            <p className="text-sm font-medium text-gray-900">
              {title}
            </p>
          )}
          {description && (
            <p className="text-xs text-gray-500">
              {description}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

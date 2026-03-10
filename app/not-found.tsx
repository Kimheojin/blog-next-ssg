import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-6xl font-heading text-primary mb-4">404</h1>
      <h2 className="text-xl font-heading mb-6 text-heading">페이지를 찾을 수 없습니다</h2>
      <p className="text-muted-foreground mb-10 max-w-sm">
        요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
      </p>
      <Link
        href="/"
        className="text-sm font-medium hover:underline underline-offset-4 transition-all"
      >
        홈으로 돌아가기 →
      </Link>
    </div>
  );
}

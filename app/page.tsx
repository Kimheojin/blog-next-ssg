export default function Home() {
  return (
    <div className="space-y-12">
      <section className="py-12 border-b">
        <h1 className="text-4xl font-bold mb-4">안녕하세요! 👋</h1>
        <p className="text-xl opacity-70">
          Next.js SSG로 만든 저의 개인 블로그입니다. 이곳에 생각과 기록을 담을 예정입니다.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-6">최근 포스트</h2>
        <div className="grid gap-6">
          <div className="p-6 border rounded-lg hover:opacity-70 transition-opacity cursor-pointer">
            <h3 className="text-xl font-medium mb-2">첫 번째 포스트 준비 중...</h3>
            <p className="opacity-50">곧 유익한 내용으로 찾아뵙겠습니다.</p>
            <span className="text-sm opacity-40 mt-4 block">2026. 02. 10</span>
          </div>
        </div>
      </section>
    </div>
  );
}

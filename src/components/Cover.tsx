export default function Cover({ src, alt = '' }: { src: string; alt?: string }) {
  return (
    // 모바일도 충분히 길게, 데스크탑은 더 길게
    <div className="overflow-hidden bg-gray-200 h-[55vh] min-h-[460px] lg:h-[86vh] lg:min-h-[720px]">
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    </div>
  );
}

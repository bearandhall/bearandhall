export default function PdfEmbed({ src }:{ src: string }){
  return (
    <iframe
      className="w-full"
      style={{ height: 'calc(100vh - 120px)' }}
      src={src}
    />
  );
}

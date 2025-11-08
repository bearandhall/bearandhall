export default function ArticleRenderer({ title, blocks }:{
  title: string; blocks: string[];
}){
  return (
    <article className="article-text">
      <h2 className="text-xl mb-4">{title}</h2>
      <div className="space-y-6">
        {blocks.map((p, i) => <p key={i}>{p}</p>)}
      </div>
    </article>
  );
}

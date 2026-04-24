import { Link } from "react-router-dom";

export default function UICourseCards() {
  return (
    <div className="min-h-screen p-10 space-y-10 bg-neutral-50">
      
      <header>
        <h1 className="text-3xl font-bold">UI Course Cards Lab</h1>
        <p className="text-neutral-600 mt-2">
          Explore and test premium course card designs
        </p>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        <CardLink title="Featured Card" to="/" />
        <CardLink title="Compact Grid" to="/" />
        <CardLink title="Horizontal List" to="/" />
        <CardLink title="Carousel Cards" to="/" />
        <CardLink title="Premium Card" to="/" />
        <CardLink title="Claude Custom Card" to="/" />
      </div>
    </div>
  );
}

function CardLink({ title, to }: any) {
  return (
    <Link
      to={to}
      className="p-6 rounded-xl border bg-white hover:shadow-lg transition"
    >
      {title}
    </Link>
  );
}
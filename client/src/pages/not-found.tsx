export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center px-6">
        <p className="section-label mb-4">404</p>
        <h1 className="font-display text-display font-bold text-foreground mb-4">
          Page not found
        </h1>
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist.
        </p>
        <a
          href="/"
          className="px-6 py-2.5 bg-gold-500 text-background font-medium rounded-full hover:bg-gold-400 transition-colors"
        >
          Back to home
        </a>
      </div>
    </div>
  );
}

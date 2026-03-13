const Terms = () => {
  return (
    <div className="min-h-screen bg-background py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <a href="/" className="text-sm text-gold-500 hover:text-gold-400 mb-8 inline-block">&larr; Back</a>
        <h1 className="font-display text-display font-bold text-foreground mb-8">Terms of Service</h1>
        <div className="prose prose-invert prose-sm max-w-none text-muted-foreground space-y-6">
          <p>By accessing this website, you agree to these terms. This is a personal portfolio website.</p>
          <h2 className="text-foreground font-display">Use of Content</h2>
          <p>All content on this site is the intellectual property of Amir Kazemkhani unless otherwise stated. You may not reproduce or distribute content without permission.</p>
          <h2 className="text-foreground font-display">Disclaimer</h2>
          <p>This website is provided "as is" without warranties of any kind. Information may not always be current.</p>
          <h2 className="text-foreground font-display">Contact</h2>
          <p>Questions? Email <a href="mailto:amir@amirkazemkhani.com" className="text-gold-500">amir@amirkazemkhani.com</a>.</p>
        </div>
      </div>
    </div>
  );
};

export default Terms;

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <a href="/" className="text-sm text-gold-500 hover:text-gold-400 mb-8 inline-block">&larr; Back</a>
        <h1 className="font-display text-display font-bold text-foreground mb-8">Privacy Policy</h1>
        <div className="prose prose-invert prose-sm max-w-none text-muted-foreground space-y-6">
          <p>This Privacy Policy explains how Amir Kazemkhani collects, uses, and protects information in relation to this website.</p>
          <h2 className="text-foreground font-display">Information We Collect</h2>
          <p>We may collect information you provide directly, such as your name and email when you use the contact form. We also collect basic analytics data (page views, browser type) to improve the site.</p>
          <h2 className="text-foreground font-display">How We Use Information</h2>
          <p>We use collected information to respond to inquiries, improve the website, and communicate about relevant opportunities.</p>
          <h2 className="text-foreground font-display">Data Security</h2>
          <p>We take reasonable measures to protect your information. No internet transmission is fully secure.</p>
          <h2 className="text-foreground font-display">Contact</h2>
          <p>Questions? Email <a href="mailto:amir@amirkazemkhani.com" className="text-gold-500">amir@amirkazemkhani.com</a>.</p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;

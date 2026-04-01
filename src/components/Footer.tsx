const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h3 className="text-xl font-bold">BRAF<span className="text-accent"> Ltd</span></h3>
            <p className="text-primary-foreground/60 text-sm mt-1">
              A legally registered company
            </p>
          </div>
          <div className="text-sm text-primary-foreground/60 text-center md:text-right">
            <p>Detecting, developing and monetising youth talent.</p>
            <p className="mt-1">© {new Date().getFullYear()} BRAF Ltd. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

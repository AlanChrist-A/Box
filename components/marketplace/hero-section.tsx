import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, ArrowRight, Recycle, Factory, TrendingUp } from "@/components/ui/icons"

export function HeroSection() {
  return (
    <section className="relative py-20 overflow-hidden page-transition">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]" />

      <div className="relative max-w-4xl mx-auto text-center space-y-8">
        <div className="space-y-4 stagger-item">
          <h1 className="text-4xl md:text-6xl font-bold text-balance leading-tight font-mono">
            Transform Factory <span className="text-primary">By-Products</span> Into Valuable Resources
          </h1>
          <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto font-sans">
            Connect with manufacturers worldwide. Discover sustainable materials, reduce waste, and create new revenue
            streams from industrial by-products.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto stagger-item">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground transition-colors group-focus-within:text-primary" />
            <Input
              type="search"
              placeholder="Search materials, chemicals, metals, textiles..."
              className="pl-12 pr-4 h-14 text-lg bg-card border-2 border-border/50 focus:border-primary/50 transition-all duration-300 focus-ring"
            />
            <Button
              size="lg"
              className="absolute right-2 top-2 h-10 px-6 bg-primary hover:bg-primary/90 transition-all duration-200 button-press hover-lift"
            >
              Search
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
          <div className="flex flex-col items-center space-y-2 stagger-item hover-lift">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:bg-primary/20">
              <Factory className="w-6 h-6 text-primary" />
            </div>
            <div className="text-2xl font-bold text-foreground">500+</div>
            <div className="text-sm text-muted-foreground">Active Suppliers</div>
          </div>
          <div className="flex flex-col items-center space-y-2 stagger-item hover-lift">
            <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:bg-secondary/20">
              <Recycle className="w-6 h-6 text-secondary" />
            </div>
            <div className="text-2xl font-bold text-foreground">10K+</div>
            <div className="text-sm text-muted-foreground">Products Listed</div>
          </div>
          <div className="flex flex-col items-center space-y-2 stagger-item hover-lift">
            <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:bg-accent/20">
              <TrendingUp className="w-6 h-6 text-accent" />
            </div>
            <div className="text-2xl font-bold text-foreground">$2M+</div>
            <div className="text-sm text-muted-foreground">Value Traded</div>
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 stagger-item">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 transition-all duration-200 group button-press hover-lift"
          >
            Start Buying
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-2 hover:bg-muted transition-all duration-200 bg-transparent button-press hover-lift focus-ring"
          >
            List Your Products
          </Button>
        </div>
      </div>
    </section>
  )
}


import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { ArrowRight, BookOpen, GraduationCap, Users, Palette, Trophy, Globe, ChevronRight } from "lucide-react";

export default function Homepage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <h1 className="text-2xl font-bold text-mint-600">St. Barnabas</h1>
              <div className="hidden md:flex items-center gap-6">
                <a href="#about" className="text-gray-600 hover:text-mint-600 transition-colors">About</a>
                <a href="#academics" className="text-gray-600 hover:text-mint-600 transition-colors">Academics</a>
                <a href="#life" className="text-gray-600 hover:text-mint-600 transition-colors">Student Life</a>
                <a href="#news" className="text-gray-600 hover:text-mint-600 transition-colors">News</a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" className="hidden sm:flex" onClick={() => navigate("/login")}>
                Sign In
              </Button>
              <Button className="bg-mint-500 hover:bg-mint-600" onClick={() => navigate("/signup")}>
                Apply Now
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-mint-500/10 to-mint-500/5">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 animate-fadeIn">
              Welcome to St. Barnabas High School
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 animate-fadeIn delay-100">
              Empowering minds, inspiring futures through excellence in education
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 animate-fadeIn delay-200">
              <Button size="lg" className="bg-mint-500 hover:bg-mint-600" onClick={() => navigate("/signup")}>
                Apply Now <ArrowRight className="ml-2" />
              </Button>
              <Button size="lg" variant="outline">
                Learn More <ChevronRight className="ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50" id="about">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: GraduationCap,
                title: "Academic Excellence",
                description: "Rigorous curriculum designed to challenge and inspire students to reach their full potential.",
              },
              {
                icon: Users,
                title: "Diverse Community",
                description: "A welcoming environment that celebrates diversity and fosters inclusive learning.",
              },
              {
                icon: Globe,
                title: "Global Perspective",
                description: "Preparing students to become responsible global citizens through international programs.",
              },
            ].map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 text-center space-y-4">
                  <feature.icon className="w-12 h-12 text-mint-500 mx-auto" />
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* News & Updates */}
      <section className="py-20" id="news">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Latest News & Updates</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80",
                title: "Innovation in Education",
                description: "Introducing new technology-driven learning methods in our classrooms.",
              },
              {
                image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80",
                title: "Sustainable Agriculture Program",
                description: "Students learn about sustainable farming practices in our new program.",
              },
              {
                image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80",
                title: "Academic Achievement",
                description: "Our students continue to excel in national competitions.",
              },
            ].map((news, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
                <div className="relative h-48">
                  <img
                    src={news.image}
                    alt={news.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{news.title}</h3>
                  <p className="text-gray-600">{news.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* School Life */}
      <section className="py-20 bg-gray-50" id="life">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">School Life</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Trophy, title: "Sports & Athletics", count: "15+ Sports Teams" },
              { icon: Palette, title: "Arts & Culture", count: "20+ Clubs" },
              { icon: Users, title: "Student Activities", count: "30+ Events Yearly" },
            ].map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300 group cursor-pointer">
                <CardContent className="p-6 text-center space-y-4">
                  <category.icon className="w-12 h-12 text-mint-500 mx-auto group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-semibold">{category.title}</h3>
                  <p className="text-mint-600 font-medium">{category.count}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Our Story</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Mission & Vision</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Leadership</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Academics</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Programs</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Curriculum</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Calendar</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Admissions</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Apply</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Tuition</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Visit</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li className="text-gray-400">123 Education Street</li>
                <li className="text-gray-400">Cityville, ST 12345</li>
                <li className="text-gray-400">contact@stbarnabas.edu</li>
              </ul>
            </div>
          </div>
          <Separator className="my-8 bg-gray-800" />
          <div className="text-center text-gray-400">
            <p>&copy; 2024 St. Barnabas High School. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

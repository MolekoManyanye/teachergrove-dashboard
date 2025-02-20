import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { ArrowRight, BookOpen, GraduationCap, Users, Palette, Trophy, Globe, ChevronRight } from "lucide-react";

export default function Homepage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
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

      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-mint-500/10 to-mint-500/5">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/80" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 animate-fadeIn">
              Welcome to St. Barnabas High School
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 animate-fadeIn delay-100">
              Empowering minds, inspiring futures through excellence in education
            </p>
            <div className="relative py-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-mint-200"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white/80 backdrop-blur-sm px-4 text-lg italic text-mint-600 animate-fadeIn delay-200">
                  The quest for knowledge never ends
                </span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 animate-fadeIn delay-300">
              <Button size="lg" className="bg-mint-500 hover:bg-mint-600" onClick={() => navigate("/signup")}>
                Begin Your Journey <ArrowRight className="ml-2" />
              </Button>
              <Button size="lg" variant="outline">
                Discover More <ChevronRight className="ml-2" />
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </section>

      <section className="py-20 bg-gradient-to-b from-white to-gray-50" id="about">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Commitment to Learning</h2>
            <p className="text-gray-600">
              At St. Barnabas, we believe that education is a lifelong journey. Our commitment to continuous learning shapes every aspect of our academic experience.
            </p>
          </div>
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
              <Card 
                key={index} 
                className="group hover:shadow-lg transition-all duration-300 border-mint-100 hover:border-mint-300"
              >
                <CardContent className="p-6 text-center space-y-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-mint-50 rounded-full scale-110 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    <feature.icon className="w-12 h-12 text-mint-500 mx-auto relative z-10 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20" id="news">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Continuing Our Story</h2>
            <p className="text-gray-600">
              Every day brings new opportunities for learning and growth at St. Barnabas.
            </p>
          </div>
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

      <section className="py-20 bg-gradient-to-b from-gray-50 to-white" id="life">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Life at St. Barnabas</h2>
            <p className="text-gray-600">
              Our vibrant community embraces the endless possibilities of learning beyond the classroom.
            </p>
          </div>
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

      <section className="py-16 bg-mint-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <BookOpen className="w-12 h-12 text-mint-500 mx-auto mb-6" />
            <p className="text-2xl md:text-3xl font-serif italic text-gray-800 mb-6">
              "The quest for knowledge never ends"
            </p>
            <p className="text-gray-600">
              This guiding principle shapes every aspect of education at St. Barnabas, inspiring our students to become lifelong learners.
            </p>
          </div>
        </div>
      </section>

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

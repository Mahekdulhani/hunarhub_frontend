import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { 
  ArrowLeft, 
  CheckCircle2, 
  XCircle, 
  BookOpen,
  Clock,
  IndianRupee,
  Users,
  Target,
  Award,
  Video,
  FileText,
  Calendar,
  GraduationCap
} from "lucide-react";

const courseData = {
  "1": {
    id: "1",
    title: "Full Stack Web Development Bootcamp",
    trainerName: "Sarah Johnson",
    trainerId: "1",
    category: "Web Development",
    description: "Comprehensive bootcamp covering React, Node.js, MongoDB, and modern web development practices. Build 5 real-world projects.",
    duration: "12 weeks",
    price: 15999,
    level: "Intermediate",
    enrollmentType: "Both",
    maxStudents: 30,
    language: "English",
    startDate: "January 15, 2025",
    objectives: [
      "Build modern web applications using React and Node.js",
      "Implement authentication and authorization systems",
      "Deploy applications to cloud platforms",
      "Work with databases (MongoDB and PostgreSQL)",
      "Create responsive and accessible user interfaces"
    ],
    prerequisites: [
      "Basic knowledge of HTML, CSS, and JavaScript",
      "Understanding of programming fundamentals",
      "Familiarity with command line interface"
    ],
    curriculum: [
      {
        moduleNumber: 1,
        title: "Frontend Fundamentals",
        topics: ["React Basics", "Component Architecture", "State Management", "Hooks"],
        duration: "3 weeks"
      },
      {
        moduleNumber: 2,
        title: "Backend Development",
        topics: ["Node.js & Express", "RESTful APIs", "Authentication", "Database Design"],
        duration: "3 weeks"
      },
      {
        moduleNumber: 3,
        title: "Full Stack Integration",
        topics: ["API Integration", "File Uploads", "Real-time Features", "Security Best Practices"],
        duration: "3 weeks"
      },
      {
        moduleNumber: 4,
        title: "Deployment & DevOps",
        topics: ["Cloud Deployment", "CI/CD", "Docker Basics", "Performance Optimization"],
        duration: "3 weeks"
      }
    ],
    materials: {
      videos: 45,
      assignments: 12,
      resources: 25
    },
    thumbnail: "https://images.unsplash.com/photo-1762330916233-221b49fce7f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjBsZWFybmluZyUyMGNvdXJzZXxlbnwxfHx8fDE3NjQwNTU1MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  "2": {
    id: "2",
    title: "Digital Marketing Mastery",
    trainerName: "Michael Chen",
    trainerId: "2",
    category: "Digital Marketing",
    description: "Master SEO, social media marketing, email campaigns, and analytics. Learn to create winning marketing strategies.",
    duration: "8 weeks",
    price: 12999,
    level: "Beginner",
    enrollmentType: "Online",
    maxStudents: 40,
    language: "English",
    startDate: "January 8, 2025",
    objectives: [
      "Develop comprehensive digital marketing strategies",
      "Master SEO and content optimization techniques",
      "Create effective social media campaigns",
      "Understand and use marketing analytics tools",
      "Build email marketing funnels"
    ],
    prerequisites: [
      "No prior marketing experience required",
      "Basic computer skills",
      "Active social media presence recommended"
    ],
    curriculum: [
      {
        moduleNumber: 1,
        title: "Digital Marketing Fundamentals",
        topics: ["Marketing Basics", "Consumer Behavior", "Digital Channels", "Marketing Funnel"],
        duration: "2 weeks"
      },
      {
        moduleNumber: 2,
        title: "SEO & Content Marketing",
        topics: ["Keyword Research", "On-page SEO", "Link Building", "Content Strategy"],
        duration: "2 weeks"
      },
      {
        moduleNumber: 3,
        title: "Social Media Marketing",
        topics: ["Platform Strategies", "Content Creation", "Paid Advertising", "Community Management"],
        duration: "2 weeks"
      },
      {
        moduleNumber: 4,
        title: "Analytics & Optimization",
        topics: ["Google Analytics", "Conversion Tracking", "A/B Testing", "ROI Analysis"],
        duration: "2 weeks"
      }
    ],
    materials: {
      videos: 32,
      assignments: 8,
      resources: 18
    },
    thumbnail: "https://images.unsplash.com/photo-1758270704534-fd9715bffc0e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwY2xhc3Nyb29tJTIwZWR1Y2F0aW9ufGVufDF8fHx8MTc2NDA3MDc2MXww&ixlib=rb-4.1.0&q=80&w=1080"
  },
  "3": {
    id: "3",
    title: "UI/UX Design Professional Certificate",
    trainerName: "Priya Sharma",
    trainerId: "3",
    category: "Design",
    description: "Learn user research, wireframing, prototyping, and visual design. Work on real client projects.",
    duration: "10 weeks",
    price: 14999,
    level: "Intermediate",
    enrollmentType: "Both",
    maxStudents: 25,
    language: "English",
    startDate: "January 20, 2025",
    objectives: [
      "Conduct user research and create personas",
      "Design wireframes and interactive prototypes",
      "Apply design principles and visual hierarchy",
      "Master Figma and Adobe XD",
      "Build a professional portfolio"
    ],
    prerequisites: [
      "Basic design knowledge helpful but not required",
      "Creative thinking and problem-solving skills",
      "Computer with design software capability"
    ],
    curriculum: [
      {
        moduleNumber: 1,
        title: "UX Research & Strategy",
        topics: ["User Research Methods", "Personas", "User Journey Mapping", "Information Architecture"],
        duration: "2.5 weeks"
      },
      {
        moduleNumber: 2,
        title: "Wireframing & Prototyping",
        topics: ["Low-fidelity Wireframes", "High-fidelity Mockups", "Interactive Prototypes", "User Testing"],
        duration: "2.5 weeks"
      },
      {
        moduleNumber: 3,
        title: "Visual Design",
        topics: ["Color Theory", "Typography", "Design Systems", "Responsive Design"],
        duration: "2.5 weeks"
      },
      {
        moduleNumber: 4,
        title: "Portfolio & Career",
        topics: ["Case Studies", "Portfolio Development", "Client Presentation", "Design Handoff"],
        duration: "2.5 weeks"
      }
    ],
    materials: {
      videos: 38,
      assignments: 10,
      resources: 22
    },
    thumbnail: "https://images.unsplash.com/photo-1715173679369-18006e84d6a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFpbmluZyUyMHByb2dyYW0lMjBjZXJ0aWZpY2F0ZXxlbnwxfHx8fDE3NjQwNzA3NjF8MA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  "4": {
    id: "4",
    title: "Data Science with Python",
    trainerName: "Rahul Verma",
    trainerId: "4",
    category: "Data Science",
    description: "Complete data science curriculum covering Python, pandas, machine learning, and data visualization.",
    duration: "16 weeks",
    price: 18999,
    level: "Advanced",
    enrollmentType: "Online",
    maxStudents: 20,
    language: "English",
    startDate: "February 1, 2025",
    objectives: [
      "Master Python for data analysis",
      "Implement machine learning algorithms",
      "Create insightful data visualizations",
      "Work with real-world datasets",
      "Deploy ML models to production"
    ],
    prerequisites: [
      "Strong programming fundamentals",
      "Basic statistics knowledge",
      "Linear algebra understanding",
      "Experience with Python recommended"
    ],
    curriculum: [
      {
        moduleNumber: 1,
        title: "Python for Data Science",
        topics: ["NumPy", "Pandas", "Data Cleaning", "Exploratory Data Analysis"],
        duration: "4 weeks"
      },
      {
        moduleNumber: 2,
        title: "Statistics & Probability",
        topics: ["Descriptive Statistics", "Probability Theory", "Hypothesis Testing", "Statistical Inference"],
        duration: "3 weeks"
      },
      {
        moduleNumber: 3,
        title: "Machine Learning",
        topics: ["Supervised Learning", "Unsupervised Learning", "Model Evaluation", "Feature Engineering"],
        duration: "5 weeks"
      },
      {
        moduleNumber: 4,
        title: "Deep Learning & Deployment",
        topics: ["Neural Networks", "TensorFlow", "Model Deployment", "MLOps Basics"],
        duration: "4 weeks"
      }
    ],
    materials: {
      videos: 60,
      assignments: 15,
      resources: 30
    },
    thumbnail: "https://images.unsplash.com/photo-1762330916233-221b49fce7f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjBsZWFybmluZyUyMGNvdXJzZXxlbnwxfHx8fDE3NjQwNTU1MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  "5": {
    id: "5",
    title: "Mobile App Development with React Native",
    trainerName: "Sarah Johnson",
    trainerId: "1",
    category: "Mobile Development",
    description: "Build cross-platform mobile apps for iOS and Android. Learn navigation, state management, and API integration.",
    duration: "10 weeks",
    price: 16999,
    level: "Intermediate",
    enrollmentType: "Online",
    maxStudents: 25,
    language: "English",
    startDate: "January 22, 2025",
    objectives: [
      "Build native mobile apps for iOS and Android",
      "Master React Native framework",
      "Implement navigation and routing",
      "Integrate with backend APIs",
      "Publish apps to app stores"
    ],
    prerequisites: [
      "React.js knowledge required",
      "JavaScript/TypeScript proficiency",
      "Basic mobile app design understanding"
    ],
    curriculum: [
      {
        moduleNumber: 1,
        title: "React Native Fundamentals",
        topics: ["Setup & Configuration", "Core Components", "Styling", "Platform Differences"],
        duration: "2.5 weeks"
      },
      {
        moduleNumber: 2,
        title: "Navigation & State",
        topics: ["React Navigation", "State Management", "Context API", "Redux Toolkit"],
        duration: "2.5 weeks"
      },
      {
        moduleNumber: 3,
        title: "Native Features",
        topics: ["Camera & Gallery", "Geolocation", "Push Notifications", "Native Modules"],
        duration: "2.5 weeks"
      },
      {
        moduleNumber: 4,
        title: "Deployment",
        topics: ["App Optimization", "Testing", "iOS Deployment", "Android Deployment"],
        duration: "2.5 weeks"
      }
    ],
    materials: {
      videos: 42,
      assignments: 11,
      resources: 20
    },
    thumbnail: "https://images.unsplash.com/photo-1758270704534-fd9715bffc0e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwY2xhc3Nyb29tJTIwZWR1Y2F0aW9ufGVufDF8fHx8MTc2NDA3MDc2MXww&ixlib=rb-4.1.0&q=80&w=1080"
  }
};

export function CourseApprovalDetail({ 
  courseId, 
  onBack, 
  onApprove, 
  onReject 
}) {
  const course = courseData[courseId];

  if (!course) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Course not found</p>
        <Button onClick={onBack} className="mt-4 bg-[#4db8a8] hover:bg-[#3da698] rounded-full">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4">
        <Button 
          onClick={onBack} 
          variant="ghost" 
          className="rounded-full"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>

      {/* Course Header */}
      <Card className="p-8 border-none shadow-lg bg-gradient-to-br from-[#4db8a8]/5 to-transparent">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-shrink-0">
            <div className="w-full lg:w-80 aspect-video rounded-2xl overflow-hidden shadow-xl border-2 border-[#4db8a8]/20">
              <ImageWithFallback
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="flex-1 space-y-3">
            <div>
              <Badge className="mb-2 rounded-full bg-[#4db8a8] hover:bg-[#3da698]">
                {course.category}
              </Badge>
              <h1>{course.title}</h1>
              <p className="text-muted-foreground mt-2">By {course.trainerName}</p>
            </div>
            <p className="text-muted-foreground">{course.description}</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pt-2">
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-[#4db8a8]" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <IndianRupee className="w-4 h-4 text-[#4db8a8]" />
                <span>{course.price.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Target className="w-4 h-4 text-[#4db8a8]" />
                <span>{course.level}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Users className="w-4 h-4 text-[#4db8a8]" />
                <span>Max {course.maxStudents} students</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-[#4db8a8]" />
                <span>Starts: {course.startDate}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <GraduationCap className="w-4 h-4 text-[#4db8a8]" />
                <span>{course.enrollmentType}</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Course Materials */}
      <Card className="p-6 border-none shadow-md">
        <h3 className="mb-4">Course Materials</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center p-4 bg-[#4db8a8]/5 rounded-xl">
            <Video className="w-8 h-8 text-[#4db8a8] mb-2" />
            <span className="text-2xl">{course.materials.videos}</span>
            <span className="text-sm text-muted-foreground">Videos</span>
          </div>
          <div className="flex flex-col items-center p-4 bg-[#4db8a8]/5 rounded-xl">
            <FileText className="w-8 h-8 text-[#4db8a8] mb-2" />
            <span className="text-2xl">{course.materials.assignments}</span>
            <span className="text-sm text-muted-foreground">Assignments</span>
          </div>
          <div className="flex flex-col items-center p-4 bg-[#4db8a8]/5 rounded-xl">
            <BookOpen className="w-8 h-8 text-[#4db8a8] mb-2" />
            <span className="text-2xl">{course.materials.resources}</span>
            <span className="text-sm text-muted-foreground">Resources</span>
          </div>
        </div>
      </Card>

      {/* Learning Objectives */}
      <Card className="p-6 border-none shadow-md">
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-5 h-5 text-[#4db8a8]" />
          <h3>Learning Objectives</h3>
        </div>
        <ul className="space-y-2">
          {course.objectives.map((objective, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#4db8a8] flex-shrink-0 mt-0.5" />
              <span className="text-muted-foreground">{objective}</span>
            </li>
          ))}
        </ul>
      </Card>

      {/* Prerequisites */}
      <Card className="p-6 border-none shadow-md">
        <div className="flex items-center gap-2 mb-4">
          <Award className="w-5 h-5 text-[#4db8a8]" />
          <h3>Prerequisites</h3>
        </div>
        <ul className="space-y-2">
          {course.prerequisites.map((prerequisite, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[#4db8a8] mt-2 flex-shrink-0" />
              <span className="text-muted-foreground">{prerequisite}</span>
            </li>
          ))}
        </ul>
      </Card>

      {/* Curriculum */}
      <Card className="p-6 border-none shadow-md">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-5 h-5 text-[#4db8a8]" />
          <h3>Course Curriculum</h3>
        </div>
        <div className="space-y-4">
          {course.curriculum.map((module) => (
            <div key={module.moduleNumber} className="p-4 bg-[#4db8a8]/5 rounded-xl">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#4db8a8] text-white flex items-center justify-center shrink-0">
                    <span>{module.moduleNumber}</span>
                  </div>
                  <div>
                    <h4>{module.title}</h4>
                    <p className="text-sm text-muted-foreground">{module.duration}</p>
                  </div>
                </div>
              </div>
              <ul className="ml-13 space-y-1">
                {module.topics.map((topic, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-[#4db8a8]" />
                    {topic}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Card>

      {/* Action Buttons */}
      <Card className="p-6 border-none shadow-lg bg-gradient-to-br from-[#4db8a8]/5 to-transparent">
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => onApprove(courseId)}
            size="lg"
            className="bg-[#4db8a8] hover:bg-[#3da698] rounded-full px-8"
          >
            <CheckCircle2 className="w-5 h-5 mr-2" />
            Approve Course
          </Button>
          <Button
            onClick={() => onReject(courseId)}
            variant="destructive"
            size="lg"
            className="rounded-full px-8"
          >
            <XCircle className="w-5 h-5 mr-2" />
            Decline Course
          </Button>
        </div>
      </Card>
    </div>
  );
}

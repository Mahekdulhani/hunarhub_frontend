import { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { CheckCircle2, XCircle, Clock, BookOpen, IndianRupee } from "lucide-react";

const initialCourses = [
  {
    id: "1",
    title: "Full Stack Web Development Bootcamp",
    trainerName: "Sarah Johnson",
    category: "Web Development",
    status: "pending",
    description: "Comprehensive bootcamp covering React, Node.js, MongoDB, and modern web development practices. Build 5 real-world projects.",
    duration: "12 weeks",
    price: 15999,
    level: "Intermediate",
    enrollmentType: "Both",
  },
  {
    id: "2",
    title: "Digital Marketing Mastery",
    trainerName: "Michael Chen",
    category: "Digital Marketing",
    status: "pending",
    description: "Master SEO, social media marketing, email campaigns, and analytics. Learn to create winning marketing strategies.",
    duration: "8 weeks",
    price: 12999,
    level: "Beginner",
    enrollmentType: "Online",
  },
  {
    id: "3",
    title: "UI/UX Design Professional Certificate",
    trainerName: "Priya Sharma",
    category: "Design",
    status: "pending",
    description: "Learn user research, wireframing, prototyping, and visual design. Work on real client projects.",
    duration: "10 weeks",
    price: 14999,
    level: "Intermediate",
    enrollmentType: "Both",
  },
  {
    id: "4",
    title: "Data Science with Python",
    trainerName: "Rahul Verma",
    category: "Data Science",
    status: "pending",
    description: "Complete data science curriculum covering Python, pandas, machine learning, and data visualization.",
    duration: "16 weeks",
    price: 18999,
    level: "Advanced",
    enrollmentType: "Online",
  },
  {
    id: "5",
    title: "Mobile App Development with React Native",
    trainerName: "Sarah Johnson",
    category: "Mobile Development",
    status: "pending",
    description: "Build cross-platform mobile apps for iOS and Android. Learn navigation, state management, and API integration.",
    duration: "10 weeks",
    price: 16999,
    level: "Intermediate",
    enrollmentType: "Online",
  },
];

export function CourseApproval({ onViewDetails }) {
  const [courses, setCourses] = useState(initialCourses);

  const handleApprove = (courseId) => {
    setCourses(
      courses.map((course) =>
        course.id === courseId ? { ...course, status: "approved" } : course
      )
    );
  };

  const handleReject = (courseId) => {
    setCourses(
      courses.map((course) =>
        course.id === courseId ? { ...course, status: "rejected" } : course
      )
    );
  };

  const pendingCourses = courses.filter((c) => c.status === "pending");
  const approvedCourses = courses.filter((c) => c.status === "approved");
  const rejectedCourses = courses.filter((c) => c.status === "rejected");

  return (
    <div className="space-y-6">
      <div>
        <h2>Course Approval</h2>
        <p className="text-muted-foreground">Review and approve courses posted by trainers</p>
      </div>

      <div className="grid gap-4">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-amber-600" />
            <h3>Pending Approval ({pendingCourses.length})</h3>
          </div>
          <div className="grid gap-3">
            {pendingCourses.map((course) => (
              <Card key={course.id} className="p-4 border-none shadow-md">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between gap-3">
                      <button
                        onClick={() => onViewDetails(course.id)}
                        className="hover:text-[#4db8a8] transition-colors flex-1"
                      >
                        <h4 className="text-left">{course.title}</h4>
                      </button>
                      <Badge 
                        className="rounded-full bg-[#4db8a8]/10 text-[#4db8a8] hover:bg-[#4db8a8]/20"
                      >
                        {course.category}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground">{course.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4 text-[#4db8a8]" />
                        {course.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <IndianRupee className="w-4 h-4 text-[#4db8a8]" />
                        {course.price.toLocaleString()}
                      </span>
                      <span>Level: {course.level}</span>
                      <span>By: {course.trainerName}</span>
                      <Badge variant="outline" className="rounded-full">
                        {course.enrollmentType}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleApprove(course.id)}
                      className="bg-[#4db8a8] hover:bg-[#3da698] rounded-full"
                    >
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Approve
                    </Button>
                    <Button
                      onClick={() => handleReject(course.id)}
                      variant="destructive"
                      className="rounded-full"
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Decline
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
            {pendingCourses.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No pending courses to review
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <h3>Approved Courses ({approvedCourses.length})</h3>
          </div>
          <div className="grid gap-3">
            {approvedCourses.map((course) => (
              <Card key={course.id} className="p-4 bg-[#4db8a8]/5 border-[#4db8a8]/20 shadow-sm">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <button
                      onClick={() => onViewDetails(course.id)}
                      className="hover:text-[#4db8a8] transition-colors"
                    >
                      <h4 className="text-left">{course.title}</h4>
                    </button>
                    <p className="text-muted-foreground text-sm">
                      {course.category} • By {course.trainerName}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge 
                      className="rounded-full bg-[#4db8a8]/10 text-[#4db8a8] hover:bg-[#4db8a8]/20"
                    >
                      ₹{course.price.toLocaleString()}
                    </Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {rejectedCourses.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <XCircle className="w-5 h-5 text-red-600" />
              <h3>Rejected Courses ({rejectedCourses.length})</h3>
            </div>
            <div className="grid gap-3">
              {rejectedCourses.map((course) => (
                <Card key={course.id} className="p-4 bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900/30 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <button
                        onClick={() => onViewDetails(course.id)}
                        className="hover:text-[#4db8a8] transition-colors"
                      >
                        <h4 className="text-left">{course.title}</h4>
                      </button>
                      <p className="text-muted-foreground text-sm">
                        {course.category} • By {course.trainerName}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

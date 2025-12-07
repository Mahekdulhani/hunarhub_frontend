import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function CourseApproval() {
  const [courses, setCourses] = React.useState([]);

  React.useEffect(() => {
    fetch("http://localhost:3000/api/admin/pending-courses")
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch((err) => console.error(err));
  }, []);(() => {
    fetch("http://localhost:3000/api/admin/pending-courses")
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch((err) => console.error(err));
  }, []);

export default function CourseApproval() {
  return (
    <div className="w-full p-6 space-y-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-semibold mb-4">Course Approval</h1>
      <p className="text-gray-600">Review and approve courses posted by trainers</p>

      <div className="text-lg font-medium mt-4">Pending Approval ({courses.length})</div>

      <div className="space-y-4">
        {courses.map((course, index) => (
          <Card key={index} className="shadow-sm border rounded-2xl p-4">
            <CardContent>
              <div className="flex justify-between items-start">
                <div className="space-y-2 w-3/4">
                  <h2 className="text-xl font-semibold">{course.title}</h2>
                  <p className="text-gray-600 text-sm">{`${course.type} course posted by ${course.first_name} ${course.last_name}`}</p>

                  <div className="flex flex-wrap gap-4 text-sm text-gray-700 mt-2">
                    <span>📅 Posted: {new Date(course.created_at).toLocaleDateString()}</span>
                    <span>💰 {course.price}</span>
                    <span>⭐ Level: {course.level}</span>
                    <span>👨‍🏫 Trainer: {course.first_name} {course.last_name}</span>
                  </div>}</span>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-3">
                  <Badge className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                    {course.category}
                  </Badge>

                  <div className="flex gap-2">
                    <Button className="bg-teal-600 hover:bg-teal-700 text-white px-4 rounded-xl">Approve</Button>
                    <Button className="bg-red-500 hover:bg-red-600 text-white px-4 rounded-xl">Decline</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

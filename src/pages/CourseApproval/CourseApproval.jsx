import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  Button,
  Chip,
  Stack,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

import {
  fetchPendingCourses,
  approveCourses,
  rejectCourses,
} from "../../api/api";

import DashboardLayout from "../../components/DashboardLayout";

export default function CourseApproval() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const data = await fetchPendingCourses();

      // 🔍 DEBUG (you can remove later)
      console.log("API DATA 👉", data);

      setCourses(data);
    } catch (err) {
      console.error("Error fetching courses:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await approveCourses(id);
      setCourses((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error("Approve failed", err);
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectCourses(id);
      setCourses((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error("Reject failed", err);
    }
  };

  if (loading) {
    return <Typography sx={{ p: 3 }}>Loading...</Typography>;
  }

  return (
    <DashboardLayout>
      <Box sx={{ px: 4, py: 3 }}>
        {/* HEADER */}
        <Typography sx={{ fontSize: 20, fontWeight: 600 }}>
          Course Approval
        </Typography>

        <Typography sx={{ fontSize: 13, color: "#6b7280", mb: 3 }}>
          Review and approve courses posted by trainers
        </Typography>

        {/* SECTION */}
        <Typography sx={{ fontSize: 13, color: "#6b7280", mb: 2 }}>
          ⏳ Pending Approval ({courses.length})
        </Typography>

        {/* COURSE LIST */}
        <Stack spacing={2}>
          {courses.map((course) => {
            
            // ✅ DESCRIPTION FIX (IMPORTANT)
           const description =
  (course.description ||
    course.desc ||
    course.courseDescription ||
    "").trim();

            return (
              <Card
                key={course.id}
                sx={{
                  borderRadius: "12px",
                  border: "1px solid #e5e7eb",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                  px: 3,
                  py: 2,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {/* LEFT SIDE */}
                <Box sx={{ maxWidth: "70%" }}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography
                      sx={{
                        fontSize: 15,
                        fontWeight: 500,
                        color: "#111827",
                      }}
                    >
                      {course.title}
                    </Typography>

                    <Chip
                      label={course.category || "Web Development"}
                      size="small"
                      sx={{
                        height: 22,
                        fontSize: 11,
                        bgcolor: "#dcfce7",
                        color: "#16a34a",
                        fontWeight: 500,
                      }}
                    />
                  </Stack>

                  {/* ✅ FIXED DESCRIPTION HERE */}
                  <Typography
                    sx={{
                      fontSize: 13,
                      color: "#6b7280",
                      mt: 0.5,
                    }}
                  >
                    {description
                      ? description
                      : "No description available"}
                  </Typography>

                  {/* DETAILS */}
                  <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                      mt: 1,
                      fontSize: 12,
                      color: "#6b7280",
                      alignItems: "center",
                    }}
                  >
                    <span>📅 {course.duration || "12 weeks"}</span>
                    <span>₹ {course.price || "15,999"}</span>
                    <span>
                      Level: {course.level || "Intermediate"}
                    </span>
                    <span>By: {course.trainerName}</span>

                    <Chip
                      label={course.mode || "Online"}
                      size="small"
                      sx={{
                        height: 20,
                        fontSize: 10,
                        bgcolor: "#f3f4f6",
                      }}
                    />
                  </Stack>
                </Box>

                {/* RIGHT BUTTONS */}
                <Stack direction="row" spacing={1}>
                  <Button
                    onClick={() => handleApprove(course.id)}
                    variant="outlined"
                    startIcon={<CheckCircleOutlineIcon />}
                    sx={{
                      borderRadius: "20px",
                      textTransform: "none",
                      fontSize: 13,
                      borderColor: "#22c55e",
                      color: "#16a34a",
                      px: 2,
                      "&:hover": {
                        bgcolor: "#ecfdf5",
                        borderColor: "#22c55e",
                      },
                    }}
                  >
                    Approve
                  </Button>

                  <Button
                    onClick={() => handleReject(course.id)}
                    variant="outlined"
                    startIcon={<CancelOutlinedIcon />}
                    sx={{
                      borderRadius: "20px",
                      textTransform: "none",
                      fontSize: 13,
                      borderColor: "#ef4444",
                      color: "#dc2626",
                      px: 2,
                      "&:hover": {
                        bgcolor: "#fef2f2",
                        borderColor: "#ef4444",
                      },
                    }}
                  >
                    Decline
                  </Button>
                </Stack>
              </Card>
            );
          })}
        </Stack>

       
      </Box>
    </DashboardLayout>
  );
}
import {
  Box,
  Card,
  CardContent,
  Grid,
  MenuItem,
  Select,
  Stack,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Rating,
  IconButton,
  Chip,
} from '@mui/material'

import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import StarIcon from '@mui/icons-material/Star'
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined'
import FeedbackOutlinedIcon from '@mui/icons-material/FeedbackOutlined'

import { useEffect, useState } from 'react'
import api from '../../api/api'

export default function Feedback() {
  const [feedbacks, setFeedbacks] = useState([])
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    fetchFeedbacks()
  }, [])

  const fetchFeedbacks = async () => {
    try {
      // IMPORTANT FIX
      const res = await api.get('/feedback/admin/all')

      const allFeedbacks = res?.data?.feedback || []

      setFeedbacks(allFeedbacks)

      if (allFeedbacks.length > 0) {
        setSelected(allFeedbacks[0])
      }
    } catch (err) {
      console.log(err)
    }
  }

  // Average Rating
  const averageRating =
    feedbacks.length > 0
      ? (
          feedbacks.reduce(
            (acc, item) => acc + item.rating,
            0
          ) / feedbacks.length
        ).toFixed(1)
      : 0

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        bgcolor: '#f6f7fb',
        p: 3,
      }}
    >
      {/* PAGE HEADER */}
      <Box mb={3}>
        <Typography
          variant="h5"
          fontWeight={700}
        >
          Feedback Management
        </Typography>

        <Typography
          fontSize={14}
          color="text.secondary"
        >
          Manage all students feedback and reviews
        </Typography>
      </Box>

      <Grid container spacing={3}>

        {/* LEFT SIDE */}
        <Grid item xs={12} lg={9}>

          {/* TOP CARDS */}
          <Grid container spacing={2} mb={2}>

            {/* TOTAL */}
            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow:
                    '0 2px 10px rgba(0,0,0,0.05)',
                }}
              >
                <CardContent>
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                  >
                    <Avatar
                      sx={{
                        bgcolor: '#eef2ff',
                        width: 55,
                        height: 55,
                      }}
                    >
                      <FeedbackOutlinedIcon
                        sx={{ color: '#6366f1' }}
                      />
                    </Avatar>

                    <Box>
                      <Typography
                        variant="h5"
                        fontWeight={700}
                      >
                        {feedbacks.length}
                      </Typography>

                      <Typography
                        fontSize={13}
                        color="text.secondary"
                      >
                        Total Feedback
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            {/* AVG RATING */}
            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow:
                    '0 2px 10px rgba(0,0,0,0.05)',
                }}
              >
                <CardContent>
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                  >
                    <Avatar
                      sx={{
                        bgcolor: '#fff7ed',
                        width: 55,
                        height: 55,
                      }}
                    >
                      <StarIcon
                        sx={{ color: '#f59e0b' }}
                      />
                    </Avatar>

                    <Box>
                      <Typography
                        variant="h5"
                        fontWeight={700}
                      >
                        {averageRating}
                      </Typography>

                      <Typography
                        fontSize={13}
                        color="text.secondary"
                      >
                        Average Rating
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            {/* POSITIVE */}
            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow:
                    '0 2px 10px rgba(0,0,0,0.05)',
                }}
              >
                <CardContent>
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                  >
                    <Avatar
                      sx={{
                        bgcolor: '#ecfdf5',
                        width: 55,
                        height: 55,
                      }}
                    >
                      <ThumbUpAltOutlinedIcon
                        sx={{ color: '#10b981' }}
                      />
                    </Avatar>

                    <Box>
                      <Typography
                        variant="h5"
                        fontWeight={700}
                      >
                        {
                          feedbacks.filter(
                            (item) => item.rating >= 4
                          ).length
                        }
                      </Typography>

                      <Typography
                        fontSize={13}
                        color="text.secondary"
                      >
                        Positive Reviews
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* TABLE */}
          <Card
            sx={{
              borderRadius: 3,
              boxShadow:
                '0 2px 10px rgba(0,0,0,0.05)',
            }}
          >
            <CardContent>

              {/* TABLE HEADER */}
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
              >
                <Typography
                  variant="h6"
                  fontWeight={700}
                >
                  All Feedback
                </Typography>

                <Select
                  size="small"
                  defaultValue="all"
                >
                  <MenuItem value="all">
                    All Courses
                  </MenuItem>
                </Select>
              </Stack>

              {/* TABLE */}
              <TableContainer
                component={Paper}
                elevation={0}
              >
                <Table>

                  <TableHead>
                    <TableRow>
                      <TableCell>#</TableCell>
                      <TableCell>Course</TableCell>
                      <TableCell>Student</TableCell>
                      <TableCell>Rating</TableCell>
                      <TableCell>Message</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell align="center">
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>

                    {feedbacks.map((item, index) => (
                      <TableRow
                        key={item.id}
                        hover
                      >

                        <TableCell>
                          {index + 1}
                        </TableCell>

                        <TableCell>
                          <Typography
                            fontWeight={600}
                          >
                            {item.course_title}
                          </Typography>

                          <Typography
                            fontSize={12}
                            color="text.secondary"
                          >
                            {item.lesson_title}
                          </Typography>
                        </TableCell>

                        <TableCell>
                          <Typography
                            fontWeight={600}
                          >
                            {item.first_name}{' '}
                            {item.last_name}
                          </Typography>
                        </TableCell>

                        <TableCell>
                          <Stack
                            direction="row"
                            spacing={1}
                            alignItems="center"
                          >
                            <Rating
                              value={item.rating}
                              readOnly
                              size="small"
                            />

                            <Chip
                              label={item.rating}
                              size="small"
                              color="warning"
                            />
                          </Stack>
                        </TableCell>

                        <TableCell>
                          <Typography
                            fontSize={13}
                            sx={{
                              maxWidth: 250,
                            }}
                          >
                            {item.message}
                          </Typography>
                        </TableCell>

                        <TableCell>
                          {new Date(
                            item.created_at
                          ).toLocaleDateString()}
                        </TableCell>

                        <TableCell align="center">
                          <IconButton
                            onClick={() =>
                              setSelected(item)
                            }
                          >
                            <VisibilityOutlinedIcon />
                          </IconButton>
                        </TableCell>

                      </TableRow>
                    ))}

                  </TableBody>

                </Table>
              </TableContainer>

            </CardContent>
          </Card>
        </Grid>

        {/* RIGHT SIDE */}
        <Grid item xs={12} lg={3}>

          <Card
            sx={{
              borderRadius: 3,
              height: '100%',
              boxShadow:
                '0 2px 10px rgba(0,0,0,0.05)',
            }}
          >
            <CardContent>

              <Typography
                variant="h6"
                fontWeight={700}
                mb={3}
              >
                Feedback Details
              </Typography>

              {selected ? (
                <>

                  <Typography
                    fontWeight={700}
                    fontSize={18}
                  >
                    {selected.course_title}
                  </Typography>

                  <Typography
                    fontSize={13}
                    color="text.secondary"
                    mb={2}
                  >
                    {selected.lesson_title}
                  </Typography>

                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    mb={2}
                  >
                    <Avatar
                      sx={{
                        bgcolor: '#6fc6a6',
                      }}
                    >
                      {selected.first_name?.charAt(0)}
                    </Avatar>

                    <Box>
                      <Typography
                        fontWeight={600}
                      >
                        {selected.first_name}{' '}
                        {selected.last_name}
                      </Typography>

                      <Typography
                        fontSize={12}
                        color="text.secondary"
                      >
                        Student
                      </Typography>
                    </Box>
                  </Stack>

                  <Typography
                    fontSize={13}
                    color="text.secondary"
                    mb={2}
                  >
                    {new Date(
                      selected.created_at
                    ).toLocaleString()}
                  </Typography>

                  <Typography
                    fontWeight={600}
                    mb={1}
                  >
                    Rating
                  </Typography>

                  <Rating
                    value={selected.rating}
                    readOnly
                    sx={{ mb: 2 }}
                  />

                  <Typography
                    fontWeight={600}
                    mb={1}
                  >
                    Review
                  </Typography>

                  <Typography
                    color="text.secondary"
                    fontSize={14}
                    lineHeight={1.8}
                  >
                    {selected.message}
                  </Typography>

                </>
              ) : (
                <Typography color="text.secondary">
                  No feedback selected
                </Typography>
              )}

            </CardContent>
          </Card>

        </Grid>

      </Grid>
    </Box>
  )
}
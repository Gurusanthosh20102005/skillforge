// // import React, { useState, useEffect } from "react";
// // import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
// // import '../../styles/forms.css';

// // const CourseForm = ({ open, onClose, course, saveCourse }) => {
// //   const [title, setTitle] = useState("");
// //   const [description, setDescription] = useState("");

// //   useEffect(() => {
// //     if (course) {
// //       setTitle(course.title);
// //       setDescription(course.description);
// //     } else {
// //       setTitle("");
// //       setDescription("");
// //     }
// //   }, [course, open]);

// //   const handleSubmit = () => {
// //     if (!title || !description) {
// //       alert("Please fill all fields");
// //       return;
// //     }
// //     const newCourse = course
// //       ? { ...course, title, description }
// //       : { id: Date.now(), title, description }; // temporary ID
// //     saveCourse(newCourse);
// //     onClose();
// //   };

// //   return (
// //     <Dialog open={!!open} onClose={onClose} fullWidth maxWidth="sm">
// //       <DialogTitle>{course ? "Edit Course" : "Add Course"}</DialogTitle>
// //       <DialogContent>
// //         <TextField
// //           label="Course Title"
// //           fullWidth
// //           margin="normal"
// //           value={title}
// //           onChange={(e) => setTitle(e.target.value)}
// //         />
// //         <TextField
// //           label="Description"
// //           fullWidth
// //           margin="normal"
// //           multiline
// //           rows={3}
// //           value={description}
// //           onChange={(e) => setDescription(e.target.value)}
// //         />
// //       </DialogContent>
// //       <DialogActions>
// //         <Button onClick={onClose} color="primary">Cancel</Button>
// //         <Button onClick={handleSubmit} variant="contained" color="primary">
// //           {course ? "Update" : "Add"}
// //         </Button>
// //       </DialogActions>
// //     </Dialog>
// //   );
// // };

// // export default CourseForm;
// import React, { useState, useEffect } from "react";
// import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";

// const CourseForm = ({ open, onClose, course, saveCourse }) => {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");

//   useEffect(() => {
//     if (course) {
//       setTitle(course.title);
//       setDescription(course.description);
//     } else {
//       setTitle("");
//       setDescription("");
//     }
//   }, [course, open]);

//   const handleSubmit = () => {
//     if (!title || !description) return alert("Fill all fields");
//     saveCourse(course ? { ...course, title, description } : { id: Date.now(), title, description });
//     onClose();
//   };

//   return (
//     <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm"
//       sx={{ "& .MuiDialog-paper": { borderRadius: 3 } }}>
//       <DialogTitle sx={{ fontWeight: 600 }}>
//         {course ? "Edit Course" : "Add Course"}
//       </DialogTitle>

//       <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
//         <TextField label="Course Title" value={title} onChange={e => setTitle(e.target.value)} />
//         <TextField label="Description" multiline rows={3}
//           value={description} onChange={e => setDescription(e.target.value)} />
//       </DialogContent>

//       <DialogActions sx={{ p: 2 }}>
//         <Button onClick={onClose}>Cancel</Button>
//         <Button variant="contained" onClick={handleSubmit}>
//           {course ? "Update" : "Add"}
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default CourseForm;
import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, TextField, Button, Stack } from "@mui/material";

const CourseForm = ({ open, onClose, onSave, course }) => {
  const [form, setForm] = useState({
    courseId: "",
    courseName: "",
    instructorId: "",
    description: "",
  });

  useEffect(() => {
    if (course) setForm(course);
  }, [course]);

  const handleSubmit = () => {
    onSave(form);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{course ? "Edit Course" : "Add Course"}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField label="Course ID" value={form.courseId}
            onChange={e => setForm({ ...form, courseId: e.target.value })} />
          <TextField label="Course Name" value={form.courseName}
            onChange={e => setForm({ ...form, courseName: e.target.value })} />
          <TextField label="Instructor ID" value={form.instructorId}
            onChange={e => setForm({ ...form, instructorId: e.target.value })} />
          <TextField label="Description" multiline rows={3}
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })} />

          <Button variant="contained" onClick={handleSubmit}>
            Save Course
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default CourseForm;

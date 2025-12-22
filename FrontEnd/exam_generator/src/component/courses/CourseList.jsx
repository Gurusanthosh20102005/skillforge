
// import React, { useState } from "react";
// import {
//   Box, Typography, Button, Card, CardContent, TextField,
//   IconButton, Divider, Stack, Paper, Dialog, DialogTitle,
//   DialogContent, DialogActions, MenuItem, Chip, Table,
//   TableHead, TableRow, TableCell, TableBody, Tooltip
// } from "@mui/material";

// import MenuIcon from "@mui/icons-material/Menu";
// import Drawer from "@mui/material/Drawer";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemText from "@mui/material/ListItemText";
// import AddIcon from "@mui/icons-material/Add";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import AutoStoriesIcon from "@mui/icons-material/AutoStories";
// import UploadFileIcon from "@mui/icons-material/UploadFile";
// import SchoolIcon from "@mui/icons-material/School";
// import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
// import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
// import ImageIcon from "@mui/icons-material/Image";
// import LinkIcon from "@mui/icons-material/Link";

// const materialTypes = ["PDF", "Video", "Image", "Link"];
// const difficulties = ["Easy", "Medium", "Hard"];
// const difficultyColors = { Easy: "success", Medium: "warning", Hard: "error" };

// export default function CourseList() {
//   const [openNav, setOpenNav] = useState(false);
//   const [courses, setCourses] = useState([]);
//   const [activeCourseId, setActiveCourseId] = useState(null);

//   const [openCourseForm, setOpenCourseForm] = useState(false);
//   const [editingCourseId, setEditingCourseId] = useState(null);

//   const [courseForm, setCourseForm] = useState({
//     courseId: "", instructorId: "", courseName: "", description: "", totalStudents: 0
//   });

//   const [topicForm, setTopicForm] = useState({ name: "", description: "", difficulty: "Easy" });

//   const [materialForm, setMaterialForm] = useState({ type: "", name: "", url: "" });
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [selectedTopic, setSelectedTopic] = useState(null);
//   const [openMaterialDialog, setOpenMaterialDialog] = useState(false);

//   const [searchTerm, setSearchTerm] = useState("");
// const [difficultyFilter, setDifficultyFilter] = useState("All");

//   /* ---------------- COURSE HANDLERS ---------------- */
//   const handleSaveCourse = () => {
//     if (!courseForm.courseId || !courseForm.courseName) return;

//     if (editingCourseId) {
//       setCourses(courses.map(c =>
//         c.courseId === editingCourseId ? { ...courseForm, topics: c.topics } : c
//       ));
//     } else {
//       setCourses([...courses, { ...courseForm, topics: [] }]);
//     }

//     setOpenCourseForm(false);
//     setEditingCourseId(null);
//     setCourseForm({ courseId: "", instructorId: "", courseName: "", description: "", totalStudents: 0 });
//   };

//   const handleEditCourse = (course) => {
//     setCourseForm(course);
//     setEditingCourseId(course.courseId);
//     setOpenCourseForm(true);
//   };

//   const handleDeleteCourse = (id) => {
//     setCourses(courses.filter(c => c.courseId !== id));
//     if (activeCourseId === id) setActiveCourseId(null);
//   };
// const [previewMaterial, setPreviewMaterial] = useState(null);

//   /* ---------------- TOPIC ---------------- */
//   const handleAddTopic = (courseId) => {
//     if (!topicForm.name) return;

//     setCourses(courses.map(c =>
//       c.courseId === courseId ? { ...c, topics: [...c.topics, { ...topicForm, materials: [] }] } : c
//     ));
//     setTopicForm({ name: "", description: "", difficulty: "Easy" });
//   };

//   /* ---------------- MATERIAL ---------------- */
//   const handleAddMaterial = (courseId, topicIndex, materialIndex = null) => {
//     if (!materialForm.type || !materialForm.name) return;

//     const materialToSave = {
//       ...materialForm,
//       file: selectedFile ? selectedFile.name : null
//     };

//     setCourses(prev =>
//       prev.map(c =>
//         c.courseId === courseId
//           ? {
//               ...c,
//               topics: c.topics.map((t, i) =>
//                 i === topicIndex
//                   ? {
//                       ...t,
//                       materials:
//                         materialIndex !== null
//                           ? t.materials.map((m, mi) => mi === materialIndex ? materialToSave : m)
//                           : [...t.materials, materialToSave]
//                     }
//                   : t
//               )
//             }
//           : c
//       )
//     );

//     setMaterialForm({ type: "", name: "", url: "" });
//     setSelectedFile(null);
//   };

//   /* ---------------- SEARCH ---------------- */
//   const filteredTopics = (topics, courseName) => {
//   let filtered = topics.filter(t =>
//     t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     t.difficulty.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     t.materials.some(m => m.name.toLowerCase().includes(searchTerm.toLowerCase()))
//   );

//   if (difficultyFilter !== "All") {
//     filtered = filtered.filter(t => t.difficulty === difficultyFilter);
//   }

//   return filtered;
// };

//   /* ---------------- ICONS ---------------- */
//   const renderPreviewIcon = (material) => {
//     const iconProps = { cursor: "pointer" };
//     switch (material.type) {
//       case "PDF": return <PictureAsPdfIcon color="error" {...iconProps} />;
//       case "Video": return <VideoLibraryIcon color="primary" {...iconProps} />;
//       case "Image": return <ImageIcon color="warning" {...iconProps} />;
//       case "Link": return <LinkIcon color="info" {...iconProps} />;
//       default: return null;
//     }
//   };

//   /* ---------------- JSX ---------------- */
//   return (
//     <Box sx={{ minHeight: "100vh", p: 5, background: "linear-gradient(180deg,#e2e8f0,#f8fafc)" }}>
//       {/* HEADER */}
//       <Box display="flex" alignItems="center" mb={3}>
//         <IconButton onClick={() => setOpenNav(true)}><MenuIcon /></IconButton>
//         <Typography variant="h6" ml={2} fontWeight="bold">Instructor Dashboard</Typography>
//       </Box>

//       {/* ADD COURSE BUTTON */}
//       {courses.length > 0 && (
//         <Box display="flex" justifyContent="flex-end" mb={3}>
//           <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpenCourseForm(true)} sx={{ background: "#1e3a8a" }}>Add Course</Button>
//         </Box>
//       )}

//       {/* HERO PAGE */}
//       {courses.length === 0 && (
//         <Box sx={{ maxWidth: 720, mx: "auto", mt: 8, p: 6, textAlign: "center", background: "linear-gradient(145deg,#ffffff,#dbeafe)", borderRadius: 5 }}>
//           <SchoolIcon sx={{ fontSize: 72, color: "#1e3a8a" }} />
//           <Typography variant="h4" fontWeight="bold" mt={2}>Design your Course Space</Typography>
//           <Typography mt={1} mb={4}>“A well-structured course is a silent teacher.”</Typography>
//           <Button size="large" variant="contained" startIcon={<AddIcon />} onClick={() => setOpenCourseForm(true)} sx={{ background: "#1e3a8a" }}>Add Course</Button>
//         </Box>
//       )}

//       {/* SEARCH */}
//       {courses.length > 0 && (
//         <TextField fullWidth placeholder="Search topics, materials, courses..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} sx={{ mb: 3, background: "#fff", borderRadius: 2 }} />
//       )}

// {/* DIFFICULTY FILTER */}
// {courses.length > 0 && (
//   <Box display="flex" justifyContent="flex-start" mb={3} gap={2}>
//     <TextField
//       select
//       label="Filter by Difficulty"
//       size="small"
//       value={difficultyFilter}
//       onChange={e => setDifficultyFilter(e.target.value)}
//       sx={{ width: 200, background: "#fff", borderRadius: 2 }}
//     >
//       <MenuItem value="All">All</MenuItem>
//       {difficulties.map(d => <MenuItem key={d} value={d}>{d}</MenuItem>)}
//     </TextField>
//   </Box>
// )}

//       {/* COURSES */}
//       <Stack spacing={4}>
//         {courses.map(course => (
//           <Card key={course.courseId} sx={{ borderLeft: "6px solid #6366f1" }}>
//             <CardContent>
//               <Box display="flex" justifyContent="space-between">
//                 <Box>
//                   <Typography fontWeight="bold">{course.courseName}</Typography>
//                   <Typography variant="body2">ID: {course.courseId} | Instructor: {course.instructorId}</Typography>
//                 </Box>
//                 <Box>
//                   <IconButton onClick={() => handleEditCourse(course)}><EditIcon /></IconButton>
//                   <IconButton color="error" onClick={() => handleDeleteCourse(course.courseId)}><DeleteIcon /></IconButton>
//                 </Box>
//               </Box>

//               <Divider sx={{ my: 2 }} />

//               <Button startIcon={<AutoStoriesIcon />} onClick={() => setActiveCourseId(activeCourseId === course.courseId ? null : course.courseId)}>Manage Topics</Button>

//               {activeCourseId === course.courseId && (
//                 <Box mt={3}>
//                   {/* ADD TOPIC */}
//                   <Paper sx={{ p: 3, mb: 3 }}>
//                     <Typography fontWeight="bold">Add Topic</Typography>
//                     <Stack spacing={2} mt={2}>
//                       <TextField label="Topic Name" value={topicForm.name} onChange={e => setTopicForm({ ...topicForm, name: e.target.value })} />
//                       <TextField label="Description" value={topicForm.description} onChange={e => setTopicForm({ ...topicForm, description: e.target.value })} />
//                       <TextField select label="Difficulty" value={topicForm.difficulty} onChange={e => setTopicForm({ ...topicForm, difficulty: e.target.value })}>
//                         {difficulties.map(d => <MenuItem key={d} value={d}>{d}</MenuItem>)}
//                       </TextField>
//                       <Button variant="contained" onClick={() => handleAddTopic(course.courseId)} sx={{ background: "#1e3a8a" }}>Add Topic</Button>
//                     </Stack>
//                   </Paper>

//                   {/* TOPICS */}
//                   {filteredTopics(course.topics, course.courseName).map((topic, idx) => (
//                     <Paper key={idx} sx={{ p: 3, mb: 3 }}>
//                       <Box display="flex" justifyContent="space-between">
//                         <Typography fontWeight="bold">{topic.name}</Typography>
//                         <Chip size="small" label={topic.difficulty} color={difficultyColors[topic.difficulty]} />
//                       </Box>

//                       <Table size="small" sx={{ mt: 2 }}>
//                         <TableHead>
//                           <TableRow>
//                             <TableCell>Type</TableCell>
//                             <TableCell>Name</TableCell>
//                             <TableCell>Actions</TableCell>
//                           </TableRow>
//                         </TableHead>
//                         <TableBody>
//                           {topic.materials.length === 0 ? (
//                             <TableRow><TableCell colSpan={3} align="center">No materials</TableCell></TableRow>
//                           ) : topic.materials.map((m, i) => (
//                             <TableRow key={i}>
//                               <TableCell>{m.type}</TableCell>
//                               <TableCell>{m.name}</TableCell>
//                               <TableCell>
//                                 <Tooltip title="Preview"><IconButton onClick={() => m.url ? window.open(m.url, "_blank") : alert(m.file || "No file attached")}>{renderPreviewIcon(m)}</IconButton></Tooltip>
//                                 <Tooltip title="Edit"><IconButton onClick={() => { setMaterialForm({ type: m.type, name: m.name, url: m.url || "" }); setSelectedTopic({ courseId: course.courseId, topicIndex: idx, materialIndex: i }); setOpenMaterialDialog(true); }}><EditIcon /></IconButton></Tooltip>
//                                 <Tooltip title="Delete"><IconButton color="error" onClick={() => setCourses(prev => prev.map(c => c.courseId === course.courseId ? { ...c, topics: c.topics.map((t, ti) => ti === idx ? { ...t, materials: t.materials.filter((_, mi) => mi !== i) } : t) } : c))}><DeleteIcon /></IconButton></Tooltip>
//                               </TableCell>
//                             </TableRow>
//                           ))}
//                         </TableBody>
//                       </Table>

//                       <Button sx={{ mt: 2 }} startIcon={<UploadFileIcon />} onClick={() => { setSelectedTopic({ courseId: course.courseId, topicIndex: idx }); setOpenMaterialDialog(true); }} >Add Material</Button>
//                     </Paper>
//                   ))}
//                 </Box>
//               )}
//             </CardContent>
//           </Card>
//         ))}
//       </Stack>

//       {/* DRAWER */}
//       <Drawer open={openNav} onClose={() => setOpenNav(false)}>
//         <Box sx={{ width: 260 }}>
//           <List>
//             {["Dashboard", "Courses", "Manage Topics", "Analytics"].map(t => (
//               <ListItem button key={t}><ListItemText primary={t} /></ListItem>
//             ))}
//           </List>
//         </Box>
//       </Drawer>

//       {/* MATERIAL DIALOG */}
//       <Dialog open={openMaterialDialog} onClose={() => setOpenMaterialDialog(false)} fullWidth>
//         <DialogTitle>Add Learning Material</DialogTitle>
//         <DialogContent>
//           <Stack spacing={2} mt={1}>
//             <TextField label="Material Name" value={materialForm.name} onChange={e => setMaterialForm({ ...materialForm, name: e.target.value })} />
//             <TextField select label="Material Type" value={materialForm.type} onChange={e => setMaterialForm({ ...materialForm, type: e.target.value })}>
//               {materialTypes.map(t => <MenuItem key={t} value={t}>{t}</MenuItem>)}
//             </TextField>
//             {(materialForm.type === "PDF" || materialForm.type === "Image") && (
//               <Button variant="outlined" component="label">
//                 Browse File
//                 <input type="file" hidden accept={materialForm.type === "PDF" ? ".pdf" : "image/*"} onChange={e => setSelectedFile(e.target.files[0])} />
//               </Button>
//             )}
//             {(materialForm.type === "Link" || materialForm.type === "Video") && (
//               <TextField label="Paste URL" value={materialForm.url} onChange={e => setMaterialForm({ ...materialForm, url: e.target.value })} />
//             )}
//           </Stack>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenMaterialDialog(false)}>Cancel</Button>
//           <Button variant="contained" onClick={() => { handleAddMaterial(selectedTopic.courseId, selectedTopic.topicIndex, selectedTopic.materialIndex); setOpenMaterialDialog(false); }} sx={{ background: "#1e3a8a" }}>Upload</Button>
//         </DialogActions>
//       </Dialog>

//       {/* COURSE DIALOG */}
//       <Dialog open={openCourseForm} onClose={() => { setOpenCourseForm(false); setEditingCourseId(null); }} fullWidth>
//         <DialogTitle>{editingCourseId ? "Edit Course" : "Add Course"}</DialogTitle>
//         <DialogContent>
//           <Stack spacing={2} mt={1}>
//             <TextField label="Course ID" value={courseForm.courseId} onChange={e => setCourseForm({ ...courseForm, courseId: e.target.value })} disabled={!!editingCourseId} />
//             <TextField label="Instructor ID" value={courseForm.instructorId} onChange={e => setCourseForm({ ...courseForm, instructorId: e.target.value })} />
//             <TextField label="Course Name" value={courseForm.courseName} onChange={e => setCourseForm({ ...courseForm, courseName: e.target.value })} />
//             <TextField label="Description" multiline rows={3} value={courseForm.description} onChange={e => setCourseForm({ ...courseForm, description: e.target.value })} />
//             <TextField type="number" label="Total Students" value={courseForm.totalStudents} onChange={e => setCourseForm({ ...courseForm, totalStudents: e.target.value })} />
//           </Stack>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => { setOpenCourseForm(false); setEditingCourseId(null); }}>Cancel</Button>
//           <Button variant="contained" onClick={handleSaveCourse} sx={{ background: "#1e3a8a" }}>{editingCourseId ? "Update Course" : "Save Course"}</Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// }
import React, { useState } from "react";
import {
  Box, Typography, Button, Card, CardContent, TextField,
  IconButton, Divider, Stack, Paper, Dialog, DialogTitle,
  DialogContent, DialogActions, MenuItem, Chip, Table,
  TableHead, TableRow, TableCell, TableBody, Tooltip
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import SchoolIcon from "@mui/icons-material/School";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import ImageIcon from "@mui/icons-material/Image";
import LinkIcon from "@mui/icons-material/Link";

const materialTypes = ["PDF", "Video", "Image", "Link"];
const difficulties = ["Easy", "Medium", "Hard"];
const difficultyColors = { Easy: "success", Medium: "warning", Hard: "error" };

export default function CourseList() {

  /* ---------------- STATES ---------------- */
  const [openNav, setOpenNav] = useState(false);
  const [courses, setCourses] = useState([]);
  const [activeCourseId, setActiveCourseId] = useState(null);
  const [openCourseForm, setOpenCourseForm] = useState(false);
  const [editingCourseId, setEditingCourseId] = useState(null);
const navigate = useNavigate();
  const [courseForm, setCourseForm] = useState({
    courseId: "",
    instructorId: "",
    courseName: "",
    description: "",
    totalStudents: 0
  });

  const [topicForm, setTopicForm] = useState({ name: "", description: "", difficulty: "Easy" });
  const [materialForm, setMaterialForm] = useState({ type: "", name: "", url: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [openMaterialDialog, setOpenMaterialDialog] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);

  const [previewMaterial, setPreviewMaterial] = useState(null);
  const [difficultyFilter, setDifficultyFilter] = useState("All");

  /* ---------------- COURSE HANDLERS ---------------- */
  const handleSaveCourse = () => {
    if (!courseForm.courseId || !courseForm.courseName) return;
    if (editingCourseId) {
      setCourses(courses.map(c => c.courseId === editingCourseId ? { ...courseForm, topics: c.topics } : c));
    } else {
      setCourses([...courses, { ...courseForm, topics: [] }]);
    }
    setOpenCourseForm(false);
    setEditingCourseId(null);
    setCourseForm({ courseId: "", instructorId: "", courseName: "", description: "", totalStudents: 0 });
  };

  const handleEditCourse = (course) => {
    setCourseForm(course);
    setEditingCourseId(course.courseId);
    setOpenCourseForm(true);
  };

  const handleDeleteCourse = (id) => {
    setCourses(courses.filter(c => c.courseId !== id));
    if (activeCourseId === id) setActiveCourseId(null);
  };

  /* ---------------- TOPIC ---------------- */
  const handleAddTopic = (courseId) => {
    if (!topicForm.name) return;
    setCourses(courses.map(c => c.courseId === courseId ? { ...c, topics: [...c.topics, { ...topicForm, materials: [] }] } : c));
    setTopicForm({ name: "", description: "", difficulty: "Easy" });
  };

  /* ---------------- MATERIAL ---------------- */
  const handleAddMaterial = (courseId, topicIndex) => {
    if (!materialForm.type || !materialForm.name) return;
    const materialToSave = { ...materialForm, file: selectedFile };
    setCourses(courses.map(c =>
      c.courseId === courseId
        ? { ...c, topics: c.topics.map((t, i) => i === topicIndex ? { ...t, materials: [...t.materials, materialToSave] } : t) }
        : c
    ));
    setMaterialForm({ type: "", name: "", url: "" });
    setSelectedFile(null);
  };

  /* ---------------- FILTER ---------------- */
  const filteredTopics = (topics, courseName) => {
    let filtered = topics.filter(t =>
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.difficulty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.materials.some(m => m.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    if (difficultyFilter !== "All") filtered = filtered.filter(t => t.difficulty === difficultyFilter);
    return filtered;
  };

  const renderPreviewIcon = (material) => {
    switch (material.type) {
      case "PDF": return <PictureAsPdfIcon color="error" />;
      case "Video": return <VideoLibraryIcon color="primary" />;
      case "Image": return <ImageIcon color="warning" />;
      case "Link": return <LinkIcon color="info" />;
      default: return null;
    }
  };

  /* ---------------- JSX ---------------- */
  return (
    <Box sx={{ minHeight: "100vh", p: 5, background: "linear-gradient(180deg,#e2e8f0,#f8fafc)" }}>
      {/* HEADER */}
      <Box display="flex" alignItems="center" mb={3}>
        <IconButton onClick={() => setOpenNav(true)}><MenuIcon /></IconButton>
        <Typography variant="h6" ml={2} fontWeight="bold">Instructor Dashboard</Typography>
      </Box>

      {/* ADD COURSE BUTTON */}
      {courses.length > 0 && (
        <Box display="flex" justifyContent="flex-end" mb={3}>
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpenCourseForm(true)} sx={{ background: "#1e3a8a" }}>Add Course</Button>
        </Box>
      )}

      {/* HERO PAGE */}
      {courses.length === 0 && (
        <Box sx={{ maxWidth: 720, mx: "auto", mt: 8, p: 6, textAlign: "center", background: "linear-gradient(145deg,#ffffff,#dbeafe)", borderRadius: 5 }}>
          <SchoolIcon sx={{ fontSize: 72, color: "#1e3a8a" }} />
          <Typography variant="h4" fontWeight="bold" mt={2}>Design your Course Space</Typography>
          <Typography mt={1} mb={4}>“A well-structured course is a silent teacher.”</Typography>
          <Button size="large" variant="contained" startIcon={<AddIcon />} onClick={() => setOpenCourseForm(true)} sx={{ background: "#1e3a8a" }}>Add Course</Button>
        </Box>
      )}

      {/* SEARCH + DIFFICULTY FILTER */}
      {courses.length > 0 && (
        <Box mb={3}>
          <TextField fullWidth placeholder="Search topics or materials…" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} sx={{ mb: 2, background: "#fff", borderRadius: 2 }} />
          <TextField select label="Filter by Difficulty" size="small" value={difficultyFilter} onChange={e => setDifficultyFilter(e.target.value)} sx={{ width: 200, background: "#fff", borderRadius: 2 }}>
            <MenuItem value="All">All</MenuItem>
            {difficulties.map(d => <MenuItem key={d} value={d}>{d}</MenuItem>)}
          </TextField>
        </Box>
      )}

      {/* COURSES */}
      <Stack spacing={4}>
        {courses.map(course => (
          <Card key={course.courseId} sx={{ borderLeft: "6px solid #6366f1" }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between">
                <Box>
                  <Typography fontWeight="bold">{course.courseName}</Typography>
                  <Typography variant="body2">ID: {course.courseId} | Instructor: {course.instructorId}</Typography>
                </Box>
                <Box>
                  <IconButton onClick={() => handleEditCourse(course)}><EditIcon /></IconButton>
                  <IconButton color="error" onClick={() => handleDeleteCourse(course.courseId)}><DeleteIcon /></IconButton>
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Button startIcon={<AutoStoriesIcon />} onClick={() => setActiveCourseId(activeCourseId === course.courseId ? null : course.courseId)}>Manage Topics</Button>

              {activeCourseId === course.courseId && (
                <Box mt={3}>
                  {/* ADD TOPIC */}
                  <Paper sx={{ p: 3, mb: 3 }}>
                    <Typography fontWeight="bold">Add Topic</Typography>
                    <Stack spacing={2} mt={2}>
                      <TextField label="Topic Name" value={topicForm.name} onChange={e => setTopicForm({ ...topicForm, name: e.target.value })} />
                      <TextField label="Description" value={topicForm.description} onChange={e => setTopicForm({ ...topicForm, description: e.target.value })} />
                      <TextField select label="Difficulty" value={topicForm.difficulty} onChange={e => setTopicForm({ ...topicForm, difficulty: e.target.value })}>
                        {difficulties.map(d => <MenuItem key={d} value={d}>{d}</MenuItem>)}
                      </TextField>
                      <Button variant="contained" onClick={() => handleAddTopic(course.courseId)}>Add Topic</Button>
                    </Stack>
                  </Paper>

                  {/* TOPICS */}
                  {/* TOPICS */}
{filteredTopics(course.topics, course.courseName).map((topic, idx) => (
  <Paper key={idx} sx={{ p: 3, mb: 3 }}>
    <Box display="flex" justifyContent="space-between">
      <Typography fontWeight="bold">{topic.name}</Typography>
      <Chip size="small" label={topic.difficulty} color={difficultyColors[topic.difficulty]} />
    </Box>

    {/* DIFFICULTY FILTER FOR MATERIALS */}
    <Box display="flex" justifyContent="flex-end" mt={2} mb={1}>
      <TextField
        select
        size="small"
        label="Filter by Difficulty"
        value={difficultyFilter}
        onChange={e => setDifficultyFilter(e.target.value)}
        sx={{ width: 200, background: "#fff", borderRadius: 2 }}
      >
        <MenuItem value="All">All</MenuItem>
        {difficulties.map(d => <MenuItem key={d} value={d}>{d}</MenuItem>)}
      </TextField>
    </Box>

    <Table size="small" sx={{ mt: 2 }}>
      <TableHead>
        <TableRow>
          <TableCell>Type</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {topic.materials
          .filter(m => difficultyFilter === "All" || topic.difficulty === difficultyFilter)
          .map((m, i) => (
            <TableRow key={i}>
              <TableCell>{m.type}</TableCell>
              <TableCell>{m.name}</TableCell>
              <TableCell>
                {/* PREVIEW */}
                <Tooltip title="Preview">
                  <IconButton onClick={() => setPreviewMaterial(m)}>
                    {renderPreviewIcon(m)}
                  </IconButton>
                </Tooltip>

                {/* EDIT */}
                <Tooltip title="Edit">
                  <IconButton onClick={() => {
                    setMaterialForm({ type: m.type, name: m.name, url: m.url });
                    setSelectedFile(m.file || null);
                    setSelectedTopic({ courseId: course.courseId, topicIndex: idx, materialIndex: i });
                    setOpenMaterialDialog(true);
                  }}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>

                {/* DELETE */}
                <Tooltip title="Delete">
                  <IconButton color="error" onClick={() => {
                    setCourses(prev => prev.map(c =>
                      c.courseId === course.courseId
                        ? {
                            ...c,
                            topics: c.topics.map((t, ti) =>
                              ti === idx
                                ? { ...t, materials: t.materials.filter((_, mi) => mi !== i) }
                                : t
                            )
                          }
                        : c
                    ));
                  }}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>

    {/* ADD MATERIAL BUTTON */}
    <Button sx={{ mt: 2 }} startIcon={<UploadFileIcon />} onClick={() => {
      setSelectedTopic({ courseId: course.courseId, topicIndex: idx });
      setOpenMaterialDialog(true);
    }}>
      Add Material
    </Button>

    {/* PREVIEW SECTION */}
    {previewMaterial && (
      <Paper sx={{ p: 2, mt: 2 }}>
        <Typography fontWeight="bold" mb={1}>Preview: {previewMaterial.name}</Typography>
        {previewMaterial.type === "PDF" && <iframe src={previewMaterial.url || URL.createObjectURL(previewMaterial.file)} width="100%" height="400px" title={previewMaterial.name} />}
        {previewMaterial.type === "Video" && <video width="100%" height="400px" controls><source src={previewMaterial.url} /></video>}
        {previewMaterial.type === "Image" && <img src={previewMaterial.url || URL.createObjectURL(previewMaterial.file)} alt={previewMaterial.name} style={{ maxWidth: "100%", maxHeight: 400 }} />}
        {previewMaterial.type === "Link" && <iframe src={previewMaterial.url} width="100%" height="400px" title={previewMaterial.name} />}
        <Button sx={{ mt: 1 }} onClick={() => setPreviewMaterial(null)}>Close Preview</Button>
      </Paper>
    )}
  </Paper>
))}

                </Box>
              )}
            </CardContent>
          </Card>
        ))}
      </Stack>

      {/* DRAWER */}
     <Drawer open={openNav} onClose={() => setOpenNav(false)}>
  <Box sx={{ width: 260 }}>
    <List>

      <ListItem button onClick={() => {
        navigate("/instructor/dashboard");
        setOpenNav(false);
      }}>
        <ListItemText primary="Dashboard" />
      </ListItem>

      <ListItem button onClick={() => {
        navigate("/instructor/courses");
        setOpenNav(false);
      }}>
        <ListItemText primary="Courses" />
      </ListItem>

      <ListItem button onClick={() => {
        navigate("/instructor/status");
        setOpenNav(false);
      }}>
        <ListItemText primary="Course Status" />
      </ListItem>

      <ListItem button onClick={() => {
        navigate("/instructor/announce");
        setOpenNav(false);
      }}>
        <ListItemText primary="Announcements" />
      </ListItem>

    </List>
  </Box>
</Drawer>


      {/* MATERIAL DIALOG */}
      <Dialog open={openMaterialDialog} onClose={() => setOpenMaterialDialog(false)} fullWidth>
        <DialogTitle>Add Learning Material</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField label="Material Name" value={materialForm.name} onChange={e => setMaterialForm({ ...materialForm, name: e.target.value })} />
            <TextField select label="Material Type" value={materialForm.type} onChange={e => setMaterialForm({ ...materialForm, type: e.target.value })}>
              {materialTypes.map(t => <MenuItem key={t} value={t}>{t}</MenuItem>)}
            </TextField>
            {(materialForm.type === "PDF" || materialForm.type === "Image") && (
              <Button variant="outlined" component="label">Browse File
                <input type="file" hidden accept={materialForm.type === "PDF" ? ".pdf" : "image/*"} onChange={e => setSelectedFile(e.target.files[0])} />
              </Button>
            )}
            {(materialForm.type === "Link" || materialForm.type === "Video") && <TextField label="Paste URL" value={materialForm.url} onChange={e => setMaterialForm({ ...materialForm, url: e.target.value })} />}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenMaterialDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => { handleAddMaterial(selectedTopic.courseId, selectedTopic.topicIndex); setOpenMaterialDialog(false); }}>Upload</Button>
        </DialogActions>
      </Dialog>

      {/* COURSE FORM DIALOG */}
      <Dialog open={openCourseForm} onClose={() => { setOpenCourseForm(false); setEditingCourseId(null); }} fullWidth>
        <DialogTitle>{editingCourseId ? "Edit Course" : "Add Course"}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField label="Course ID" value={courseForm.courseId} onChange={e => setCourseForm({ ...courseForm, courseId: e.target.value })} disabled={!!editingCourseId} />
            <TextField label="Instructor ID" value={courseForm.instructorId} onChange={e => setCourseForm({ ...courseForm, instructorId: e.target.value })} />
            <TextField label="Course Name" value={courseForm.courseName} onChange={e => setCourseForm({ ...courseForm, courseName: e.target.value })} />
            <TextField label="Description" multiline rows={3} value={courseForm.description} onChange={e => setCourseForm({ ...courseForm, description: e.target.value })} />
            <TextField type="number" label="Total Students" value={courseForm.totalStudents} onChange={e => setCourseForm({ ...courseForm, totalStudents: e.target.value })} />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setOpenCourseForm(false); setEditingCourseId(null); }}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveCourse} sx={{ background: "#1e3a8a" }}>{editingCourseId ? "Update Course" : "Save Course"}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

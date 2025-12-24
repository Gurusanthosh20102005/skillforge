import React, { useState, useEffect } from "react";
import {
    Box, Typography, Button, Card, CardContent, TextField,
    IconButton, Divider, Stack, Paper, Dialog, DialogTitle,
    DialogContent, DialogActions, MenuItem, Chip, Table,
    TableHead, TableRow, TableCell, TableBody, Tooltip,
    Container, Grid, InputAdornment, useTheme, alpha,
    Fade, Avatar, Tabs, Tab
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { courseService } from "./services/courseService";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
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
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ClassIcon from "@mui/icons-material/Class";
import CampaignIcon from "@mui/icons-material/Campaign";
import AssessmentIcon from "@mui/icons-material/Assessment";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import DescriptionIcon from "@mui/icons-material/Description";
import GroupIcon from "@mui/icons-material/Group";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import LogoutIcon from "@mui/icons-material/Logout";

const materialTypes = ["PDF", "Video", "Image", "Link"];
const difficulties = ["BEGINNER", "INTERMEDIATE", "ADVANCED"];
const difficultyLabels = { BEGINNER: "Easy", INTERMEDIATE: "Medium", ADVANCED: "Hard" };
const difficultyColors = { BEGINNER: "success", INTERMEDIATE: "warning", ADVANCED: "error" };

export default function CourseList({ courses, setCourses }) {
    const theme = useTheme();

    /* ---------------- STATES ---------------- */
    const [openNav, setOpenNav] = useState(false);
    // courses and setCourses are now passed as props
    const [activeCourseId, setActiveCourseId] = useState(null);
    const [openCourseForm, setOpenCourseForm] = useState(false);
    const [editingCourseId, setEditingCourseId] = useState(null);
    const navigate = useNavigate();
    const [courseForm, setCourseForm] = useState({
        course_id: "",
        instructor_id: "",
        course_title: "",
        description: "",
        difficulty: "BEGINNER"
    });

    const [topicForm, setTopicForm] = useState({ name: "", description: "", difficulty: "BEGINNER" });
    const [materialForm, setMaterialForm] = useState({ type: "", name: "", url: "" });
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [openMaterialDialog, setOpenMaterialDialog] = useState(false);
    const [selectedTopic, setSelectedTopic] = useState(null);

    const [previewMaterial, setPreviewMaterial] = useState(null);
    const [tabValue, setTabValue] = useState(0);
    const [difficultyFilter, setDifficultyFilter] = useState("All");

    /* ---------------- HYDRATION ---------------- */
    // Moved to App.jsx for shared state

    /* ---------------- COURSE HANDLERS ---------------- */
    const handleSaveCourse = async () => {
        if (!courseForm.course_title) return;
        const updated = await courseService.saveCourse(courseForm, !!editingCourseId);
        setCourses(updated);
        setOpenCourseForm(false);
        setEditingCourseId(null);
        setCourseForm({ course_id: "", instructor_id: "", course_title: "", description: "", difficulty: "BEGINNER" });
    };

    const handleEditCourse = (course) => {
        setCourseForm(course);
        setEditingCourseId(course.course_id);
        setOpenCourseForm(true);
    };

    const handleDeleteCourse = async (id) => {
        const updated = await courseService.deleteCourse(id);
        setCourses(updated);
        if (activeCourseId === id) setActiveCourseId(null);
    };

    const handleSaveSettings = async () => {
        if (!courseForm.course_title) return;
        const updated = await courseService.saveCourse(courseForm, true);
        setCourses(updated);
        alert("Course settings saved successfully!");
    };

    /* ---------------- TOPIC ---------------- */
    const handleAddTopic = async (course_id) => {
        if (!topicForm.name) return;
        const updated = await courseService.saveTopic(course_id, null, topicForm);
        setCourses(updated);
        setTopicForm({ name: "", description: "", difficulty: "BEGINNER" });
    };

    /* ---------------- MATERIAL ---------------- */
    const handleAddMaterial = async (course_id, topicIndex) => {
        if (!materialForm.type || !materialForm.name) return;
        const materialToSave = { ...materialForm, file: selectedFile };
        const updated = await courseService.addMaterial(course_id, topicIndex, materialToSave);
        setCourses(updated);
        setMaterialForm({ type: "", name: "", url: "" });
        setSelectedFile(null);
    };

    /* ---------------- FILTER ---------------- */
    const filteredTopics = (topics, course_title) => {
        let filtered = topics.filter(t =>
            t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            t.difficulty.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
        <Box sx={{ minHeight: "100vh", bgcolor: "background.default", pb: 5 }}>
            {/* GLOBAL HEADER */}
            <Box sx={{
                bgcolor: "white",
                px: { xs: 2, md: 6 },
                py: 2,
                display: "flex", alignItems: "center", justifyContent: "space-between",
                borderBottom: '1px solid',
                borderColor: 'divider',
                position: 'sticky', top: 0, zIndex: 1100
            }}>
                <Box display="flex" alignItems="center">
                    <IconButton onClick={() => setOpenNav(true)} sx={{ mr: 2, color: 'text.secondary' }}>
                        <MenuIcon />
                    </IconButton>
                    <Box display="flex" alignItems="center" gap={1.5}>
                        <SchoolIcon sx={{ color: 'primary.main', fontSize: 28 }} />
                        <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: '-0.5px' }}>
                            Skill<Box component="span" sx={{ color: 'primary.main' }}>Forge</Box>
                        </Typography>
                    </Box>
                    <Divider orientation="vertical" flexItem sx={{ mx: 3, height: 24, alignSelf: 'center', borderColor: '#e2e8f0' }} />
                    <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.secondary', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                        {activeCourseId ? 'Course Editor' : 'Instructor Dashboard'}
                    </Typography>
                </Box>

                <Box display="flex" alignItems="center" gap={2}>
                    {activeCourseId ? (
                        <Button
                            variant="soft" // New variant defined in theme
                            onClick={() => setActiveCourseId(null)}
                            startIcon={<CloseIcon />}
                            sx={{ borderRadius: 2, color: 'text.secondary', bgcolor: '#f1f5f9', fontWeight: 700 }}
                        >
                            Exit Editor
                        </Button>
                    ) : (
                        courses.length > 0 && (
                            <Button
                                variant="contained"
                                startIcon={<AddIcon />}
                                onClick={() => setOpenCourseForm(true)}
                                sx={{ px: 3 }}
                            >
                                Create New Course
                            </Button>
                        )
                    )}
                    <Avatar sx={{ width: 36, height: 36, bgcolor: 'primary.light', fontSize: '0.875rem', fontWeight: 800 }}>JD</Avatar>
                </Box>
            </Box>

            {/* MAIN CONTENT AREA */}
            <Container maxWidth="xl" sx={{ mt: 4 }}>
                {!activeCourseId ? (
                    /* --- VIEW 1: COURSE GALLERY --- */
                    <Fade in>
                        <Box>
                            {courses.length === 0 ? (
                                /* Empty state as helping hero */
                                <Box sx={{
                                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                                    minHeight: '70vh', textAlign: "center", p: 4
                                }}>
                                    <Box sx={{ p: 4, bgcolor: 'white', borderRadius: '50%', mb: 3, boxShadow: 2 }}>
                                        <SchoolIcon sx={{ fontSize: 80, color: 'primary.main' }} />
                                    </Box>
                                    <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>Build your learning universe</Typography>
                                    <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 500, mb: 4 }}>
                                        SkillForge helps you organize content, track students, and deliver premium learning experiences. Let's start by creating your first course.
                                    </Typography>
                                    <Button
                                        size="large"
                                        variant="contained"
                                        startIcon={<AddIcon />}
                                        onClick={() => setOpenCourseForm(true)}
                                        sx={{ py: 1.5, px: 4, borderRadius: 3 }}
                                    >
                                        Create First Course
                                    </Button>
                                </Box>
                            ) : (
                                <Box>
                                    {/* Dashboard Stats */}
                                    <Grid container spacing={3} mb={6}>
                                        <Grid item xs={12} md={4}>
                                            <Paper sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2.5, borderRadius: 4 }}>
                                                <Box sx={{ p: 2, bgcolor: alpha(theme.palette.primary.main, 0.1), borderRadius: 3, color: 'primary.main' }}>
                                                    <ClassIcon />
                                                </Box>
                                                <Box>
                                                    <Typography variant="h4" fontWeight="800">{courses.length}</Typography>
                                                    <Typography variant="body2" color="text.secondary" fontWeight="700">ACTIVE COURSES</Typography>
                                                </Box>
                                            </Paper>
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <Paper sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2.5, borderRadius: 4 }}>
                                                <Box sx={{ p: 2, bgcolor: alpha('#10b981', 0.1), borderRadius: 3, color: '#10b981' }}>
                                                    <AutoStoriesIcon />
                                                </Box>
                                                <Box>
                                                    <Typography variant="h4" fontWeight="800">{courses.reduce((acc, c) => acc + c.topics.length, 0)}</Typography>
                                                    <Typography variant="body2" color="text.secondary" fontWeight="700">TOTAL TOPICS</Typography>
                                                </Box>
                                            </Paper>
                                        </Grid>
                                    </Grid>

                                    <Box display="flex" justifyContent="space-between" alignItems="flex-end" mb={4}>
                                        <Box>
                                            <Typography variant="h5" sx={{ fontWeight: 800 }}>Your Courses</Typography>
                                            <Typography variant="body2" color="text.secondary">Select a course to manage its curriculum and contents.</Typography>
                                        </Box>
                                        <Box display="flex" gap={2}>
                                            <TextField
                                                size="small"
                                                placeholder="Search courses..."
                                                value={searchTerm}
                                                onChange={e => setSearchTerm(e.target.value)}
                                                InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment> }}
                                                sx={{ width: 300 }}
                                            />
                                        </Box>
                                    </Box>

                                    <Grid container spacing={4}>
                                        {courses.filter(course =>
                                            course.course_title?.toLowerCase().includes(searchTerm.toLowerCase())
                                        ).map(course => (
                                            <Grid item xs={12} md={6} lg={4} key={course.course_id}>
                                                <Card onClick={() => setActiveCourseId(course.course_id)} sx={{
                                                    cursor: 'pointer',
                                                    height: '100%',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    overflow: 'hidden',
                                                    border: '1px solid',
                                                    borderColor: 'divider',
                                                    '&:hover': { transform: 'translateY(-6px)', boxShadow: 6, borderColor: 'primary.light' }
                                                }}>
                                                    {/* Card "Cap" - Professional Gradient Header */}
                                                    <Box sx={{
                                                        background: 'linear-gradient(135deg, #1e1b4b 0%, #4338ca 100%)',
                                                        p: 3,
                                                        color: 'white',
                                                        position: 'relative',
                                                        overflow: 'hidden'
                                                    }}>
                                                        {/* Decorative Background Circle */}
                                                        <Box sx={{
                                                            position: 'absolute', top: -30, right: -30, width: 120, height: 120,
                                                            borderRadius: '50%', background: 'rgba(255,255,255,0.08)'
                                                        }} />

                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, position: 'relative', zIndex: 1 }}>
                                                            <Box sx={{
                                                                p: 1, borderRadius: 2.5, bgcolor: 'rgba(255,255,255,0.2)',
                                                                backdropFilter: 'blur(4px)', display: 'flex'
                                                            }}>
                                                                <SchoolIcon sx={{ fontSize: 24 }} />
                                                            </Box>
                                                            <Box>
                                                                <Typography variant="caption" sx={{ opacity: 0.8, fontWeight: 700, letterSpacing: 0.5 }}>{course.course_id}</Typography>
                                                                <Typography variant="h6" sx={{ fontWeight: 800, lineHeight: 1.2 }}>{course.course_title}</Typography>
                                                            </Box>
                                                        </Box>
                                                    </Box>

                                                    <CardContent sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                                        <Typography variant="body2" color="text.secondary" sx={{
                                                            mb: 3, flexGrow: 1, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden'
                                                        }}>
                                                            {course.description || "No description provided for this course. Start building your curriculum today."}
                                                        </Typography>

                                                        <Stack spacing={2}>
                                                            <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ p: 1.5, bgcolor: '#f8fafc', borderRadius: 2 }}>
                                                                <Box display="flex" alignItems="center" gap={1}>
                                                                    <PersonIcon sx={{ fontSize: 18, color: 'primary.main' }} />
                                                                    <Typography variant="caption" fontWeight="700" color="text.primary">{course.instructor_id}</Typography>
                                                                </Box>
                                                                <Box display="flex" alignItems="center" gap={1}>
                                                                    <GroupIcon sx={{ fontSize: 18, color: 'primary.main' }} />
                                                                    <Typography variant="caption" fontWeight="700" color="text.primary">{course.total_students || 0}</Typography>
                                                                </Box>
                                                            </Box>

                                                            <Button
                                                                variant="soft"
                                                                fullWidth
                                                                endIcon={<ArrowForwardIcon fontSize="small" />}
                                                                sx={{ py: 1, fontWeight: 800, borderRadius: 2 }}
                                                            >
                                                                Manage Content
                                                            </Button>
                                                        </Stack>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Box>
                            )}
                        </Box>
                    </Fade>
                ) : (
                    /* --- VIEW 2: COURSE EDITOR (70/30 Split) --- */
                    <Fade in>
                        <Box>
                            {courses.filter(c => c.course_id === activeCourseId).map(course => (
                                <Box key={course.course_id}>
                                    {/* Editor Header */}
                                    <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <Box>
                                            <Typography variant="h3" sx={{ mb: 1, fontWeight: 800 }}>{course.course_title}</Typography>
                                            <Box display="flex" gap={3} alignItems="center">
                                                <Box display="flex" alignItems="center" gap={1}>
                                                    <PersonIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                                                    <Typography variant="body2" fontWeight="600" color="text.secondary">{course.instructor_id}</Typography>
                                                </Box>
                                                <Box display="flex" alignItems="center" gap={1}>
                                                    <GroupIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                                                    <Typography variant="body2" fontWeight="600" color="text.secondary">{course.total_students || 0} Students enrolled</Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                        <Box sx={{ display: 'flex', gap: 1 }}>
                                            <Button variant="outlined" startIcon={<EditIcon />} onClick={() => handleEditCourse(course)}>Edit Details</Button>
                                            <Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={() => handleDeleteCourse(course.course_id)}>Delete</Button>
                                        </Box>
                                    </Box>

                                    {/* Tabs Navigation */}
                                    <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
                                        <Tabs
                                            value={tabValue}
                                            onChange={(e, v) => {
                                                setTabValue(v);
                                                if (v === 2) {
                                                    // Sync form with current course when entering settings
                                                    setCourseForm(course);
                                                }
                                            }}
                                            sx={{ minHeight: 40 }}
                                        >
                                            <Tab label="Curriculum" sx={{ fontWeight: 700, px: 0, mr: 4, minWidth: 0 }} />
                                            <Tab label="Analytics" sx={{ fontWeight: 700, px: 0, mr: 4, minWidth: 0 }} />
                                            <Tab label="Settings" sx={{ fontWeight: 700, px: 0, mr: 4, minWidth: 0 }} />
                                        </Tabs>
                                    </Box>

                                    {/* TAB CONTENT: CURRICULUM */}
                                    {tabValue === 0 && (
                                        <Grid container spacing={4}>
                                            {/* LEFT: Curriculum List */}
                                            <Grid item xs={12} md={8}>
                                                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                                                    <Typography variant="h6" fontWeight="800">Course Curriculum</Typography>
                                                    <Box display="flex" gap={1}>
                                                        <TextField
                                                            size="small"
                                                            placeholder="Filter topics..."
                                                            value={searchTerm}
                                                            onChange={e => setSearchTerm(e.target.value)}
                                                            sx={{ width: 220 }}
                                                            InputProps={{
                                                                startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment>,
                                                            }}
                                                        />
                                                    </Box>
                                                </Box>

                                                {course.topics.length === 0 ? (
                                                    <Paper sx={{ p: 8, textAlign: 'center', borderRadius: 4, bgcolor: 'white', border: '2px dashed', borderColor: 'divider' }}>
                                                        <AutoStoriesIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} />
                                                        <Typography variant="h6" sx={{ color: 'text.secondary', mb: 1, fontWeight: 700 }}>No topics yet</Typography>
                                                        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>Use the panel on the right to start building your curriculum.</Typography>
                                                    </Paper>
                                                ) : (
                                                    <Stack spacing={3}>
                                                        {course.topics.filter(t => t.name.toLowerCase().includes(searchTerm.toLowerCase())).map((topic, idx) => (
                                                            <Card key={idx} sx={{ border: '1px solid', borderColor: 'divider', boxShadow: 'none', '&:hover': { boxShadow: 1, borderColor: alpha(theme.palette.primary.main, 0.2) } }}>
                                                                <CardContent sx={{ p: 3 }}>
                                                                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                                                                        <Box display="flex" alignItems="center" gap={2}>
                                                                            <Chip label={difficultyLabels[topic.difficulty]} size="small" color={difficultyColors[topic.difficulty]} sx={{ fontWeight: 800, px: 1, borderRadius: 2 }} />
                                                                            <Typography variant="h6" fontWeight="700">{topic.name}</Typography>
                                                                        </Box>
                                                                        <Button startIcon={<AddIcon />} variant="soft" size="small" onClick={() => { setSelectedTopic({ course_id: course.course_id, topicIndex: idx }); setOpenMaterialDialog(true); }}>
                                                                            Add Material
                                                                        </Button>
                                                                    </Box>
                                                                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>{topic.description}</Typography>

                                                                    {topic.materials.length > 0 && (
                                                                        <Stack spacing={1.5} sx={{ ml: 2, borderLeft: '2px solid', borderColor: 'divider', pl: 3 }}>
                                                                            {topic.materials.map((m, i) => (
                                                                                <Box key={i} sx={{
                                                                                    p: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                                                                    bgcolor: 'white', borderRadius: 3, border: '1px solid', borderColor: 'divider',
                                                                                    transition: 'all 0.2s',
                                                                                    '&:hover': { borderColor: 'primary.main', bgcolor: alpha(theme.palette.primary.main, 0.02), transform: 'translateX(4px)' }
                                                                                }}>
                                                                                    <Box display="flex" alignItems="center" gap={2}>
                                                                                        {renderPreviewIcon(m)}
                                                                                        <Typography variant="body2" fontWeight="700">{m.name}</Typography>
                                                                                    </Box>
                                                                                    <Box display="flex" gap={0.5}>
                                                                                        <Tooltip title="Preview"><IconButton size="small" onClick={() => setPreviewMaterial(m)}><AutoStoriesIcon fontSize="small" /></IconButton></Tooltip>
                                                                                        <Tooltip title="Edit"><IconButton size="small" onClick={() => {
                                                                                            setMaterialForm({ type: m.type, name: m.name, url: m.url || "" });
                                                                                            setSelectedFile(m.file || null);
                                                                                            setSelectedTopic({ course_id: course.course_id, topicIndex: idx, materialIndex: i });
                                                                                            setOpenMaterialDialog(true);
                                                                                        }}><EditIcon fontSize="small" /></IconButton></Tooltip>
                                                                                        <Tooltip title="Delete"><IconButton size="small" color="error" onClick={() => {
                                                                                            setCourses(courses.map(c => c.course_id === activeCourseId ? { ...c, topics: c.topics.map((t, ti) => ti === idx ? { ...t, materials: t.materials.filter((_, mi) => mi !== i) } : t) } : c));
                                                                                        }}><DeleteIcon fontSize="small" /></IconButton></Tooltip>
                                                                                    </Box>
                                                                                </Box>
                                                                            ))}
                                                                        </Stack>
                                                                    )}

                                                                    {/* Professional Preview Frame - Targeted */}
                                                                    {previewMaterial && topic.materials.includes(previewMaterial) && (
                                                                        <Fade in>
                                                                            <Paper elevation={0} sx={{
                                                                                mt: 3, borderRadius: 4, overflow: 'hidden', border: '1px solid', borderColor: 'divider',
                                                                                boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)'
                                                                            }}>
                                                                                <Box sx={{ bgcolor: '#f1f5f9', px: 3, py: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid', borderColor: 'divider' }}>
                                                                                    <Box display="flex" alignItems="center" gap={1.5}>
                                                                                        {renderPreviewIcon(previewMaterial)}
                                                                                        <Typography variant="subtitle2" fontWeight="bold">Reviewing: {previewMaterial.name}</Typography>
                                                                                    </Box>
                                                                                    <IconButton size="small" onClick={() => setPreviewMaterial(null)} sx={{ bgcolor: 'rgba(0,0,0,0.05)', '&:hover': { bgcolor: 'rgba(0,0,0,0.1)', color: 'error.main' } }}><CloseIcon fontSize="small" /></IconButton>
                                                                                </Box>
                                                                                <Box sx={{ bgcolor: '#0f172a', minHeight: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                                                    {previewMaterial.type === "PDF" && <iframe src={previewMaterial.url || (previewMaterial.file && URL.createObjectURL(previewMaterial.file))} width="100%" height="500px" title={previewMaterial.name} style={{ border: 0, background: 'white' }} />}
                                                                                    {previewMaterial.type === "Video" && <video width="100%" controls style={{ maxHeight: 500, outline: 'none' }}><source src={previewMaterial.url} /></video>}
                                                                                    {previewMaterial.type === "Image" && <img src={previewMaterial.url || (previewMaterial.file && URL.createObjectURL(previewMaterial.file))} alt={previewMaterial.name} style={{ maxWidth: "100%", maxHeight: 500, objectFit: 'contain' }} />}
                                                                                    {previewMaterial.type === "Link" && <iframe src={previewMaterial.url} width="100%" height="500px" title={previewMaterial.name} style={{ border: 0, background: 'white' }} />}
                                                                                </Box>
                                                                            </Paper>
                                                                        </Fade>
                                                                    )}
                                                                </CardContent>
                                                            </Card>
                                                        ))}
                                                    </Stack>
                                                )}
                                            </Grid>

                                            {/* RIGHT: Inspector Panel (Sticky) */}
                                            <Grid item xs={12} md={4}>
                                                <Box sx={{ position: 'sticky', top: 100 }}>
                                                    <Paper sx={{ p: 4, borderRadius: 4, border: '1px solid', borderColor: 'divider', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
                                                        <Typography variant="h6" sx={{ fontWeight: 800, mb: 3 }}>Add New Topic</Typography>
                                                        <Stack spacing={3}>
                                                            <TextField
                                                                fullWidth
                                                                label="Topic Title"
                                                                placeholder="e.g. Introduction to React"
                                                                value={topicForm.name}
                                                                onChange={e => setTopicForm({ ...topicForm, name: e.target.value })}
                                                            />
                                                            <TextField
                                                                fullWidth
                                                                label="Description"
                                                                placeholder="Short overview of the topic"
                                                                multiline rows={3}
                                                                value={topicForm.description}
                                                                onChange={e => setTopicForm({ ...topicForm, description: e.target.value })}
                                                            />
                                                            <Box>
                                                                <Typography variant="caption" fontWeight="800" color="text.secondary" sx={{ mb: 1.5, display: 'block', letterSpacing: '0.5px' }}>DIFFICULTY LEVEL</Typography>
                                                                <Stack direction="row" spacing={1}>
                                                                    {difficulties.map(d => (
                                                                        <Chip
                                                                            key={d}
                                                                            label={d}
                                                                            onClick={() => setTopicForm({ ...topicForm, difficulty: d })}
                                                                            color={topicForm.difficulty === d ? difficultyColors[d] : 'default'}
                                                                            variant={topicForm.difficulty === d ? 'filled' : 'outlined'}
                                                                            sx={{ fontWeight: 700, borderRadius: 2 }}
                                                                        />
                                                                    ))}
                                                                </Stack>
                                                            </Box>
                                                            <Button
                                                                variant="contained"
                                                                size="large"
                                                                onClick={() => handleAddTopic(course.course_id)}
                                                                fullWidth
                                                                sx={{ py: 1.5, mt: 1, borderRadius: 3, fontWeight: 800 }}
                                                            >
                                                                Create Topic
                                                            </Button>
                                                        </Stack>
                                                    </Paper>

                                                    {/* Additional Info / Help Card */}
                                                    <Paper sx={{ p: 3, mt: 3, borderRadius: 4, bgcolor: alpha(theme.palette.primary.main, 0.03), border: '1px solid', borderColor: alpha(theme.palette.primary.main, 0.1) }}>
                                                        <Typography variant="subtitle2" fontWeight="800" color="primary.main" gutterBottom>Pro Tip</Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                            Group your lessons by difficulty to help students navigate their learning path more effectively.
                                                        </Typography>
                                                    </Paper>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    )}

                                    {/* TAB CONTENT: ANALYTICS */}
                                    {tabValue === 1 && (
                                        <Fade in>
                                            <Box>
                                                <Typography variant="h6" fontWeight="800" sx={{ mb: 3 }}>Performance Metrics</Typography>
                                                <Grid container spacing={3} mb={6}>
                                                    {[
                                                        { label: 'Completion Rate', value: '78%', icon: <TrendingUpIcon />, color: '#10b981' },
                                                        { label: 'Avg. Engagement', value: '42m', icon: <AssessmentIcon />, color: '#6366f1' },
                                                        { label: 'Active Students', value: course.total_students, icon: <GroupIcon />, color: '#f59e0b' }
                                                    ].map((stat, i) => (
                                                        <Grid item xs={12} md={4} key={i}>
                                                            <Paper sx={{ p: 3, borderRadius: 4, display: 'flex', alignItems: 'center', gap: 2.5 }}>
                                                                <Box sx={{ p: 2, bgcolor: alpha(stat.color, 0.1), color: stat.color, borderRadius: 3 }}>{stat.icon}</Box>
                                                                <Box>
                                                                    <Typography variant="h4" fontWeight="800">{stat.value}</Typography>
                                                                    <Typography variant="body2" color="text.secondary" fontWeight="700">{stat.label}</Typography>
                                                                </Box>
                                                            </Paper>
                                                        </Grid>
                                                    ))}
                                                </Grid>

                                                <Paper sx={{ p: 4, borderRadius: 4, textAlign: 'center', bgcolor: alpha(theme.palette.primary.main, 0.02), border: '1px dashed', borderColor: 'divider' }}>
                                                    <AssessmentIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} />
                                                    <Typography variant="h6" fontWeight="700">Analytics Dashboard</Typography>
                                                    <Typography variant="body2" color="text.secondary">Detailed engagement charts and individual student progress reports are coming soon.</Typography>
                                                </Paper>
                                            </Box>
                                        </Fade>
                                    )}

                                    {/* TAB CONTENT: SETTINGS */}
                                    {tabValue === 2 && (
                                        <Fade in>
                                            <Box>
                                                <Typography variant="h6" fontWeight="800" sx={{ mb: 3 }}>Course Configuration</Typography>
                                                <Paper sx={{ p: 4, borderRadius: 4 }}>
                                                    <Grid container spacing={4}>
                                                        <Grid item xs={12} md={6}>
                                                            <Stack spacing={3}>
                                                                <TextField
                                                                    fullWidth
                                                                    label="Course Title"
                                                                    value={courseForm.course_title}
                                                                    onChange={e => setCourseForm({ ...courseForm, course_title: e.target.value })}
                                                                />
                                                                <TextField
                                                                    fullWidth
                                                                    label="Instructor ID"
                                                                    value={courseForm.instructor_id}
                                                                    onChange={e => setCourseForm({ ...courseForm, instructor_id: e.target.value })}
                                                                />
                                                                <TextField
                                                                    fullWidth
                                                                    label="Max Student Capacity"
                                                                    type="number"
                                                                    value={courseForm.total_students || 0}
                                                                    onChange={e => setCourseForm({ ...courseForm, total_students: e.target.value })}
                                                                />
                                                            </Stack>
                                                        </Grid>
                                                        <Grid item xs={12} md={6}>
                                                            <TextField
                                                                fullWidth
                                                                label="Description"
                                                                multiline
                                                                rows={6}
                                                                value={courseForm.description}
                                                                onChange={e => setCourseForm({ ...courseForm, description: e.target.value })}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <Divider sx={{ my: 1 }} />
                                                            <Box display="flex" justifyContent="flex-end" gap={2}>
                                                                <Button variant="soft" onClick={() => setCourseForm(course)}>Restore Defaults</Button>
                                                                <Button variant="contained" onClick={handleSaveSettings}>Save Changes</Button>
                                                            </Box>
                                                        </Grid>
                                                    </Grid>
                                                </Paper>

                                                <Paper sx={{ p: 3, mt: 3, borderRadius: 3, bgcolor: alpha(theme.palette.error.main, 0.05), border: '1px solid', borderColor: alpha(theme.palette.error.main, 0.1) }}>
                                                    <Typography variant="subtitle2" fontWeight="800" color="error.main" gutterBottom>Danger Zone</Typography>
                                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>Once you delete a course, there is no going back. Please be certain.</Typography>
                                                    <Button variant="outlined" color="error" size="small" startIcon={<DeleteIcon />} onClick={() => handleDeleteCourse(course.course_id)}>Delete Course</Button>
                                                </Paper>
                                            </Box>
                                        </Fade>
                                    )}
                                </Box>
                            ))}
                        </Box>
                    </Fade>
                )}
            </Container>


            {/* DRAWER */}
            <Drawer
                anchor="left"
                open={openNav}
                onClose={() => setOpenNav(false)}
                PaperProps={{ sx: { width: 280, borderRight: 'none', bgcolor: 'background.paper' } }}
            >
                <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <SchoolIcon sx={{ color: 'primary.main', fontSize: 32 }} />
                    <Typography variant="h6" fontWeight="bold">SkillForge</Typography>
                </Box>
                <Divider sx={{ mb: 2 }} />
                <List sx={{ px: 2 }}>
                    {[
                        { text: "Dashboard", icon: <DashboardIcon />, path: "/instructor/dashboard" },
                        { text: "Manage Courses", icon: <ClassIcon />, path: "/instructor/courses" },
                        { text: "Logout", icon: <LogoutIcon />, path: "/" },
                    ].map((item) => (
                        <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
                            <ListItemButton
                                onClick={() => { navigate(item.path); setOpenNav(false); }}
                                sx={{ borderRadius: 2, '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.08) } }}
                            >
                                <ListItemIcon sx={{ minWidth: 40, color: 'text.secondary' }}>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} primaryTypographyProps={{ fontWeight: 500 }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>


            {/* MATERIAL DIALOG */}
            <Dialog open={openMaterialDialog} onClose={() => setOpenMaterialDialog(false)} fullWidth maxWidth="sm" PaperProps={{ sx: { borderRadius: 3, overflow: 'hidden' } }}>
                <Box sx={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #4338ca 100%)', p: 3, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box display="flex" alignItems="center" gap={2}>
                        <Box sx={{ p: 1, bgcolor: 'rgba(255,255,255,0.2)', borderRadius: 2 }}><UploadFileIcon /></Box>
                        <Typography variant="h6" fontWeight="bold">Add Learning Material</Typography>
                    </Box>
                    <IconButton onClick={() => setOpenMaterialDialog(false)} sx={{ color: 'white' }}><CloseIcon /></IconButton>
                </Box>
                <DialogContent sx={{ bgcolor: '#f8fafc', p: 3 }}>
                    <Stack spacing={3} mt={1}>
                        <TextField
                            fullWidth label="Material Name"
                            value={materialForm.name}
                            onChange={e => setMaterialForm({ ...materialForm, name: e.target.value })}
                            sx={{ bgcolor: 'white', '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                        />
                        <TextField
                            fullWidth select label="Material Type"
                            value={materialForm.type}
                            onChange={e => setMaterialForm({ ...materialForm, type: e.target.value })}
                            sx={{ bgcolor: 'white', '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                        >
                            {materialTypes.map(t => <MenuItem key={t} value={t}>{t}</MenuItem>)}
                        </TextField>
                        {(materialForm.type === "PDF" || materialForm.type === "Image") && (
                            <Button variant="outlined" component="label" startIcon={<UploadFileIcon />} fullWidth sx={{ height: 56, borderStyle: 'dashed', bgcolor: 'white' }}>
                                {selectedFile ? selectedFile.name : `Upload ${materialForm.type}`}
                                <input type="file" hidden accept={materialForm.type === "PDF" ? ".pdf" : "image/*"} onChange={e => setSelectedFile(e.target.files[0])} />
                            </Button>
                        )}
                        {(materialForm.type === "Link" || materialForm.type === "Video") && (
                            <TextField
                                fullWidth label="Paste URL"
                                value={materialForm.url}
                                onChange={e => setMaterialForm({ ...materialForm, url: e.target.value })}
                                sx={{ bgcolor: 'white', '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                            />
                        )}
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ p: 3, bgcolor: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
                    <Button onClick={() => setOpenMaterialDialog(false)} color="inherit">Cancel</Button>
                    <Button variant="contained" onClick={() => { handleAddMaterial(selectedTopic.course_id, selectedTopic.topicIndex); setOpenMaterialDialog(false); }} disabled={!materialForm.name || !materialForm.type} sx={{ px: 4, borderRadius: 2 }}>Upload</Button>
                </DialogActions>
            </Dialog>

            {/* COURSE FORM DIALOG - ENHANCED PREMIUM DESIGN */}
            <Dialog
                open={openCourseForm}
                onClose={() => { setOpenCourseForm(false); setEditingCourseId(null); }}
                fullWidth
                maxWidth="md"
                PaperProps={{
                    sx: {
                        borderRadius: 4,
                        overflow: 'hidden',
                        background: '#fff'
                    }
                }}
            >
                {/* Helper for Header Gradient */}
                <Box sx={{
                    background: 'linear-gradient(135deg, #1e1b4b 0%, #4338ca 100%)',
                    p: 4,
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    {/* Decorative Circle */}
                    <Box sx={{
                        position: 'absolute', top: -20, right: -20, width: 150, height: 150,
                        borderRadius: '50%', background: 'rgba(255,255,255,0.1)'
                    }} />

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, zIndex: 1 }}>
                        <Box sx={{
                            p: 1.5, borderRadius: 3,
                            bgcolor: 'rgba(255,255,255,0.2)',
                            backdropFilter: 'blur(4px)',
                            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)'
                        }}>
                            {editingCourseId ? <EditIcon sx={{ fontSize: 32 }} /> : <AddCircleOutlineIcon sx={{ fontSize: 32 }} />}
                        </Box>
                        <Box>
                            <Typography variant="h5" fontWeight="800" letterSpacing="-0.5px">
                                {editingCourseId ? "Edit Course Details" : "Create New Course"}
                            </Typography>
                            <Typography variant="body2" sx={{ opacity: 0.8 }}>
                                {editingCourseId ? "Update your course information below." : "Fill in the details to launch a new learning journey."}
                            </Typography>
                        </Box>
                    </Box>
                    <IconButton onClick={() => { setOpenCourseForm(false); setEditingCourseId(null); }} sx={{ color: 'white', zIndex: 1 }}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                <DialogContent sx={{ p: 4, bgcolor: '#f8fafc' }}>
                    <Stack spacing={3} mt={1}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Course ID"
                                    placeholder="e.g. CS101"
                                    value={courseForm.course_id}
                                    onChange={e => setCourseForm({ ...courseForm, course_id: e.target.value })}
                                    disabled={!!editingCourseId}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start"><FingerprintIcon color="primary" /></InputAdornment>,
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': { bgcolor: 'white' }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Instructor ID"
                                    placeholder="e.g. INS-001"
                                    value={courseForm.instructor_id}
                                    onChange={e => setCourseForm({ ...courseForm, instructor_id: e.target.value })}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start"><PersonIcon color="primary" /></InputAdornment>,
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': { bgcolor: 'white' }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Course Title"
                                    placeholder="Enter a descriptive course name"
                                    value={courseForm.course_title}
                                    onChange={e => setCourseForm({ ...courseForm, course_title: e.target.value })}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start"><SchoolIcon color="primary" /></InputAdornment>,
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': { bgcolor: 'white' }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Description"
                                    placeholder="Describe the course and what students will learn"
                                    multiline rows={4}
                                    value={courseForm.description}
                                    onChange={e => setCourseForm({ ...courseForm, description: e.target.value })}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1.5 }}><DescriptionIcon color="primary" /></InputAdornment>,
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': { bgcolor: 'white' }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Box>
                                    <Typography variant="caption" fontWeight="800" color="text.secondary" sx={{ mb: 1.5, display: 'block', letterSpacing: '0.5px' }}>COURSE DIFFICULTY</Typography>
                                    <Stack direction="row" spacing={1}>
                                        {difficulties.map(d => (
                                            <Chip
                                                key={d}
                                                label={difficultyLabels[d]}
                                                onClick={() => setCourseForm({ ...courseForm, difficulty: d })}
                                                color={courseForm.difficulty === d ? difficultyColors[d] : 'default'}
                                                variant={courseForm.difficulty === d ? 'filled' : 'outlined'}
                                                sx={{ fontWeight: 700, borderRadius: 2 }}
                                            />
                                        ))}
                                    </Stack>
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    type="number"
                                    label="Total Capacity / Students"
                                    value={courseForm.total_students}
                                    onChange={e => setCourseForm({ ...courseForm, total_students: e.target.value })}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start"><GroupIcon color="primary" /></InputAdornment>,
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': { bgcolor: 'white' }
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Stack>
                </DialogContent>
                <Divider />
                <DialogActions sx={{ p: 3, bgcolor: '#f8fafc', justifyContent: 'space-between' }}>
                    <Button
                        onClick={() => { setOpenCourseForm(false); setEditingCourseId(null); }}
                        color="secondary"
                        variant="text"
                        sx={{ px: 3 }}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        size="large"
                        onClick={handleSaveCourse}
                        disabled={!courseForm.course_id || !courseForm.course_title}
                        startIcon={editingCourseId ? <EditIcon /> : <AddCircleOutlineIcon />}
                        sx={{ px: 5, py: 1.2 }}
                    >
                        {editingCourseId ? "Update Course" : "Create Course"}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

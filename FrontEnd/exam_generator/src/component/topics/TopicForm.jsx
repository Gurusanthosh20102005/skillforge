// import React, { useEffect, useState } from "react";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   TextField,
//   MenuItem
// } from "@mui/material";
// import '../../styles/forms.css';

// const TopicForm = ({ open, onClose, topic, saveTopic, courseId }) => {
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [difficulty, setDifficulty] = useState("Easy");

//   useEffect(() => {
//     if (topic) {
//       setName(topic.name);
//       setDescription(topic.description);
//       setDifficulty(topic.difficulty);
//     } else {
//       setName("");
//       setDescription("");
//       setDifficulty("Easy");
//     }
//   }, [topic, open]);

//   const handleSubmit = () => {
//     if (!name) {
//       alert("Topic name required");
//       return;
//     }

//     const newTopic = topic
//       ? { ...topic, name, description, difficulty }
//       : {
//           id: Date.now(),
//           courseId,
//           name,
//           description,
//           difficulty
//         };

//     saveTopic(newTopic);
//     onClose();
//   };

//   return (
//     <Dialog open={!!open} onClose={onClose} fullWidth maxWidth="sm">
//       <DialogTitle>{topic ? "Edit Topic" : "Add Topic"}</DialogTitle>

//       <DialogContent>
//         <TextField
//           label="Topic Name"
//           fullWidth
//           margin="normal"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />

//         <TextField
//           label="Description"
//           fullWidth
//           margin="normal"
//           multiline
//           rows={3}
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//         />

//         <TextField
//           select
//           label="Difficulty"
//           fullWidth
//           margin="normal"
//           value={difficulty}
//           onChange={(e) => setDifficulty(e.target.value)}
//         >
//           <MenuItem value="Easy">Easy</MenuItem>
//           <MenuItem value="Medium">Medium</MenuItem>
//           <MenuItem value="Hard">Hard</MenuItem>
//         </TextField>
//       </DialogContent>

//       <DialogActions>
//         <Button onClick={onClose}>Cancel</Button>
//         <Button variant="contained" onClick={handleSubmit}>
//           {topic ? "Update" : "Add"}
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default TopicForm;
import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, TextField, Button } from "@mui/material";

const TopicForm = ({ open, onClose, onSave }) => {
  const [topicName, setTopicName] = useState("");

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Topic</DialogTitle>
      <DialogContent>
        <TextField fullWidth label="Topic Name"
          value={topicName}
          onChange={e => setTopicName(e.target.value)} />
        <Button sx={{ mt: 2 }} variant="contained"
          onClick={() => { onSave(topicName); setTopicName(""); onClose(); }}>
          Save Topic
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default TopicForm;

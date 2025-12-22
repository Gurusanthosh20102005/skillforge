import React, { useState } from "react";
import { Button, TextField, List, ListItem } from "@mui/material";
import MaterialList from "../materials/MaterialList";
import '../../styles/topics.css';

const TopicList = ({ course }) => {
  const [topics, setTopics] = useState([]);
  const [name, setName] = useState("");
  const [selectedTopic, setSelectedTopic] = useState(null);

  const addTopic = () => {
    if (!name) return;
    setTopics([...topics, { id: Date.now(), name }]);
    setName("");
  };

  return (
    <div style={{ marginTop: 30 }}>
      <h3>Topics for {course.title}</h3>

      <TextField
        label="Topic name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button onClick={addTopic}>Add Topic</Button>

      <List>
        {topics.map(topic => (
          <ListItem key={topic.id}>
            {topic.name}
            <Button onClick={() => setSelectedTopic(topic)}>
              Add Material
            </Button>
          </ListItem>
        ))}
      </List>

      {selectedTopic && (
        <MaterialList topicId={selectedTopic.id} />
      )}
    </div>
  );
};

export default TopicList;

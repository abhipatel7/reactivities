import { FC, useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { Header, List, ThemeIcon, Text } from '@mantine/core';
import { User } from 'tabler-icons-react';

const App: FC = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/activities')
      .then((res) => {
        setActivities(res.data);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className="App">
      <Header height={70} p="md">
        <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          <ThemeIcon
            color="teal"
            style={{ marginRight: 10 }}
            size={24}
            radius="xl"
          >
            <User size={16} />
          </ThemeIcon>
          <Text>Reactivities</Text>
        </div>
      </Header>

      <List withPadding>
        {activities.map((activity: any) => (
          <List.Item key={activity.id}>{activity.title}</List.Item>
        ))}
      </List>
    </div>
  );
};

export default App;

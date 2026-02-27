import {Container, Typography} from "@mui/material";
import MessageForm from "./components/MessageForm.tsx";
import MessageList from "./components/MessageList.tsx";

const App = () => {


  return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
          <Typography variant="h4" gutterBottom>
              Guestbook 📖
          </Typography>

          <MessageForm />
          <MessageList />
      </Container>
  )
};

export default App

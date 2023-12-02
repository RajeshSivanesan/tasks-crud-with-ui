import { Button, Stack } from "@mui/material";
import Tasks from "./Tasks";
import { postLogout } from "../api";
import { useAuth } from "../hooks/useAuth";

const Dashboard: React.FC = () => {
    const { setAuth } = useAuth() as any;
    const onLogout = async () => {
        try {
            await postLogout();
        } catch(ex) {
            console.log(ex)
        } finally {
            setAuth("");
        }
    }

    return (
        <Stack>
            <Button onClick={onLogout} sx={{ position: 'absolute', right: 0 }}>
                Logout
            </Button>
            <Tasks />
        </Stack>
    );
}

export default Dashboard;
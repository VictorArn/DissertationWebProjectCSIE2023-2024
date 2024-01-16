import { Box, Button, Dialog, DialogActions, DialogContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import { ChangeEvent, useEffect, useState } from "react";
import { SessionAttributes } from "../models/Session";
import { get, post, put } from "../api/Calls";
import { useNavigate, useParams } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';

export default function SessionEdit() {
    const [session, setSession] = useState<SessionAttributes>({
        SessionId: 0,
        SessionName: "",
        SessionStartDate: new Date(),
        SessionEndDate: new Date(),
        maxRequestsAllowed: 0,
        ProfessorId: 0,
    });

    const navigation = useNavigate();
    const { id } = useParams();
    const [isNewSession, setIsNewSession] = useState<boolean>(true);

    useEffect(() => {
        if (!id) return;
        get("/Session", id).then((r: SessionAttributes) => setSession(r));
    }, [id]);

    function onChangeSession(e: ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        const { name, value } = e.target;
        setSession(prevSession => ({ ...prevSession, [name]: value }));
    }

    async function saveSession() {
        try {
            if (!id) {
                await post("/Session", session);
            } else {
                await put("/Session", session.SessionId, session);
            }
            navigation("/Session");
        } catch (error) {
            console.error("Error saving session:", error);
        }
    }

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
        setSession({
            SessionId: 0,
            SessionName: "",
            SessionStartDate: new Date(),
            SessionEndDate: new Date(),
            maxRequestsAllowed: 0,
            ProfessorId: 0,
        });
        setIsNewSession(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch', marginTop: 8 },
            }}
            noValidate
        >
            <div>
                <TextField
                    label="Enter the session ID"
                    size="small"
                    value={session.SessionId}
                    onChange={onChangeSession}
                    name="SessionId"
                    variant="standard"
                    color="warning"
                    InputProps={{
                        startAdornment: (
                            <SearchIcon />
                        ),
                    }}
                />
            </div>

            {/* Add other fields for Session data */}

            <div>
                <Button
                    startIcon={<SaveIcon />}
                    variant="outlined"
                    color="warning"
                    style={{ marginRight: '8px', marginTop: '25px', marginBottom: '25px' }}
                    onClick={saveSession}
                >
                    Save
                </Button>
                <Button
                    startIcon={<CancelIcon />}
                    style={{ marginRight: '8px', marginTop: '25px', marginBottom: '25px' }}
                    variant="outlined"
                    color="warning"
                    onClick={() => navigation(-1)}
                >
                    Cancel
                </Button>
            </div>

            <div>
                <div>
                    <Button
                        startIcon={<AddCircleIcon />}
                        variant="contained"
                        color="warning"
                        onClick={handleClickOpen}
                    >
                        Add new Session
                    </Button>

                    <Dialog open={open} onClose={handleClose}>
                        <DialogContent>
                            <Box
                                component="form"
                                sx={{
                                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                                }}
                                noValidate
                            >
                                <TextField
    label="Enter Session ID"
    value={session.SessionId}
    onChange={onChangeSession}
    variant="standard"
    color="warning"
    name="SessionId"
/>

<TextField
    label="Enter Session Name"
    value={session.SessionName}
    onChange={onChangeSession}
    variant="standard"
    color="warning"
    name="SessionName"
/>

<TextField
    label="Enter Session Start Date"
    value={session.SessionStartDate}
    onChange={onChangeSession}
    variant="standard"
    color="warning"
    name="SessionStartDate"
/>

<TextField
    label="Enter Session End Date"
    value={session.SessionEndDate}
    onChange={onChangeSession}
    variant="standard"
    color="warning"
    name="SessionEndDate"
/>

<TextField
    label="Enter Max Requests Allowed"
    value={session.maxRequestsAllowed}
    onChange={onChangeSession}
    variant="standard"
    color="warning"
    name="maxRequestsAllowed"
/>

<TextField
    label="Enter Professor ID"
    value={session.ProfessorId}
    onChange={onChangeSession}
    variant="standard"
    color="warning"
    name="ProfessorId"
/>


                            </Box>

                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button onClick={saveSession}>Save</Button>
                        </DialogActions>
                    </Dialog>
                </div>

                <TableContainer>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Session Id</TableCell>
                                <TableCell>Session Name</TableCell>
                                <TableCell>Session Start Date</TableCell>
                                <TableCell>Session End Date</TableCell>
                                <TableCell>Max Requests Allowed</TableCell>
                                <TableCell>Professor ID</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>{session.SessionId}</TableCell>
                                <TableCell>{session.SessionName}</TableCell>
                                <TableCell>{new Date(session.SessionStartDate).toLocaleString()}</TableCell>
                                    <TableCell>{new Date(session.SessionEndDate).toLocaleString()}</TableCell>
                                <TableCell>{session.maxRequestsAllowed}</TableCell>
                                <TableCell>{session.ProfessorId}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>

            </div>
        </Box>
    );
}

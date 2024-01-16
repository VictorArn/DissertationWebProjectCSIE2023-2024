import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FilledTextFieldProps, InputAdornment, MenuItem, OutlinedTextFieldProps, Popover, Popper, StandardTextFieldProps, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, TextFieldVariants } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { ChangeEvent, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, SetStateAction, SyntheticEvent, useEffect, useState } from "react";
import { RequestAttributes} from "../models/Request";
import { useNavigate, useParams } from "react-router-dom";
import { get } from "lodash";
import { post, put, remove } from "../api/Calls";
import _ from "lodash";
import SaveIcon from '@mui/icons-material/Save';
import SearchIcon from '@mui/icons-material/Search';
import DatePicker from "@mui/lab/DatePicker";
import { JSX } from "react/jsx-runtime";



export default function RequestEdit() {


    const [Request, setRequest] = useState<RequestAttributes>({
        RequestId: 0,
        ProfessorId: 0,
        StudentId:0,
        RequestStatus:"",
        SignedDocument:"",
        Professors: []
    })

    // const [Request, setRequest] = useState<RequestAttributes>({
    //     RequestId: 0,
    //     RequestName: "",
    //     RequestStartDate: new Date(),
    //     RequestEndDate: new Date(),
    //     maxRequestsAllowed: 0,
    //     ProfessorId: 0
    // })

    const navigation = useNavigate();
    const { id } = useParams();

    const [isNewRequest, setIsNewRequest] = useState<boolean>(true);
    const [RequestIndex, setRequestIndex] = useState<number>(0);


    useEffect(() => {
        if (!id)
            return;
        //TREBUIE NULL??oup>)
        get("/Request",id).then((r: SetStateAction<RequestAttributes>) => setRequest(r));
        
    }, [])

    // useEffect(() => {
    //     if (!id) return;
      
    //     fetch(`/Request/${id}`)
    //       .then((response) => {
    //         if (!response.ok) {
    //           throw new Error(`Network response was not ok (${response.status} ${response.statusText})`);
    //         }
    //         return response.json();
    //       })
    //       .then((data) => {
    //         // Assuming the response data matches the Request type
    //         setRequest(data);
    //       })
    //       .catch((error) => {
    //         console.error('Error fetching data:', error);
    //         // Handle the error or set a default state for Request
    //         // setRequest(DEFAULT_Request_GROUP); // Replace with appropriate default state
    //       });
    //   }, [id]);


    function onChangeRequest(e: ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        
        // Destructure the event properties
        const { name, value } = e.target;

        // Update the specific property in the state
        setRequest(prevRequest => ({ ...prevRequest, [name]: value }));
    }
    // function onChangeRequest(e: ChangeEvent<HTMLInputElement>) {
    //     e.preventDefault();

    //     // if (e.target.name === "EmployeeAge")
    //     //     e.target.value = e.target.value.replace(/[^0-9]/g, '');

    //     setRequest({ ...Request, [e.target.name]: e.target.value });
    // }

    async function saveRequest() {
        try {
            if (!id) {
                await post("/Request", Request);
            }
            else {
                await put("/Request", Request.RequestId, Request);
            }
            navigation("/Request");
        } catch (error) {
            console.error("Error saving request:", error);
            
        }
    }

    // async function getRequest(request: RequestAttributes) {
    //     return (await get("/Request", request)) as RequestAttributes;
    //   }

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
        setRequest({
            RequestId: 0,
            ProfessorId: 0,
            StudentId:0,
            RequestStatus:"",
            SignedDocument:"",
            Professors: []
        })
        setIsNewRequest(true)
    };

    const handleClose = () => {
        setOpen(false);
    };

    // function saveRequest() {
    //     handleClose();
    //     if (isNewRequest) {
    //         const newRequest = _.cloneDeep(Request.Requests);
    //         newRequest.push(Request);
    //         setRequest({ ...Request, Requests: newRequest });
    //     }
    //     else {
    //         let newRequests = _.cloneDeep(Request.Requests);
    //         newRequests = newRequests.map((a: any, index: number) => (index === RequestIndex ? Request : a));
    //         setRequest({ ...Request, Requests: newRequests });
    //     }
    // }

    // function onChangeRequest(e: ChangeRequest<HTMLInputElement>) {
    //     e.prRequestDefault();
    //     setRequest({ ...Request, [e.target.name]: e.target.value });
    // }

    // async function deleteRequest(RequestId: number) {
    //     await remove("/Request", RequestId);
    //     let ret = await  get("/Request", id).then((r: SetStateAction<RequestAttributes>) => setRequest(r));
    // }

    // function editRequest(index: number) {
    //     setOpen(true);
    //     const currentRequest = Request.Requests[index];
    //     setRequest(currentRequest);
    //     setIsNewRequest(false);
    //     setRequestIndex(index);
    // }


    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch', marginTop: 8, },
            }}
            noValidate
        >
            <div>
                <TextField
                    label="Enter the request ID"
                    size="small"
                    value={Request.RequestId}
                    onChange={onChangeRequest}
                    name="Request ID"
                    variant="standard"
                    color="warning"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),

                    }}
                />
            </div>
            {/* <div>
                <TextField
                    label="EmployeeAge"
                    size="small"
                    value={employee.EmployeeAge}
                    onChange={onChangeEmployee}
                    name="EmployeeAge"
                    inputProps={{
                        inputMode: 'numeric',
                        pattern: '[0-9]*',
                    }}
                />
                <TextField
                    label="EmployeeOccupation"
                    size="small"
                    value={employee.EmployeeOccupation}
                    onChange={onChangeEmployee}
                    name="EmployeeOccupation"
                />
            </div>
            <div>
                <TextField
                    label="EmployeePhone"
                    size="small"
                    value={employee.EmployeePhone}
                    onChange={onChangeEmployee}
                    name="EmployeePhone"
                />
                <TextField
                    label="EmployeeEmail"
                    size="small"
                    value={employee.EmployeeEmail}
                    onChange={onChangeEmployee}
                    name="EmployeeEmail"
                />
            </div> */}

            <div>
                <Button
                    startIcon={<SaveIcon />}
                    variant="outlined"
                    color="warning"
                    style={{ marginRight: '8px', marginTop: '25px', marginBottom: '25px' }}
                    onClick={saveRequest}
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
                        Add new Request
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
                                    label="Enter Request Id"
                                    value={Request.RequestId}
                                    onChange={onChangeRequest}
                                    variant="standard"
                                    color="warning"
                                    name="RequestId"
                                />
                                <TextField
                                    label="Enter Request's professor ID"
                                    value={Request.ProfessorId}
                                    onChange={onChangeRequest}
                                    name="ProfessorId"
                                    color="warning"
                                    variant="standard"
                                />
                                 <TextField
                                    label="Enter Request's student ID"
                                    value={Request.StudentId}
                                    onChange={onChangeRequest}
                                    name="StudentId"
                                    color="warning"
                                    variant="standard"
                                />
                                <TextField
                                    label="Enter Request status"
                                    value={Request.RequestStatus}
                                    onChange={onChangeRequest}
                                    name="RequestStatus"
                                    variant="standard"
                                    color="warning"
                                />




                                {/* 
                                <TextField
                                    label="Enter Request status"
                                    value={Request.RequestStatus}
                                    onChange={onChangeRequest}
                                    name="RequestStatus"
                                    variant="standard"
                                    color="warning"
                                /> */}

                                <TextField
                                    label="Enter Signed Document Name"
                                    value={Request.SignedDocument}
                                    onChange={onChangeRequest}
                                    name="SignedDocument"
                                    variant="standard"
                                    color="warning"
                                />
                                


                                {/* <TextField
                                    label="Enter Request access code"
                                    value={Request.RequestAccessCode}
                                    onChange={onChangeRequest}
                                    name="RequestAccessCode"
                                    variant="standard"
                                    color="warning"
                                /> */}
                            </Box>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button onClick={saveRequest}>Save</Button>
                        </DialogActions>
                    </Dialog>
                </div>

                <TableContainer>
  <Table aria-label="simple table">
    <TableHead>
      <TableRow>
        <TableCell>Request Id</TableCell>
        <TableCell>Professor ID</TableCell>
        <TableCell>Student Id</TableCell>
        <TableCell>RequestStatus</TableCell>
        <TableCell>Signed Document</TableCell>
        <TableCell>Edit</TableCell>
        <TableCell>Delete</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      
      <TableRow>
        <TableCell>{Request.RequestId}</TableCell>
        <TableCell>{Request.ProfessorId}</TableCell>
        <TableCell>{Request.StudentId}</TableCell>
        <TableCell>{Request.RequestStatus}</TableCell>
        <TableCell>{Request.SignedDocument}</TableCell>
       {/* <TableCell>
           <Button startIcon={<EditIcon />} color="success" onClick={editRequest} />
        </TableCell>
        <TableCell>
          <Button startIcon={<CancelIcon />} color="error" onClick={deleteRequest} />
        </TableCell> */}
      </TableRow>
    </TableBody>
  </Table>
</TableContainer>

            </div>
        </Box>
    );
}

// function useState<T>(arg0: { GroupId: number; GroupName: string;  Requests: never[]; }): [any, any] {
//     throw new Error("Function not implemented.");
// }
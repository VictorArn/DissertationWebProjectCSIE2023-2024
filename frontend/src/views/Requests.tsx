import { ChangeEvent, useEffect, useState } from "react";
import { get, remove } from "../api/Calls";
import { PaginationResponse } from "../models/PaginationResponse";
import { RequestAttributes } from "../models/Request";
import { RequestFilterDto } from "../models/RequestFilterDto";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TablePaginationActions from "../components/TablePaginationAction";
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ClearIcon from '@mui/icons-material/Clear';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import TablePaginationAction from "../components/TablePaginationAction";

export default function RequestList() {
  const [requests, setRequests] = useState<PaginationResponse<RequestAttributes>>({ count: 0, rows: [] });
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [requestFilter, setRequestFilter] = useState<RequestFilterDto>({
    RequestId: 0,
    take: 5,
    skip: 0
  });
  const navigate = useNavigate();

  useEffect(() => {
    getRequests(requestFilter).then(d => {
      setRequests(d);
    });
  }, []);

  async function getRequests(requestFilter: RequestFilterDto) {
    return (await get("/Requests", requestFilter)) as PaginationResponse<RequestAttributes>;
  }

  function newRequest() {
    navigate("/NewRequest");
  }

  const handleChangePage = async (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
    let newFilter = _.cloneDeep(requestFilter);
    newFilter.skip = newPage;
    await filter(newFilter);
    setRequestFilter(newFilter);
  };

  const handleChangeRowsPerPage = async (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    let take = parseInt(event.target.value, 10);
    setRowsPerPage(take);
    setPage(0);

    let newFilter = _.cloneDeep(requestFilter);
    newFilter.take = take;
    newFilter.skip = 0;
    await filter(newFilter);
    setRequestFilter(newFilter);
  };

  async function filter(filter: RequestFilterDto) {
    let filterRequests = await getRequests(filter);
    setRequests(filterRequests);
  }

  function onChangeFilter(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setRequestFilter({ ...requestFilter, [e.target.name]: e.target.value });
  }

  async function filterRequests() {
    setPage(0);
    let requestFilterCopy = _.cloneDeep(requestFilter);
    requestFilterCopy.skip = 0;
    filter(requestFilterCopy);
  }

  async function clearFilters() {
    let newFilter = { RequestId: 0, skip: 0, take: 5 };
    setPage(0);
    setRowsPerPage(5);
    setRequestFilter(newFilter);
    filter(newFilter);
  }

  function editRequest(RequestId: number) {
    // Adjust the route as needed
    navigate(`/EditRequest/${RequestId}`);
  }

  async function deleteRequest(RequestId: number) {
    await remove("/Request", RequestId);
    let updatedRequests = await getRequests(requestFilter);
    setRequests(updatedRequests);
  }

  return (
    <div>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        style={{ marginBottom: '30px', marginTop: '50px' }}
      >
        <div>
          <TextField
            id="input-with-icon-textfield"
            label="Search by Request Id"
            value={requestFilter.RequestId}
            onChange={onChangeFilter}
            name="RequestId"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            variant="standard"
            color="warning"
          />
        </div>

        <div>
          <Button
            color="warning"
            style={{ marginRight: '8px' }}
            startIcon={<FilterAltIcon />}
            variant="contained"
            onClick={filterRequests}
          >
            Filter
          </Button>

          <Button
            color="warning"
            startIcon={<ClearIcon />}
            variant="contained"
            onClick={clearFilters}
          >
            Clear Filters
          </Button>
        </div>
      </Box>

      <Button
        color="warning"
        style={{ marginBottom: '20px' }}
        variant="contained"
        startIcon={<AddCircleIcon />}
        onClick={newRequest}
      >
        Add Request
      </Button>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell>Group Id</TableCell>
              <TableCell>Group name</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.rows.map((row) => (
              <TableRow key={row.RequestId}>
                <TableCell align="left">{row.RequestId}</TableCell>
                <TableCell align="left">{row.RequestStatus}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    startIcon={<BorderColorIcon />}
                    color="warning"
                    onClick={() => editRequest(row.RequestId)}
                  >
                    Edit
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                    color="warning"
                    onClick={() => deleteRequest(row.RequestId)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={3}
                count={requests.count}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
}

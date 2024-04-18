import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import dayjs from 'dayjs';
import Swal from "sweetalert2";
import './App.css'


import * as service from "../src/service";





function App() {
  const [open, setOpen] = useState(false);
  const [openedit, setOpenedit] = useState(false);
  const [firstName, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [nickname, setNickname] = useState('');
  const [birthday, setBirthday] = useState('');
  const [age, setAge] = useState('');
  const [sex, setSex] = useState('');
  const [updatefirstName, setUpdateFirstname] = useState('');
  const [updatelastname, setUpdateLastname] = useState('');
  const [updatenickname, setUpdateNickname] = useState('');
  const [updatebirthday, setUpdateBirthday] = useState('');
  const [updateage, setUpdateAge] = useState('');
  const [updatesex, setUpdateSex] = useState('');
  const [rows, setRows] = useState('');
  const [rowsedit, setRowsedit] = useState('');
  const [editedRows, setEditedRows] = useState(rowsedit);


  console.log("editedRows", rowsedit[0]?.sex);


  const handleClickdelete = async (row_id, firstname,lastname) => {
    console.log("row_id:", row_id);
    console.log("firstname:", firstname);
    console.log("lastname:", lastname);
    const result = await Swal.fire({
      title: `Do you want to Delete User ${firstname} ${lastname} ?`,
      showCancelButton: true,
      confirmButtonText: "Submit",
      denyButtonText: "Don't save",
      customClass: {
        confirmButton: "your-custom-confirm-class",
        cancelButton: "your-custom-cancel-class",
      },
   });

    if (result.isConfirmed) {
      const response = await service.DeleteUser(row_id);

      if (response) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          // text: "Delete User Success",
          text: "Delete User successfully",
          timer: 1000,
        });

        setTimeout(() => {
          window.location.reload(); // รีโหลดหน้าเว็บหลังจากการลบผู้ใช้
        }, 1000);
      }
    } else if (result.isDenied) {
      Swal.fire("Changes are not saved", "", "info");
    }

 };

  const handleClickOpen = (row_id) => {
    console.log("row_id:" ,row_id);
    setOpen(true);
  };

  const handleClickOpenedit = (row_id) => {
    console.log("row_idedit:" ,row_id);
    setOpenedit(true);

    try {
      service.SelectUser(row_id).then((res) => {
        console.log("return from serivce", res.data);

        const rowsWithIdedit = res.data.map((row, index) => ({
          ...row,
          id: row.id || index,
          firstName: firstName
        }));
        setRowsedit(rowsWithIdedit);

      });
    } catch (error) {
      console.error(error);
    }
  };
  console.log("Select RowEdit ===>",rowsedit);

  const handleClose = () => {
    setOpen(false);
    setOpenedit(false);
  };

  const handlebirthday = (date) => {
    const formattedDate = dayjs(date).format('DD/MM/YYYY');
    setBirthday(formattedDate);
  };
  const handlebirthdayupdate = (date) => {
    const formattedDate = dayjs(date).format('DD/MM/YYYY');
    setUpdateBirthday(formattedDate);
  };


  const Approved = async () => {
    if (firstName === '' ) {
      alert("กรุณากรอกชื่อจริง");
    } else if (lastname === '') {
      alert("กรุณากรอกนามสกุล");
    } else if (nickname === '') {
      alert("กรุณากรอกชื่อเล่น"); 
    } else if (birthday === '') {
        alert("กรุณากรอกวันเดือนปีเกิด");
    } else if (age === '') {
        alert("กรุณากรอกอายุ");
    } else if (sex === '') {
        alert("กรุณาเลือกเพศ");
    } else {
      console.log("Firstname =>", firstName);
      console.log("Lastname =>", lastname);
      console.log("nickname =>", nickname);
      console.log("Birthday =>", birthday);
      console.log("Age =>", age);
      console.log("Sex =>", sex);

      // ----------------------------------------
      setOpen(false);

      const result = await Swal.fire({
        title: "Do you want to Add New User?",
        showCancelButton: true,
        confirmButtonText: "Submit",
        denyButtonText: "Don't save",
        customClass: {
          confirmButton: "your-custom-confirm-class",
          cancelButton: "your-custom-cancel-class",
        },
      });

      if (result.isConfirmed) {
          const response = await service.Newuser(
            firstName,
            lastname,
            nickname,
            birthday,
            age,
            sex
        );

        if (result.isConfirmed) {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "Add new User Success",
            timer: 1000,
          });

          setTimeout(() => {
            window.location.href = "/";
          }, 1000);
          // setLoading(false);
        }
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    } 
    };

    
  const ApprovedUpdate = async (row_id) => {
    if (updatefirstName === '' ) {
      alert("กรุณากรอกชื่อจริง");
    } else if (updatelastname === '') {
      alert("กรุณากรอกนามสกุล");
    } else if (updatenickname === '') {
      alert("กรุณากรอกชื่อเล่น"); 
    } else if (updatebirthday === '') {
        alert("กรุณากรอกวันเดือนปีเกิด");
    } else if (updateage === '') {
        alert("กรุณากรอกอายุ");
    } else if (updatesex === '') {
        alert("กรุณาเลือกเพศ");
    } else {
      
      console.log("row_id =>", row_id);
      console.log("UpdateFirstname =>", updatefirstName);
      console.log("UpdateLastname =>", updatelastname);
      console.log("Updatenickname =>", updatenickname);
      console.log("UpdateBirthday =>", updatebirthday);
      console.log("UpdateAge =>", updateage);
      console.log("UpdateSex =>", updatesex);

      // ----------------------------------------
      setOpenedit (false);

      const result = await Swal.fire({
        title: "Do you want to Update ?",
        showCancelButton: true,
        confirmButtonText: "Submit",
        denyButtonText: "Don't save",
        customClass: {
          confirmButton: "your-custom-confirm-class",
          cancelButton: "your-custom-cancel-class",
        },
      });

      if (result.isConfirmed) {
          const response = await service.Updateuser(
            row_id,
            updatefirstName,
            updatelastname,
            updatenickname,
            updatebirthday,
            updateage,
            updatesex
        );

        if (result.isConfirmed) {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "Update User Success",
            timer: 1000,
          });

          setTimeout(() => {
            window.location.href = "/";
          }, 1000);
          // setLoading(false);
        }
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    } 
    };
  


  const fetchData = async () => {
    try {
      service.User().then((res) => {
        console.log("return from serivce", res.data);

        const rowsWithId = res.data.map((row, index) => ({
          ...row,
          id: row.id || index,
        }));
        setRows(rowsWithId);
      
      });
    } catch (error) {
      console.error(error);
    }
  };
  const fetchDataUser = async () => {

  };
  console.log("row", rows);
  
  
  useEffect(() => {
    fetchData();
  }, []);




  const columns = [
    {
      field: '',
      headerName: '',
      width: 90,
      // valueGetter: (params) => params.row + 1,
      headerClassName: "grid-header-select-id",
    },
    {
      field: 'firstname',
      headerName: 'ชื่อจริง',
      width: 150,
      editable: true,
      headerClassName: "grid-header-select-username",

    },
    {
      field: 'lastname',
      headerName: 'นามสกุล',
      width: 150,
      editable: true,
      headerClassName: "grid-header-select-lastname",
    },
    {
      field: 'nickname',
      headerName: 'ชื่อเล่น',
      width: 150,
      editable: true,
      headerClassName: "grid-header-select-lastname",
    },
    {
      field: 'birthday',
      headerName: 'วันเดือนปีเกิด',
      width: 150,
      editable: true,
      headerClassName: "grid-header-select-lastname",
    },
    {
      field: 'age',
      headerName: 'อายุ',
      type: 'number',
      width: 110,
      editable: true,
      headerClassName: "grid-header-select-sex",
      cellClassName: "grid-cell-select-approved",
    },
    {
      field: 'sex',
      headerName: 'เพศ',
      type: 'number',
      width: 150,
      editable: true,
      headerClassName: "grid-header-select-sex",
      cellClassName: "grid-cell-select-approved",


    },
    {
      field: 'Update',
      headerName: '',
      type: 'number',
      width: 110,
      headerClassName: "grid-header-select-sex",
      renderCell: (params) => (
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#3498DB",
            color: "white",
            fontFamily: 'Prompt, sans-serif', 


            "&:hover": {
              backgroundColor: "#3498DB",
              color: "white",

            },
            width: 100,
            height: 30,
            fontSize: 14,
            borderRadius: "10px",
            padding: "8px 16px",
          }}
        onClick={() => handleClickOpenedit(params.row.row_id)}
        // disabled={loading[params.row.Order_id]}
        >
          แก้ไข
        </Button>
      ),
    },
    {
      field: 'Delete',
      headerName: '',
      type: 'number',
      width: 137,
      headerClassName: "grid-header-select-delete",
      renderCell: (params) => (
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#F1948A",
            color: "white",
            fontFamily: 'Prompt, sans-serif', 


            "&:hover": {
              backgroundColor: "#F1948A",
              color: "white",

            },
            width: 100,
            height: 30,
            fontSize: 14,
            borderRadius: "10px",
            padding: "8px 16px",
          }}
          onClick={() => handleClickdelete(params.row.row_id, params.row.firstname, params.row.lastname)}
          // onClick={() => handleClick(params.row.firstname)}


        >
          ลบ
        </Button>
      ),
    },

  ];




  return (
    <>
      <Box
       sx={{
        display:'flex',
        justifyContent:'flex-end',
          
      }}
      >
        <Button
         onClick={handleClickOpen}
         sx={{
           background: "#41B06E",
            borderRadius:'10px',
            fontFamily: 'Prompt, sans-serif', 
            color:'white',
           "&:hover": {
             backgroundColor: "#8DECB4 ",
           },
        }}
        >
        เพิ่ม
        </Button>
      </Box>
   
      <Box sx={{ height: 400, width: '1200px',background:'white',marginTop:'20px' }}>
      
        <DataGrid
        sx={{
            "& .grid-header-select-id": {
           
              fontSize: "16px",
              backgroundColor: "#E3F3FE",
              color: "#181846",
              justifyContent: "center",
            
            },
            "& .grid-header-select-username": {
    
              fontSize: "16px",
              backgroundColor: "#E3F3FE",
              color: "#181846",
              justifyContent: "center",
            
            },
            "& .grid-header-select-lastname": {
            
              fontSize: "16px",
              backgroundColor: "#E3F3FE",
              color: "#181846",
              justifyContent: "center",
              width:'100px'
            },
            "& .grid-header-select-sex": {
              paddingRight: '50px',

              fontSize: "16px",
              backgroundColor: "#E3F3FE",
              color: "#181846",
              justifyContent: "center",
              width:'100px'
            },
            "& .grid-header-select-delete": {
              paddingRight: '50px',

              fontSize: "16px",
              backgroundColor: "#E3F3FE",
              color: "#181846",
              justifyContent: "center",
              width:'1200px'
            },
            "& .grid-cell-select-approved": {
              paddingRight:'50px',
              fontSize: "16px",
           
              color: "#181846",
              justifyContent: "center",
              width:'100px'
            },
        }}
          rows={rows}
          columns={columns}

          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
        />
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle sx={{ fontFamily: 'Prompt, sans-serif' }} id="alert-dialog-title">
          {"เพิ่มข้อมูล"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ fontFamily: 'Prompt, sans-serif' }} id="alert-dialog-description">
            <Box
            sx={{
              padding:'10px',
              display:'flex',
              justifyContent:'space-around',
              marginLeft:'10px',
          }}  
            >
              <TextField 
              id="outlined-basic" 
              label="ชื่อจริง" 
              variant="outlined" 
                required
                InputProps={{ style: { fontFamily: 'Prompt, sans-serif' } }}
                sx={{ '& label': { fontFamily: 'Prompt, sans-serif' } ,
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderRadius: "7px",
                  },
}}
                onChange={(event) => setFirstname(event.target.value)}

              />

              <TextField
              
                id="outlined-basic" 
                label="นามสกุล" 
                variant="outlined" 
                required
                InputProps={{ style: { fontFamily: 'Prompt, sans-serif' } }}
                sx={{
                  marginLeft: '10px' ,
                  '& label': { fontFamily: 'Prompt, sans-serif' },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderRadius: "7px",
                  },
                }}
                  
                //  onChange={handlelastname}
                onChange={(event) => setLastname(event.target.value)}

              />

            </Box>
            <Box
            sx={{
              padding:'10px',
              display:'flex',
              justifyContent:'space-around',
              marginLeft:'10px'
          }}  
            >
              <TextField 
              id="outlined-basic" 
              label="ชื่อเล่น" 
              variant="outlined" 
                required
                InputProps={{ style: { fontFamily: 'Prompt, sans-serif' } }}
                sx={{
                  '& label': { fontFamily: 'Prompt, sans-serif' },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderRadius: "7px",
                  },
                  width:'245px',
                  marginRight: '40px'
                }}
                // onChange={handlenickname}
                onChange={(event) => setNickname(event.target.value)}


              />

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  InputProps={{ style: { fontFamily: 'Prompt, sans-serif' } }}
                 sx={{
                  marginLeft:'-35px',
                   width:'240px',
                    '& label': { fontFamily: 'Prompt, sans-serif' },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderRadius: "7px",
                    },
                }} 
                  onChange={handlebirthday}
                />
              </LocalizationProvider>
            </Box>
            <Box
            sx={{
              padding:'10px',
              display:'flex',
              justifyContent:'space-around',
              marginLeft:'10px'
          }}  
            >
              <TextField 
              id="outlined-basic" 
              label="อายุ"
              type='number' 
              variant="outlined" 
                required
                InputProps={{ style: { fontFamily: 'Prompt, sans-serif' } }}
                sx={{
                  '& label': { fontFamily: 'Prompt, sans-serif' },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderRadius: "7px",
                  },
                  width: '245px',
                  marginRight: '10px'
                }}
             
                onChange={(event) => setAge(event.target.value)}


              />
              <Box>
                <FormControl fullWidth>
                  <InputLabel
                    sx={{ fontFamily: 'Prompt, sans-serif' }}
                  id="demo-simple-select-label">เพศ</InputLabel>
                  <Select
                
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={sex}
                    label="เพศ"
                    required
                    sx={{
                      width: '240px',
                      fontFamily: 'Prompt, sans-serif',
                      '& label': { fontFamily: 'Prompt, sans-serif' },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderRadius: "7px",
                      },
                     
                      // marginRight: '30px'
                    }}
                    onChange={(event) => setSex(event.target.value)}

                  >
                    <MenuItem
                      sx={{ fontFamily: 'Prompt, sans-serif' }}
                    value="ชาย">ชาย</MenuItem>
                    <MenuItem 
                      sx={{ fontFamily: 'Prompt, sans-serif' }}
                    value="หญิง">หญิง</MenuItem>
                    <MenuItem 
                      sx={{ fontFamily: 'Prompt, sans-serif' }} 
                    value="อื่นๆ">อื่นๆ</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
       
           
           
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button sx={{ fontFamily: 'Prompt, sans-serif' }} onClick={handleClose}>ยกเลิก</Button>
          <Button sx={{ fontFamily: 'Prompt, sans-serif' }} onClick={Approved} autoFocus>
            ยืนยัน
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openedit}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle sx={{ fontFamily: 'Prompt, sans-serif' }} id="alert-dialog-title">
          {"แก้ไขข้อมูล"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            
            <Box
              sx={{
                padding: '10px',
                display: 'flex',
                justifyContent: 'space-around',
                marginLeft: '10px'
              }}
            >
              <TextField
                id="outlined-basic"
                // label="ชื่อจริง"
                value={rowsedit[0]?.firstname}
                variant="outlined"
                required
                InputProps={{ style: { fontFamily: 'Prompt, sans-serif' } }}
              
                sx={{
                  width: '240px',

                  '& label': { fontFamily: 'Prompt, sans-serif' },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderRadius: "7px",
                  },

                  // marginRight: '30px'
                }}
                // onChange={handlefirstname}
                onChange={(event) => setFirstname(event.target.value)}

              />

              <TextField
                
                id="outlined-basic"
                // label="นามสกุล"
                value={rowsedit[0]?.lastname}
                variant="outlined"
                required
                InputProps={{ style: { fontFamily: 'Prompt, sans-serif' } }}

                sx={{
                  marginLeft: '10px',
                  width: '240px',

                  '& label': { fontFamily: 'Prompt, sans-serif' },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderRadius: "7px",
                  },

                  // marginRight: '30px'
                }}
                //  onChange={handlelastname}
                onChange={(event) => setLastname(event.target.value)}

              />

            </Box>
            <Box
              sx={{
                padding: '10px',
                display: 'flex',
                justifyContent: 'space-around',
                marginLeft: '10px'
              }}
            >
              <TextField
                id="outlined-basic"
                // label="ชื่อเล่น"
                value={rowsedit[0]?.nickname}
                variant="outlined"
                required
                InputProps={{ style: { fontFamily: 'Prompt, sans-serif' } }}

                sx={{
                  // marginLeft: '10px',
                  width: '240px',

                  '& label': { fontFamily: 'Prompt, sans-serif' },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderRadius: "7px",
                  },

                  marginRight: '10px'
                }}
                // onChange={handlenickname}
                onChange={(event) => setNickname(event.target.value)}


              />

              <TextField
                id="outlined-basic"
                // label="ชื่อเล่น"
                value={rowsedit[0]?.birthday}
                variant="outlined"
                required
                InputProps={{ style: { fontFamily: 'Prompt, sans-serif' } }}

                sx={{
                  // marginLeft: '10px',
                  width: '240px',

                  '& label': { fontFamily: 'Prompt, sans-serif' },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderRadius: "7px",
                  },

                  // marginRight: '30px'
                }}
                // onChange={handlenickname}
              


              />
            </Box>
            <Box
              sx={{
                padding: '10px',
                display: 'flex',
                justifyContent: 'space-around',
                marginLeft: '10px'
              }}
            >
              <TextField
               id= "age"
              
                value={rowsedit[0]?.age}
                variant="outlined"
                required
                InputProps={{ style: { fontFamily: 'Prompt, sans-serif' } }}

                sx={{
                  // marginLeft: '5px',
                  width: '240px',

                  '& label': { fontFamily: 'Prompt, sans-serif' },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderRadius: "7px",
                  },

                  marginRight: '10px'
                }}

                onChange={(event) => setAge(event.target.value)}


              />
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  {/* <InputLabel id="demo-simple-select-label">เพศ</InputLabel> */}
                  <TextField
                    id="sex"
                    value={rowsedit[0]?.sex}
                    variant="outlined"
                    required
                    InputProps={{ style: { fontFamily: 'Prompt, sans-serif' } }}

                    sx={{
                      // marginLeft: '10px',
                      width: '240px',

                      '& label': { fontFamily: 'Prompt, sans-serif' },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderRadius: "7px",
                      },

                      // marginRight: '30px'
                    }}

                    // onChange={(event) => setAge(event.target.value)}


                  />
                </FormControl>
              </Box>
            </Box>

            <Box
              sx={{
                padding: '10px',
                display: 'flex',
                justifyContent: 'space-around',
                marginLeft: '10px'
              }}
            >
              <TextField
                id="outlined-basic"
                label="ชื่อจริง"
                // value={rowsedit[0]?.firstname}
                variant="outlined"
                required
                InputProps={{ style: { fontFamily: 'Prompt, sans-serif' } }}
                sx={{
                  // marginLeft: '10px',
                  width: '240px',

                  '& label': { fontFamily: 'Prompt, sans-serif' },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderRadius: "7px",
                  },

                  // marginRight: '30px'
                }}

                // onChange={handlefirstname}
                onChange={(event) => setUpdateFirstname(event.target.value)}

              />

              <TextField
               
                id="outlined-basic"
                label="นามสกุล"
                variant="outlined"
                required
                InputProps={{ style: { fontFamily: 'Prompt, sans-serif' } }}

                sx={{
                  // marginLeft: '10px',
                  width: '240px',

                  '& label': { fontFamily: 'Prompt, sans-serif' },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderRadius: "7px",
                  },

                  marginLeft: '10px'
                }}
                //  onChange={handlelastname}
                onChange={(event) => setUpdateLastname(event.target.value)}

              />

            </Box>
            <Box
              sx={{
                padding: '10px',
                display: 'flex',
                justifyContent: 'space-around',
                marginLeft: '10px'
              }}
            >
              <TextField
                id="outlined-basic"
                label="ชื่อเล่น"
                variant="outlined"
                required
                InputProps={{ style: { fontFamily: 'Prompt, sans-serif' } }}

                sx={{
                  // marginLeft: '10px',
                  width: '240px',

                  '& label': { fontFamily: 'Prompt, sans-serif' },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderRadius: "7px",
                  },

                  // marginLeft: '10px'
                }}
                // onChange={handlenickname}
                onChange={(event) => setUpdateNickname(event.target.value)}


              />

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                //  sx={{ marginLeft: '10px', width: '210px' }}
                  InputProps={{ style: { fontFamily: 'Prompt, sans-serif' } }}
                  sx={{
                    marginLeft: '10px',
                    width: '240px',
                    '& label': { fontFamily: 'Prompt, sans-serif' },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderRadius: "7px",
                    },
                  }} 
                  onChange={handlebirthdayupdate}
                />
              </LocalizationProvider>
            </Box>
            <Box
              sx={{
                padding: '10px',
                display: 'flex',
                justifyContent: 'space-around',
                marginLeft: '10px'
              }}
            >
              <TextField
                id="outlined-basic"
                label="อายุ"
                variant="outlined"
                required
                InputProps={{ style: { fontFamily: 'Prompt, sans-serif' } }}

                sx={{
                  // marginLeft: '0px',
                  width: '240px',

                  '& label': { fontFamily: 'Prompt, sans-serif' },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderRadius: "7px",
                  },

                  // marginLeft: '-30px'
                }}

                onChange={(event) => setUpdateAge(event.target.value)}


              />
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel 
                  sx={{
                    fontFamily: 'Prompt, sans-serif',
                  }} 
                  id="demo-simple-select-label">เพศ</InputLabel>
                  <Select
                    
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={updatesex}
                    label="เพศ"
                    required
                    sx={{
                      width: '240px',
                      fontFamily: 'Prompt, sans-serif',
                      '& label': { fontFamily: 'Prompt, sans-serif' },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderRadius: "7px",
                      },

                      marginRight: '-5px'
                    }}
                    onChange={(event) => setUpdateSex(event.target.value)}

                  >
                    <MenuItem
                     sx={{
                      fontFamily: 'Prompt, sans-serif',
                    }} 
                    value="ชาย">ชาย</MenuItem>
                    <MenuItem
                      sx={{
                        fontFamily: 'Prompt, sans-serif',
                      }} 
                      value="หญิง">หญิง</MenuItem>
                    <MenuItem
                      sx={{
                        fontFamily: 'Prompt, sans-serif',
                      }} 
                      value="อื่นๆ">อื่นๆ</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>


          </DialogContentText>

          </DialogContent>
          <DialogActions>
          <Button 
            sx={{
              fontFamily: 'Prompt, sans-serif',
            }} 
          onClick={handleClose}>ยกเลิก</Button>
          <Button 
            sx={{
              fontFamily: 'Prompt, sans-serif',
            }} 
          onClick={() => ApprovedUpdate(rowsedit[0]?.row_id)} autoFocus>
            ยืนยัน
          </Button>
       
        </DialogActions>
      </Dialog>
      </>
    )
}

export default App

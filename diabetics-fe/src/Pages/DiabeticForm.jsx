
import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { NumericFormat, } from 'react-number-format';
import instance from '../Utils/axiosInterceptors';
import { Button, TextField, Box, Grid, } from '@mui/material';
import moment from 'moment/moment';
export default function DiabeticForm(props) {
  const userId = JSON.parse(localStorage.getItem("id"));

  const validationSchema = yup.object({
    date: yup.string()
      .required('This field is required'),
  })

  const editDiabetes = props.editDiabete || [];
  const editTrue = props.editTrue;


  const submit = async (values) => {
    let data = {};
    data.date = values.date;
    data.timeBeforBf = values.timeBeforeBf;
    data.suguarlevelBeforeBf = Number(values.suguarlevelBeforeBf);
    data.breakfastTime = values.breakfastTime;
    data.breakfastFood = values.breakfastFood;
    data.lunchTime = values.lunchTime;
    data.lunchFood = values.lunchFood;
    data.dinnerTime = values.dinnerTime;
    data.dinnerFood = values.dinnerFood;
    data.timeAfter2hrDinner = values.timeAfter2hrDinner;
    data.sugarLevelAfter2hrDinner = values.sugarLevelAfter2hrDinner;
    data.userId = userId;
    if (editTrue) {
      await instance({
        method: "PUT",
        url: `diabetics/${editDiabetes._id}`,
        data,
      }).then((resp) => {
        props.hideBlock();
        props.getData();
      })
    }
    else {
      await instance({
        method: 'POST',
        url: "diabetics",
        data,
      }).then((resp) => {
        props.hideBlock();
        props.getData();
      })
    }
  }
  return (
    <Grid>
      <Box
        sx={{
          my: 4,
          mx: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: "center"
        }}
      >

        <div>
          <Formik enableReinitialize={true} initialValues={{
            date: editDiabetes && editDiabetes.date ? moment(editDiabetes.date).format('MM-DD-YYYY') : "",
            timeBeforeBf: editDiabetes && editDiabetes.timeBeforBf ? editDiabetes.timeBeforBf : "",
            suguarlevelBeforeBf: editDiabetes && editDiabetes.suguarlevelBeforeBf ? editDiabetes.suguarlevelBeforeBf : "",
            breakfastTime: editDiabetes && editDiabetes.breakfastTime ? editDiabetes.breakfastTime : "",
            breakfastFood: editDiabetes && editDiabetes.breakfastFood ? editDiabetes.breakfastFood : "",
            lunchTime: editDiabetes && editDiabetes.lunchTime ? editDiabetes.lunchTime : "",
            lunchFood: editDiabetes && editDiabetes.lunchFood ? editDiabetes.lunchFood : "",
            dinnerTime: editDiabetes && editDiabetes.dinnerTime ? editDiabetes.dinnerTime : "",
            dinnerFood: editDiabetes && editDiabetes.dinnerFood ? editDiabetes.dinnerFood : "",
            timeAfter2hrDinner: editDiabetes && editDiabetes.timeAfter2hrDinner ? editDiabetes.timeAfter2hrDinner : "",
            sugarLevelAfter2hrDinner: editDiabetes && editDiabetes.sugarLevelAfter2hrDinner ? editDiabetes.sugarLevelAfter2hrDinner : ""

          }} onSubmit={submit} validationSchema={validationSchema}>
            {formik => (
              <form onSubmit={formik.handleSubmit} >
                <Grid container spacing={2} style={{ justifyContent: "center" }}>
                  <Grid item md={6} sm={12} xs={12}>
                    {editTrue ?
                      <TextField fullWidth disabled aria-readonly value={moment(editDiabetes.date).format('MM-DD-YYYY') || ""} />
                      :
                      <TextField
                        id="date"
                        type="date"
                        fullWidth
                        name="date"
                        label="Enter Date "
                        margin="normal"
                        size='small'
                        autoFocus
                        value={formik.values.date}
                        onChange={formik.handleChange}
                        error={formik.touched.date && Boolean(formik.errors.date)}
                        helperText={formik.touched.date && formik.errors.date}
                        InputLabelProps={{ style: { fontSize: 14 }, shrink: true }}
                        inputProps={{
                          style: {
                            height: "34px",
                            fontSize: "14px",
                          },
                        }}

                      />}
                  </Grid>
                  <Grid item md={6} sm={12} xs={12}>
                    <TextField
                      fullWidth
                      id="timeBeforeBf"
                      name="timeBeforeBf"
                      label="Enter Time Before BreakFast(Am)"
                      margin="normal"
                      size='small'
                      type="time"
                      value={formik.values.timeBeforeBf}
                      onChange={formik.handleChange}
                      InputLabelProps={{ style: { fontSize: 14 }, shrink: true }}
                      inputProps={{
                        style: {
                          height: "34px",
                          fontSize: "14px",
                        },
                      }}
                    />
                  </Grid>
                  <Grid item md={6} sm={12} xs={12}>
                    <NumericFormat
                      fullWidth
                      id="suguarlevelBeforeBf"
                      name="suguarlevelBeforeBf"
                      label="Enter Suguar level Before BreakFast(Am)"
                      margin="normal"
                      value={formik.values.suguarlevelBeforeBf ? (Number(formik.values.suguarlevelBeforeBf)) : formik.values.suguarlevelBeforeBf}
                      onValueChange={(values) => {
                        const { value } = values;
                        formik.setFieldValue('suguarlevelBeforeBf', value);
                      }}
                      InputLabelProps={{ style: { fontSize: 14 }, shrink: true }}
                      inputProps={{
                        style: {
                          height: "34px",
                          fontSize: "14px",
                        },
                      }}
                      size='small' customInput={TextField} variant='outlined' />
                  </Grid>

                  <Grid item md={6} sm={12} xs={12}>
                    <TextField
                      fullWidth
                      id="breakfastTime"
                      name="breakfastTime"
                      label="Enter Breakfast Time"
                      margin="normal"
                      size='small'
                      type="time"
                      value={formik.values.breakfastTime}
                      onChange={formik.handleChange}
                      InputLabelProps={{ style: { fontSize: 14 }, shrink: true }}
                      inputProps={{
                        style: {
                          height: "34px",
                          fontSize: "14px",
                        },
                      }}
                    />
                  </Grid>
                  <Grid item md={6} sm={12} xs={12}>
                    <TextField
                      fullWidth
                      id="breakfastFood"
                      name="breakfastFood"
                      label="Enter Breakfast Food"
                      margin="normal"
                      size='small'
                      value={formik.values.breakfastFood}
                      onChange={formik.handleChange}
                      InputLabelProps={{ style: { fontSize: 14 }, shrink: true }}
                      inputProps={{
                        style: {
                          height: "34px",
                          fontSize: "14px",
                        },
                      }}
                    />
                  </Grid>
                  <Grid item md={6} sm={12} xs={12}>
                    <TextField
                      fullWidth
                      id="lunchTime"
                      name="lunchTime"
                      label="Enter Lunch Time"
                      margin="normal"
                      size='small'
                      type="time"
                      value={formik.values.lunchTime}
                      onChange={formik.handleChange}
                      InputLabelProps={{ style: { fontSize: 14 }, shrink: true }}
                      inputProps={{
                        style: {
                          height: "34px",
                          fontSize: "14px",
                        },
                      }}
                    />
                  </Grid>
                  <Grid item md={6} sm={12} xs={12}>
                    <TextField
                      fullWidth
                      id="lunchFood"
                      name="lunchFood"
                      label="Enter Lunch Food"
                      margin="normal"
                      size='small'
                      value={formik.values.lunchFood}
                      onChange={formik.handleChange}
                      InputLabelProps={{ style: { fontSize: 14 }, shrink: true }}
                      inputProps={{
                        style: {
                          height: "34px",
                          fontSize: "14px",
                        },
                      }}
                    />
                  </Grid>
                  <Grid item md={6} sm={12} xs={12}>
                    <TextField
                      fullWidth
                      id="dinnerTime"
                      name="dinnerTime"
                      label="Enter Dinner Time"
                      margin="normal"
                      size='small'
                      type="time"
                      value={formik.values.dinnerTime}
                      onChange={formik.handleChange}
                      InputLabelProps={{ style: { fontSize: 14 }, shrink: true }}
                      inputProps={{
                        style: {
                          height: "34px",
                          fontSize: "14px",
                        },
                      }}
                    />
                  </Grid>
                  <Grid item md={6} sm={12} xs={12}>
                    <TextField
                      fullWidth
                      id="dinnerFood"
                      name="dinnerFood"
                      label="Enter Dinner Food"
                      margin="normal"
                      size='small'
                      value={formik.values.dinnerFood}
                      onChange={formik.handleChange}
                      InputLabelProps={{ style: { fontSize: 14 }, shrink: true }}
                      inputProps={{
                        style: {
                          height: "34px",
                          fontSize: "14px",
                        },
                      }}
                    />
                  </Grid>
                  <Grid item md={6} sm={12} xs={12}>
                    <TextField
                      fullWidth
                      id="timeAfter2hrDinner"
                      name="timeAfter2hrDinner"
                      label="Enter Time After 2hr Dinner"
                      margin="normal"
                      size='small'
                      type="time"
                      value={formik.values.timeAfter2hrDinner}
                      onChange={formik.handleChange}InputLabelProps={{ style: { fontSize: 14 }, shrink: true }}
                      inputProps={{
                        style: {
                          height: "34px",
                          fontSize: "14px",
                        },
                      }}
                    />
                  </Grid>
                  <Grid item md={6} sm={12} xs={12}>
                    <NumericFormat
                      fullWidth
                      id="sugarLevelAfter2hrDinner"
                      name="sugarLevelAfter2hrDinner"
                      label="Enter sugarLevel After 2hr Dinner"
                      margin="normal"
                      value={formik.values.sugarLevelAfter2hrDinner ? (Number(formik.values.sugarLevelAfter2hrDinner)) : formik.values.sugarLevelAfter2hrDinner}
                      onValueChange={(values) => {
                        const { value } = values;
                        formik.setFieldValue('sugarLevelAfter2hrDinner', value);
                      }}
                     InputLabelProps={{ style: { fontSize: 14 }, shrink: true }}
                      inputProps={{
                        style: {
                          height: "34px",
                          fontSize: "14px",
                        },
                      }}
                      size='small' customInput={TextField} variant='outlined' />
                  </Grid>
                </Grid>
                <Button
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }} style={{ display: "flex", margin: "15px auto", padding: "0px 50px" }}
                  className='button' type="submit">
                  Submit
                </Button>

              </form>
            )}
          </Formik>
        </div>
      </Box>
    </Grid>
  )
}

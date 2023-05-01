import { Box, Button, Grid, LinearProgress, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react';
import noData from '../assets/noData.jpg'
import DiabeticForm from './DiabeticForm';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import instance from '../Utils/axiosInterceptors';

export default function Home() {
  const [showLoader, setShowLoader] = useState(false);
  const [getDiabetesData, setDiabetesData] = useState([]);
  const [formBlock, setFormBlock] = useState(false);
  const [editDiabete, setEditDiabetes] = useState([]);
  const [editTrue, setEditTrue] = useState(false);
  const userId = JSON.parse(localStorage.getItem("id"));
  const getData = async () => {
    setShowLoader(true)
    instance({
      method: "GET",
      url: `diabetics/${userId}`
    }).then((resp) => {
      if (resp.status === 200) {
        setDiabetesData(resp.data);
        setShowLoader(false);
      }
      setShowLoader(false);
    })
  }
  useEffect(() => {
    getData();
  }, [])


  const editForm = (values) => {
    setFormBlock(true);
    setEditDiabetes(values);
    setEditTrue(true);
  }
  const hideBlock = () => {
    setFormBlock(false);
  }
  return (
    <Grid container component="main" style={{ pointerEvents: showLoader ? "none" : "auto" }}>
      {showLoader && <LinearProgress />}
      {formBlock ?
        <Box sx={{ display: "flex", padding: "10px 24px", flexDirection: "column", width: "100%" }}>
          <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <KeyboardBackspaceIcon onClick={() => { setFormBlock(false); setEditDiabetes([]) }} className='pointer'></KeyboardBackspaceIcon>
            <Typography>Please fill the details</Typography>
            <div></div>
          </Box>
          <DiabeticForm editDiabete={editDiabete} editTrue={editTrue} hideBlock={hideBlock} getData={getData} />
        </Box>

        :
        <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
          {showLoader && <LinearProgress />}
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 24px" }}>
            <Typography>Diabetics Data</Typography>
            <div style={{ display: "flex" }}>
            {getDiabetesData.length > 0 &&
              <Button
                variant="contained"
                sx={{ mt: 3, mb: 2 }} style={{ margin: "0px 10px" }}
                className='button' onClick={() => {
                  var win = window.open(
                    "",
                    "",
                    "width=877,height=877"
                  );
                  var content = "<html>";
                  content +=
                    '<body onload="window.print(); window.close();">';
                  content += document.getElementById("divToPrint")?.innerHTML;
                  content += "</body>";
                  content += "</html>";
                  win?.document.write(content);
                  win?.document.close();
                }}>Print</Button>}
              <Button
                variant="contained"
                sx={{ mt: 3, mb: 2 }} style={{ margin: "0px" }}
                className='button' onClick={() => { setFormBlock(true); setEditDiabetes([]); setEditTrue(false) }}>
                Add Details
              </Button>
            </div>


          </Box>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            {getDiabetesData.length === 0 &&
              <img src={noData} width="500px" height="500px" alt="" />}
          </Box>
          {getDiabetesData.length > 0 &&
            <Box>
              <div style={{ width: "100%", overflow: "auto" }} id="divToPrint">
                <table style={{
                  borderCollapse: "collapse",
                  borderSpacing: "0",
                  width: "100%",
                  border: "none !important"
                }}>
                  <thead style={{
                    height: "56px",
                    background: "#efeded73",
                    width: "100%",
                    border: "1px solid #E8E8E8",
                    textAlign: "left"
                  }}>
                    <tr style={{
                      height: "56px",
                      borderBottom: "1px solid #E8E8E8"
                    }}>
                      <th style={{
                        fontWeight: "700",
                        fontSize: "14px",
                        lineHeight: "20px",
                        letterSpacing: "0.1px",
                        color: "#25282B",
                        padding: "0px 24px",
                        textAlign: "center",
                        border: "1px solid #E8E8E8",
                      }}>Date</th>
                      <th style={{
                        fontWeight: "700",
                        fontSize: "14px",
                        lineHeight: "20px",
                        letterSpacing: "0.1px",
                        color: "#25282B",
                        padding: "0px 24px",
                        textAlign: "center",
                        border: "1px solid #E8E8E8"
                      }}>Blood sugar level before BreakFast && Time</th>
                      <th style={{
                        fontWeight: "700",
                        fontSize: "14px",
                        lineHeight: "20px",
                        letterSpacing: "0.1px",
                        color: "#25282B",
                        padding: "0px 24px",
                        textAlign: "center",
                        border: "1px solid #E8E8E8"
                      }}>BreakFast && Time</th>
                      <th style={{
                        fontWeight: "700",
                        fontSize: "14px",
                        lineHeight: "20px",
                        letterSpacing: "0.1px",
                        color: "#25282B",
                        padding: "0px 24px",
                        textAlign: "center",
                        border: "1px solid #E8E8E8"
                      }}>Lunch && Time</th>
                      <th style={{
                        fontWeight: "700",
                        fontSize: "14px",
                        lineHeight: "20px",
                        letterSpacing: "0.1px",
                        color: "#25282B",
                        padding: "0px 24px",
                        textAlign: "center",
                        border: "1px solid #E8E8E8"
                      }}>Dinnner && Time</th>
                      <th style={{
                        fontWeight: "700",
                        fontSize: "14px",
                        lineHeight: "20px",
                        letterSpacing: "0.1px",
                        color: "#25282B",
                        padding: "0px 24px",
                        textAlign: "center",
                        border: "1px solid #E8E8E8"
                      }}>Blood Sugar level after 2hr of eating dinner</th>
                      <th style={{
                        fontWeight: "700",
                        fontSize: "14px",
                        lineHeight: "20px",
                        letterSpacing: "0.1px",
                        color: "#25282B",
                        padding: "0px 24px",
                        textAlign: "center",
                        border: "1px solid #E8E8E8"
                      }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getDiabetesData.length > 0 && getDiabetesData.map((value, index) => {
                      return (
                        <tr key={index} style={{
                          height: "56px",
                          borderBottom: "1px solid #E8E8E8"
                        }}>
                          <td style={{
                            fontSize: "14px",
                            lineHeight: "20px",
                            letterSpacing: "0.1px",
                            textAlign: "center",
                            border: "1px solid #E8E8E8",
                            color: "#52575C !important",
                            fontWeight: "400 !important",
                            padding: "0px 24px"
                          }}>
                            {value.date
                              ? new Date(Date.parse(value.date)).toLocaleDateString(
                                "en-US",
                                { timeZone: "America/Los_Angeles" }
                              )
                              : "NA"} {" "}
                          </td>
                          <td style={{
                            fontSize: "14px",
                            lineHeight: "20px",
                            letterSpacing: "0.1px",
                            textAlign: "center",
                            border: "1px solid #E8E8E8",
                            color: "#52575C !important",
                            fontWeight: "400 !important",
                            padding: "0px 24px"
                          }}>{value.suguarlevelBeforeBf}{" "}sugar level {"  "} at {value.timeBeforBf}</td>
                          <td style={{
                            fontSize: "14px",
                            lineHeight: "20px",
                            letterSpacing: "0.1px",
                            textAlign: "center",
                            border: "1px solid #E8E8E8",
                            color: "#52575C !important",
                            fontWeight: "400 !important",
                            padding: "0px 24px"
                          }}>{value.breakfastFood} at {value.breakfastTime}</td>
                          <td style={{
                            fontSize: "14px",
                            lineHeight: "20px",
                            letterSpacing: "0.1px",
                            textAlign: "center",
                            border: "1px solid #E8E8E8",
                            color: "#52575C !important",
                            fontWeight: "400 !important",
                            padding: "0px 24px"
                          }}>{value.lunchFood} at {value.lunchTime}</td>
                          <td style={{
                            fontSize: "14px",
                            lineHeight: "20px",
                            letterSpacing: "0.1px",
                            textAlign: "center",
                            border: "1px solid #E8E8E8",
                            color: "#52575C !important",
                            fontWeight: "400 !important",
                            padding: "0px 24px"
                          }}>{value.dinnerFood} at {value.dinnerTime}</td>
                          <td style={{
                            fontSize: "14px",
                            lineHeight: "20px",
                            letterSpacing: "0.1px",
                            textAlign: "center",
                            border: "1px solid #E8E8E8",
                            color: "#52575C !important",
                            fontWeight: "400 !important",
                            padding: "0px 24px"
                          }}>{value.sugarLevelAfter2hrDinner}{" "}sugar level {"  "} at {value.timeAfter2hrDinner}</td>
                          <td style={{
                            fontSize: "14px",
                            lineHeight: "20px",
                            letterSpacing: "0.1px",
                            textAlign: "center",
                            border: "1px solid #E8E8E8",
                            color: "#52575C !important",
                            fontWeight: "400 !important",
                            padding: "0px 24px"
                          }} onClick={() => { editForm(value) }}> <Button
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            className='button' type="submit">
                              Edit
                            </Button></td>
                        </tr>
                      )
                    }
                    )}
                  </tbody>
                </table>
              </div>
            </Box>
          }
        </Box>
      }
    </Grid>
  )
}
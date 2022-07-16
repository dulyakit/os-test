import React, { useState, useEffect } from "react";
import { Card, Button, CardTitle, CardText, Table } from "reactstrap";
const PCBOs = () => {
  const [processLists, setProcessLists] = useState([]);
  const [processTerminateLists, setProcessTerminateLists] = useState([]);
  const [processShow, setProcessShow] = useState({});
  const [process, setProcess] = useState({});
  const [time, setTime] = useState(0);
  const addProcess = () => {
    setProcess({
      id: processLists.length,
      processName: `P${processLists.length}`,
      arrivalTime: time,
      processStatus: "New",
    });
  };
  const terminateProcess = () => {
    let terminateProcesss = processLists.filter((item) => {
      return item.processStatus == "Running"
        ? { ...item, processStatus: "terminate" }
        : null;
    });
    let filterArr = processLists.filter((item) => {
      return item.processStatus != "Running" ? item : null;
    });
    setProcessLists(filterArr);
    terminateProcesss[0].processStatus = "terminate";
    console.log("terminateProcesss", terminateProcesss);

    setProcessTerminateLists([...processTerminateLists, ...terminateProcesss]);
  };

  useEffect(() => {
    let innervalId = 0;
    setInterval(() => {
      innervalId++;
      setTime(innervalId);
    }, 1000);
  }, []);

  const findNumber = (arr) => {
    let arrs = arr || [];
    let lowest = Number.POSITIVE_INFINITY;
    let highest = Number.NEGATIVE_INFINITY;
    let tmp;
    if (arrs.length > 1) {
      for (let i = arrs.length - 1; i >= 0; i--) {
        tmp = arrs[i].arrivalTime;
        if (tmp < lowest) lowest = tmp;
        if (tmp > highest) highest = tmp;
      }
    }
    return lowest;
  };

  useEffect(() => {
    let processList = processLists;
    for (let i = 0; i < processLists.length; i++) {
      if (processLists[i].id) {
        processList[i].processStatus =
          processList[i].arrivalTime > 1 ? "Ready" : "New";
        processList[i].processStatus =
          processList[i].arrivalTime == findNumber(processList)
            ? "Running"
            : processList[i].processStatus;
        if (processList[i].processStatus == "Running") {
          setProcessShow(processList[i]);
        }
      }
    }
    findNumber();
    console.log("findNumber()", findNumber(processList));
    setProcessLists(processList);
    console.log("processLists", processLists);
  }, [time]);

  useEffect(() => {
    setProcessLists([...processLists, process]);
  }, [process]);

  return (
    <div className="container-fluid mt-2">
      <div className="row">
        <div className="col-md-8">
          <Card body>
            <div className="row">
              <div className="col-md-8">
                <CardTitle tag="h5">อะไรสักอย่าง PCB</CardTitle>
              </div>
              <div className="col-md-4">
                <Button
                  color="primary"
                  style={{ float: "right" }}
                  onClick={() => addProcess()}
                >
                  Add process
                </Button>
              </div>
              <div className="col-md-12 mt-2">
                <div style={{ height: "500px", overflow: "scroll" }}>
                  <Table bordered>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Process Name</th>
                        <th>Arrival Time</th>
                        <th>Waitting Time</th>
                        <th>Status Process</th>
                      </tr>
                    </thead>
                    <tbody>
                      {processLists.map((item, idx) => {
                        if (item.id != undefined) {
                          return (
                            <tr key={idx}>
                              <td>{item.id}</td>
                              <td>{item.processName}</td>
                              <td>{item.arrivalTime}</td>
                              <td>Waitting</td>
                              <td
                                style={{
                                  backgroundColor:
                                    item.processStatus == "Ready"
                                      ? "green"
                                      : item.processStatus == "Running"
                                      ? "orange"
                                      : "",
                                }}
                              >
                                {item.processStatus}
                              </td>
                            </tr>
                          );
                        }
                      })}
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>
          </Card>
        </div>
        <div className="col-md-4">
          <Card body>
            <div className="row">
              <div style={{ height: "545px" }}>
                <div className="col-md-12">
                  <CardTitle tag="h5">
                    <h3>controller</h3>
                    <hr />
                  </CardTitle>

                  <h3>CPU Time : {time}</h3>
                  <h3>CPU process : {processShow.processName}</h3>
                  <h3>I/O process : </h3>
                  <h3>AVG Waitting : </h3>
                  <h3>I/O Ternaround : </h3>
                </div>
                <div className="col-md-12">
                  <Button
                    style={{ float: "right" }}
                    color="warning"
                    onClick={() => terminateProcess()}
                  >
                    Terminate
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-md-8">
          <Card body>
            <div className="row">
              <div className="col-md-8">
                <CardTitle tag="h5">Table Process terminate</CardTitle>
              </div>
              <div className="col-md-4">
                {/* <Button color="primary" style={{ float : 'right' }} onClick={() => addProcess()}>Add process</Button> */}
              </div>
              <div className="col-md-12 mt-2">
                <div style={{ height: "210px", overflow: "scroll" }}>
                  <Table bordered>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Process Name</th>
                        <th>Arrival Time</th>
                        <th>Waitting Time</th>
                        <th>Status Process</th>
                      </tr>
                    </thead>
                    <tbody>
                      {processTerminateLists.map((item, idx) => {
                        if (item.id != undefined) {
                          return (
                            <tr key={idx}>
                              <td>{item.id}</td>
                              <td>{item.processName}</td>
                              <td>{item.arrivalTime}</td>
                              <td>Waitting</td>
                              <td
                                style={{
                                  backgroundColor:
                                    item.processStatus == "terminate"
                                      ? "#CC3399"
                                      : "",
                                }}
                              >
                                {item.processStatus}
                              </td>
                            </tr>
                          );
                        }
                      })}
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>
          </Card>
        </div>
        <div className="col-md-4">
          <Card body>
            <div className="row">
              <div className="col-md-12">
                <h3>I/O Process</h3>
                <div style={{ height: "170px" }}>
                  <Table bordered>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                      </tr>
                      <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                      </tr>
                      <tr>
                        <th scope="row">3</th>
                        <td>Larry</td>
                        <td>the Bird</td>
                        <td>@twitter</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </div>
              <div className="col-md-12">
                <Button style={{ float: "right" }} color="danger">
                  Add I/O
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PCBOs;

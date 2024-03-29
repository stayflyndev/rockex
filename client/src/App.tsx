import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import logo from "./logo.svg";
import "./App.css";
import Accordion from 'react-bootstrap/Accordion';
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";


interface Rocket {
  name: string;
  links: {
    patch: {
      small: string;
    };
    wikipedia: string;
  };
  success: boolean;
  details: string;
}

const App: React.FC = () => {
  const [data, setData] = useState<Rocket[]>([]);
  const [search, setSearch] = useState<string>("");
  //async func to get the data from server and output in the client
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://rockex.onrender.com/api`);
        if (!response.ok) {
          throw new Error("Unable to get information at this time");
        }
        const rocketData = await response.json();
        setData(rocketData);
      } catch (error) {
        console.log("Oppps! Something went wrong");
      }
    };
    fetchData();
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("h");
  };

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filteredData = data.filter((item) => {
    if (!search.trim()) return true; // Return true if search is empty
    const keywords = search.toLowerCase().split(" ");
    return keywords.every((keyword) =>
      Object.values(item).some(
        (value) =>
          typeof value === "string" && value.toLowerCase().includes(keyword)
      )
    );
  });
 
  return (
    <div className="App">
      <Container className="container">
      <Row>
        <Col><header style={{ paddingLeft: 0 }}>
      <div
        className='p-5 text-center bg-image'
        style={{ backgroundImage: "url('https://images.pexels.com/photos/41162/moon-landing-apollo-11-nasa-buzz-aldrin-41162.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')", height: 400, backgroundSize: 'cover',
        backgroundPosition: 'center top'}}
      >
        <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
          <div className='d-flex justify-content-center align-items-center h-100'>
            <div className='text-white'>
              <h1 className='mb-3'>Rocket Power</h1>
              <h4 className='mb-3'>Go Crazy!</h4>
              <a className='btn btn-outline-light btn-lg' href='github.com/stayflyndev' role='button'>
                github
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
    </Col>
      </Row>
        <InputGroup onSubmit={handleSubmit} className="input_field">
          <InputGroup.Text>Search</InputGroup.Text>
          <Form.Control
            as="textarea"
            aria-label="With textarea"
            onChange={onSearch}
          />
        </InputGroup>
        <Row>
         
          {filteredData.map((item, index) => (
             <Col sm={3}>
            <Card style={{ width: "18rem", paddingTop: "50px"}} key={index}>
              <Card.Img variant="top" src={item.links.patch.small} />
              <Card.Body>
                <Card.Title>
                  <p>Crew </p>
                  {JSON.stringify(item.name)}
                </Card.Title>
                <Card.Text>
                  <div className="success_padding">
                  {item.success ? (<p> Succesful Launch Was Made! </p>) : <p> Failure Happened</p>}
                  </div>
                  <div className="succss_padding"></div>
                </Card.Text>
                <Card.Text>
                <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Read Details</Accordion.Header>
        <Accordion.Body>
         {item.details}
        </Accordion.Body>
      </Accordion.Item>
      </Accordion>
                </Card.Text>
                <Button variant="primary" href={item.links.wikipedia}>
                  Read More..
                </Button>
              </Card.Body>
            </Card>
            </Col>
          ))}
       
        </Row>
      </Container>
    </div>
  );
};

export default App;

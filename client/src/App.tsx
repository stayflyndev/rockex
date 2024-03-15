import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const App: React.FC = () => {
  const [data, setData] = useState<any[]>([]);

  //async func to get the data from server and output in the client
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/?page=${page}`);
        const newData = await response.json();
        if (!response.ok) {
          throw new Error("Unable to get information at this time");
        }
        const rocketData = await response.json();
        setData(rocketData);
      } catch (error) {
        console.log("Oppps! Something went wrong");
      }
    };
    fetchData()
  }, []);


  return (

    <div className="App">
      <Container>
        <Row>
          {data.map((item, index) => (

            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src={item.links.patch.small} />
              <Card.Body>
                <Card.Title><p>Crew </p>{JSON.stringify(item.name)}</Card.Title>
                <Card.Text>

                </Card.Text>
                <Button variant="primary" href={item.links.wikipedia}>RocketWiki</Button>
              </Card.Body>
            </Card>

          ))}

        </Row>
      </Container>
    </div>
  );
};

export default App;

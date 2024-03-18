import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import logo from "./logo.svg";
import "./App.css";
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';


const App: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [search, setSearch] = useState<string>('')
  //async func to get the data from server and output in the client
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/`);
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

const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  console.log("h")
}

const onSearch = (e: ChangeEvent<HTMLInputElement>) =>{
setSearch(e.target.value)
}

  return (

    <div className="App">
      <Container>
      <InputGroup onSubmit={handleSubmit}>
        <InputGroup.Text>Search</InputGroup.Text>
        <Form.Control as="textarea" aria-label="With textarea" onChange={onSearch} />
      </InputGroup>
        <Row>
         
          {data.filter((item)=>{
          return search.toLowerCase() === "" ? item: item.name.toLowerCase().includes(search)
          }).map((item, index) => (

            <Card style={{ width: '18rem' }} key={(index)}>
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

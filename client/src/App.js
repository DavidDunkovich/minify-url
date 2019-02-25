import React, { Component } from "react";
import {
  Header,
  Container,
  Segment,
  Form,
  Button,
  Icon,
  Popup
} from "semantic-ui-react";
import copy from "copy-to-clipboard";
import DataTable from "./DataTable";
import generateRandomUrl from "./utils/generateRandomUrl";
import getLongUrl from "./api/getLongUrl";
import getUrls from "./api/getUrls";
import addUrl from "./api/addUrl";

class App extends Component {
  state = { longUrl: "" };

  componentDidMount = () => {
    //Check to see if using a short url
    //Redirects if short url is present
    getLongUrl();

    //Retrieve any existing entries to display in table
    this.updateData();
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  getRandomUrl = () => {
    this.setState({ longUrl: generateRandomUrl() });
  };

  minify = () => {
    const { longUrl } = this.state;
    addUrl(longUrl)
      .then(response => {
        if (response.shortUrl) {
          this.setState({
            shortUrl: response.shortUrl,
            error: false
          });
        } else {
          this.setState({
            shortUrl: false,
            error: response.error
          });
        }
      })
      .then(this.updateData());
  };

  updateData = () => {
    getUrls().then(urlData => {
      if (urlData.length !== 0) {
        this.setState({ urlData });
      }
    });
  };

  render() {
    const { longUrl, urlData, error, shortUrl } = this.state;
    return (
      <Container style={{ marginTop: "2em", marginBottom: "2em"  }}>
        <Header as="h5" content="Submitted By David Dunkovich" />
        <Header as="h1" content="Remitly Project Assignment" />
        <Segment padded="very" color="blue">
          <Form>
            <Header as="h5">Please enter in a long URL</Header>
            <Form.Input
              placeholder="ie. http://example.com/sXw1-e_L4Y6v75PsHh8dzgDWvW6TBEBJivOxwuAAMsdhxoyPdFDmVImt6SqTS0q8UmX3xkYKg7Y"
              name="longUrl"
              value={longUrl}
              onChange={this.handleChange}
            />
            <Button
              content="Randomize Input"
              color="blue"
              onClick={() => this.getRandomUrl()}
            />
            <Button
              content="Minify"
              color="green"
              onClick={() => this.minify()}
            />
            {error && (
              <Header as="h3" color="red" textAlign="center">
                {error}
              </Header>
            )}
            {shortUrl && (
              <>
                <div style={{ textAlign: "center", marginTop: "2em" }}>
                  <span style={{ fontSize: "1.3em", marginRight: ".5em" }}>
                    Your shortened URL:{" "}
                    <span style={{ color: "green" }}>{shortUrl}</span>
                  </span>
                  <Popup
                    trigger={
                      <Button icon circular color="green">
                        <Icon name="copy" size="large" />
                      </Button>
                    }
                    content="Link Copied!"
                    on="click"
                    onOpen={() => copy(shortUrl)}
                    position="right center"
                  />
                </div>
              </>
            )}
          </Form>
        </Segment>
        {urlData && <DataTable urlData={urlData} />}
      </Container>
    );
  }
}

export default App;

import React from 'react';
import { Button, Container, Row, Col } from 'reactstrap';
import { getTruncatedArray } from "../utils";

const Comics = ({ comics, loading, startIndex = 0 }) => {
    let dom;
    if(loading){
        return <h2>Loading...</h2>
    }

    if(!loading && comics) {
        dom = (
            <Container className="comics-container container-fluid">
                <ComicRows comics={comics} />
            </Container>
        );
    } else {
        dom = <div />
    }

    return dom;
}

const ComicRows = ({comics}) => {
    let comicGrid = [];
    let startIndex = 0;
    for(let i=0; i < 3; i ++) {
        startIndex = i===0 ? startIndex : startIndex + 3;
        comicGrid.push(
            <Row className="comic-row" key={i}>
                {getTruncatedArray(comics, startIndex, 3).map((comic, index) => 
                    <Col sm={{ size: '12' }} md={{ size: '4' }} xs={{ size: '12' }} key={index} align="center">
                        <Comic comic={comic} />
                    </Col>
                )}
            </Row>
        );
    }
    return comicGrid;
}

const Comic = ({ comic }) => {
    console.log(comic);
    return (
        <div className="comic">
           
            {
                comic && comic.images && comic.images[0] && 
                <div className="flip-card">
                    <div className="flip-card-inner">
                        <div className="flip-card-front">
                            <img src={`${comic.images[0].path}.${comic.images[0].extension}`} alt="Comic" />
                        </div>
                        <div className="flip-card-back">
                            <div className="comic-title">{comic.title}</div> 
                            <div className="comic-description">{comic.description}</div> 
                            <Button color="primary" className="comic-readmore" size="lg">
                                <a href={comic.urls[0].url} target="_blank" rel="noopener noreferrer" src="" alt={comic.title}>Read More</a>
                            </Button>
                        </div>
                    </div>
                </div>
            } 
            {
                comic && comic.images && !comic.images[0] 
                && <div className="no-image">
                    No Image found For Title 
                    <b><div className="comic-title">{comic.title}</div></b>
                    <div>
                        <div className="comic-description">{comic.description}</div> 
                        <Button color="primary" className="comic-readmore" size="lg">
                            <a href={comic.urls[0].url} target="_blank" rel="noopener noreferrer" src="" alt={comic.title}>Read More</a>
                        </Button>
                    </div>
                </div>
            }
        </div>
    )
}



export default Comics;

import React from 'react';
import './scss/Card.css';

class Card extends React.Component {

  render() {
    let author = this.props.author;
    //let authorEmail = author.slice(0, author.indexOf(' '));
    let authorNickName = author.substring(author.lastIndexOf('("')+2, author.lastIndexOf('")'));
    return (
      <div className="card">
        <figure className="card_content">         
            <img className="img" src={this.props.image} alt="" />       
          <figcaption>
            <h3 className="title">
              <a href={this.props.imageLink} title={this.props.title} >
                {this.props.title}
              </a> by <a href={this.props.author_page} >{authorNickName}</a>
              </h3>
            <div className="description" 
              dangerouslySetInnerHTML={{ __html: this.props.description }} 
            />
            <div className="tags">
              {this.props.tags ? 'Tags: ' + this.props.tags.replace(/\s+/g, ", ") : ""}
            </div>
          </figcaption>
        </figure>
      </div>
    );
  }
}

export default Card;



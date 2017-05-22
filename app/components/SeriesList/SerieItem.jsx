import React from 'react';
import {Glyphicon} from 'react-bootstrap';

const ICONS = {
  bookmark: {
    yes: "heart",
    no: "heart-empty"
  },
  seen: {
    yes: "eye-open",
    no: "eye-close"
  }
};

class SerieItem extends React.Component {

  render() {
    const {item, onClick, onBookmark, onSeen, enableBookmarkFunc, enableSeenFunc} = this.props;
    return (
      <li
        className="list-group-item"
        onClick={onClick}>
        <div>{item.title}</div>
        <div>{item.desc}</div>
        <div>
          {enableBookmarkFunc ?
            <Glyphicon
              onClick={onBookmark.bind(this, item)}
              glyph={ICONS.bookmark[item.bookmarked ? "yes": "no"]}
            />
            : null}
          {enableSeenFunc ?
            <Glyphicon
              onClick={onSeen.bind(this, item)}
              glyph={ICONS.seen[item.seen ? "yes" : "no"]}
            />
            : null}
        </div>
      </li>
    )
  }
}

SerieItem.propTypes = {
  text: React.PropTypes.string
}

export default SerieItem;

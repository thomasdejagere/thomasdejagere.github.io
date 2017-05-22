import React from 'react';
import {ListGroup} from 'react-bootstrap';
import SerieItem from './SerieItem';
import {selectSerie} from '../../containers/App/actions';

class SeriesList extends React.Component {
  onClick(item) {
      const {dispatch, onItemClick} = this.props;
      dispatch(selectSerie(item));
      onItemClick(item);
  }

  render() {
    const {items = [], onBookmark, onSeen, enableBookmarkFunc = true, enableSeenFunc = true} = this.props;
    return (
      <div>
        <ListGroup componentClass="ul">
          { items.map((item) => {
            if (item && typeof item.id !== "undefined") {
              return (<SerieItem
                key={item.id}
                onClick={this.onClick.bind(this, item)}
                onBookmark={onBookmark}
                onSeen={onSeen}
                enableBookmarkFunc={enableBookmarkFunc}
                enableSeenFunc={enableSeenFunc}
                item={item}/>)
            }
            })
          }
        </ListGroup>
      </div>
    )
  }
}

// SeriesList.propTypes = {
//   items: React.PropTypes.array,
// };

export default SeriesList;

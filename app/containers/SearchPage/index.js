import React from 'react';
import Helmet from 'react-helmet';
import {isInit, fetchSeries, querySeries, bookmarkSerieLocal, seenSerieLocal} from './actions';
import {connect} from 'react-redux'
import SerieList from 'components/SeriesList';
import {FormGroup, FormControl} from 'react-bootstrap';
import {push} from 'react-router-redux';

let timeout = null;

export class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    console.log("searchpage constructor");
    this.state = {
      preventShowDetailPage: false
    }
  }

  componentWillMount() {
    const {dispatch} = this.props;
    if (!this.props.isAuthenticated) {
      dispatch(push('/login'));
    } else {
      dispatch(fetchSeries());
    }
  }

  onBookmark(selectedSerie) {
    const {dispatch} = this.props;
    dispatch(bookmarkSerieLocal(selectedSerie.id))
  }

  onSeen(selectedSerie) {
    const {dispatch} = this.props;
    dispatch(seenSerieLocal(selectedSerie.id));
  }

  showDetailPage(item) {
    const {dispatch} = this.props;
    !this.state.preventShowDetailPage ?
    dispatch(push('/search/' + item.id))
    : this.setState({
      preventShowDetailPage: false
    })
  }

  onSearch(e) {
    const {dispatch} = this.props;
    const value = e.target.value;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      dispatch(querySeries(value));
    }, 150)
  }

  render() {
    const {series, dispatch} = this.props;
    return (
      <div>
        <FormGroup controlId="search-field">
          <FormControl
            type="text"
            label="Search"
            placeholder="Search"
            onChange={this.onSearch.bind(this)}
          />
        </FormGroup>
        <SerieList
          items={series}
          dispatch={dispatch}
          enableBookmarkFunc={true}
          enableSeenFunc={true}
          enableDetailPane={true}
          onBookmark={this.onBookmark.bind(this)}
          onSeen={this.onSeen.bind(this)}
          onItemClick={this.showDetailPage.bind(this)}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let series = state.get('search').get('series').get('queriedSeries');
  console.log("series");
  console.log(series);
  return {
    series,
    isAuthenticated: state.get('global').get('isAuthenticated')
  }
};

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(SearchPage);

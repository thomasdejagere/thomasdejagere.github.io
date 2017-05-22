import React from 'react';
import {connect} from 'react-redux';
import Button from 'components/Button';
import {push} from 'react-router-redux';

class DetailPage extends React.Component {
  componentWillMount() {
    if (!this.props.isAuthenticated) {
      this.props.routeToLogin();
    }
  }

  render() {
    const {serie, routeToSearchPage} = this.props;

    return (
      <div>
        <Button
          text=""
          icon="arrow-left"
          size="small"
          style="default"
          onClick={routeToSearchPage}
        />

        <p>id: {this.props.params.id}</p>
        <p>Description: {serie.desc}</p>
        <p>Seen: {serie.seen ? "true" : "false"}</p>
        <p>Bookmarked: {serie.bookmarked ? "true": "false"}</p>
      </div>

    )
  }
}

DetailPage.propTypes = {
};

export function mapDispatchToProps(dispatch) {
  return {
    routeToSearchPage: () => dispatch(push('/search')),
    routeToLogin: () => dispatch(push('/login'))
  };
}

const mapStateToProps = (state) => {
  return {
    serie: state.get('global').get('selectedSerie').toJS(),
    isAuthenticated: state.get('global').get('isAuthenticated')
  }
};

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(DetailPage);

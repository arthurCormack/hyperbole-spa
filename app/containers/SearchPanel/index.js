/*
 *
 * PageWrapper
 *
*/

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import FontAwesome from 'react-fontawesome';

import { toggleSearchPanel } from './actions';

// We need to add the SearchBox to our import
import { InstantSearch, Hits, SearchBox, Highlight, RefinementList, Snippet, Pagination } from 'react-instantsearch/dom';
import { connectHighlight, connectSearchBox, connectStateResults } from 'react-instantsearch/connectors';
// connectStateResults Does not seem to actually exist, even though it is in the documentatiuon:
// https://community.algolia.com/react-instantsearch/connectors/connectStateResults.html
// inconsiderate!
import { createConnector } from 'react-instantsearch';

class SearchPanel extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    // this.bind.hitResult.this
  }

  componentWillReceiveProps(nextProps) {

  }
  componentDidUpdate() {

  }
  componentDidMount() {

  }



  render() {

    const EZSearchBox = ({ currentRefinement, refine }) => {
      return(
        <input
          type="text"
          value={currentRefinement}
          onChange={e => refine(e.target.value)}
        />
      );
    }

    const EZConnectedSearchBox = connectSearchBox(EZSearchBox);

    const HitItemWrapper = styled.div`
        margin-bottom: 1.0em;
        margin-top: 1.0em;
        padding: 1.0em;
        border-bottom: 1px solid #e6e6e6;
        padding-bottom: 30px;
      h2 {
        margin-top: 0;
      }
    `;

    const CustomHighlight = connectHighlight(
      ({ highlight, attributeName, hit, highlightProperty }) => {
        const parsedHit = highlight({ attributeName, hit, highlightProperty: '_highlightResult' });
        const highlightedHits = parsedHit.map(part => {
          if (part.isHighlighted) return <mark>{part.value}</mark>;
          return part.value;
        });
        return <div>{highlightedHits}</div>;
      }
    );

    const SearchContent = ({ searchState }) => {
      // // console.log('Yea SearchContent');
      // // console.log(`SearchParams==${SearchParams}`);
      // // console.log(SearchParams);
      if (typeof searchState.query !== 'string' || searchState.query.length < 3) {
        return (<div></div>);
      } else {
        return (
          <div>
            <Hits hitComponent={Hit}/>
            {/* <Pagination showLast={true}/> */}
          </div>
        );
      }
    };

    const ConnectedSearchResults = connectStateResults(SearchContent);

    const EZSearchLink = styled(Link)`
      color: #000;
      font-size: 0.8em;
      :hover {
        cursor: pointer;
        text-decoration: none;
        color: #d02e30;
      }
    `;

    const Hit = ({hit}) => {
      // // console.log(hit);
      const hitLink = hit.permalink.replace('ez2.local', 'www.everythingzoomer.com');
      return (
        <HitItemWrapper>
          <h2><EZSearchLink onClick={() => this.props.searchLinkClicked()} to={hitLink}>{hit.post_title}</EZSearchLink></h2>
           <Snippet attributeName="content" hit={hit} />
          {/* <CustomHighlight attributeName="content" hit={hit}/> */}
        </HitItemWrapper>
      );
    }

    return (
      <div>
        <InstantSearch
          appId="SNZP2CK84V"
          apiKey="72466563d028359980b4f54238347523"
          indexName="wp_searchable_posts"
          // searchState={this.props.searchState || {}}
          // if we are to set a state here initially,
          // whether from url params or whatever, then we have to make a function that will listen to the clear search event,
          // and dispatch an action that updates state; which would update the props of the searchState

        >
          <SearchBox autoFocus />
          <RefinementList attributeName="category" />
            {/* <Hits hitComponent={Hit}/> */}
            <ConnectedSearchResults />
        </InstantSearch>
      </div>
    );
  }
}


const mapStateToProps = createStructuredSelector({

});



function mapDispatchToProps(dispatch) {
  return {
    searchLinkClicked: () => {
      // console.log('searchLinkClicked');
      dispatch(toggleSearchPanel(false));
    },
    dispatch,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchPanel);

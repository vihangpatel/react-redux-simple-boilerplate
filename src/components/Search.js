import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { get } from '../utils/request'
import { setBusy, storeResult } from '../actions'

class Search extends Component {

  constructor(props) {
    super(props)

    this.onSearchUserClick = this.onSearchUserClick.bind(this)
  }

  state = {
    userName: ''
  }

  onInputChange (userName) {
    this.setState({userName})
  }

  onSearchUserClick() {
    if(this.props.busy) {
      return 
    }

    this.props.dispatch(setBusy(true))
    get(`https://github-user.now.sh?username=${this.state.userName}`)
        .then(data => {
          this.props.dispatch(setBusy(false))
          this.props.dispatch(storeResult(data.data))
        })
  }

  render()  {
    return (
      <div>
        <Link to="/history"> History </Link>
        <div className='search-bar'>
          
              <input
                placeholder="Enter a Github User's name"
                value={this.state.userName}
                onChange={event => this.onInputChange(event.target.value)}
                type='text'
              />
              
              <button
                className={this.props.busy ? 'busy' : ''} 
                disabled={this.props.busy}
                onClick={this.onSearchUserClick}
                type="submit"
              >Search </button>
              
          
        </div>
        <div className='repo-list'>
          <h4>List of available repositories:</h4>
          <p>(click on any repo to visit on GitHub)</p>
          <ul>
            Here the repo list will be shown
          </ul>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
    return {
      busy : state.home.busy
    }
}

export default connect(mapStateToProps)(Search)